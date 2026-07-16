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

   <main class="mx-auto w-full max-w-6xl px-4 md:px-6">
    <section class="mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 py-16 sm:px-8 lg:px-10">
      <div class="max-w-3xl space-y-5">
        <p class="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-700 dark:text-cyan-400">
          Serviços
        </p>
        <h1 class="text-4xl font-black tracking-tight sm:text-5xl">
          Soluções completas para evoluir, estabilizar e manter sua presença digital.
        </h1>
        <p class="max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-300">
          Atendemos desde a criação de sites e sistemas até suporte técnico e manutenção preventiva.
          Cada serviço foi pensado para reduzir atrito, aumentar desempenho e garantir continuidade.
        </p>
      </div>

      <div class="grid gap-6 lg:grid-cols-3">
        <article class="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900">
          <div class="mb-6 inline-flex rounded-2xl bg-cyan-100 px-4 py-2 text-sm font-semibold text-cyan-800 dark:bg-cyan-950 dark:text-cyan-300">
            Desenvolvimento Web
          </div>
          <h2 class="text-2xl font-bold">Sites, landing pages e sistemas sob medida</h2>
          <p class="mt-4 text-sm leading-7 text-zinc-600 dark:text-zinc-300">
            Planejamento, design responsivo, implementação em Nuxt e experiências focadas em conversão.
            Ideal para negócios que precisam de performance, clareza e escalabilidade.
          </p>
          <ul class="mt-6 space-y-3 text-sm text-zinc-700 dark:text-zinc-200">
            <li class="flex gap-3"><span class="mt-2 h-2 w-2 rounded-full bg-cyan-500"/><span>Sites institucionais com SEO técnico e navegação fluida.</span></li>
            <li class="flex gap-3"><span class="mt-2 h-2 w-2 rounded-full bg-cyan-500"/><span>Landing pages para campanhas e captação de leads.</span></li>
            <li class="flex gap-3"><span class="mt-2 h-2 w-2 rounded-full bg-cyan-500"/><span>Integrações com APIs, automações e painéis administrativos.</span></li>
          </ul>
          <NuxtLink
            to="/contatoView"
            class="mt-8 inline-flex items-center justify-center rounded-full bg-zinc-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-cyan-600 dark:bg-white dark:text-zinc-950 dark:hover:bg-cyan-300"
          >
            Solicitar orçamento
          </NuxtLink>
        </article>

        <article class="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900">
          <div class="mb-6 inline-flex rounded-2xl bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
            Assistência de TI
          </div>
          <h2 class="text-2xl font-bold">Suporte ágil para ambiente de trabalho sem interrupções</h2>
          <p class="mt-4 text-sm leading-7 text-zinc-600 dark:text-zinc-300">
            Atendimento preventivo e corretivo para computadores, redes e periféricos, com foco em
            resolver problemas com rapidez e manter a operação funcionando bem.
          </p>
          <ul class="mt-6 space-y-3 text-sm text-zinc-700 dark:text-zinc-200">
            <li class="flex gap-3"><span class="mt-2 h-2 w-2 rounded-full bg-emerald-500"/><span>Formatação, limpeza lógica e otimização de desempenho.</span></li>
            <li class="flex gap-3"><span class="mt-2 h-2 w-2 rounded-full bg-emerald-500"/><span>Configuração de redes e dispositivos de uso diário.</span></li>
            <li class="flex gap-3"><span class="mt-2 h-2 w-2 rounded-full bg-emerald-500"/><span>Atendimento para pequenas empresas e usuários domésticos.</span></li>
          </ul>
          <NuxtLink
            to="/contatoView"
            class="mt-8 inline-flex items-center justify-center rounded-full bg-zinc-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-600 dark:bg-white dark:text-zinc-950 dark:hover:bg-emerald-300"
          >
            Falar com suporte
          </NuxtLink>
        </article>

        <article class="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900">
          <div class="mb-6 inline-flex rounded-2xl bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-800 dark:bg-amber-950 dark:text-amber-300">
            Manutenção de Notebooks
          </div>
          <h2 class="text-2xl font-bold">Diagnóstico técnico e reparo com foco em durabilidade</h2>
          <p class="mt-4 text-sm leading-7 text-zinc-600 dark:text-zinc-300">
            Serviço dedicado para notebooks com aquecimento excessivo, lentidão, falhas de inicialização
            ou necessidade de upgrade de SSD e memória.
          </p>
          <ul class="mt-6 space-y-3 text-sm text-zinc-700 dark:text-zinc-200">
            <li class="flex gap-3"><span class="mt-2 h-2 w-2 rounded-full bg-amber-500"/><span>Troca de pasta térmica, limpeza interna e análise de temperatura.</span></li>
            <li class="flex gap-3"><span class="mt-2 h-2 w-2 rounded-full bg-amber-500"/><span>Atualização para SSD, memória e melhorias de desempenho.</span></li>
            <li class="flex gap-3"><span class="mt-2 h-2 w-2 rounded-full bg-amber-500"/><span>Correção de falhas de energia, teclado, tela e carregamento.</span></li>
          </ul>
          <NuxtLink
            to="/contatoView"
            class="mt-8 inline-flex items-center justify-center rounded-full bg-zinc-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-amber-600 dark:bg-white dark:text-zinc-950 dark:hover:bg-amber-300"
          >
            Pedir diagnóstico
          </NuxtLink>
        </article>
      </div>

      <section class="rounded-[2rem] border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 sm:p-10">
        <div class="grid gap-6 lg:grid-cols-[1.25fr_0.75fr] lg:items-center">
          <div>
            <p class="text-sm font-semibold uppercase tracking-[0.3em] text-zinc-500 dark:text-zinc-400">
              Orçamento rápido
            </p>
            <h2 class="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
              Quer um plano claro para o seu projeto ou manutenção?
            </h2>
            <p class="mt-4 max-w-2xl text-base leading-7 text-zinc-600 dark:text-zinc-300">
              Envie os detalhes da sua necessidade e retornamos com a melhor direção técnica e comercial.
            </p>
          </div>

          <div class="flex flex-col gap-3 sm:flex-row lg:justify-end">
            <NuxtLink
              to="/contatoView"
              class="inline-flex items-center justify-center rounded-full bg-zinc-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-cyan-600 dark:bg-white dark:text-zinc-950 dark:hover:bg-cyan-300"
            >
              Solicitar orçamento
            </NuxtLink>
            <NuxtLink
              to="/portfolioView"
              class="inline-flex items-center justify-center rounded-full border border-zinc-300 px-6 py-3 text-sm font-semibold text-zinc-800 transition hover:border-zinc-950 hover:text-zinc-950 dark:border-zinc-700 dark:text-zinc-100 dark:hover:border-zinc-200 dark:hover:text-white"
            >
              Ver portfólio
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
import { onMounted, ref } from "vue";
import SiteHeader from "../components/SiteHeader.vue";
import SiteFooter from "../components/SiteFooter.vue";
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

