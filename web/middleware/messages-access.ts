export default defineNuxtRouteMiddleware((to) => {
  if (to.path === "/messages" && !import.meta.dev) {
    throw createError({ statusCode: 404, statusMessage: "Página não encontrada" });
  }
});