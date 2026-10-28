<template>
  <div
    class="site-page min-h-screen overflow-x-hidden bg-background text-foreground"
  >
    <NuxtRouteAnnouncer />

    <!-- Acessibilidade -->
    <a
      href="#conteudo"
      class="sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:not-sr-only focus:rounded-md focus:bg-blue-600 focus:px-3 focus:py-2 focus:text-white"
    >
      {{ t("common.skipToContent") }}
    </a>

    <SiteHeader />

    <main
      id="conteudo"
      class="mx-auto mt-22 w-full max-w-7xl px-4 pb-4 md:px-6"
    >
      <!-- =========================================================
           HERO
      ========================================================== -->
      <section
        id="inicio"
        aria-labelledby="hero-title"
        class="corner-frame relative isolate min-h-180 overflow-hidden border border-border/70 bg-background pt-8 md:pt-14"
      >
        <div class="pointer-events-none absolute inset-0 hero-wash" />

        <div
          class="relative z-10 flex min-h-170 flex-col justify-between p-5 sm:p-10"
        >
          <!-- Identificação técnica -->
          <header
            class="flex items-start justify-between text-foreground font-mono text-[10px] uppercase tracking-[0.22em]"
          >
            <span>{{ t("hero.location") }}</span>

            <span class="hidden sm:block mb-3">
              SYSTEM.ACTIVE // SISYPHUS.PROTOCOL
            </span>
          </header>

          <!-- Conteúdo principal (Grid com 2 colunas no Desktop) -->
          <div class="grid items-center gap-10 md:grid-cols-[1.2fr_.8fr]">
            <!-- Coluna da Esquerda: Apresentação e Estatísticas -->
            <div>
              <p
                data-hero-stagger
                class="technical-label text-xs uppercase tracking-[0.2em] text-muted"
              >
                {{ t("hero.eyebrow") }}
              </p>

              <!-- H1 com efeito de escrita (min-h reserva a altura: sem layout shift) -->
              <h1
                id="hero-title"
                class="mt-5 min-h-[3.2em] font-mono text-2xl font-black uppercase leading-tight tracking-tight wrap-break-word sm:text-5xl lg:text-4xl"
              >
                <span
                  v-for="(segment, index) in heroSegments"
                  :key="index"
                  :class="segment.cls"
                >
                  {{ segment.text }}
                </span>

                <span class="hero-typing-cursor" aria-hidden="true"> | </span>
              </h1>

              <p class="mt-4 max-w-prose text-base leading-relaxed text-muted sm:text-lg">
                {{ t("hero.description") }}
              </p>

              <div class="mt-6 flex flex-col gap-3 sm:flex-row">
                <a
                  :href="waLink(t('contact.whatsappPrefillTopic'))"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="cta-primary"
                >
                  {{ t("hero.ctaPrimary") }}
                </a>

                <NuxtLink to="/servicos" class="cta-secondary">
                  {{ t("hero.cta") }}
                </NuxtLink>
              </div>

              <p class="mt-3 text-xs text-muted">
                {{ t("hero.ctaNote") }}
              </p>

              <!-- Estatísticas -->
              <dl data-hero-stagger class="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div
                  v-for="stat in heroStats"
                  :key="stat.label"
                  class="tech-frame flex flex-col justify-between border border-border/70 bg-background p-4"
                >
                  <div>
                    <dt class="text-sm font-bold text-foreground sm:text-base">
                      {{ t(stat.label) }}

                      <span v-if="t(stat.value)" class="ml-1 text-purple-600">
                        {{ t(stat.value) }}
                      </span>
                    </dt>

                    <dd class="mt-1 text-xs leading-relaxed text-muted">
                      {{ t(stat.description) }}
                    </dd>
                  </div>
                </div>
              </dl>
            </div>

            <!-- Coluna da Direita: Card de Status -->
            <div class="relative flex w-full justify-end">
              <div
                data-hero-stagger
                class="corner-frame w-full max-w-lg border border-border/70 bg-background/55 p-5 shadow-sm"
              >
                <!-- Status Header -->
                <div class="flex items-center justify-between gap-4">
                  <div>
                    <p class="text-xs font-semibold text-muted">
                      {{ t("hero.statusLabel") }}
                    </p>
                    <p
                      class="text-base font-extrabold text-foreground sm:text-lg"
                    >
                      {{ t("hero.statusValue") }}
                    </p>
                  </div>

                  <a
                    :href="waLink(t('contact.whatsappPrefill'))"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-sm bg-muted/30 px-3 text-xs font-semibold text-foreground/90 hover:bg-muted/50"
                  >
                    <span
                      aria-hidden="true"
                      class="size-2 rounded-sm bg-green-500 animate-pulse"
                    />
                    {{ t("hero.statusOnline") }}
                  </a>
                </div>

                <!-- Etapas -->
                <div class="mt-5 grid gap-3">
                  <div
                    v-for="step in heroSteps"
                    :key="step.title"
                    class="tech-frame rounded-md bg-muted/25 p-4 border border-border/50"
                  >
                    <h3
                      class="flex items-center justify-between gap-3 text-sm font-bold text-foreground sm:text-base"
                    >
                      {{ t(step.title) }}
                      <span
                        aria-hidden="true"
                        class="material-symbols-outlined shrink-0 text-xl"
                        :class="step.color"
                      >
                        {{ step.icon }}
                      </span>
                    </h3>

                    <p class="mt-1 text-xs text-muted sm:text-sm">
                      {{ t(step.description) }}
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>

          <!-- Rodapé técnico -->
          <footer
            class="mt-8 flex justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-muted/75"
          >
            <span>BUILD 2026</span>
          </footer>
        </div>
      </section>

      <!-- =========================================================
           SERVIÇOS
      ========================================================== -->
      <section
        id="servicos"
        ref="servicosSection"
        aria-labelledby="servicos-title"
        class="mt-14 md:mt-18"
      >
        <header
          class="flex flex-col gap-3 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <h2
              id="servicos-title"
              class="text-2xl font-black tracking-tight md:text-3xl"
            >
              {{ t("indexSections.servicesTitle") }}
            </h2>

            <p class="mt-2 text-muted">
              {{ t("indexSections.servicesDesc") }}
            </p>
          </div>
        </header>

        <div class="mt-7 grid gap-4 md:grid-cols-2">
          <article
            v-for="(service, index) in services"
            :key="service.badge"
            :ref="(element) => setServiceCardRef(element, index)"
            class="tech-frame flex flex-col rounded-md border border-border/60 p-6 shadow-sm">
            <div class="flex items-start justify-between gap-4">
              <div>
                <h3 class="text-lg font-extrabold text-foreground">
                  {{ t(service.title) }}
                </h3>

                <p class="mt-2 text-sm text-muted">
                  {{ t(service.description) }}
                </p>
              </div>

              <!-- Badge simples/transparente com borda -->
              <span
                class="badge border border-border/60 bg-muted/40 px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-foreground"
              >
                {{ service.badge }}
              </span>
            </div>

            <ul class="mt-4 space-y-2 text-sm text-muted">
              <li
                v-for="item in service.items"
                :key="item.label"
                class="flex items-center gap-2"
              >
                <span
                  aria-hidden="true"
                  class="material-symbols-outlined text-base shrink-0"
                  :class="item.color"
                >
                  {{ item.icon }}
                </span>

                <span class="text-foreground/90">{{ t(item.label) }}</span>
              </li>
            </ul>

            <div class="mt-auto pt-5">
              <a
                :href="waLink(t('contact.whatsappPrefillTopic') + t(service.title))"
                target="_blank"
                rel="noopener noreferrer"
                class="cta-primary w-full sm:w-auto"
              >
                {{ t("indexSections.servCardBtn") }}
              </a>
            </div>
          </article>
        </div>
        <!-- CTA -->
        <div
          ref="servCta"
          class="tech-frame mt-6 rounded-md border border-border/60 bg-card/80 p-5 text-foreground shadow-sm transition"
        >
          <div
            class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
          >
            <div>
              <h3 class="text-start text-lg font-extrabold">
                {{ t("indexSections.servCtaTitle") }}
              </h3>

              <p class="mt-1 text-start text-sm">
                {{ t("indexSections.servCtaDesc") }}
              </p>
            </div>

            <a
              :href="waLink(t('contact.whatsappPrefillTopic'))"
              target="_blank"
              rel="noopener noreferrer"
              class="cta-primary shrink-0"
            >
              {{ t("indexSections.servCtaBtn") }}
            </a>
          </div>
        </div>
      </section>

      <!-- =========================================================
           PORTFÓLIO
      ========================================================== -->
      <section
        id="portfolio"
        ref="portfolioSection"
        aria-labelledby="portfolio-title"
        class="relative mt-14 md:mt-18"
      >
        <span id="projetos" class="absolute -top-24" aria-hidden="true" />

        <header
          class="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <h2
              id="portfolio-title"
              class="text-2xl font-black tracking-tight md:text-3xl"
            >
              {{ t("indexSections.portfolioTitle") }}
            </h2>

            <p class="mt-2 text-muted">
              {{ t("indexSections.portfolioDesc") }}
            </p>
          </div>

          <NuxtLink
            to="/sobre"
            class="shrink-0 rounded-sm border border-border/60 px-3 py-1.5 text-center text-sm font-semibold cursor-pointer transition hover:-translate-y-0.5 active:scale-95"
          >
            {{ t("indexSections.portfolioMore") }}
          </NuxtLink>
        </header>

        <ProjectShowcase
          :columns="2"
          :hide-heading="true"
          :slugs="['loja-do-seu-ze', 'sige-sistema-de-emergencias']"
          class="mt-7"
        />
      </section>

      <!-- =========================================================
           CONTATO
      ========================================================== -->
      <section
        id="contato"
        ref="contatoSection"
        aria-labelledby="contato-title"
        class="mt-14 pb-12 md:mt-18"
      >
        <div
          class="corner-frame border border-border/70 bg-background p-5 shadow-sm sm:p-8 md:p-10"
        >
          <div class="grid gap-8 md:grid-cols-2 md:items-start">
            <!-- Informações -->
            <div ref="contatoInfo">
              <h2
                id="contato-title"
                class="text-2xl font-black tracking-tight md:text-3xl"
              >
                {{ t("indexSections.contactTitle") }}
              </h2>

              <p class="mt-3 text-muted">
                {{ t("indexSections.contactDesc") }}
              </p>

              <ul class="mt-6 space-y-3 text-sm">
                <li
                  v-for="item in contactInfo"
                  :key="item.label"
                  class="flex items-start gap-3"
                >
                  <span
                    aria-hidden="true"
                    class="material-symbols-outlined flex size-10 shrink-0 items-center justify-center rounded-md bg-muted/60"
                    :class="item.color"
                  >
                    {{ item.icon }}
                  </span>

                  <div>
                    <p class="font-semibold text-foreground/90">
                      {{ t(item.label) }}
                    </p>

                    <p>
                      {{ t(item.description) }}
                    </p>
                  </div>
                </li>
              </ul>

              <a
                :href="waLink(t('contact.whatsappPrefill'))"
                target="_blank"
                rel="noopener noreferrer"
                class="cta-primary mt-6 w-full sm:w-auto"
              >
                {{ t("contact.whatsappBtn") }}
              </a>
            </div>

            <!-- Formulário -->
            <div ref="contatoForm" class="mt-5">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </main>

    <SiteFooter />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, type ComponentPublicInstance } from "vue";

