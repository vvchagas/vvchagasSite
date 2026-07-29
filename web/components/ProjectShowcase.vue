<script setup lang="ts">
import { projects } from "~/shared/projects";

withDefaults(defineProps<{ eyebrow?: string; title?: string; description?: string; compact?: boolean }>(), {
  eyebrow: "Meus Projetos",
  title: "Projetos que transformam ideias em resultado",
  description: "Cada projeto combina estratégia, clareza visual e uma experiência fluida em qualquer tela.",
  compact: false,
});

const activeSlug = ref<string | null>(null);
const activeProject = computed(() => projects.find((project) => project.slug === activeSlug.value) ?? null);

const lightboxImage = ref<string | null>(null);

function openProject(slug: string) {
  activeSlug.value = slug;
}

function closeProject() {
  activeSlug.value = null;
}

function openLightbox(image: string) {
  lightboxImage.value = image;
}

function closeLightbox() {
  lightboxImage.value = null;
}

function onLightboxKeydown(event: KeyboardEvent) {
  if (event.key === "Escape") closeLightbox();
}

watch(lightboxImage, (val) => {
  if (val) {
    document.addEventListener("keydown", onLightboxKeydown);
  } else {
    document.removeEventListener("keydown", onLightboxKeydown);
  }
});

onUnmounted(() => {
  document.removeEventListener("keydown", onLightboxKeydown);
});
</script>

<template>
  <section class="project-showcase mt-10" data-reveal>
    <div class="mb-10 max-w-3xl space-y-4" :class="{ 'mb-7': compact }">
      <p class="text-xs font-semibold uppercase tracking-[0.3em] text-blue-600 dark:text-blue-400 sm:text-sm">{{ eyebrow }}</p>
      <h2 class="text-3xl font-black tracking-tight sm:text-4xl" :class="{ 'sm:text-3xl': compact }">{{ title }}</h2>
      <p class="text-base leading-7 text-muted sm:text-lg sm:leading-8">{{ description }}</p>
    </div>
    <div class="grid gap-6 md:grid-cols-3">
      <article v-for="project in projects" :id="project.slug" :key="project.slug" class="projectslug hover:-translate-y-[3px] duration-600 group relative overflow-hidden rounded-3xl border border-border/60 bg-card/70 p-5 shadow-sm backdrop-blur" data-reveal>
        <div class="project-card__light absolute inset-0 opacity-0 transition-opacity duration-500" aria-hidden="true" />
        <div class="relative">
          <div class="flex items-start justify-between gap-4"><div><h3 class="text-lg font-extrabold">{{ project.title }}</h3><p class="mt-2 text-sm text-muted">{{ project.description }}</p></div><span class="badge border border-border/60 rounded-full px-2 py-1 text-sm">{{ project.tag }}</span></div>
          <div class="mt-4 flex aspect-[4/3] items-center justify-center overflow-hidden rounded-2xl bg-muted/60 ring-1 ring-border/60">
            <img v-if="project.image" :src="project.image" :alt="project.title" class="h-full w-full cursor-pointer object-cover transition duration-300 hover:scale-105" loading="lazy" @click="openLightbox(project.image)">
            <div v-else class="project-illustration relative flex h-16 w-16 items-center justify-center rounded-full bg-blue/60">
              <span class="material-symbols-outlined text-2xl">{{ project.icon }}</span>
            </div>
          </div>
          <ul class="mt-4 space-y-2 text-sm text-muted"><li v-for="highlight in project.highlights" :key="highlight" class="flex gap-2"><span aria-hidden="true" class="material-symbols-outlined text-base text-emerald-600">check</span>{{ highlight }}</li></ul>
          <div class="mt-5 grid gap-2">
            <button type="button" class="project-action hover:bg-blue-800 bg-blue-600" @click="openProject(project.slug)">
              Ver o projeto completo <span class="material-symbols-outlined" aria-hidden="true">info</span>
            </button>
            <NuxtLink :to="{ path: '/contatoView', query: { projeto: project.title } }" class="project-action project-action--secondary">Eu quero um projeto semelhante <span class="material-symbols-outlined" aria-hidden="true">chat</span></NuxtLink>
          </div>
        </div>
      </article>
    </div>

    <ProjectModal :project="activeProject" :open="!!activeProject" @close="closeProject" />

    <Teleport to="body">
      <Transition name="lightbox">
        <div
          v-if="lightboxImage"
          class="lightbox-overlay"
          @click.self="closeLightbox"
        >
          <div class="lightbox-container" data-lenis-prevent>
            <button
              type="button"
              class="lightbox-close"
              aria-label="Fechar imagem"
              @click="closeLightbox"
            >
              <span aria-hidden="true" class="material-symbols-outlined">close</span>
            </button>
            <img :src="lightboxImage" alt="Foto do projeto ampliada" class="lightbox-image">
          </div>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>


<style scoped>
.projectslug:hover{
  background-color: rgba(59, 130, 246, 0.1);
  border-color: rgba(59, 130, 246, 0.5);  
}

.lightbox-overlay {
  position: fixed;
  inset: 0;
  z-index: 300;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background: rgb(0 0 0 / 0.7);
  backdrop-filter: blur(6px);
}

.lightbox-container {
  position: relative;
  max-width: min(90vw, 56rem);
  max-height: 85vh;
  border-radius: 1.5rem;
  overflow: hidden;
  box-shadow: 0 30px 80px -20px rgb(0 0 0 / 0.6);
}

.lightbox-image {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
  max-height: 85vh;
}

.lightbox-close {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 999px;
  border: 1px solid rgb(255 255 255 / 0.25);
  background: rgb(0 0 0 / 0.5);
  color: #fff;
  cursor: pointer;
  transition: transform 0.2s ease, background 0.2s ease;
  z-index: 1;
}
.lightbox-close:hover {
  transform: rotate(90deg);
  background: rgb(0 0 0 / 0.75);
}

.lightbox-enter-active,
.lightbox-leave-active {
  transition: opacity 0.2s ease;
}
.lightbox-enter-from,
.lightbox-leave-to {
  opacity: 0;
}
.lightbox-enter-active .lightbox-container,
.lightbox-leave-active .lightbox-container {
  transition: transform 0.25s ease, opacity 0.25s ease;
}
.lightbox-enter-from .lightbox-container,
.lightbox-leave-to .lightbox-container {
  transform: scale(0.92);
  opacity: 0;
}

@media (prefers-reduced-motion: reduce) {
  .lightbox-enter-active,
  .lightbox-leave-active,
  .lightbox-enter-active .lightbox-container,
  .lightbox-leave-active .lightbox-container {
    transition: none;
  }
}
</style>