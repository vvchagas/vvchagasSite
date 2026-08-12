import { d as defineEventHandler, e as getQuery, c as createError, b as useStorage } from '../../_/nitro.mjs';
import { i as isMessageTopic } from '../../_/messages.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:path';
import 'node:url';
import 'node:crypto';
import 'node:fs';
import 'node:async_hooks';
import 'node:os';
import '@prisma/adapter-pg';
import 'pg';
import '@iconify/utils';
import 'consola';

function positiveInteger(value, fallback, maximum) {
  if (typeof value !== "string") return fallback;
  const parsed = Number.parseInt(value, 10);
  return Number.isInteger(parsed) && parsed > 0 ? Math.min(parsed, maximum) : fallback;
}
const index_get = defineEventHandler(async (event) => {
  var _a;
  const query = getQuery(event);
  if (typeof query.topic !== "undefined" && !isMessageTopic(query.topic)) {
    throw createError({ statusCode: 400, statusMessage: "Assunto inv\xE1lido." });
  }
  const limit = positiveInteger(query.limit, 50, 100);
  const offset = positiveInteger(query.offset, 1, Number.MAX_SAFE_INTEGER) - 1;
  const storage = useStorage("data");
  const existing = (_a = await storage.getItem("messages")) != null ? _a : [];
  const normalized = existing.map((item) => {
    var _a2;
    return { ...item, readAt: (_a2 = item.readAt) != null ? _a2 : null };
  });
  const filtered = typeof query.topic === "undefined" ? normalized : normalized.filter((item) => item.topic === query.topic);
  return { items: filtered.slice(offset, offset + limit), meta: { total: filtered.length, limit, offset } };
});

export { index_get as default };
//# sourceMappingURL=index.get.mjs.map
