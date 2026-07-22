<script setup lang="ts">
type Project = { slug: string; title: string; description: string; tag: string; icon: string; highlights: string[]; url?: string };

withDefaults(defineProps<{ eyebrow?: string; title?: string; description?: string; compact?: boolean }>(), {
  eyebrow: "Meus Projetos",
  title: "Projetos que transformam ideias em resultado",
  description: "Cada projeto combina estratégia, clareza visual e uma experiência fluida em qualquer tela.",
  compact: false,
});

const projects: Project[] = [
  { slug: "landing-servicos", title: "Landing de Serviços", description: "Seções organizadas e CTA forte", tag: "SITE", icon: "explore", highlights: ["Responsivo e semântico", "UI clara para conversão", "Performance e acessibilidade"] },
  { slug: "portfolio-destaque", title: "Portfólio com destaque", description: "Grid, cards e narrativa visual", tag: "UI", icon: "grid_view", highlights: ["Acessibilidade", "Animações sutis", "Performance"] },
  { slug: "pagina-atendimento", title: "Página de Atendimento", description: "Formulário elegante e rápido", tag: "CRM", icon: "mail", highlights: ["UX clara", "CTA visível", "Fluxo de envio direto"] },
];
</script>

<template>
  <section class="project-showcase mt-10" data-reveal>
    <div class="mb-10 max-w-3xl space-y-4" :class="{ 'mb-7': compact }">
      <p class="text-xs font-semibold uppercase tracking-[0.3em] text-blue-600 dark:text-blue-400 sm:text-sm">{{ eyebrow }}</p>
      <h2 class="text-3xl font-black tracking-tight sm:text-4xl" :class="{ 'sm:text-3xl': compact }">{{ title }}</h2>
      <p class="text-base leading-7 text-muted sm:text-lg sm:leading-8">{{ description }}</p>
    </div>
    <div class="grid gap-6 md:grid-cols-3">
      <article v-for="project in projects" :id="project.slug" :key="project.slug" class="project-card group relative overflow-hidden rounded-3xl border border-border/60 bg-card/70 p-5 shadow-sm backdrop-blur" data-reveal>
        <div class="project-card__light absolute inset-0 opacity-0 transition-opacity duration-500" aria-hidden="true" />
        <div class="relative">
          <div class="flex items-start justify-between gap-4"><div><h3 class="text-lg font-extrabold">{{ project.title }}</h3><p class="mt-2 text-sm text-muted">{{ project.description }}</p></div><span class="badge border border-border/60 rounded-full px-2 text-sm">{{ project.tag }}</span></div>
          <div class="project-preview mt-4 flex aspect-[4/3] items-center justify-center rounded-2xl bg-muted/60 ring-1 ring-border/60">
            <div class="project-illustration" aria-hidden="true">
              <span class="project-illustration__orbit" />
              <span class="project-illustration__cube" />
              <span class="material-symbols-outlined project-illustration__icon">{{ project.icon }}</span>
            </div>
          </div>
          <ul class="mt-4 space-y-2 text-sm text-muted"><li v-for="highlight in project.highlights" :key="highlight" class="flex gap-2"><span aria-hidden="true" class="material-symbols-outlined text-base text-emerald-600">check</span>{{ highlight }}</li></ul>
          <div class="mt-5 grid gap-2">
            <!-- Ao publicar um projeto, inclua url no objeto acima para apontar ao projeto real. -->
            <a :href="project.url || `#${project.slug}`" class="project-action project-action--primary">Ver o projeto completo <span aria-hidden="true">↗</span></a>
            <NuxtLink :to="{ path: '/contatoView', query: { projeto: project.title } }" class="project-action project-action--secondary">Eu quero um projeto semelhante <span aria-hidden="true">→</span></NuxtLink>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>
