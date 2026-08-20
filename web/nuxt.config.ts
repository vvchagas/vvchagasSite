import tailwindcss from '@tailwindcss/vite'
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  css: ['@/assets/css/main.css'],

  // Força o Nuxt a usar a estrutura padrão na raiz em vez da pasta /app
  future: {
    compatibilityVersion: 4
  },

  // Mantém os caminhos explícitos na raiz do projeto
  srcDir: '.',

  app: {
    head: {
      title: 'vvchagas',
    }
  },

  modules: [
    '@nuxt/a11y',
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxt/fonts',
  ],

  vite: {
    optimizeDeps: {
      include: [
        '@vue/devtools-core',
        '@vue/devtools-kit',
        'gsap',
        'gsap/ScrollSmoother',
        'gsap/ScrollTrigger',
        'lenis'
      ]
    },
    esbuild: {
      tsconfigRaw: {}
    },
    plugins: [
      tailwindcss()
    ]
  },

  // Node.js serverless na Vercel — não usar 'vercel-edge' aqui, porque o
  // driver do Postgres (pg) precisa de socket TCP, que o Edge não suporta.
  nitro: {
    preset: 'vercel',
    externals: {
      inline: ['@prisma/client-runtime-utils', '@prisma/adapter-pg', 'postgres-array', 'pg'],
    },
  },

  typescript: {
    strict: true,
    typeCheck: false
  },

  fonts: {
    families: []
  }
})