import SiteHeader from "../components/SiteHeader.vue";
import SiteFooter from "../components/SiteFooter.vue";
import ProjectShowcase from "../components/ProjectShowcase.vue";
import ContactForm from "../components/ContactForm.vue";

import { revealNow, useScrollReveal } from "~/composables/useScrollReveal";
import { useTypewriterCycle } from "~/composables/useTypewriterCycle";

const { t } = useLocale();

useSiteSeo({
  title: () => t("hero.roles"),
  description: () => t("hero.description"),
});

/* =========================================================
   HERO
========================================================= */

const heroStats = [
  {
    label: "hero.statDiagLabel",
    value: "hero.statDiagValue",
    description: "hero.statDiagDesc",
  },
  {
    label: "hero.statModeLabel",
    value: "hero.statModeValue",
    description: "hero.statModeDesc",
  },
  {
    label: "hero.statScopeLabel",
    value: "hero.statScopeValue",
    description: "hero.statScopeDesc",
  },
];

const heroSteps = [
  {
    title: "hero.step1Title",
    description: "hero.step1Desc",
    icon: "monitoring",
    color: "text-blue-500",
  },
  {
    title: "hero.step2Title",
    description: "hero.step2Desc",
    icon: "terminal",
    color: "text-emerald-500",
  },
  {
    title: "hero.step3Title",
    description: "hero.step3Desc",
    icon: "delivery_truck_speed",
    color: "text-amber-500",
  },
];

