import type { H3Event } from "h3";
import { prisma } from "../utils/prisma";
import { verifyPassword } from "../utils/password";

// Hash/salt "de mentira" usado só pra manter o tempo de resposta parecido
// quando o usuário não existe — evita que alguém descubra usuários válidos
// medindo quanto tempo a resposta demora (timing attack).
const DUMMY_SALT = "0".repeat(32);
const DUMMY_HASH = "0".repeat(128);

function getClientIp(event: H3Event) {
  const forwarded = getHeader(event, "x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
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

function denyAuth(event: H3Event) {
  setResponseHeader(event, "WWW-Authenticate", 'Basic realm="Mensagens"');
  throw createError({ statusCode: 401, statusMessage: "Não autorizado" });
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

  // Tudo que envolve parsear o header ou consultar o banco fica protegido:
  // qualquer coisa inesperada aqui vira 401 (nunca um 500 com stack trace)
  // e sempre gera um registro de tentativa.
  try {
    if (!header?.startsWith("Basic ")) {
      await logAttempt({ ip, userAgent, authorized: false, reason: "missing_credentials" });
      return denyAuth(event);
    }

    const decoded = Buffer.from(header.slice(6), "base64").toString();
    const separatorIndex = decoded.indexOf(":");
    const username = separatorIndex === -1 ? "" : decoded.slice(0, separatorIndex);
    const password = separatorIndex === -1 ? "" : decoded.slice(separatorIndex + 1);

    if (!username || !password) {
      await logAttempt({ ip, userAgent, authorized: false, reason: "malformed_credentials" });
      return denyAuth(event);
    }

    const admin = await prisma.adminUser.findUnique({ where: { username } });

    // Roda o verifyPassword mesmo sem admin encontrado, contra um hash fixo,
    // só pra não vazar (por tempo de resposta) se o usuário existe ou não.
    const validPassword = admin
      ? verifyPassword(password, admin.passwordSalt, admin.passwordHash)
      : (verifyPassword(password, DUMMY_SALT, DUMMY_HASH), false);

    if (!admin || !validPassword) {
      await logAttempt({ ip, userAgent, username, authorized: false, reason: "invalid_credentials" });
      return denyAuth(event);
    }

    await logAttempt({ ip, userAgent, username, authorized: true, reason: "login_success" });
  } catch (err) {
    if (err && typeof err === "object" && "statusCode" in err) throw err;
    await logAttempt({ ip, userAgent, authorized: false, reason: "auth_error" });
    return denyAuth(event);
  }
});