type Theme = "light" | "dark";

const isDark = ref(false);

const isMenuOpen = ref(false);

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  if (theme === "dark") root.classList.add("dark");
  else root.classList.remove("dark");
}

function detectTheme(): Theme {
  const stored =
    typeof window !== "undefined" ? window.localStorage.getItem("theme") : null;
  if (stored === "dark" || stored === "light") return stored;
  return window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function syncStateFromDom() {
  isDark.value = document.documentElement.classList.contains("dark");
}

function toggleTheme() {
  const next: Theme = isDark.value ? "light" : "dark";
  window.localStorage.setItem("theme", next);
  applyTheme(next);
  syncStateFromDom();
}

onMounted(() => {
  const theme = detectTheme();
  applyTheme(theme);
  syncStateFromDom();
});
</script>

<style scoped>
:global(html) {
  /* Defaults: Tailwind is still used; variables enable non-Tailwind usage and semantic names */
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

/* Semantic colors used by classes above */
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

/* Header/footers translucidos */
.bg-header,
.bg-footer {
  background: rgba(var(--bg), 0.75);
}

.bg-muted {
  background-color: rgba(var(--muted), 0.12);
}

#nuxtlink:hover {
  transform: translateY(-5px);
}

/* Google Fonts - Material Symbols */
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

/* Nav links */
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

/* Badges */
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
.badge-4 {
  background: linear-gradient(135deg, #f59e0b, #ef4444);
  box-shadow: 0 4px 14px rgba(245, 158, 11, 0.35);
}

/* Card links (Atendimento / Soluções) */
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

/* Blobs animados no hero */
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

/* Status "Online" pulsando */
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

/* Botões com glow no hover */
.bg-blue-600 {
  transition: transform 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease;
}
a.bg-blue-600:hover,
button.bg-blue-600:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(37, 99, 235, 0.45);
}

/* Cards de artigo com leve elevação no hover */
article.rounded-3xl {
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}
article.rounded-3xl:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 40px rgba(59, 130, 246, 0.15);
}

/* Título do hero com leve brilho no gradiente */
h1 span.bg-clip-text {
  background-size: 200% auto;
  animation: shine 6s linear infinite;
}
@keyframes shine {
  to { background-position: 200% center; }
}
</style>