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

    <main id="conteudo" class="mx-auto w-full max-w-6xl px-3 pt-24 sm:px-5 sm:pt-28 lg:px-8">
      <section
        ref="heroSection"
        class="corner-frame bg-background text-foreground relative isolate mx-auto w-full max-w-4xl overflow-hidden border border-border/70 bg-card/80 py-10 sm:py-16"
      >
        <div class="relative z-10 px-5 sm:px-10">
          <div class="mb-8 max-w-2xl space-y-4 sm:mb-10 mx-auto text-center">
            <p
              class="text-xs font-semibold uppercase tracking-[0.3em] text-blue-600 dark:text-blue-400 sm:text-sm"
            >
              {{ t('contact.sectionLabel') }}
            </p>
            <h1
              class="text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl"
            >
              {{ t('contact.heading') }}
            </h1>
            <p class="text-base leading-7 text-muted sm:text-lg sm:leading-8 text-center">
              {{ t('contact.description') }}
            </p>
          </div>

          <!-- CARD WHATSAPP -->
          <div
            ref="cardWhatsapp"
            class="tech-frame contact-card contact-card--whatsapp rounded-md border bg-card p-5 shadow-sm sm:p-8"
          >
            <div
              class="flex items-center justify-center gap-2 frame-line-whatsapp text-green-600 dark:text-green-400"
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                role="img"
                aria-hidden="true"
                class="size-5 shrink-0"
              >
                <path
                  d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"
                />
              </svg>
              <span class="text-sm font-semibold sm:text-base">WhatsApp</span>
            </div>

            <div
              class="contact-inner mt-5 rounded-md border bg-background p-4 shadow-sm sm:mt-6 sm:p-8"
            >
              <h2 class="text-center text-base sm:text-lg mb-2 sm:mb-3 font-bold">
                {{ t('contact.whatsappResponseTitle') }}
              </h2>
              <p class="text-center mb-3 text-sm sm:text-base text-muted font-mono">
                {{ t('contact.whatsappResponseTime') }}
              </p>
              <p class="text-sm sm:text-base text-center text-foreground/90 leading-relaxed max-w-lg mx-auto">
                {{ t('contact.whatsappResponseDesc') }}
              </p>
            </div>
            <a
              :href="waLink(t('contact.whatsappPrefill'))"
              target="_blank"
              rel="noopener noreferrer"
              class="text-foreground border border-green-600 hover:border-green-800 min-h-12 flex justify-center py-1 px-6 font-semibold text-center items-center  mx-auto mt-5 w-full sm:mt-6 sm:w-fit"
            >
              {{ t('contact.whatsappBtn') }}
            </a>
          </div>

          <!-- CARD LINKEDIN -->
          <div
            ref="cardLinkedin"
            class="tech-frame contact-card contact-card--linkedin mt-8 rounded-md border bg-card p-5 shadow-sm sm:mt-10 sm:p-8"
          >
            <div
              class="flex items-center justify-center gap-2 text-blue-600 dark:text-blue-400"
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                role="img"
                aria-hidden="true"
                class="size-5 shrink-0"
              >
                <path
                  d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                />
              </svg>
              <span class="text-sm font-semibold sm:text-base">LinkedIn</span>
            </div>

            <div
              class="contact-inner mt-5 rounded-md border bg-background p-4 shadow-sm sm:mt-6 sm:p-8"
            >
              <h2 class="text-center text-base sm:text-lg mb-2 sm:mb-3 font-bold">
                {{ t('contact.linkedinResponseTitle') }}
              </h2>
              <p class="text-center mb-3 text-sm sm:text-base text-muted font-mono">
                {{ t('contact.linkedinResponseTime') }}
              </p>
              <p class="text-sm sm:text-base text-center text-foreground/90 leading-relaxed max-w-lg mx-auto">
                {{ t('contact.linkedinResponseDesc') }}
              </p>
            </div>
            <a
              href="https://linkedin.com/in/victor-vasques-chagas"
              target="_blank"
              rel="noopener noreferrer"
              class="text-foreground border border-blue-600 hover:border-blue-800 min-h-12 flex justify-center py-1 px-6 font-semibold text-center items-center  mx-auto mt-5 w-full sm:mt-6 sm:w-fit"
            >
              {{ t('contact.linkedinBtn') }}
            </a>
          </div>

          <!-- CARD EMAIL -->
          <div
            ref="cardEmail"
            class="tech-frame contact-card contact-card--email mt-8 rounded-md border bg-card p-5 shadow-sm sm:mt-10 sm:p-8"
          >
            <div
              class="flex items-center justify-center gap-2 text-red-600 dark:text-red-400"
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                role="img"
                aria-hidden="true"
                class="size-5 shrink-0"
              >
                <path
                  d="M22 4H2C.9 4 0 4.9 0 6v12c0 1.1.9 2 2 2h20c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-10 6.25L2 8V6l10 6.25L22 6v2z"
                />
              </svg>
              <span class="text-sm font-semibold sm:text-base">E-mail</span>
            </div>

            <div
              class="contact-inner mt-5 rounded-md border bg-background p-4 shadow-sm sm:mt-6 sm:p-8"
            >
              <h2 class="text-center text-base sm:text-lg mb-2 sm:mb-3 font-bold">
                {{ t('contact.emailResponseTitle') }}
              </h2>
              <p class="text-center mb-3 text-sm sm:text-base text-muted font-mono">
                {{ t('contact.emailResponseTime') }}
              </p>
              <p class="text-sm sm:text-base text-center text-foreground/90 leading-relaxed max-w-lg mx-auto">
                {{ t('contact.emailResponseDesc') }}
              </p>
            </div>
            <a
              :href="mailLink(t('contact.emailSubject'))"
              target="_blank"
              rel="noopener noreferrer"
              class="text-foreground border border-red-600 hover:border-red-800 min-h-12 flex justify-center py-1 px-6 font-semibold text-center items-center  mx-auto mt-5 w-full sm:mt-6 sm:w-fit"
            >
              {{ t('contact.emailBtn') }}
            </a>
          </div>

          <!-- SEÇÃO FORMULÁRIO -->
          <div>
            <h2 class="mt-10 text-base sm:text-lg text-center font-bold">
              {{ t('contact.formIntro') }}
            </h2>
          </div>
          <div
            ref="cardForm"
            class="tech-frame contact-card contact-card--form mt-5 rounded-md border bg-card p-4 shadow-sm sm:mt-6 sm:p-8"
          >
            <h3 class="text-center text-base sm:text-lg mb-2 sm:mb-3 font-bold">
              {{ t('contact.formResponseTitle') }}
            </h3>
            <p class="text-center mb-3 text-sm sm:text-base text-muted font-mono">
              {{ t('contact.formResponseTime') }}
            </p>
            <p class="text-sm sm:text-base text-center text-foreground/90 leading-relaxed max-w-lg mx-auto">
              {{ t('contact.formResponseDesc') }}
            </p>

            <ContactForm class="mt-5" :initial-message="initialMessage" />
            <div class="h-24 sm:hidden" aria-hidden="true" />
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
import ContactForm from "../components/ContactForm.vue";
import { useScrollReveal } from "~/composables/useScrollReveal";

