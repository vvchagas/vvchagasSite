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

    <main id="conteudo" class="mx-auto w-full max-w-6xl px-4 md:px-6">
      <!-- ===== HERO ===== -->
      <section id="inicio" class="relative overflow-hidden pt-8 md:pt-14">
        <div class="absolute inset-0 -z-10">
          <div
            class="absolute left-1/2 top-[-120px] h-[300px] w-[300px] sm:top-[-220px] sm:h-[520px] sm:w-[520px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-blue-500/30 via-indigo-500/20 to-fuchsia-500/20 blur-3xl"
          />
          <div
            class="absolute -left-8 top-28 h-40 w-40 sm:-left-24 sm:h-64 sm:w-64 rounded-full bg-blue-500/15 blur-2xl"
          />
          <div
            class="absolute -right-8 top-52 h-48 w-48 sm:-right-24 sm:h-72 sm:w-72 rounded-full bg-indigo-500/15 blur-2xl"
          />
        </div>

        <div class="grid items-center gap-10 md:grid-cols-2">
          <div>
            <p
              class="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/60 px-3 py-1.5 text-xs font-semibold text-foreground/90 backdrop-blur"
            >
              <span
                aria-hidden="true"
                class="inline-flex size-2 rounded-full bg-blue-600 shadow-[0_0_0_4px_rgba(12,129,232,.15)] shrink-0"
              />
              <span class="leading-tight">{{ t('hero.badge') }}</span>
            </p>

            <h1 class="mt-5 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
              Victor <span class="text-blue-600">Chagas</span>
            </h1>

            <p class="mt-4 max-w-prose text-base text-muted sm:text-lg leading-relaxed">
              {{ t('hero.description') }}
            </p>

            <div class="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <NuxtLink
                id="hero-cta-btn"
                to="/servicos"
                class="inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {{ t('hero.cta') }}
              </NuxtLink>
            </div>

            <dl class="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div
                class="rounded-2xl border border-border/60 bg-card/60 p-4 backdrop-blur"
              >
                <dt class="text-xs sm:text-sm font-semibold text-foreground/80">
                  {{ t('hero.statDeliveryLabel') }}
                </dt>
                <dd class="mt-1 text-xl sm:text-2xl font-black">{{ t('hero.statDeliveryValue') }}</dd>
                <dd class="mt-1 text-xs text-muted">
                  {{ t('hero.statDeliveryDesc') }}
                </dd>
              </div>
              <div
                class="rounded-2xl border border-border/60 bg-card/60 p-4 backdrop-blur"
              >
                <dt class="text-xs sm:text-sm font-semibold text-foreground/80">{{ t('hero.statFocusLabel') }}</dt>
                <dd class="mt-1 text-xl sm:text-2xl font-black">{{ t('hero.statFocusValue') }}</dd>
                <dd class="mt-1 text-xs text-muted">
                  {{ t('hero.statFocusDesc') }}
                </dd>
              </div>
              <div
                class="rounded-2xl border border-border/60 bg-card/60 p-4 backdrop-blur"
              >
                <dt class="text-xs sm:text-sm font-semibold text-foreground/80">
                  {{ t('hero.statSupportLabel') }}
                </dt>
                <dd class="mt-1 text-xl sm:text-2xl font-black">{{ t('hero.statSupportValue') }}</dd>
                <dd class="mt-1 text-xs text-muted">
                  {{ t('hero.statSupportDesc') }}
                </dd>
              </div>
            </dl>
          </div>

          <div class="relative mt-10">
            <div
              class="absolute inset-0 -z-10 rounded-[2rem] bg-gradient-to-b from-blue-500/15 to-transparent blur-2xl"
            />
            <div
              class="rounded-[2rem] border border-border/70 bg-card/70 p-5 shadow-sm backdrop-blur"
            >
              <div class="flex items-center justify-between gap-4">
                <div>
                  <p class="text-xs font-semibold text-muted">
                    {{ t('hero.statusLabel') }}
                  </p>
                  <p class="text-base sm:text-lg font-extrabold">{{ t('hero.statusValue') }}</p>
                </div>
                <span
                  class="inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1 text-xs font-semibold text-foreground/90 shrink-0"
                >
                  <span
                    aria-hidden="true"
                    class="size-2 rounded-full bg-green-500"
                  />
                  {{ t('hero.statusOnline') }}
                </span>
              </div>

              <div class="mt-5 grid gap-3">
                <div class="rounded-2xl bg-muted/60 p-4">
                  <h3 class="font-bold text-sm sm:text-base">{{ t('hero.step1Title') }}</h3>
                  <p class="mt-1 text-xs sm:text-sm text-muted">
                    {{ t('hero.step1Desc') }}
                  </p>
                </div>
                <div class="rounded-2xl bg-muted/60 p-4">
                  <h3 class="font-bold text-sm sm:text-base">{{ t('hero.step2Title') }}</h3>
                  <p class="mt-1 text-xs sm:text-sm text-muted">
                    {{ t('hero.step2Desc') }}
                  </p>
                </div>
                <div class="rounded-2xl bg-muted/60 p-4">
                  <h3 class="font-bold text-sm sm:text-base">{{ t('hero.step3Title') }}</h3>
                  <p class="mt-1 text-xs sm:text-sm text-muted">
                    {{ t('hero.step3Desc') }}
                  </p>
                </div>
              </div>

              <div class="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <NuxtLink class="card-link" to="/contato">
                  <span class="card-icon material-symbols-outlined text-blue-500" aria-hidden="true">chat</span>
                  <span class="card-title">{{ t('hero.cardAttendTitle') }}</span>
                  <span class="card-desc">{{ t('hero.cardAttendDesc') }}</span>
                </NuxtLink>
                <NuxtLink class="card-link" to="/servicos">
                  <span class="card-icon material-symbols-outlined text-purple-500" aria-hidden="true">settings</span>
                  <span class="card-title">{{ t('hero.cardSolutionsTitle') }}</span>
                  <span class="card-desc">{{ t('hero.cardSolutionsDesc') }}</span>
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ===== SOBRE ===== -->
      <section id="sobre" ref="sobreSection" class="mt-14 md:mt-18">
        <div class="flex items-end justify-between gap-4">
          <div>
            <h2 class="text-2xl font-black tracking-tight md:text-3xl">
              {{ t('indexSections.aboutTitle') }}
            </h2>
            <p class="mt-2 text-muted">
              {{ t('indexSections.aboutDesc') }}
            </p>
          </div>
          <div
            class="hidden sm:block rounded-2xl border border-border/60 bg-card/60 px-4 py-3 text-sm text-muted"
          >
            <p class="font-semibold text-foreground/90">{{ t('indexSections.aboutWork') }}</p>
            <p class="mt-1">{{ t('indexSections.aboutWorkDesc') }}</p>
          </div>
        </div>

        <div class="mt-7 grid gap-4 md:grid-cols-3">
          <article
            ref="sobreCard1"
            class="rounded-3xl border border-border/60 bg-card/60 p-6 shadow-sm backdrop-blur"
          >
            <h3 class="text-lg font-extrabold">{{ t('indexSections.aboutWebTitle') }}</h3>
            <p class="mt-3 text-sm text-muted">
              {{ t('indexSections.aboutWebDesc') }}
            </p>
            <ul class="mt-4 space-y-2 text-sm text-muted">
              <li class="flex gap-2">
                <span aria-hidden="true" class="material-symbols-outlined text-base text-emerald-500">task_alt</span> {{ t('indexSections.aboutWebItem1') }}
              </li>
              <li class="flex gap-2">
                <span aria-hidden="true" class="material-symbols-outlined text-base text-emerald-500">task_alt</span> {{ t('indexSections.aboutWebItem2') }}
              </li>
              <li class="flex gap-2">
                <span aria-hidden="true" class="material-symbols-outlined text-base text-emerald-500">task_alt</span> {{ t('indexSections.aboutWebItem3') }}
              </li>
            </ul>
          </article>

          <article
            ref="sobreCard2"
            class="rounded-3xl border border-border/60 bg-card/60 p-6 shadow-sm backdrop-blur"
          >
            <h3 class="text-lg font-extrabold">{{ t('indexSections.aboutItTitle') }}</h3>
            <p class="mt-3 text-sm text-muted">
              {{ t('indexSections.aboutItDesc') }}
            </p>
            <ul class="mt-4 space-y-2 text-sm text-muted">
              <li class="flex gap-2">
                <span aria-hidden="true" class="material-symbols-outlined text-base text-violet-500">psychology</span> {{ t('indexSections.aboutItItem1') }}
              </li>
              <li class="flex gap-2">
                <span aria-hidden="true" class="material-symbols-outlined text-base text-teal-500">shield</span> {{ t('indexSections.aboutItItem2') }}
              </li>
              <li class="flex gap-2">
                <span aria-hidden="true" class="material-symbols-outlined text-base text-amber-500">build</span> {{ t('indexSections.aboutItItem3') }}
              </li>
            </ul>
          </article>

          <article
            ref="sobreCard3"
            class="rounded-3xl border border-border/60 bg-card/60 p-6 shadow-sm backdrop-blur"
          >
            <h3 class="text-lg font-extrabold">{{ t('indexSections.aboutNotebookTitle') }}</h3>
            <p class="mt-3 text-sm text-muted">
              {{ t('indexSections.aboutNotebookDesc') }}
            </p>
            <ul class="mt-4 space-y-2 text-sm text-muted">
              <li class="flex gap-2">
                <span aria-hidden="true" class="material-symbols-outlined text-base text-rose-500">thermostat</span> {{ t('indexSections.aboutNotebookItem1') }}
              </li>
              <li class="flex gap-2">
                <span aria-hidden="true" class="material-symbols-outlined text-base text-sky-500">save</span> {{ t('indexSections.aboutNotebookItem2') }}
              </li>
              <li class="flex gap-2">
                <span aria-hidden="true" class="material-symbols-outlined text-base text-amber-500">bolt</span> {{ t('indexSections.aboutNotebookItem3') }}
              </li>
            </ul>
          </article>
        </div>
      </section>

      <!-- ===== SERVIÇOS ===== -->
      <section id="servicos" ref="servicosSection" class="mt-14 md:mt-18">
        <div
          class="flex flex-col gap-3 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <h2 class="text-2xl font-black tracking-tight md:text-3xl">
              {{ t('indexSections.servicesTitle') }}
            </h2>
            <p class="mt-2 text-muted">
              {{ t('indexSections.servicesDesc') }}
            </p>
          </div>
        </div>

        <div class="mt-7 grid gap-4 md:grid-cols-2">
          <article
            ref="servCard1"
            class="rounded-3xl border border-border/60 bg-card/60 p-6 shadow-sm backdrop-blur"
          >
            <div class="flex items-start justify-between gap-4">
              <div>
                <h3 class="text-lg font-extrabold">{{ t('indexSections.servWebTitle') }}</h3>
                <p class="mt-2 text-sm text-muted">
                  {{ t('indexSections.servWebDesc') }}
                </p>
              </div>
              <span class="badge border border-border/60">WEB</span>
            </div>
            <ul class="mt-4 space-y-2 text-sm text-muted">
              <li class="flex gap-2">
                <span aria-hidden="true" class="material-symbols-outlined text-base text-amber-500">bolt</span> {{ t('indexSections.servWebItem1') }}
              </li>
              <li class="flex gap-2">
                <span aria-hidden="true" class="material-symbols-outlined text-base text-fuchsia-500">palette</span> {{ t('indexSections.servWebItem2') }}
              </li>
              <li class="flex gap-2">
                <span aria-hidden="true" class="material-symbols-outlined text-base text-cyan-500">accessibility_new</span> {{ t('indexSections.servWebItem3') }}
              </li>
            </ul>
          </article>

          <article
            ref="servCard2"
            class="rounded-3xl border border-border/60 bg-card/60 p-6 shadow-sm backdrop-blur"
          >
            <div class="flex items-start justify-between gap-4">
              <div>
                <h3 class="text-lg font-extrabold">{{ t('indexSections.servAdjTitle') }}</h3>
                <p class="mt-2 text-sm text-muted">
                  {{ t('indexSections.servAdjDesc') }}
                </p>
              </div>
              <span class="badge border border-border/60">UI/UX</span>
            </div>
            <ul class="mt-4 space-y-2 text-sm text-muted">
              <li class="flex gap-2">
                <span aria-hidden="true" class="material-symbols-outlined text-base text-indigo-500">widgets</span> {{ t('indexSections.servAdjItem1') }}
              </li>
              <li class="flex gap-2">
                <span aria-hidden="true" class="material-symbols-outlined text-base text-emerald-500">trending_up</span> {{ t('indexSections.servAdjItem2') }}
              </li>
              <li class="flex gap-2">
                <span aria-hidden="true" class="material-symbols-outlined text-base text-blue-500">search</span> {{ t('indexSections.servAdjItem3') }}
              </li>
            </ul>
          </article>

          <article
            ref="servCard3"
            class="rounded-3xl border border-border/60 bg-card/60 p-6 shadow-sm backdrop-blur"
          >
            <div class="flex items-start justify-between gap-4">
              <div>
                <h3 class="text-lg font-extrabold">{{ t('indexSections.servItTitle') }}</h3>
                <p class="mt-2 text-sm text-muted">
                  {{ t('indexSections.servItDesc') }}
                </p>
              </div>
              <span class="badge border border-border/60">TI</span>
            </div>
            <ul class="mt-4 space-y-2 text-sm text-muted">
              <li class="flex gap-2">
                <span aria-hidden="true" class="material-symbols-outlined text-base text-orange-500">construction</span> {{ t('indexSections.servItItem1') }}
              </li>
              <li class="flex gap-2">
                <span aria-hidden="true" class="material-symbols-outlined text-base text-cyan-500">wifi</span> {{ t('indexSections.servItItem2') }}
              </li>
              <li class="flex gap-2">
                <span aria-hidden="true" class="material-symbols-outlined text-base text-amber-500">build</span> {{ t('indexSections.servItItem3') }}
              </li>
            </ul>
          </article>

          <article
            ref="servCard4"
            class="rounded-3xl border border-border/60 bg-card/60 p-6 shadow-sm backdrop-blur"
          >
            <div class="flex items-start justify-between gap-4">
              <div>
                <h3 class="text-lg font-extrabold">{{ t('indexSections.servNotebookTitle') }}</h3>
                <p class="mt-2 text-sm text-muted">
                  {{ t('indexSections.servNotebookDesc') }}
                </p>
              </div>
              <span class="badge border border-border/60">NOTEBOOK</span>
            </div>
            <ul class="mt-4 space-y-2 text-sm text-muted">
              <li class="flex gap-2">
                <span aria-hidden="true" class="material-symbols-outlined text-base text-teal-500">cleaning_services</span> {{ t('indexSections.servNotebookItem1') }}
              </li>
              <li class="flex gap-2">
                <span aria-hidden="true" class="material-symbols-outlined text-base text-purple-500">memory</span> {{ t('indexSections.servNotebookItem2') }}
              </li>
              <li class="flex gap-2">
                <span aria-hidden="true" class="material-symbols-outlined text-base text-emerald-500">battery_charging_full</span> {{ t('indexSections.servNotebookItem3') }}
              </li>
            </ul>
          </article>
        </div>

        <div
          ref="servCta"
          class="mt-6 text-foreground rounded-3xl border border-blue-300/50 bg-blue-500/10 p-5 text-center shadow-sm dark:border-blue-500/30 dark:bg-blue-500/15"
        >
          <div
            class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
          >
            <div>
              <h3 class="text-lg font-extrabold text-start">{{ t('indexSections.servCtaTitle') }}</h3>
              <p class="mt-1 text-sm text-start">
                {{ t('indexSections.servCtaDesc') }}
              </p>
            </div>
            <NuxtLink
              to="/contato"
              class="inline-flex items-center justify-center rounded-full bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 shrink-0"
            >
              {{ t('indexSections.servCtaBtn') }}
            </NuxtLink>
          </div>
        </div>
      </section>

      <!-- ===== PORTFÓLIO ===== -->
      <section id="portfolio" ref="portfolioSection" class="mt-14 md:mt-18">
        <div class="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 class="text-2xl font-black tracking-tight md:text-3xl">
              {{ t('indexSections.portfolioTitle') }}
            </h2>
            <p class="mt-2 text-muted">
              {{ t('indexSections.portfolioDesc') }}
            </p>
          </div>
          <NuxtLink to="/sobre" class="border border-border/60 rounded-full px-3 py-1.5 hover:-translate-y-0.5 duration-300 text-sm text-center font-semibold shrink-0">
            {{ t('indexSections.portfolioMore') }}
          </NuxtLink>
        </div>

        <ProjectShowcase
          :columns="2"
          :hide-heading="true"
          :slugs="['yu-gi-oh-api', 'loja-do-seu-ze']"
          class="mt-7"
        />
      </section>

      <!-- ===== CONTATO ===== -->
      <section id="contato" ref="contatoSection" class="mt-14 pb-12 md:mt-18">
        <div
          class="rounded-[2.5rem] border border-border/70 from-blue-500/15 via-indigo-500/10 to-fuchsia-500/15 p-5 shadow-sm backdrop-blur sm:p-8 md:p-10"
        >
          <div class="grid gap-8 md:grid-cols-2 md:items-start">
            <div ref="contatoInfo">
              <h2 class="text-2xl font-black tracking-tight md:text-3xl">
                {{ t('indexSections.contactTitle') }}
              </h2>
              <p class="mt-3 text-muted">
                {{ t('indexSections.contactDesc') }}
              </p>

              <ul class="mt-6 space-y-3 text-sm text-muted">
                <li class="flex items-start gap-3">
                  <span
                    aria-hidden="true"
                    class="material-symbols-outlined mt-0.5 flex size-9 items-center justify-center rounded-xl bg-muted/60 text-lg text-rose-500 shrink-0"
                  >location_on</span>
                  <div>
                    <p class="font-semibold text-foreground/90">{{ t('indexSections.contactLocLabel') }}</p>
                    <p>{{ t('indexSections.contactLocDesc') }}</p>
                  </div>
                </li>
                <li class="flex items-start gap-3">
                  <span
                    aria-hidden="true"
                    class="material-symbols-outlined mt-0.5 flex size-9 items-center justify-center rounded-xl bg-muted/60 text-lg text-amber-500 shrink-0"
                  >bolt</span>
                  <div>
                    <p class="font-semibold text-foreground/90">{{ t('indexSections.contactObjLabel') }}</p>
                    <p>{{ t('indexSections.contactObjDesc') }}</p>
                  </div>
                </li>
              </ul>
            </div>

            <form
              ref="contatoForm"
              class="bg-background rounded-3xl border border-border/60 bg-card/70 p-5 shadow-sm backdrop-blur sm:p-6 md:p-8"
              @submit.prevent="submit"
            >
              <div class="flex items-center justify-between gap-4">
                <h3 class="text-lg font-extrabold">{{ t('contact.formTitle') }}</h3>
                <span class="text-xs font-semibold text-muted">{{ t('contact.formFast') }}</span>
              </div>

              <div class="mt-5 grid gap-4">
                <label class="block">
                  <span class="text-sm font-semibold">{{ t('contact.formName') }}</span>
                  <input
                    v-model="form.name"
                    type="text"
                    class="mt-2 w-full rounded-2xl border border-border/70 bg-background/50 px-4 py-3 text-sm outline-none transition focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/20"
                    :placeholder="t('contact.formNamePlaceholder')"
                    required
                  > 
                </label>

                <label class="block">
                  <span class="text-sm font-semibold">{{ t('contact.formContact') }}</span>
                  <input
                    v-model="form.contact"
                    type="text"
                    class="mt-2 w-full rounded-2xl border border-border/70 bg-background/50 px-4 py-3 text-sm outline-none transition focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/20"
                    :placeholder="t('contact.formContactPlaceholder')"
                    required
                  >
                </label>

                <label class="block">
                  <span class="text-sm font-semibold">{{ t('contact.formSubject') }}</span>
                  <select
                    v-model="form.topic"
                    class="mt-2 w-full rounded-2xl border border-border/70 bg-background/50 px-4 py-3 text-sm outline-none transition focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/20"
                    required
                  >
                    <option class="bg-background text-foreground" value="web">{{ t('contact.formSubjectWeb') }}</option>
                    <option class="bg-background text-foreground" value="ti">{{ t('contact.formSubjectIT') }}</option>
                    <option class="bg-background text-foreground" value="assistencia-tecnica">{{ t('contact.formSubjectTech') }}</option>
                  </select>
                </label>

                <label class="block">
                  <span class="text-sm font-semibold">{{ t('contact.formSource') }}</span>
                  <select
                    v-model="form.source"
                    class="mt-2 w-full rounded-2xl border border-border/70 bg-background/50 px-4 py-3 text-sm outline-none transition focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/20"
                    required
                  >
                    <option class="bg-background text-foreground" value="google">{{ t('contact.formSourceGoogle') }}</option>
                    <option class="bg-background text-foreground" value="linkedin">{{ t('contact.formSourceLinkedin') }}</option>
                    <option class="bg-background text-foreground" value="indicacao">{{ t('contact.formSourceIndication') }}</option>
                    <option class="bg-background text-foreground" value="github">{{ t('contact.formSourceGithub') }}</option>
                  </select>
                </label>

                <label class="block">
                  <span class="text-sm font-semibold">{{ t('contact.formMessage') }}</span>
                  <textarea
                    v-model="form.message"
                    rows="5"
                    class="mt-2 w-full resize-none rounded-2xl border border-border/70 bg-background/50 px-4 py-3 text-sm outline-none transition focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/20"
                    :placeholder="t('contact.formMessagePlaceholder')"
                    required
                  />
                </label>

                <button
                  type="submit"
                  :disabled="isSending"
                  class="inline-flex w-full items-center justify-center rounded-2xl bg-blue-600 px-4 py-3 text-sm font-extrabold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-wait disabled:opacity-55"
                >
                  {{ isSending ? t('contact.formSending') : t('contact.formSend') }}
                </button>

                <p
                  v-if="sendError"
                  class="rounded-2xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-700 dark:text-red-300"
                  role="alert"
                >
                  {{ sendError }}
                </p>

                <p
                  v-if="toast"
                  class="rounded-2xl border border-border/70 bg-card/60 px-4 py-3 text-sm text-muted"
                  role="status"
                >
                  {{ toast }}
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>

    <SiteFooter />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useHead } from "nuxt/app";
