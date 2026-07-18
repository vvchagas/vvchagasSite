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
      <section class="mx-auto w-full max-w-5xl py-12 sm:py-16">
        <div class="mb-8 max-w-4xl space-y-4">
          <p
            class="text-xs font-semibold uppercase tracking-[0.3em] text-blue-600 dark:text-blue-400 sm:text-sm"
          >
            Sobre
          </p>
          <h1 class="text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
            Soluções completas em Web, TI e assistência técnica
          </h1>
          <p class="text-base leading-7 text-muted sm:text-lg sm:leading-8">
            Meu trabalho é transformar cada necessidade em uma solução útil para o seu dia a dia:
            com comunicação clara, entrega organizada e suporte de verdade.
          </p>
        </div>

        <div class="rounded-3xl border border-blue-300/50 bg-blue-500/10 p-5 text-center shadow-sm dark:border-blue-500/30 dark:bg-blue-500/15">
          <p class="text-base font-bold sm:text-lg">
            "aqui não só consertamos ou fizemos algo, restauramos memórias"
          </p>
        </div>

        <div class="mt-6 grid gap-6 md:grid-cols-2">
          <article class="rounded-3xl border border-border/60 bg-card/60 p-6 shadow-sm backdrop-blur">
            <h2 class="text-lg font-extrabold">1) Desenvolvimento Web</h2>
            <p class="mt-3 text-sm text-muted leading-6">
              Criação de sites institucionais, landing pages e páginas de conversão com foco em
              performance, visual moderno e navegação intuitiva.
            </p>
            <ul class="mt-5 space-y-2 text-sm text-muted">
              <li class="flex gap-2"><span aria-hidden="true" class="material-symbols-outlined text-base text-emerald-500">check</span> Layout responsivo e identidade profissional</li>
              <li class="flex gap-2"><span aria-hidden="true" class="material-symbols-outlined text-base text-emerald-500">check</span> Organização estratégica de seções e CTA</li>
              <li class="flex gap-2"><span aria-hidden="true" class="material-symbols-outlined text-base text-emerald-500">check</span> Ajustes contínuos para evolução do site</li>
            </ul>
          </article>

          <article class="rounded-3xl border border-border/60 bg-card/60 p-6 shadow-sm backdrop-blur">
            <h2 class="text-lg font-extrabold">2) Suporte de TI</h2>
            <p class="mt-3 text-sm text-muted leading-6">
              Atendimento para diagnóstico e correção de problemas técnicos com foco em rapidez e
              continuidade da sua rotina.
            </p>
            <div class="mt-5 space-y-3">
              <div class="rounded-2xl bg-muted/60 p-4">
                <h3 class="font-bold">Ambiente estável</h3>
                <p class="mt-1 text-sm text-muted">Configuração de rede, sistema e periféricos.</p>
              </div>
              <div class="rounded-2xl bg-muted/60 p-4">
                <h3 class="font-bold">Segurança e prevenção</h3>
                <p class="mt-1 text-sm text-muted">Boas práticas para evitar falhas recorrentes.</p>
              </div>
              <div class="rounded-2xl bg-muted/60 p-4">
                <h3 class="font-bold">Suporte claro</h3>
                <p class="mt-1 text-sm text-muted">Explicação simples do que foi feito e próximo passo.</p>
              </div>
            </div>
          </article>
        </div>

        <div class="mt-6 rounded-3xl border border-border/60 bg-card/60 p-6 shadow-sm backdrop-blur">
          <h2 class="text-lg font-extrabold">3) Assistência técnica para notebooks</h2>
          <p class="mt-3 text-sm text-muted leading-6">
            Serviço técnico para notebooks com lentidão, superaquecimento, falhas de inicialização
            e necessidade de upgrade.
          </p>
          <ul class="mt-5 grid gap-3 text-sm text-muted md:grid-cols-3">
            <li class="rounded-2xl bg-muted/60 p-4">
              <p class="font-bold text-foreground">Limpeza e refrigeração</p>
              <p class="mt-1">Troca de pasta térmica e manutenção interna.</p>
            </li>
            <li class="rounded-2xl bg-muted/60 p-4">
              <p class="font-bold text-foreground">Upgrade de performance</p>
              <p class="mt-1">SSD, memória e ajustes para maior velocidade.</p>
            </li>
            <li class="rounded-2xl bg-muted/60 p-4">
              <p class="font-bold text-foreground">Reparo e diagnóstico</p>
              <p class="mt-1">Identificação técnica e solução objetiva.</p>
            </li>
          </ul>
        </div>

        <div class="mt-8 rounded-[2rem] border border-border/60 bg-card/60 p-6 shadow-sm backdrop-blur">
          <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 class="text-xl font-extrabold">Quer conversar?</h2>
              <p class="mt-2 text-sm text-muted">Envie uma mensagem e eu retorno com um caminho claro.</p>
            </div>
            <NuxtLink
              to="/contatoView"
              class="inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-3 text-sm font-extrabold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Falar agora
            </NuxtLink>
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
