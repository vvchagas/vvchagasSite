<template>
  <div class="site-page min-h-screen bg-background text-foreground overflow-x-hidden">
    <NuxtRouteAnnouncer />

    <a
      href="#conteudo"
      class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-blue-600 focus:px-3 focus:py-2 focus:text-white"
    >
      {{ t('common.skipToContent') }}
    </a>

    <SiteHeader />

    <main id="conteudo" class="mx-auto mt-10 w-full max-w-6xl px-4 md:px-6">
      <section ref="heroSection" class="mx-auto w-full max-w-5xl py-8 sm:py-16">
        <div class="mb-8 max-w-4xl space-y-4">
          <p
            class="text-xs font-semibold uppercase tracking-[0.3em] text-blue-600 dark:text-blue-400 sm:text-sm"
          >
            {{ t('about.sectionLabel') }}
          </p>
          <h1 class="text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
            {{ t('about.heading') }}
          </h1>
          <p class="text-base leading-7 text-muted sm:text-lg sm:leading-8">
            {{ t('about.description') }}
          </p>
        </div>

        <div ref="heroQuote" class="rounded-3xl border border-blue-300/50 bg-blue-500/10 p-5 text-center shadow-sm dark:border-blue-500/30 dark:bg-blue-500/15">
          <p class="text-base font-bold sm:text-lg">
            {{ t('about.quote') }}
          </p>
        </div>

        <div class="mt-6 grid gap-6 md:grid-cols-2">
          <article ref="artigoWeb" class="rounded-3xl border border-border/60 bg-card/60 p-6 shadow-sm backdrop-blur">
            <h2 class="text-lg font-extrabold">{{ t('about.webTitle') }}</h2>
            <p class="mt-3 text-sm text-muted leading-6">
              {{ t('about.webDesc') }}
            </p>
            <ul class="mt-5 space-y-2 text-sm text-muted">
              <li class="flex gap-2"><span aria-hidden="true" class="material-symbols-outlined text-base text-emerald-500 shrink-0">check</span> <span>{{ t('about.webItem1') }}</span></li>
              <li class="flex gap-2"><span aria-hidden="true" class="material-symbols-outlined text-base text-emerald-500 shrink-0">check</span> <span>{{ t('about.webItem2') }}</span></li>
              <li class="flex gap-2"><span aria-hidden="true" class="material-symbols-outlined text-base text-emerald-500 shrink-0">check</span> <span>{{ t('about.webItem3') }}</span></li>
            </ul>
          </article>

          <article ref="artigoTI" class="rounded-3xl border border-border/60 bg-card/60 p-6 shadow-sm backdrop-blur">
            <h2 class="text-lg font-extrabold">{{ t('about.itTitle') }}</h2>
            <p class="mt-3 text-sm text-muted leading-6">
              {{ t('about.itDesc') }}
            </p>
            <div class="mt-5 space-y-3">
              <div class="rounded-2xl bg-muted/60 p-4">
                <h3 class="font-bold text-sm sm:text-base">{{ t('about.itCard1Title') }}</h3>
                <p class="mt-1 text-sm text-muted">{{ t('about.itCard1Desc') }}</p>
              </div>
              <div class="rounded-2xl bg-muted/60 p-4">
                <h3 class="font-bold text-sm sm:text-base">{{ t('about.itCard2Title') }}</h3>
                <p class="mt-1 text-sm text-muted">{{ t('about.itCard2Desc') }}</p>
              </div>
              <div class="rounded-2xl bg-muted/60 p-4">
                <h3 class="font-bold text-sm sm:text-base">{{ t('about.itCard3Title') }}</h3>
                <p class="mt-1 text-sm text-muted">{{ t('about.itCard3Desc') }}</p>
              </div>
            </div>
          </article>
        </div>

        <div ref="artigoNotebook" class="mt-6 mb-10 rounded-3xl border border-border/60 bg-card/60 p-6 shadow-sm backdrop-blur">
          <h2 class="text-lg font-extrabold">{{ t('about.notebookTitle') }}</h2>
          <p class="mt-3 text-sm text-muted leading-6">
            {{ t('about.notebookDesc') }}
          </p>
          <ul class="mt-5 grid gap-3 text-sm text-muted md:grid-cols-3">
            <li class="rounded-2xl bg-muted/60 p-4">
              <p class="font-bold text-foreground">{{ t('about.notebookItem1Title') }}</p>
              <p class="mt-1">{{ t('about.notebookItem1Desc') }}</p>
            </li>
            <li class="rounded-2xl bg-muted/60 p-4">
              <p class="font-bold text-foreground">{{ t('about.notebookItem2Title') }}</p>
              <p class="mt-1">{{ t('about.notebookItem2Desc') }}</p>
            </li>
            <li class="rounded-2xl bg-muted/60 p-4">
              <p class="font-bold text-foreground">{{ t('about.notebookItem3Title') }}</p>
              <p class="mt-1">{{ t('about.notebookItem3Desc') }}</p>
            </li>
          </ul>
        </div>

        <section ref="techSection" class="mt-14 rounded-[2rem] border border-border/60 bg-card/60 p-5 shadow-sm backdrop-blur sm:p-6 md:p-8">
          <p class="text-xs font-semibold uppercase tracking-[0.3em] text-blue-600 dark:text-blue-400">{{ t('about.techLabel') }}</p>
          <h2 class="mt-3 text-2xl font-black tracking-tight md:text-3xl">{{ t('about.techHeading') }}</h2>
          <div class="mt-7">
            <TechMarquee />
          </div>
        </section>

        <section ref="processSection" class="mt-14 rounded-[2rem] border border-border/60 bg-card/60 p-5 shadow-sm backdrop-blur sm:p-6 md:p-8">
          <p class="text-xs font-semibold uppercase tracking-[0.3em] text-blue-600 dark:text-blue-400">{{ t('about.processLabel') }}</p>
          <h2 class="mt-3 text-2xl font-black tracking-tight md:text-3xl">{{ t('about.processHeading') }}</h2>
          <div class="mt-7 grid gap-4 md:grid-cols-3">
            <div ref="process1" class="rounded-2xl bg-muted/60 p-5"><span class="text-sm font-black text-blue-600 dark:text-blue-400">{{ t('about.process01Label') }}</span><p class="mt-3 text-sm leading-6 text-muted">{{ t('about.process01Desc') }}</p></div>
            <div ref="process2" class="rounded-2xl bg-muted/60 p-5"><span class="text-sm font-black text-blue-600 dark:text-blue-400">{{ t('about.process02Label') }}</span><p class="mt-3 text-sm leading-6 text-muted">{{ t('about.process02Desc') }}</p></div>
            <div ref="process3" class="rounded-2xl bg-muted/60 p-5"><span class="text-sm font-black text-blue-600 dark:text-blue-400">{{ t('about.process03Label') }}</span><p class="mt-3 text-sm leading-6 text-muted">{{ t('about.process03Desc') }}</p></div>
          </div>
          <div class="mt-7 flex items-center justify-center rounded-full border border-blue-500/40 px-5 py-3 text-sm font-extrabold text-blue-700 transition hover:-translate-y-1 hover:bg-blue-500/10 dark:text-blue-300 text-center">{{ t('about.processCallout') }}</div>
        </section>

        <ProjectShowcase
          layout="centered"
          :slugs="['sige-sistema-de-emergencias', 'data-secreta', 'nuvemshop-erp']"
        />

        <div ref="ctaFinal" class="mt-8 rounded-[2rem] border border-border/60 bg-card/60 p-6 shadow-sm backdrop-blur">
          <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 class="text-xl font-extrabold">{{ t('about.ctaHeading') }}</h2>
              <p class="mt-2 text-sm text-muted">{{ t('about.ctaDesc') }}</p>
            </div>
            <NuxtLink
              to="/contato"
              class="inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-3 text-sm font-extrabold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 shrink-0"
            >
              {{ t('about.ctaBtn') }}
            </NuxtLink>
          </div>
        </div>
      </section>
    </main>

    <SiteFooter />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import SiteHeader from "../components/SiteHeader.vue";