const { t } = useLocale();

useSiteSeo({ title: () => t('contact.sectionLabel'), description: () => t('contact.description') });

const route = useRoute();
const selectedProject = typeof route.query.projeto === "string" ? route.query.projeto : "";
const initialMessage = selectedProject ? `Olá! Quero um projeto semelhante a "${selectedProject}".` : "";

const heroSection = ref<HTMLElement | null>(null);
const cardWhatsapp = ref<HTMLElement | null>(null);
const cardLinkedin = ref<HTMLElement | null>(null);
const cardEmail = ref<HTMLElement | null>(null);
const cardForm = ref<HTMLElement | null>(null);

useScrollReveal(heroSection);
useScrollReveal(cardWhatsapp, { delay: 0.0 });
useScrollReveal(cardLinkedin, { delay: 0.15 });
useScrollReveal(cardEmail, { delay: 0.3 });
useScrollReveal(cardForm, { delay: 0.45 });
</script>

<style scoped>
/* ======================================================
   CARDS DE CONTATO COM CORNER ACCENT PERSONALIZADOS
====================================================== */
/* WHATSAPP */
.contact-card--whatsapp {
  --contact-accent: 34 197 94;
  --frame-line: rgb(34 197 94 / 0.4);
  --frame-accent: #22c55e;
  border-color: rgb(var(--contact-accent) / .55) !important;
}

/* LINKEDIN */
.contact-card--linkedin {
  --contact-accent: 59 130 246;
  --frame-line: rgb(59 130 246 / 0.4);
  --frame-accent: #3b82f6;
  border-color: rgb(var(--contact-accent) / .65) !important;
}

/* EMAIL (GMAIL) */
.contact-card--email {
  --contact-accent: 239 68 68;
  --frame-line: rgb(239 68 68 / 0.4);
  --frame-accent: #ef4444;
  border-color: rgb(var(--contact-accent) / .55) !important;
}

/* FORMULÁRIO */
.contact-card--form {
  --contact-accent: 115 115 115;
  --frame-line: rgb(115 115 115 / 0.4);
  --frame-accent: #a3a3a3;
  border-color: rgb(var(--contact-accent) / .55) !important;
}

/* CONTAINERS INTERNOS */
.contact-inner {
  position: relative;
  border-color: rgb(var(--contact-accent) / .35) !important;
  background-color: rgb(var(--bg) / .72) !important;
  --frame-line: rgb(var(--contact-accent) / 0.3);
  --frame-accent: rgb(var(--contact-accent));
}

.contact-card--whatsapp:hover {
  box-shadow: 0 16px 36px rgb(22 163 74 / .22);
  border-color: rgb(var(--contact-accent) / .95) !important;
  --frame-line: rgb(34 197 94 / 0.8);
  --frame-accent: #4ade80;
}
.contact-card--linkedin:hover {
  box-shadow: 0 16px 36px rgb(37 99 235 / .22);
  border-color: rgb(var(--contact-accent) / .95) !important;
  --frame-line: rgb(59 130 246 / 0.8);
  --frame-accent: #60a5fa;
}
.contact-card--email:hover {
  box-shadow: 0 16px 36px rgb(220 38 38 / .22);
  border-color: rgb(var(--contact-accent) / .95) !important;
  --frame-line: rgb(239 68 68 / 0.8);
  --frame-accent: #f87171;
}
.contact-card--form:hover {
  box-shadow: 0 16px 36px rgb(115 115 115 / .22);
  border-color: rgb(var(--contact-accent) / .95) !important;
  --frame-line: rgb(115 115 115 / 0.8);
  --frame-accent: #e5e5e5;
}
</style>
