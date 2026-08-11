<template>
  <div class="min-h-screen bg-background text-foreground overflow-x-hidden">
    <NuxtRouteAnnouncer />

    <a
      href="#conteudo"
      class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-blue-600 focus:px-3 focus:py-2 focus:text-white"
    >
      {{ t('common.skipToContent') }}
    </a>

    <SiteHeader />

    <main id="conteudo" class=" mt-10 mx-auto w-full max-w-6xl px-4 md:px-6">
      <section ref="heroSection" class="mx-auto flex w-full max-w-7xl flex-col gap-10 py-10 sm:py-16">
        <div class="max-w-3xl space-y-4">
          <p class="text-xs sm:text-sm font-semibold uppercase tracking-[0.3em] text-cyan-700 dark:text-cyan-400">
            {{ t('services.sectionLabel') }}
          </p>
          <h1 class="text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
            {{ t('services.heading') }}
          </h1>
          <p class="max-w-2xl text-base leading-7 sm:text-lg sm:leading-8 text-muted">
            {{ t('services.description') }}
          </p>
        </div>

        <div class="grid gap-6 lg:grid-cols-3">
          <article class="rounded-3xl border border-border/60 bg-card/70 p-6 sm:p-8 shadow-sm backdrop-blur transition hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between">
            <div>
              <div class="mb-6 inline-flex rounded-2xl bg-cyan-100 px-4 py-2 text-xs sm:text-sm font-semibold text-cyan-800 dark:bg-cyan-950 dark:text-cyan-300">
                {{ t('services.webBadge') }}
              </div>
              <h2 class="text-xl sm:text-2xl font-bold">{{ t('services.webTitle') }}</h2>
              <p class="mt-4 text-sm leading-7 text-muted">
                {{ t('services.webDesc') }}
              </p>
              <ul class="mt-6 space-y-3 text-sm text-muted">
                <li class="flex gap-3"><span class="mt-2 h-2 w-2 shrink-0 rounded-full bg-cyan-500"/><span>{{ t('services.webItem1') }}</span></li>
                <li class="flex gap-3"><span class="mt-2 h-2 w-2 shrink-0 rounded-full bg-cyan-500"/><span>{{ t('services.webItem2') }}</span></li>
                <li class="flex gap-3"><span class="mt-2 h-2 w-2 shrink-0 rounded-full bg-cyan-500"/><span>{{ t('services.webItem3') }}</span></li>
              </ul>
            </div>
            <NuxtLink
              to="/contato"
              class="mt-8 inline-flex items-center justify-center rounded-full bg-zinc-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-cyan-600 dark:bg-white dark:text-zinc-950 dark:hover:bg-cyan-300"
            >
              {{ t('services.webBtn') }}
            </NuxtLink>
          </article>

          <article class="rounded-3xl border border-border/60 bg-card/70 p-6 sm:p-8 shadow-sm backdrop-blur transition hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between">
            <div>
              <div class="mb-6 inline-flex rounded-2xl bg-emerald-100 px-4 py-2 text-xs sm:text-sm font-semibold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                {{ t('services.itBadge') }}
              </div>
              <h2 class="text-xl sm:text-2xl font-bold">{{ t('services.itTitle') }}</h2>
              <p class="mt-4 text-sm leading-7 text-muted">
                {{ t('services.itDesc') }}
              </p>
              <ul class="mt-6 space-y-3 text-sm text-muted">
                <li class="flex gap-3"><span class="mt-2 h-2 w-2 shrink-0 rounded-full bg-emerald-500"/><span>{{ t('services.itItem1') }}</span></li>
                <li class="flex gap-3"><span class="mt-2 h-2 w-2 shrink-0 rounded-full bg-emerald-500"/><span>{{ t('services.itItem2') }}</span></li>
                <li class="flex gap-3"><span class="mt-2 h-2 w-2 shrink-0 rounded-full bg-emerald-500"/><span>{{ t('services.itItem3') }}</span></li>
              </ul>
            </div>
            <NuxtLink
              to="/contato"
              class="mt-8 inline-flex items-center justify-center rounded-full bg-zinc-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-600 dark:bg-white dark:text-zinc-950 dark:hover:bg-emerald-300"
            >
              {{ t('services.itBtn') }}
            </NuxtLink>
          </article>

          <article class="rounded-3xl border border-border/60 bg-card/70 p-6 sm:p-8 shadow-sm backdrop-blur transition hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between">
            <div>
              <div class="mb-6 inline-flex rounded-2xl bg-amber-100 px-4 py-2 text-xs sm:text-sm font-semibold text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                {{ t('services.notebookBadge') }}
              </div>
              <h2 class="text-xl sm:text-2xl font-bold">{{ t('services.notebookTitle') }}</h2>
              <p class="mt-4 text-sm leading-7 text-muted">
                {{ t('services.notebookDesc') }}
              </p>
              <ul class="mt-6 space-y-3 text-sm text-muted">
                <li class="flex gap-3"><span class="mt-2 h-2 w-2 shrink-0 rounded-full bg-amber-500"/><span>{{ t('services.notebookItem1') }}</span></li>
                <li class="flex gap-3"><span class="mt-2 h-2 w-2 shrink-0 rounded-full bg-amber-500"/><span>{{ t('services.notebookItem2') }}</span></li>
                <li class="flex gap-3"><span class="mt-2 h-2 w-2 shrink-0 rounded-full bg-amber-500"/><span>{{ t('services.notebookItem3') }}</span></li>
              </ul>
            </div>
            <NuxtLink
              to="/contato"
              class="mt-8 inline-flex items-center justify-center rounded-full bg-zinc-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-amber-600 dark:bg-white dark:text-zinc-950 dark:hover:bg-amber-300"
            >
              {{ t('services.notebookBtn') }}
            </NuxtLink>
          </article>
        </div>

        <section ref="ctaSection" class="rounded-[2rem] border border-border/60 bg-card/70 p-6 shadow-sm backdrop-blur sm:p-10">
          <div class="grid gap-6 lg:grid-cols-[1.25fr_0.75fr] lg:items-center">
            <div>
              <p class="text-xs sm:text-sm font-semibold uppercase tracking-[0.3em] text-muted">
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
                class="inline-flex items-center justify-center rounded-full bg-zinc-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-cyan-600 dark:bg-white dark:text-zinc-950 dark:hover:bg-cyan-300"
              >
                {{ t('services.ctaBtn') }}
              </NuxtLink>
              <NuxtLink
                to="/about"
                class="inline-flex items-center justify-center rounded-full border border-border/70 px-6 py-3 text-sm font-semibold text-foreground/90 transition hover:border-blue-500/60 hover:text-foreground"
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

useHead({
  title: "vvchagas - Meus Serviços",
  link: [
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,300,0,0",
    },
  ],
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

.bg-header,
.bg-footer {
  background: rgba(var(--bg), 0.75);
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

.nav-link {
  position: relative;
  font-weight: 600;
  font-size: 0.9rem;
  color: rgba(var(--fg), 0.75);
  transition: color 0.2s ease;
}
.nav-link::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -4px;
  height: 2px;
  width: 0%;
  border-radius: 999px;
  background: linear-gradient(90deg, #3b82f6, #a855f7);
  transition: width 0.25s ease;
}
.nav-link:hover {
  color: rgb(var(--fg));
}
.nav-link:hover::after {
  width: 100%;
}

article.rounded-3xl {
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}
article.rounded-3xl:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 40px rgba(59, 130, 246, 0.15);
}
</style>