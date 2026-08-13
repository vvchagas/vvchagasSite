import { createError, getQuery } from "h3";
import { isMessageTopic } from "@@/shared/messages";
import { prisma } from "../../utils/prisma";

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
  const topic = typeof query.topic === "undefined" ? undefined : query.topic;

  const where = topic ? { topic } : {};

  const [rows, total] = await Promise.all([
    prisma.contactMessage.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: offset,
      take: limit,
    }),
    prisma.contactMessage.count({ where }),
  ]);

  const items = rows.map((row) => ({
    ...row,
    createdAt: row.createdAt.toISOString(),
    readAt: row.readAt ? row.readAt.toISOString() : null,
  }));

  return { items, meta: { total, limit, offset } };
});
