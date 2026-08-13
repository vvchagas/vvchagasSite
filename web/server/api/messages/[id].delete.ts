import { createError, getRouterParam } from "h3";
import { Prisma } from "../../../generated/prisma/client";
import { prisma } from "../../utils/prisma";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  if (!id) throw createError({ statusCode: 400, statusMessage: "Mensagem inválida." });

  try {
    await prisma.contactMessage.delete({ where: { id } });
    return { ok: true, deletedId: id };
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2025") {
      throw createError({ statusCode: 404, statusMessage: "Mensagem não encontrada." });
    }
    throw err;
  }
});
