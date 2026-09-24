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


  modules: [
    '@nuxt/a11y',
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxt/fonts',
    '@vercel/speed-insights/nuxt',
    '@nuxtjs/robots',
    '@nuxtjs/sitemap',
  ],

  vite: {
    optimizeDeps: {
      include: [
        '@vue/devtools-core',
        '@vue/devtools-kit',
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
  },

  // Vercel Analytics — injeção do script via head
  app: {
    head: {
      title: 'vvchagas',
      titleTemplate: '%s | vvchagas',
      htmlAttrs: { lang: 'pt-BR' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#2563eb' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ],
      script: [
        { src: '/_vercel/insights/script.js', defer: true },
      ],
    }
  },
  runtimeConfig: {
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || '',
    },
  },
  site: {
    url: process.env.NUXT_PUBLIC_SITE_URL || 'https://vvchagas.dev',
    name: 'vvchagas',
  },
  sitemap: {
    exclude: ['/messages'],
    defaults: { changefreq: 'monthly', priority: 0.7 },
  },
  robots: {
    groups: [
      { userAgent: '*', allow: '/', disallow: ['/messages'] },
      ],
      sitemap: `${process.env.NUXT_PUBLIC_SITE_URL || 'https://vvchagas.dev'}/sitemap.xml`,
    },
    routeRules: {
      '/messages': { robots: false },
  },
})
