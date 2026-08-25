export default defineNuxtRouteMiddleware(() => {
  const cookie = useCookie("admin_unlocked");

  if (!cookie.value) {
    throw createError({ statusCode: 404, statusMessage: "Página não encontrada" });
  }
});