const heroPhrase1 = computed(() => t("hero.heroPhraseName"));

const heroPhrase2 = computed(() => t("hero.heroPhraseRoles"));

const heroCycleTexts = computed(() => [heroPhrase1.value, heroPhrase2.value]);

const { displayed: heroTyped, activeIndex: heroPhase } = useTypewriterCycle(
  heroCycleTexts,
  3000,
  1000,
  50,
  25,
);

interface HeroSegment {
  text: string;
  cls: string;
}

const heroSegments = computed<HeroSegment[]>(() => {
  if (heroPhase.value !== 0) {
    return [
      {
        text: heroTyped.value,
        cls: "text-foreground dark:text-foreground",
      },
    ];
  }

  const current = heroTyped.value;

  const segments = [
    {
      text: t("hero.greetingPrefix"),
      cls: "text-foreground/85 dark:text-foreground/85",
    },
    {
      text: t("hero.firstName"),
      cls: "font-black text-foreground dark:text-foreground",
    },
    {
      text: " ",
      cls: "",
    },
    {
      text: t("hero.lastName"),
      cls: "font-black text-purple-600",
    },
  ];

  const result: HeroSegment[] = [];

  let remaining = current.length;

  for (const segment of segments) {
    if (remaining <= 0) break;

    const piece = segment.text.slice(0, remaining);

    if (piece) {
      result.push({
        text: piece,
        cls: segment.cls,
      });
    }

    remaining -= segment.text.length;
  }

  return result;
});

