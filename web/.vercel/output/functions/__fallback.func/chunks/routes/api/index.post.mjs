import { d as defineEventHandler, f as getRequestIP, c as createError, r as readBody, b as useStorage } from '../../_/nitro.mjs';
import { i as isMessageTopic } from '../../_/messages.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:path';
import 'node:url';
import 'node:crypto';
import '@prisma/client-runtime-utils';
import 'node:fs';
import 'node:async_hooks';
import 'node:os';
import '@prisma/adapter-pg';
import 'pg';
import '@iconify/utils';
import 'consola';

const MAX_LENGTH = {
  name: 100,
  contact: 160,
  source: 80,
  message: 3e3
};
const recentSubmissions = /* @__PURE__ */ new Map();
const RATE_LIMIT_MS = 15e3;
function toText(value, field) {
  if (typeof value !== "string") return null;
  const text = value.trim().replace(/\s+/g, " ");
  return text.length > 0 && text.length <= MAX_LENGTH[field] ? text : null;
}
function createId() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}
function cleanupRateLimit() {
  const now = Date.now();
  for (const [ip, timestamp] of recentSubmissions.entries()) {
    if (now - timestamp > RATE_LIMIT_MS) {
      recentSubmissions.delete(ip);
    }
  }
}
const index_post = defineEventHandler(async (event) => {
  var _a, _b, _c;
  const ip = (_a = getRequestIP(event, { xForwardedFor: true })) != null ? _a : "unknown";
  const lastSubmission = (_b = recentSubmissions.get(ip)) != null ? _b : 0;
  if (Date.now() - lastSubmission < RATE_LIMIT_MS) {
    throw createError({
      statusCode: 429,
      statusMessage: "Aguarde alguns segundos antes de enviar outra mensagem."
    });
  }
  const body = await readBody(event);
  const name = toText(body == null ? void 0 : body.name, "name");
  const contact = toText(body == null ? void 0 : body.contact, "contact");
  const source = toText(body == null ? void 0 : body.source, "source");
  const message = toText(body == null ? void 0 : body.message, "message");
  if (!name || !contact || !source || !message || !isMessageTopic(body == null ? void 0 : body.topic)) {
    throw createError({
      statusCode: 400,
      statusMessage: "Faltam informa\xE7\xF5es ou acima do limite permitido."
    });
  }
  const storage = useStorage("data");
  const existing = (_c = await storage.getItem("messages")) != null ? _c : [];
  const newMessage = {
    id: createId(),
    name,
    contact,
    topic: body.topic,
    source,
    message,
    createdAt: (/* @__PURE__ */ new Date()).toISOString(),
    readAt: null
  };
  await storage.setItem("messages", [newMessage, ...existing]);
  recentSubmissions.set(ip, Date.now());
  cleanupRateLimit();
  return { ok: true, item: newMessage };
});

export { index_post as default };
//# sourceMappingURL=index.post.mjs.map
