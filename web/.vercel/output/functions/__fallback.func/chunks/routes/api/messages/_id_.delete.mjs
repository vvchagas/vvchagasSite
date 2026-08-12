import { d as defineEventHandler, a as getRouterParam, c as createError, b as useStorage } from '../../../_/nitro.mjs';
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

const _id__delete = defineEventHandler(async (event) => {
  var _a;
  const id = getRouterParam(event, "id");
  if (!id) throw createError({ statusCode: 400, statusMessage: "Mensagem inv\xE1lida." });
  const storage = useStorage("data");
  const messages = (_a = await storage.getItem("messages")) != null ? _a : [];
  const remaining = messages.filter((message) => message.id !== id);
  if (remaining.length === messages.length) throw createError({ statusCode: 404, statusMessage: "Mensagem n\xE3o encontrada." });
  await storage.setItem("messages", remaining);
  return { ok: true, deletedId: id };
});

export { _id__delete as default };
//# sourceMappingURL=_id_.delete.mjs.map
