export default defineEventHandler(async (event) => {
  const magicKey = process.env.MAGIC_KEY;

  if (!magicKey) {
    throw createError({ statusCode: 404, statusMessage: "Página não encontrada" });
  }

  const { key } = getQuery(event);

  if (!key || key !== magicKey) {
    throw createError({ statusCode: 404, statusMessage: "Página não encontrada" });
  }

  // Cookie válido por 2 horas (7200 segundos)
  setCookie(event, "admin_unlocked", "true", {
    maxAge: 60 * 10 * 2,
    httpOnly: false,
    path: "/",
    sameSite: "strict",
  });

  return sendRedirect(event, "/messages");
});
