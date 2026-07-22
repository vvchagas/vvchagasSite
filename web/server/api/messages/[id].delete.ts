import { createError, getRouterParam } from "h3";
import type { ContactMessage } from "~/shared/messages";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  if (!id) throw createError({ statusCode: 400, statusMessage: "Mensagem inválida." });

  const storage = useStorage("data");
  const messages = (await storage.getItem<ContactMessage[]>("messages")) ?? [];
  const remaining = messages.filter((message) => message.id !== id);
  if (remaining.length === messages.length) throw createError({ statusCode: 404, statusMessage: "Mensagem não encontrada." });

  await storage.setItem("messages", remaining);
  return { ok: true, deletedId: id };
});
