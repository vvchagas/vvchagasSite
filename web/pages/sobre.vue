<template>
  <div class="site-page min-h-screen bg-background text-foreground overflow-x-hidden">
    <NuxtRouteAnnouncer />

    <a
      href="#conteudo"
      class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-violet-600 focus:px-3 focus:py-2 focus:text-white"
    >
      {{ t('common.skipToContent') }}
    </a>

    <SiteHeader />

    <main id="conteudo" class="mx-auto mt-22 w-full max-w-6xl px-4 md:px-6">
      <section v-motion-reveal class="corner-frame relative isolate mx-auto w-full max-w-5xl overflow-hidden border border-border/70 bg-card/80 py-8 sm:py-16">
        <div class="relative z-10 px-5 sm:px-10">
        <div class="mb-8 max-w-4xl space-y-4">
          <p
            class="text-xs font-semibold uppercase tracking-[0.3em] text-foreground sm:text-sm"
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

        <div class="tech-frame fx-card mb-6 border border-border/70 bg-card/80 p-5 shadow-sm sm:p-6">
          <p class="font-mono text-xs uppercase tracking-[0.2em] text-foreground">
            OPERATOR PROFILE / 001
          </p>
          <dl class="mt-5 grid grid-cols-1 gap-4 text-sm md:grid-cols-1 lg:grid-cols-3">
            <div>
              <dt class="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">Base</dt>
              <dd class="mt-1 min-w-0 wrap-break-word font-semibold text-foreground">Marília - SP</dd>
            </div>
            <div>
              <dt class="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">Idade</dt>
              <dd class="mt-1 min-w-0 wrap-break-word font-semibold text-foreground">19 anos</dd>
            </div>
            <div class="sm:col-span-1">
              <dt class="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">Função</dt>
              <dd class="mt-1 min-w-0 wrap-break-word font-semibold leading-relaxed text-foreground">Desenvolvedor Full Stack &amp; Suporte de TI / Manutenção de Notebooks</dd>
            </div>
          </dl>
        </div>

        <div v-motion-reveal :delay="100" class="rounded-md border border-border/70 bg-card/60 p-5 text-center shadow-sm">
          <p class="text-base font-bold sm:text-lg">
            {{ t('about.quote') }}
          </p>
        </div>

        <div class="mt-6 grid gap-6 md:grid-cols-2">
          <article v-motion-reveal class="tech-frame fx-card rounded-md border border-border/60 bg-card/60 p-6 shadow-sm">
            <h2 class="text-lg font-extrabold">{{ t('about.webTitle') }}</h2>
            <p class="mt-3 text-sm text-muted leading-6">
              {{ t('about.webDesc') }}
            </p>
            <ul class="mt-5 space-y-2 text-sm text-muted">
              <li class="group/row fx-row flex gap-2"><span aria-hidden="true" class="material-symbols-outlined shrink-0 text-base text-emerald-500 transition-transform duration-300 group-hover/row:scale-125">check</span> <span>{{ t('about.webItem1') }}</span></li>
              <li class="group/row fx-row flex gap-2"><span aria-hidden="true" class="material-symbols-outlined shrink-0 text-base text-emerald-500 transition-transform duration-300 group-hover/row:scale-125">check</span> <span>{{ t('about.webItem2') }}</span></li>
              <li class="group/row fx-row flex gap-2"><span aria-hidden="true" class="material-symbols-outlined shrink-0 text-base text-emerald-500 transition-transform duration-300 group-hover/row:scale-125">check</span> <span>{{ t('about.webItem3') }}</span></li>
            </ul>
          </article>

          <article v-motion-reveal :delay="150" class="tech-frame fx-card rounded-md border border-border/60 bg-card/60 p-6 shadow-sm">
            <h2 class="text-lg font-extrabold">{{ t('about.itTitle') }}</h2>
            <p class="mt-3 text-sm text-muted leading-6">
              {{ t('about.itDesc') }}
            </p>
            <div class="mt-5 space-y-3">
              <div class="rounded-md bg-muted/60 p-4">
                <h3 class="font-bold text-sm sm:text-base">{{ t('about.itCard1Title') }}</h3>
                <p class="mt-1 text-sm text-muted">{{ t('about.itCard1Desc') }}</p>
              </div>
              <div class="rounded-md bg-muted/60 p-4">
                <h3 class="font-bold text-sm sm:text-base">{{ t('about.itCard2Title') }}</h3>
                <p class="mt-1 text-sm text-muted">{{ t('about.itCard2Desc') }}</p>
              </div>
              <div class="rounded-md bg-muted/60 p-4">
                <h3 class="font-bold text-sm sm:text-base">{{ t('about.itCard3Title') }}</h3>
                <p class="mt-1 text-sm text-muted">{{ t('about.itCard3Desc') }}</p>
              </div>
            </div>
          </article>
        </div>

        <div v-motion-reveal :delay="100" class="tech-frame fx-card mt-6 mb-10 rounded-md border border-border/60 bg-card/60 p-6 shadow-sm">
          <h2 class="text-lg font-extrabold">{{ t('about.notebookTitle') }}</h2>
          <p class="mt-3 text-sm text-muted leading-6">
            {{ t('about.notebookDesc') }}
          </p>
          <ul class="mt-5 grid gap-3 text-sm text-muted md:grid-cols-3">
            <li class="rounded-md bg-muted/60 p-4">
              <p class="font-bold text-foreground">{{ t('about.notebookItem1Title') }}</p>
              <p class="mt-1">{{ t('about.notebookItem1Desc') }}</p>
            </li>
            <li class="rounded-md bg-muted/60 p-4">
              <p class="font-bold text-foreground">{{ t('about.notebookItem2Title') }}</p>
              <p class="mt-1">{{ t('about.notebookItem2Desc') }}</p>
            </li>
            <li class="rounded-md bg-muted/60 p-4">
              <p class="font-bold text-foreground">{{ t('about.notebookItem3Title') }}</p>
              <p class="mt-1">{{ t('about.notebookItem3Desc') }}</p>
            </li>
          </ul>
        </div>

        <section v-motion-reveal class="tech-frame mt-14 rounded-md border border-border/60 bg-card/60 p-5 shadow-sm sm:p-6 md:p-8 transition">
          <p class="text-xs font-semibold uppercase tracking-[0.3em] text-foreground">{{ t('about.techLabel') }}</p>
          <h2 class="mt-3 text-2xl font-black tracking-tight md:text-3xl">{{ t('about.techHeading') }}</h2>
          <div class="mt-7">
            <TechMarquee />
          </div>
        </section>

        <section v-motion-reveal class="tech-frame mt-14 rounded-md border border-border/60 bg-card/60 p-5 shadow-sm sm:p-6 md:p-8 transition">
          <p class="text-xs font-semibold uppercase tracking-[0.3em] text-foreground">{{ t('about.processLabel') }}</p>
          <h2 class="mt-3 text-2xl font-black tracking-tight md:text-3xl">{{ t('about.processHeading') }}</h2>
          <div class="mt-7 grid gap-4 md:grid-cols-3">
            <div v-motion-reveal class="rounded-md bg-muted/60 p-5"><span class="text-sm font-black text-foreground">{{ t('about.process01Label') }}</span><p class="mt-3 text-sm leading-6 text-muted">{{ t('about.process01Desc') }}</p></div>
            <div v-motion-reveal :delay="100" class="rounded-md bg-muted/60 p-5"><span class="text-sm font-black text-foreground">{{ t('about.process02Label') }}</span><p class="mt-3 text-sm leading-6 text-muted">{{ t('about.process02Desc') }}</p></div>
            <div v-motion-reveal :delay="200" class="rounded-md bg-muted/60 p-5"><span class="text-sm font-black text-foreground">{{ t('about.process03Label') }}</span><p class="mt-3 text-sm leading-6 text-muted">{{ t('about.process03Desc') }}</p></div>
          </div>
          <div class="mt-7 flex items-center justify-center rounded-sm border border-violet-500/40 px-5 py-3 text-center text-sm font-extrabold text-violet-400">{{ t('about.processCallout') }}</div>
        </section>

        <ProjectShowcase
          layout="centered"
          :slugs="['sige-sistema-de-emergencias', 'data-secreta', 'nuvemshop-erp']"
        />

        <div v-motion-reveal class="tech-frame fx-card mt-8 rounded-md border border-border/60 bg-card/60 p-6 shadow-sm">
          <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 class="text-xl font-extrabold">{{ t('about.ctaHeading') }}</h2>
              <p class="mt-2 text-sm text-muted">{{ t('about.ctaDesc') }}</p>
            </div>
            <a
              :href="waLink(t('contact.whatsappPrefill'))"
              target="_blank"
              rel="noopener noreferrer"
              class="cta-primary shrink-0"
            >
              {{ t('about.ctaBtn') }}
            </a>
          </div>
        </div>
        </div>
      </section>
    </main>

    <SiteFooter />
  </div>
</template>

<script setup lang="ts">
import SiteHeader from "../components/SiteHeader.vue";
import SiteFooter from "../components/SiteFooter.vue";

const { t } = useLocale();

useSiteSeo({ title: () => t('about.sectionLabel'), description: () => t('about.description') });
</script>
