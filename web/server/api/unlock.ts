export default defineEventHandler(async (event) => {
  const magicKey = process.env.MAGIC_KEY;

  if (!magicKey) {
    throw createError({ statusCode: 404, statusMessage: "Página não encontrada" });
  }

  const { key } = getQuery(event);

  if (!key || key !== magicKey) {
    throw createError({ statusCode: 404, statusMessage: "Página não encontrada" });
  }

  // Cookie válido por 5 minutos (300 segundos)
  setCookie(event, "admin_unlocked", "true", {
    maxAge: 60 * 5, // 5 minutos
    httpOnly: false,
    path: "/",
    sameSite: "strict",
  });

  return sendRedirect(event, "/messages");
});
