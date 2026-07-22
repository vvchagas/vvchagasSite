import { createError, getQuery } from "h3";
import type { ContactMessage } from "~/shared/messages";
import { isMessageTopic } from "~/shared/messages";

function positiveInteger(value: unknown, fallback: number, maximum: number) {
  if (typeof value !== "string") return fallback;
  const parsed = Number.parseInt(value, 10);
  return Number.isInteger(parsed) && parsed > 0 ? Math.min(parsed, maximum) : fallback;
}

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  if (typeof query.topic !== "undefined" && !isMessageTopic(query.topic)) {
    throw createError({ statusCode: 400, statusMessage: "Assunto inválido." });
  }

  const limit = positiveInteger(query.limit, 50, 100);
  const offset = positiveInteger(query.offset, 1, Number.MAX_SAFE_INTEGER) - 1;
  const storage = useStorage("data");
  const existing = (await storage.getItem<ContactMessage[]>("messages")) ?? [];
  const normalized = existing.map((item) => ({ ...item, readAt: item.readAt ?? null }));
  const filtered = typeof query.topic === "undefined" ? normalized : normalized.filter((item) => item.topic === query.topic);

  return { items: filtered.slice(offset, offset + limit), meta: { total: filtered.length, limit, offset } };
});
