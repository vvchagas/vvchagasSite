<template>
  <div class="site-page min-h-screen bg-background text-foreground overflow-x-hidden">
    <NuxtRouteAnnouncer />

    <a
      href="#conteudo"
      class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-gray-900 focus:px-3 focus:py-2 focus:text-white"
    >
      {{ t('common.skipToContent') }}
    </a>

    <SiteHeader />

    <main id="conteudo" class="mt-22 mx-auto w-full max-w-6xl px-4 md:px-6">
      <section ref="heroSection" class="corner-frame relative isolate mx-auto flex w-full max-w-7xl flex-col gap-10 overflow-hidden border border-border/70 bg-card/80 py-10 sm:py-16">
        <div class="relative z-10 px-5 sm:px-10">
        <div class="max-w-3xl space-y-4">
          <p class="text-xs sm:text-sm font-semibold uppercase tracking-[0.3em] text-foreground">
            {{ t('services.sectionLabel') }}
          </p>
          <h1 class="text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
            {{ t('services.heading') }}
          </h1>
          <p class="max-w-2xl text-base leading-7 sm:text-lg sm:leading-8 text-muted">
            {{ t('services.description') }}
          </p>
        </div>

        <div class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <article 
            v-for="service in servicesList" 
            :key="service.id"
            class="tech-frame group rounded-md border border-border/60 bg-card/70 p-6 sm:p-8 shadow-sm flex flex-col justify-between"
          >
            <div>
              <!-- Desenhos SVGs nos contornos pedidoss -->
              <div class="relative mb-6 inline-flex h-16 w-16 items-center justify-center rounded-md bg-background text-foreground shadow-inner">
                <div class="absolute inset-0 rounded-md bg-blue-600/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity"/>
                
                <!-- Desenho 1: </> Pulsando no hover -->
                <svg v-if="service.id === 'web'" class="relative z-10 h-8 w-8 text-blue-500 transition-transform group-hover:scale-110 group-hover:animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
                </svg>

                <!-- Desenho 2: Boneco com headset e monitor na frente -->
                <svg v-else-if="service.id === 'it'" class="relative z-10 h-8 w-8 text-indigo-500 transition-transform group-hover:-translate-y-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                  <rect x="2" y="3" width="20" height="12" rx="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M8 19h8m-4-4v4" stroke-linecap="round" stroke-linejoin="round"/>
                  <circle cx="12" cy="8.5" r="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M8.5 13.5c0-1.9 1.6-3.5 3.5-3.5s3.5 1.6 3.5 3.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M10 8.5v-1a2 2 0 014 0v1" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M14 9.5l1.5-.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>

                <!-- Desenho 3: Notebook com engrenagem que gira -->
                <svg v-else-if="service.id === 'notebook'" class="relative z-10 h-8 w-8 text-cyan-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                  <path d="M4 14h16v1.5a2 2 0 01-2 2H6a2 2 0 01-2-2V14z" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M6 14V6a2 2 0 012-2h8a2 2 0 012 2v8" stroke-linecap="round" stroke-linejoin="round"/>
                  <g class="origin-[12px_9px] transition-transform duration-500 group-hover:rotate-180">
                    <circle cx="12" cy="9" r="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M12 5.5v1m0 5v1m3.5-3.5h-1m-5 0h-1m4.47-2.47l-.7.7m-3.54 3.54l-.7.7m4.94 0l-.7-.7m-3.54-3.54l-.7-.7" stroke-linecap="round" stroke-linejoin="round"/>
                  </g>
                </svg>
              </div>

              <div class="mb-4 inline-flex text-foreground rounded-sm bg-background px-3 py-1 text-xs font-semibold dark:bg-blue-900/30 dark:text-blue-300">
                {{ t(service.badge) }}
              </div>
              <h2 class="text-xl sm:text-2xl font-bold">{{ t(service.title) }}</h2>
              <p class="mt-4 text-sm leading-7 text-muted">
                {{ t(service.desc) }}
              </p>
              <ul class="mt-6 space-y-3 text-sm text-muted">
                <li v-for="(item, index) in service.items" :key="index" class="flex gap-3 items-start">
                  <span class="mt-1.5 h-2 w-2 shrink-0 rounded-sm bg-blue-600 dark:bg-blue-500"/>
                  <span>{{ t(item) }}</span>
                </li>
              </ul>
            </div>
            
            <a
              :href="waLink(t('contact.whatsappPrefillTopic') + t(service.title))"
              target="_blank"
              rel="noopener noreferrer"
              class="cta-primary mt-8 w-full"
            >
              {{ t(service.btn) }}
            </a>
          </article>
        </div>

        <section ref="ctaSection" class="tech-frame mt-6 rounded-md border border-border/60 bg-card/70 p-6 shadow-sm sm:p-10 relative overflow-hidden transition">
          <div class="absolute -right-20 -top-20 h-64 w-64 rounded-sm blur-3xl pointer-events-none"/>

          <div class="grid gap-6 lg:grid-cols-[1.25fr_0.75fr] lg:items-center relative z-10">
            <div>
              <p class="text-xs sm:text-sm font-semibold uppercase tracking-[0.3em] text-foreground">
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
              <a
                :href="waLink(t('contact.whatsappPrefillTopic'))"
                target="_blank"
                rel="noopener noreferrer"
                class="cta-primary"
              >
                {{ t('services.ctaBtn') }}
              </a>
              <NuxtLink to="/sobre" class="cta-secondary">
                {{ t('services.ctaBtnSecondary') }}
              </NuxtLink>
            </div>
          </div>
        </section>
        </div>
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
    btn: 'services.webBtn',
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

useSiteSeo({ title: () => t('services.sectionLabel'), description: () => t('services.description') });

const heroSection = ref<HTMLElement | null>(null);
const ctaSection = ref<HTMLElement | null>(null);
useScrollReveal(heroSection);
useScrollReveal(ctaSection, { delay: 0.1 });
</script>
