import { inject } from '@vercel/analytics'

export default defineNuxtPlugin(() => {
  // Inicializa o Vercel Analytics apenas no client-side
  inject()
})