/* =========================================================
   ANIMAÇÃO HERO
========================================================= */

onMounted(() => {
  revealNow([...document.querySelectorAll<HTMLElement>("[data-hero-stagger]")], {
    y: 18,
    scale: 1,
    duration: 0.8,
    delay: 0.15,
    stagger: 0.08,
  });
});

/* =========================================================
   SERVIÇOS
========================================================= */

const servicosSection = ref<HTMLElement | null>(null);

const servCardRefs = ref<Array<HTMLElement | null>>([]);

const setServiceCardRef = (element: Element | ComponentPublicInstance | null, index: number) => {
  servCardRefs.value[index] = element instanceof HTMLElement ? element : null;
};

const servCta = ref<HTMLElement | null>(null);

useScrollReveal(servicosSection);

const services = [
  {
    badge: "WEB",
    title: "indexSections.servWebTitle",
    description: "indexSections.servWebDesc",
    items: [
      {
        icon: "bolt",
        color: "text-amber-500",
        label: "indexSections.servWebItem1",
      },
      {
        icon: "palette",
        color: "text-fuchsia-500",
        label: "indexSections.servWebItem2",
      },
      {
        icon: "accessibility_new",
        color: "text-cyan-500",
        label: "indexSections.servWebItem3",
      },
    ],
  },
  {
    badge: "UI/UX",
    title: "indexSections.servAdjTitle",
    description: "indexSections.servAdjDesc",
    items: [
      {
        icon: "widgets",
        color: "text-indigo-500",
        label: "indexSections.servAdjItem1",
      },
      {
        icon: "trending_up",
        color: "text-emerald-500",
        label: "indexSections.servAdjItem2",
      },
      {
        icon: "search",
        color: "text-blue-500",
        label: "indexSections.servAdjItem3",
      },
    ],
  },
  {
    badge: "TI",
    title: "indexSections.servItTitle",
    description: "indexSections.servItDesc",
    items: [
      {
        icon: "construction",
        color: "text-orange-500",
        label: "indexSections.servItItem1",
      },
      {
        icon: "wifi",
        color: "text-cyan-500",
        label: "indexSections.servItItem2",
      },
      {
        icon: "build",
        color: "text-amber-500",
        label: "indexSections.servItItem3",
      },
    ],
  },
  {
    badge: "NOTEBOOK",
    title: "indexSections.servNotebookTitle",
    description: "indexSections.servNotebookDesc",
    items: [
      {
        icon: "cleaning_services",
        color: "text-teal-500",
        label: "indexSections.servNotebookItem1",
      },
      {
        icon: "memory",
        color: "text-purple-500",
        label: "indexSections.servNotebookItem2",
      },
      {
        icon: "battery_charging_full",
        color: "text-emerald-500",
        label: "indexSections.servNotebookItem3",
      },
    ],
  },
];

