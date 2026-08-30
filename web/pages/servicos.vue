<template>
  <div class="site-page min-h-screen bg-background text-foreground overflow-x-hidden">
    <NuxtRouteAnnouncer />

    <a
      href="#conteudo"
      class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-blue-900 focus:px-3 focus:py-2 focus:text-white"
    >
      {{ t('common.skipToContent') }}
    </a>

    <SiteHeader />

    <main id="conteudo" class="mt-10 mx-auto w-full max-w-6xl px-4 md:px-6">
      <section ref="heroSection" class="mx-auto flex w-full max-w-7xl flex-col gap-10 py-10 sm:py-16">
        <div class="max-w-3xl space-y-4">
          <p class="text-xs sm:text-sm font-semibold uppercase tracking-[0.3em] text-blue-800 dark:text-blue-400">
            {{ t('services.sectionLabel') }}
          </p>
          <h1 class="text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
            {{ t('services.heading') }}
          </h1>
          <p class="max-w-2xl text-base leading-7 sm:text-lg sm:leading-8 text-muted">
            {{ t('services.description') }}
          </p>
        </div>

        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <article 
            v-for="service in servicesList" 
            :key="service.id"
            class="group rounded-3xl border border-border/60 bg-card/70 p-6 sm:p-8 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-900/10 hover:border-blue-900/30 flex flex-col justify-between"
          >
            <div>
              <!-- Desenhos SVGs nos contornos pedidoss -->
              <div class="relative mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 dark:bg-blue-900/20 text-blue-900 dark:text-blue-400 shadow-inner">
                <div class="absolute inset-0 rounded-2xl bg-blue-600/20 blur-xl transition-opacity duration-300 opacity-0 group-hover:opacity-100"/>
                
                <!-- Desenho 1: </> Pulsando no hover -->
                <svg v-if="service.id === 'web'" class="relative z-10 h-8 w-8 transition-transform duration-300 group-hover:scale-110 group-hover:animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
                </svg>

                <!-- Desenho 2: Boneco com headset e monitor na frente -->
                <svg v-else-if="service.id === 'it'" class="relative z-10 h-8 w-8 transition-transform duration-300 group-hover:-translate-y-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                  <rect x="2" y="3" width="20" height="12" rx="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M8 19h8m-4-4v4" stroke-linecap="round" stroke-linejoin="round"/>
                  <circle cx="12" cy="8.5" r="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M8.5 13.5c0-1.9 1.6-3.5 3.5-3.5s3.5 1.6 3.5 3.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M10 8.5v-1a2 2 0 014 0v1" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M14 9.5l1.5-.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>

                <!-- Desenho 3: Notebook com engrenagem que gira -->
                <svg v-else-if="service.id === 'notebook'" class="relative z-10 h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                  <path d="M4 14h16v1.5a2 2 0 01-2 2H6a2 2 0 01-2-2V14z" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M6 14V6a2 2 0 012-2h8a2 2 0 012 2v8" stroke-linecap="round" stroke-linejoin="round"/>
                  <g class="origin-[12px_9px] transition-transform duration-700 ease-in-out group-hover:rotate-180">
                    <circle cx="12" cy="9" r="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M12 5.5v1m0 5v1m3.5-3.5h-1m-5 0h-1m4.47-2.47l-.7.7m-3.54 3.54l-.7.7m4.94 0l-.7-.7m-3.54-3.54l-.7-.7" stroke-linecap="round" stroke-linejoin="round"/>
                  </g>
                </svg>
              </div>

              <div class="mb-4 inline-flex text-foreground  rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold dark:bg-blue-900/30 dark:text-blue-300">
                {{ t(service.badge) }}
              </div>
              <h2 class="text-xl sm:text-2xl font-bold">{{ t(service.title) }}</h2>
              <p class="mt-4 text-sm leading-7 text-muted">
                {{ t(service.desc) }}
              </p>
              <ul class="mt-6 space-y-3 text-sm text-muted">
                <li v-for="(item, index) in service.items" :key="index" class="flex gap-3 items-start">
                  <span class="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-blue-600 dark:bg-blue-500"/>
                  <span>{{ t(item) }}</span>
                </li>
              </ul>
            </div>
            
            <NuxtLink
              to="/contato"
              class="mt-8 inline-flex items-center justify-center rounded-full bg-blue-950 px-5 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-blue-800 hover:shadow-lg dark:bg-white dark:text-blue-950 dark:hover:bg-blue-100"
            >
              {{ t(service.btn) }}
            </NuxtLink>
          </article>
        </div>

        <section ref="ctaSection" class="rounded-4xl border border-border/60 bg-card/70 p-6 shadow-sm backdrop-blur sm:p-10 relative overflow-hidden">
          <div class="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-900/5 blur-3xl pointer-events-none"/>

          <div class="grid gap-6 lg:grid-cols-[1.25fr_0.75fr] lg:items-center relative z-10">
            <div>
              <p class="text-xs sm:text-sm font-semibold uppercase tracking-[0.3em] text-blue-800 dark:text-blue-400">
                {{ t('services.ctaLabel') }}
              </p>
              <h2 class="mt-3 text-2xl font-black tracking-tight sm:text-3xl lg:text-4xl">
                {{ t('services.ctaHeading') }}
              </h2>
              <p class="mt-4 max-w-2xl text-base leading-7 text-muted">
                {{ t('services.ctaDesc') }}
              </p>
            </div>

            <div class="flex flex-col gap-3 sm:flex-row lg:justify-end">
              <NuxtLink
                to="/contato"
                class="inline-flex items-center justify-center rounded-full bg-blue-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-800 hover:shadow-lg dark:bg-white dark:text-blue-950 dark:hover:bg-blue-100"
              >
                {{ t('services.ctaBtn') }}
              </NuxtLink>
              <NuxtLink
                to="/sobre"
                class="inline-flex items-center justify-center rounded-full border border-border/70 px-6 py-3 text-sm font-semibold text-foreground/90 transition hover:border-blue-900 hover:text-blue-900 dark:hover:border-blue-400 dark:hover:text-blue-400"
              >
                {{ t('services.ctaBtnSecondary') }}
              </NuxtLink>
            </div>
          </div>
        </section>
      </section>
    </main>

    <SiteFooter />
  </div>
