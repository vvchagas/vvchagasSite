import type { H3Event } from "h3";
import { prisma } from "../utils/prisma";
import { verifyPassword } from "../utils/password";

function getClientIp(event: H3Event) {
  const forwarded = getHeader(event, "x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() ?? "unknown";
  return event.node.req.socket.remoteAddress ?? "unknown";
}

async function logAttempt(params: {
  ip: string;
  userAgent: string;
  username?: string;
  authorized: boolean;
  reason: string;
}) {
  try {
    await prisma.deviceAccessLog.create({ data: params });
  } catch {
    // Nunca deixa uma falha de log derrubar a autenticação.
  }
}

export default defineEventHandler(async (event) => {
  const url = event.node.req.url ?? "";
  const method = event.node.req.method ?? "GET";

  const isMessagesApi = url.startsWith("/api/messages");
  const isPublicSubmit = isMessagesApi && method === "POST";

  // A página é pública (proteção é feita no cliente com modal de senha).
  // Apenas a API de leitura/edição/exclusão exige autenticação Basic.
  // O envio do formulário (POST) continua público.
  const needsAuth = isMessagesApi && !isPublicSubmit;
  if (!needsAuth) return;

  const ip = getClientIp(event);
  const userAgent = getHeader(event, "user-agent") ?? "unknown";
  const header = getHeader(event, "authorization");

  if (!header?.startsWith("Basic ")) {
    await logAttempt({ ip, userAgent, authorized: false, reason: "missing_credentials" });
    setResponseHeader(event, "WWW-Authenticate", 'Basic realm="Mensagens"');
    throw createError({ statusCode: 401, statusMessage: "Não autorizado" });
  }

  const [username, password] = Buffer.from(header.slice(6), "base64").toString().split(":");

  const admin = await prisma.adminUser.findUnique({ where: { username } });

  if (!admin || !verifyPassword(password ?? "", admin.passwordSalt, admin.passwordHash)) {
    await logAttempt({ ip, userAgent, username, authorized: false, reason: "invalid_credentials" });
    setResponseHeader(event, "WWW-Authenticate", 'Basic realm="Mensagens"');
    throw createError({ statusCode: 401, statusMessage: "Não autorizado" });
  }

  await logAttempt({ ip, userAgent, username, authorized: true, reason: "login_success" });
});
