import { d as defineEventHandler, a as getRouterParam, r as readBody, c as createError, b as useStorage } from '../../../_/nitro.mjs';
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

const _id__patch = defineEventHandler(async (event) => {
  var _a;
  const id = getRouterParam(event, "id");
  const body = await readBody(event);
  if (!id || typeof body.read !== "boolean") {
    throw createError({ statusCode: 400, statusMessage: "Informe o status de leitura da mensagem." });
  }
  const storage = useStorage("data");
  const messages = (_a = await storage.getItem("messages")) != null ? _a : [];
  const index = messages.findIndex((message) => message.id === id);
  if (index === -1) throw createError({ statusCode: 404, statusMessage: "Mensagem n\xE3o encontrada." });
  const target = messages[index];
  const updated = {
    ...target,
    readAt: body.read ? (/* @__PURE__ */ new Date()).toISOString() : null
  };
  messages[index] = updated;
  await storage.setItem("messages", messages);
  return { ok: true, item: updated };
});

export { _id__patch as default };
//# sourceMappingURL=_id_.patch.mjs.map