import type { MessageTopic } from "@@/shared/messages";

import SiteHeader from "../components/SiteHeader.vue";
import SiteFooter from "../components/SiteFooter.vue";
import ProjectShowcase from "../components/ProjectShowcase.vue";
import { useScrollReveal } from "~/composables/useScrollReveal";

const { t } = useLocale();

useHead({
  title: "vvchagas - Início",
  link: [
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,300,0,0",
    },
  ],
});

// Sobre
const sobreSection = ref<HTMLElement | null>(null);
const sobreCard1 = ref<HTMLElement | null>(null);
const sobreCard2 = ref<HTMLElement | null>(null);
const sobreCard3 = ref<HTMLElement | null>(null);

useScrollReveal(sobreSection);
useScrollReveal(sobreCard1, { delay: 0.0 });
useScrollReveal(sobreCard2, { delay: 0.1 });
useScrollReveal(sobreCard3, { delay: 0.2 });

// Serviços
const servicosSection = ref<HTMLElement | null>(null);
const servCard1 = ref<HTMLElement | null>(null);
const servCard2 = ref<HTMLElement | null>(null);
const servCard3 = ref<HTMLElement | null>(null);
const servCard4 = ref<HTMLElement | null>(null);
const servCta = ref<HTMLElement | null>(null);

