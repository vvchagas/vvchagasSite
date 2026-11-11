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
    '@vueuse/motion/nuxt',
    '@nuxt/fonts',
    '@vercel/analytics/nuxt',
    '@vercel/speed-insights/nuxt',
    '@nuxtjs/robots',
    '@nuxtjs/sitemap',
  ],

  vite: {
    optimizeDeps: {
      include: [
        '@vercel/analytics',
        '@vercel/speed-insights',
        '@vue/devtools-core',
        '@vue/devtools-kit',
        'lenis',
      ]
    },
    esbuild: {
      tsconfigRaw: {}
    }
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

  app: {
    head: {
      title: 'vvchagas',
      titleTemplate: '%s | vvchagas',
      htmlAttrs: { lang: 'pt-BR' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#7c3aed' }, // Atualizado para o roxo/violeta do tema
        { name: 'google-site-verification', content: 'dQrC6TN67zkl673M77KrHv7qCwDkT7Y0P7rkvG74NiQ' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'preload', as: 'font', type: 'font/woff2', href: '/fonts/material-symbols.woff2', crossorigin: '' },
      ],
      script: [
        { src: '/_vercel/insights/script.js', defer: true },
      ],
    }
  },

  runtimeConfig: {
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://vvchagas.vercel.app',
    },
  },

  // Configuração global da entidade do site
  site: {
    url: process.env.NUXT_PUBLIC_SITE_URL || 'https://vvchagas.vercel.app',
    name: 'vvchagas',
  },

  // Módulo de Sitemap otimizado sem XSLT e apontado para a Vercel
  sitemap: {
    xsl: false, // Desativa o stylesheet XSLT visual para evitar alertas de deprecante no navegador
    exclude: ['/messages'],
    defaults: { changefreq: 'monthly', priority: 0.7 },
  },

  robots: {
    groups: [
      { userAgent: '*', allow: '/', disallow: ['/messages'] },
    ],
    sitemap: `${process.env.NUXT_PUBLIC_SITE_URL || 'https://vvchagas.vercel.app'}/sitemap.xml`,
  },

  routeRules: {
    '/messages': { robots: false },
  },
})