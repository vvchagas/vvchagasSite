<template>
  <div class="min-h-screen bg-background text-foreground">
    <NuxtRouteAnnouncer />

    <a
      href="#conteudo"
      class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-blue-600 focus:px-3 focus:py-2 focus:text-white"
    >
      Pular para o conteúdo
    </a>

    <SiteHeader />

    <main id="conteudo" class="mx-auto w-full max-w-6xl px-4 md:px-6">
      <section class="mx-auto w-full max-w-5xl px-0 py-12 sm:py-16">
        <div class="mb-10 max-w-3xl space-y-4">
          <p
            class="text-xs font-semibold uppercase tracking-[0.3em] text-blue-600 dark:text-blue-400 sm:text-sm"
          >
            Portfólio
          </p>
          <h1 class="text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
            Projetos com foco em performance, clareza e conversão
          </h1>
          <p class="text-base leading-7 text-muted sm:text-lg sm:leading-8">
            Aqui você encontra exemplos de layouts, páginas e experiências que foram pensadas para
            reduzir fricção e acelerar o caminho do usuário.
          </p>
        </div>

        <div class="grid gap-6 md:grid-cols-3">
          <article
            class="group relative overflow-hidden rounded-3xl border border-border/60 bg-card/60 p-5 hover:-translate-y-1 duration-600 shadow-sm backdrop-blur"
          >
            <div
              class="absolute inset-0 opacity-0 transition group-hover:opacity-100"
            />
            <div class="relative">
              <div class="flex items-start justify-between gap-4">
                <div>
                  <h2 class="text-lg font-extrabold">Landing de Serviços</h2>
                  <p class="mt-2 text-sm text-muted">Seções organizadas e CTA forte</p>
                </div>
                <span class="badge badge-alt">SITE</span>
              </div>

              <div class="mt-4 aspect-[4/3] rounded-2xl bg-muted/60 ring-1 ring-border/60">
                <div class="flex h-full items-center justify-center">
                  <span class="material-symbols-outlined text-3xl text-blue-500" aria-hidden="true">explore</span>
                </div>
              </div>

              <ul class="mt-4 space-y-2 text-sm text-muted">
                <li class="flex gap-2">
                  <span aria-hidden="true" class="material-symbols-outlined text-base text-emerald-500">check</span>
                  Responsivo e semântica
                </li>
                <li class="flex gap-2">
                  <span aria-hidden="true" class="material-symbols-outlined text-base text-emerald-500">check</span>
                  UI clara para conversão
                </li>
                <li class="flex gap-2">
                  <span aria-hidden="true" class="material-symbols-outlined text-base text-emerald-500">check</span>
                  Performance e acessibilidade
                </li>
              </ul>

              <div class="mt-5">
                <NuxtLink
                  to="/contatoView"
                  class="inline-flex w-full items-center justify-center rounded-2xl bg-blue-600 px-4 py-3 text-sm font-extrabold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Quero um parecido
                </NuxtLink>
              </div>
            </div>
          </article>

          <article
            class="group relative overflow-hidden rounded-3xl border border-border/60 bg-card/60 hover:-translate-y-1 duration-600 p-5 shadow-sm backdrop-blur"
          >
            <div class="relative">
              <div class="flex items-start justify-between gap-4">
                <div>
                  <h2 class="text-lg font-extrabold">Portfólio com destaque</h2>
                  <p class="mt-2 text-sm text-muted">Grid, cards e narrativa visual</p>
                </div>
                <span class="badge">UI</span>
              </div>

              <div class="mt-4 aspect-[4/3] rounded-2xl bg-muted/60 ring-1 ring-border/60">
                <div class="flex h-full items-center justify-center">
                  <span class="material-symbols-outlined text-3xl text-purple-500" aria-hidden="true">grid_view</span>
                </div>
              </div>

              <ul class="mt-4 space-y-2 text-sm text-muted">
                <li class="flex gap-2">
                  <span aria-hidden="true" class="material-symbols-outlined text-base text-emerald-500">check</span>
                  Acessibilidade
                </li>
                <li class="flex gap-2">
                  <span aria-hidden="true" class="material-symbols-outlined text-base text-emerald-500">check</span>
                  Animações sutis
                </li>
                <li class="flex gap-2">
                  <span aria-hidden="true" class="material-symbols-outlined text-base text-emerald-500">check</span>
                  Performance
                </li>
              </ul>

              <div class="mt-5">
                <NuxtLink
                  to="/contatoView"
                  class="inline-flex w-full items-center justify-center rounded-2xl bg-blue-600 px-4 py-3 text-sm font-extrabold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Quero meu portfólio
                </NuxtLink>
              </div>
            </div>
          </article>

          <article
            class="group relative overflow-hidden rounded-3xl border border-border/60 bg-card/60 hover:-translate-y-1 duration-600 p-5 shadow-sm backdrop-blur"
          >
            <div class="relative">
              <div class="flex items-start justify-between gap-4">
                <div>
                  <h2 class="text-lg font-extrabold">Página de Atendimento</h2>
                  <p class="mt-2 text-sm text-muted">Formulário elegante e rápido</p>
                </div>
                <span class="badge badge-3">CRM</span>
              </div>

              <div class="mt-4 aspect-[4/3] rounded-2xl bg-muted/60 ring-1 ring-border/60">
                <div class="flex h-full items-center justify-center">
                  <span class="material-symbols-outlined text-3xl text-pink-500" aria-hidden="true">mail</span>
                </div>
              </div>

              <ul class="mt-4 space-y-2 text-sm text-muted">
                <li class="flex gap-2">
                  <span aria-hidden="true" class="material-symbols-outlined text-base text-emerald-500">check</span>
                  UX clara
                </li>
                <li class="flex gap-2">
                  <span aria-hidden="true" class="material-symbols-outlined text-base text-emerald-500">check</span>
                  CTA visível
                </li>
                <li class="flex gap-2">
                  <span aria-hidden="true" class="material-symbols-outlined text-base text-emerald-500">check</span>
                  Fluxo de envio direto
                </li>
              </ul>

              <div class="mt-5">
                <NuxtLink
                  to="/contatoView"
                  class="inline-flex w-full items-center justify-center rounded-2xl bg-blue-600 px-4 py-3 text-sm font-extrabold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Quero atendimento assim
                </NuxtLink>
              </div>
            </div>
          </article>
        </div>
      </section>
    </main>

    <SiteFooter />
  </div>
</template>

<script setup lang="ts">
import SiteHeader from "../components/SiteHeader.vue";
import SiteFooter from "../components/SiteFooter.vue";

useHead({
  title: "vvchagas - Portfólio",
  link: [
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,300,0,0",
    },
  ],
});
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

.badge {
  display: inline-flex;
  align-items: center;
  border-radius: 999px;
  padding: 0.25rem 0.7rem;
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.04em;
  color: #fff;
  background: linear-gradient(135deg, #3b82f6, #6366f1);
  box-shadow: 0 4px 14px rgba(59, 130, 246, 0.35);
}
.badge-alt {
  background: linear-gradient(135deg, #6366f1, #d946ef);
  box-shadow: 0 4px 14px rgba(168, 85, 247, 0.35);
}
.badge-3 {
  background: linear-gradient(135deg, #06b6d4, #3b82f6);
  box-shadow: 0 4px 14px rgba(6, 182, 212, 0.35);
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