useScrollReveal(servicosSection);
useScrollReveal(servCard1, { delay: 0.0 });
useScrollReveal(servCard2, { delay: 0.1 });
useScrollReveal(servCard3, { delay: 0.2 });
useScrollReveal(servCard4, { delay: 0.3 });
useScrollReveal(servCta, { delay: 0.4 });

// Portfolio
const portfolioSection = ref<HTMLElement | null>(null);
useScrollReveal(portfolioSection);

// Contato
const contatoSection = ref<HTMLElement | null>(null);
const contatoInfo = ref<HTMLElement | null>(null);
const contatoForm = ref<HTMLElement | null>(null);

useScrollReveal(contatoSection);
useScrollReveal(contatoInfo, { delay: 0.0 });
useScrollReveal(contatoForm, { delay: 0.15 });

const toast = ref<string | null>(null);
const sendError = ref<string | null>(null);
const isSending = ref(false);

const form = ref({
  name: "",
  contact: "",
  topic: "web" as MessageTopic,
  source: "google",
  message: "",
});

async function submit() {
  isSending.value = true;
  sendError.value = null;
  try {
    await $fetch("/api/messages", {
      method: "POST",
      body: form.value,
    });

    toast.value = t("contact.formSuccess");
    form.value = {
      name: "",
      contact: "",
      topic: "web",
      source: "google",
      message: "",
    };
    window.setTimeout(() => (toast.value = null), 3500);
  } catch {
    sendError.value = t("contact.formError");
  } finally {
    isSending.value = false;
  }
}
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

