import { createError, getRequestIP, readBody } from "h3";
import { isMessageTopic } from "@@/shared/messages";
import { prisma } from "../../utils/prisma";

interface IncomingMessageBody {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  contactType?: unknown;
  topic?: unknown;
  source?: unknown;
  message?: unknown;
}

const MAX_LENGTH = {
  name: 100,
  source: 80,
  message: 3_000,
} as const;

// Rate limit em memória por instância. Em serverless não é garantia
// entre invocações diferentes, mas ainda barra spam de curtíssimo prazo
// dentro da mesma instância "quente".
const recentSubmissions = new Map<string, number>();
const RATE_LIMIT_MS = 15_000;

function toText(value: unknown, field: keyof typeof MAX_LENGTH): string | null {
  if (typeof value !== "string") return null;
  const text = value.trim().replace(/\s+/g, " ");
  return text.length > 0 && text.length <= MAX_LENGTH[field] ? text : null;
}

// E-mail: exige "@" e um domínio com TLD válido (regex estrita, mesma
// exigida no frontend). Máx. 254 chars é o limite prático de e-mail (RFC 5321).
const EMAIL_PATTERN =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

// Telefone E.164: "+" seguido de 7 a 15 dígitos (padrão internacional).
const E164_PATTERN = /^\+[1-9]\d{6,14}$/;

function isValidEmail(value: string): boolean {
  return value.length <= 254 && EMAIL_PATTERN.test(value);
}

function isValidPhoneE164(value: string): boolean {
  return E164_PATTERN.test(value);
}

function cleanupRateLimit(): void {
  const now = Date.now();
  for (const [ip, timestamp] of recentSubmissions.entries()) {
    if (now - timestamp > RATE_LIMIT_MS) {
      recentSubmissions.delete(ip);
    }
  }
}

export default defineEventHandler(async (event) => {
  const ip = getRequestIP(event, { xForwardedFor: true }) ?? "unknown";
  const lastSubmission = recentSubmissions.get(ip) ?? 0;

  if (Date.now() - lastSubmission < RATE_LIMIT_MS) {
    throw createError({
      statusCode: 429,
      statusMessage: "Aguarde alguns segundos antes de enviar outra mensagem.",
    });
  }

  let body: IncomingMessageBody;
  try {
    body = await readBody<IncomingMessageBody>(event);
  } catch {
    throw createError({
      statusCode: 400,
      statusMessage: "Corpo da requisição inválido.",
    });
  }

  const name = toText(body?.name, "name");
  const source = toText(body?.source, "source");
  const message = toText(body?.message, "message");
  const email = typeof body?.email === "string" ? body.email.trim() : "";
  const phone = typeof body?.phone === "string" ? body.phone.trim() : "";
  const contactType = body?.contactType === "email" || body?.contactType === "phone" 
    ? body.contactType 
    : "email";

  if (!name || !source || !message || !isMessageTopic(body?.topic)) {
    throw createError({
      statusCode: 400,
      statusMessage: "Faltam informações ou acima do limite permitido.",
    });
  }

  // Validação condicional conforme tipo de contato
  if (contactType === "email") {
    if (!isValidEmail(email)) {
      throw createError({
        statusCode: 400,
        statusMessage: "Informe um e-mail válido (ex: nome@dominio.com).",
      });
    }
  } else if (contactType === "phone") {
    if (!isValidPhoneE164(phone)) {
      throw createError({
        statusCode: 400,
        statusMessage: "Informe um telefone válido, com DDI (padrão internacional).",
      });
    }
  }

  try {
    await prisma.contactMessage.create({
      // "contact" é mantido por retrocompatibilidade com a tela admin
      // (/messages, que ainda lê esse campo único) -- reflete o que a
      // pessoa realmente escolheu (e-mail OU telefone), não sempre e-mail.
      data: {
        name,
        contact: contactType === "phone" ? phone : email,
        email,
        phone,
        contactType,
        topic: body.topic,
        source,
        message,
      },
    });
  } catch (err) {
    // Nunca repassa o erro do Prisma pro cliente (pode vazar detalhe
    // interno de banco) -- só loga no servidor e devolve algo genérico.
    console.error("[api/messages] falha ao gravar mensagem:", err);
    throw createError({
      statusCode: 500,
      statusMessage: "Não foi possível enviar sua mensagem agora. Tente novamente em instantes.",
    });
  }

  recentSubmissions.set(ip, Date.now());
  cleanupRateLimit();

  return { success: true };
});
