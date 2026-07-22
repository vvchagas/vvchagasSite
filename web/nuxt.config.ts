// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/a11y', '@nuxt/eslint', '@nuxt/ui', '@nuxt/fonts'],
  css: ['~/assets/css/main.css'],
  
  app: {
    head: {
      title: 'vvchagas', 
    }
  },
  fonts: {
    families:[
      {
        name: 'Material Icons',
        provider: 'google',
        global: true,
      }
    ]
  },
  postcss: {
    plugins: {
      '@tailwindcss/postcss': {},
    },
  },
})