.footer-link {
  font-weight: 600;
  color: rgba(var(--fg), 0.75);
  transition: color 0.2s ease;
}
.footer-link:hover {
  color: #3b82f6;
}

.badge {
  display: inline-flex;
  align-items: center;
  border-radius: 999px;
  padding: 0.25rem 0.7rem;
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.04em;
}

.card-link {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  border-radius: 1rem;
  padding: 1rem;
  border: 1px solid rgba(var(--border), 1);
  background: rgba(var(--card), 0.7);
  transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
}
.card-link:hover {
  transform: translateY(-4px);
  border-color: rgba(59, 130, 246, 0.6);
  box-shadow: 0 10px 30px rgba(59, 130, 246, 0.2);
}
.card-icon {
  font-size: 22px;
}
.card-title {
  font-weight: 800;
  font-size: 0.9rem;
}
.card-desc {
  font-size: 0.8rem;
  color: rgb(var(--muted));
}

section#inicio .absolute.inset-0.-z-10 > div {
  animation: float 8s ease-in-out infinite;
}
section#inicio .absolute.inset-0.-z-10 > div:nth-child(2) {
  animation-delay: -2.5s;
}
section#inicio .absolute.inset-0.-z-10 > div:nth-child(3) {
  animation-delay: -5s;
}
@keyframes float {
  0%, 100% { transform: translate(-50%, 0) scale(1); }
  50% { transform: translate(-50%, 20px) scale(1.06); }
}
section#inicio .absolute.inset-0.-z-10 > div:not(:first-child) {
  animation-name: floatSide;
}
@keyframes floatSide {
  0%, 100% { transform: translateY(0) scale(1); }
  50% { transform: translateY(18px) scale(1.05); }
}

.bg-green-500 {
  position: relative;
}
.bg-green-500::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 999px;
  background: rgb(34, 197, 94);
  animation: pulseDot 1.6s ease-out infinite;
}
@keyframes pulseDot {
  0% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.55); }
  100% { box-shadow: 0 0 0 8px rgba(34, 197, 94, 0); }
}

.bg-blue-600 {
  transition: transform 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease;
}
a.bg-blue-600:hover,
button.bg-blue-600:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(37, 99, 235, 0.45);
}

article.rounded-3xl {
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}
article.rounded-3xl:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 40px rgba(59, 130, 246, 0.15);
}
</style>