const serviceRevealDelays = [0, 0.1, 0.2, 0.3];

services.forEach((_, index) => {
  useScrollReveal(
    computed(() => servCardRefs.value[index] ?? null),
    {
      delay: serviceRevealDelays[index],
    },
  );
});

useScrollReveal(servCta, {
  delay: 0.4,
});

/* =========================================================
   PORTFÓLIO
========================================================= */

const portfolioSection = ref<HTMLElement | null>(null);

useScrollReveal(portfolioSection);

/* =========================================================
   CONTATO
========================================================= */

const contatoSection = ref<HTMLElement | null>(null);

const contatoInfo = ref<HTMLElement | null>(null);

const contatoForm = ref<HTMLElement | null>(null);

useScrollReveal(contatoSection);
useScrollReveal(contatoInfo, {
  delay: 0,
});
useScrollReveal(contatoForm, {
  delay: 0.15,
});

const contactInfo = [
  {
    icon: "location_on",
    color: "text-green-600 dark:text-green-400",
    label: "indexSections.contactLocLabel",
    description: "indexSections.contactLocDesc",
  },
  {
    icon: "bolt",
    color: "text-red-600 dark:text-red-400",
    label: "indexSections.contactObjLabel",
    description: "indexSections.contactObjDesc",
  },
];
</script>

<style scoped>
/* =========================================================
   BADGES
========================================================= */

.badge {
  display: inline-flex;
  align-items: center;
  border-radius: 0.25rem;
  padding: 0.25rem 0.7rem;
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.04em;
}

/* =========================================================
   HERO TYPING
========================================================= */

.hero-typing-cursor {
  display: inline-block;
  margin-left: 2px;
  color: #3e3f42;
  animation: hero-cursor-blink 0.85s steps(1, end) infinite;
}

:global(html.dark) .hero-typing-cursor {
  color: #60a5fa;
}

@keyframes hero-cursor-blink {
  0%,
  49% {
    opacity: 1;
  }

  50%,
  100% {
    opacity: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero-typing-cursor {
    animation: none;
  }
}

/* =========================================================
   STATUS
========================================================= */

.bg-green-500 {
  position: relative;
}

.bg-green-500::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 0.25rem;
  background: rgb(34, 197, 94);
  animation: pulseDot 1.6s ease-out infinite;
}

@keyframes pulseDot {
  0% {
    box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.55);
  }

  100% {
    box-shadow: 0 0 0 8px rgba(34, 197, 94, 0);
  }
}
</style>