import SiteFooter from "../components/SiteFooter.vue";
import { useScrollReveal } from "~/composables/useScrollReveal";

const { t } = useLocale();

useHead({
  title: "vvchagas - Sobre",
  link: [
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,300,0,0",
    },
  ],
});

// Hero
const heroSection = ref<HTMLElement | null>(null);
const heroQuote = ref<HTMLElement | null>(null);
useScrollReveal(heroSection);
useScrollReveal(heroQuote, { delay: 0.1 });

// Artigos
const artigoWeb = ref<HTMLElement | null>(null);
const artigoTI = ref<HTMLElement | null>(null);
const artigoNotebook = ref<HTMLElement | null>(null);
useScrollReveal(artigoWeb, { delay: 0.0 });
useScrollReveal(artigoTI, { delay: 0.15 });
useScrollReveal(artigoNotebook, { delay: 0.1 });

// Tech section
const techSection = ref<HTMLElement | null>(null);
useScrollReveal(techSection);

// Processo
const processSection = ref<HTMLElement | null>(null);
const process1 = ref<HTMLElement | null>(null);
const process2 = ref<HTMLElement | null>(null);
const process3 = ref<HTMLElement | null>(null);
useScrollReveal(processSection);
useScrollReveal(process1, { delay: 0.0 });
useScrollReveal(process2, { delay: 0.1 });
useScrollReveal(process3, { delay: 0.2 });

// CTA final
const ctaFinal = ref<HTMLElement | null>(null);
useScrollReveal(ctaFinal);
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
  --bg: 12 12 12;
  --fg: 226 232 240;
  --muted: 148 163 184;
  --card: 10 16 34;
  --border: 30 41 59;
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

.bg-muted {
  background-color: rgba(var(--muted), 0.12);
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
