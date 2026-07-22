import { createError, getRouterParam, readBody } from "h3";
import type { ContactMessage } from "~/shared/messages";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  const body = await readBody<{ read?: unknown }>(event);
  if (!id || typeof body.read !== "boolean") {
    throw createError({ statusCode: 400, statusMessage: "Informe o status de leitura da mensagem." });
  }

  const storage = useStorage("data");
  const messages = (await storage.getItem<ContactMessage[]>("messages")) ?? [];
  const index = messages.findIndex((message) => message.id === id);
  if (index === -1) throw createError({ statusCode: 404, statusMessage: "Mensagem não encontrada." });

  const updated: ContactMessage = { ...messages[index], readAt: body.read ? new Date().toISOString() : null };
  messages[index] = updated;
  await storage.setItem("messages", messages);
  return { ok: true, item: updated };
});
