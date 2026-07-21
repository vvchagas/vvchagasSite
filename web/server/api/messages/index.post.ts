import { createError, getRequestIP, readBody } from "h3";
import type { ContactMessage } from "~/shared/messages";
import { isMessageTopic } from "~/shared/messages";

interface IncomingMessageBody { name?: unknown; contact?: unknown; topic?: unknown; source?: unknown; message?: unknown }

const MAX_LENGTH = { name: 100, contact: 160, source: 80, message: 3_000 };
const recentSubmissions = new Map<string, number>();

function toText(value: unknown, field: keyof typeof MAX_LENGTH): string | null {
  if (typeof value !== "string") return null;
  const text = value.trim().replace(/\s+/g, " ");
  return text.length > 0 && text.length <= MAX_LENGTH[field] ? text : null;
}

function createId() {
  return typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export default defineEventHandler(async (event) => {
  const ip = getRequestIP(event, { xForwardedFor: true }) ?? "unknown";
  const lastSubmission = recentSubmissions.get(ip) ?? 0;
  if (Date.now() - lastSubmission < 15_000) {
    throw createError({ statusCode: 429, statusMessage: "Aguarde alguns segundos antes de enviar outra mensagem." });
  }

  const body = await readBody<IncomingMessageBody>(event);
  const name = toText(body.name, "name");
  const contact = toText(body.contact, "contact");
  const source = toText(body.source, "source");
  const message = toText(body.message, "message");

  if (!name || !contact || !source || !message || !isMessageTopic(body.topic)) {
    throw createError({ statusCode: 400, statusMessage: "Dados inválidos ou acima do limite permitido." });
  }

  const storage = useStorage("data");
  const existing = (await storage.getItem<ContactMessage[]>("messages")) ?? [];
  const newMessage: ContactMessage = { id: createId(), name, contact, topic: body.topic, source, message, createdAt: new Date().toISOString() };

  await storage.setItem("messages", [newMessage, ...existing]);
  recentSubmissions.set(ip, Date.now());
  return { ok: true, item: newMessage };
});
