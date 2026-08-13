import { createError, getRouterParam, readBody } from "h3";
import { Prisma } from "../../../generated/prisma/client";
import { prisma } from "../../utils/prisma";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  const body = await readBody<{ read?: unknown }>(event);
  if (!id || typeof body.read !== "boolean") {
    throw createError({ statusCode: 400, statusMessage: "Informe o status de leitura da mensagem." });
  }

  try {
    const updated = await prisma.contactMessage.update({
      where: { id },
      data: { readAt: body.read ? new Date() : null },
    });

    return {
      ok: true,
      item: {
        ...updated,
        createdAt: updated.createdAt.toISOString(),
        readAt: updated.readAt ? updated.readAt.toISOString() : null,
      },
    };
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2025") {
      throw createError({ statusCode: 404, statusMessage: "Mensagem não encontrada." });
    }
    throw err;
  }
});
