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
    'nuxt-security',
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
      script: [
        { src: '/_vercel/insights/script.js', defer: true },
      ],
    }
  },

  // nuxt-security — headers de segurança (OWASP)
  security: {
    headers: {
      contentSecurityPolicy: {
        'default-src': ["'self'"],
        'script-src': [
          "'self'",
          "'unsafe-inline'",
          "'unsafe-eval'",
          "https://va.vercel-scripts.com"
        ],
        'style-src': [
          "'self'",
          "'unsafe-inline'",
          "https://fonts.googleapis.com",
          "https://cdnjs.cloudflare.com"
        ],
        'font-src': [
          "'self'",
          "data:",
          "https://fonts.gstatic.com",
          "https://fonts.googleapis.com",
          "https://cdnjs.cloudflare.com"
        ],
        'img-src': [
          "'self'",
          "data:",
          "https:"
        ],
        'connect-src': [
          "'self'",
          "https://*.vercel.app",
          "https://*.vercel-insights.com",
          "https://fonts.googleapis.com",
          "https://fonts.gstatic.com"
        ]
      },
      crossOriginEmbedderPolicy: 'unsafe-none'
    },
    rateLimiter: {
      tokensPerInterval: 150,
      interval: 'hour'
    }
  }
})