</template>

<script setup lang="ts">
import SiteHeader from "../components/SiteHeader.vue";
import SiteFooter from "../components/SiteFooter.vue";
import { useScrollReveal } from "~/composables/useScrollReveal";

const { t } = useLocale();

const servicesList = [
  {
    id: 'web',
    badge: 'services.webBadge',
    title: 'services.webTitle',
    desc: 'services.webDesc',
    items: ['services.webItem1', 'services.webItem2', 'services.webItem3'],
    btn: 'services.webBtn'
  },
  {
    id: 'it',
    badge: 'services.itBadge',
    title: 'services.itTitle',
    desc: 'services.itDesc',
    items: ['services.itItem1', 'services.itItem2', 'services.itItem3'],
    btn: 'services.itBtn'
  },
  {
    id: 'notebook',
    badge: 'services.notebookBadge',
    title: 'services.notebookTitle',
    desc: 'services.notebookDesc',
    items: ['services.notebookItem1', 'services.notebookItem2', 'services.notebookItem3'],
    btn: 'services.notebookBtn'
  }
];

useHead({
  link: [
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,300,0,0",
    },
  ],
});

useSeoMeta({
  title: "vvchagas - Meus Serviços",
  description: () => t("services.description"),
  ogTitle: "vvchagas - Meus Serviços",
  ogDescription: () => t("services.description"),
  ogType: "website",
  twitterCard: "summary",
});

const heroSection = ref<HTMLElement | null>(null);
const ctaSection = ref<HTMLElement | null>(null);
useScrollReveal(heroSection);
useScrollReveal(ctaSection, { delay: 0.1 });
</script>

<style scoped>
:global(html) {
  --bg: 255 255 255;
  --fg: 15 23 42;
  --muted: 71 85 105;
  --card: 255 255 255;
  --border: 226 232 240;
}
:global(html.dark) {
  --bg: 10 10 10;
  --fg: 226 232 240;
  --muted: 148 163 184;
  --card: 18 18 18;
  --border: 38 38 38;
}

.bg-background {
  background-color: rgb(var(--bg));
}
.text-foreground {
  color: rgb(var(--fg));
}
.text-muted {
  color: rgb(var(--muted));
}
.bg-card {
  background-color: rgb(var(--card));
}
.border-border {
  border-color: rgb(var(--border));
}

.material-symbols-outlined {
  font-family: "Material Symbols Outlined";
  font-weight: normal;
  font-style: normal;
  font-size: 20px;
  line-height: 1;
  letter-spacing: normal;
  text-transform: none;
  display: inline-block;
  white-space: nowrap;
  word-wrap: normal;
  direction: ltr;
  -webkit-font-smoothing: antialiased;
  vertical-align: middle;
}
</style>