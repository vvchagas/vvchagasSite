import { createError, getRequestIP, readBody } from "h3";
import { isMessageTopic } from "@@/shared/messages";
import { prisma } from "../../utils/prisma";

interface IncomingMessageBody {
  name?: unknown;
  contact?: unknown;
  topic?: unknown;
  source?: unknown;
  message?: unknown;
}

const MAX_LENGTH = {
  name: 100,
  contact: 160,
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

  const body = await readBody<IncomingMessageBody>(event);
  const name = toText(body?.name, "name");
  const contact = toText(body?.contact, "contact");
  const source = toText(body?.source, "source");
  const message = toText(body?.message, "message");

  if (!name || !contact || !source || !message || !isMessageTopic(body?.topic)) {
    throw createError({
      statusCode: 400,
      statusMessage: "Faltam informações ou acima do limite permitido.",
    });
  }

  const created = await prisma.contactMessage.create({
    data: { name, contact, topic: body.topic, source, message },
  });

  recentSubmissions.set(ip, Date.now());
  cleanupRateLimit();

  return {
    ok: true,
    item: {
      ...created,
      createdAt: created.createdAt.toISOString(),
      readAt: created.readAt ? created.readAt.toISOString() : null,
    },
  };
});
