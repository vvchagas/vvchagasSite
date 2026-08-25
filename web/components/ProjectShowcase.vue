<script setup lang="ts">
import type { ComponentPublicInstance } from "vue";
import { getTranslatedProjects, type ResolvedProject } from "~/shared/projects";
import { useScrollReveal } from "~/composables/useScrollReveal";

const props = withDefaults(
  defineProps<{
    eyebrow?: string;
    title?: string;
    description?: string;
    compact?: boolean;
    /** Número de colunas do grid (padrão: 3). */
    columns?: number;
    /** Layout da lista de projetos. */
    layout?: "grid" | "centered";
    /** Oculta o bloco de título/descrição (usado quando o título é renderizado fora). */
    hideHeading?: boolean;
    /** Lista de slugs para exibir. Se vazio, exibe todos os projetos. */
    slugs?: string[];
  }>(),
  {
    eyebrow: "",
    title: "",
    description: "",
    compact: false,
    columns: 3,
    layout: "grid",
    hideHeading: false,
    slugs: () => [],
  },
);

const { t, locale } = useLocale();
const { lock, unlock } = useScrollLock();

const allProjects = computed(() => getTranslatedProjects(locale.value));

const translatedProjects = computed(() => {
  if (!props.slugs.length) return allProjects.value;
  return allProjects.value.filter((project) => props.slugs.includes(project.slug));
});

// Classes de grid fixas para o Tailwind gerar os estilos corretamente.
const gridClasses: Record<number, string> = {
  1: "md:grid-cols-1",
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
};

const gridClass = computed(() => gridClasses[props.columns] ?? "md:grid-cols-3");
const listClass = computed(() =>
  props.layout === "centered" ? "project-showcase__list--centered" : "grid gap-6",
);

const activeSlug = ref<string | null>(null);
const activeProject = computed<ResolvedProject | null>(
  () => translatedProjects.value.find((project) => project.slug === activeSlug.value) ?? null,
);

const lightboxImage = ref<string | null>(null);

const sectionEl = ref<HTMLElement | null>(null);
useScrollReveal(sectionEl);

const cardEls = ref<HTMLElement[]>([]);
function setCardRef(el: Element | ComponentPublicInstance | null) {
  if (el instanceof HTMLElement && !cardEls.value.includes(el)) {
    cardEls.value.push(el);
  }
}

onMounted(() => {
  if (typeof window === "undefined" || !cardEls.value.length) return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    cardEls.value.forEach((el) => {
      el.style.opacity = "1";
      el.style.transform = "none";
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          const target = entry.target as HTMLElement;
          target.style.transition = `opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.08}s, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.08}s`;
          target.style.opacity = "1";
          target.style.transform = "translateY(0)";
          observer.unobserve(target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
  );

  cardEls.value.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(24px)";
    observer.observe(el);
  });
});

function openProject(slug: string) {
  activeSlug.value = slug;
}

function closeProject() {
  activeSlug.value = null;
}

function openLightbox(image: string) {
  lightboxImage.value = image;
  lock();
}

function closeLightbox() {
  lightboxImage.value = null;
  unlock();
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
  unlock();
});
</script>

<template>
  <section ref="sectionEl" class="project-showcase mt-10">
    <div v-if="!props.hideHeading" class="mb-10 max-w-3xl space-y-4" :class="{ 'mb-7': props.compact }">
      <p class="mt-10 text-xs font-semibold uppercase tracking-[0.3em] text-blue-600 dark:text-blue-400 sm:text-sm">
        {{ props.eyebrow || t('portfolio.eyebrow') }}
      </p>
      <h2 class="text-3xl font-black tracking-tight sm:text-4xl" :class="{ 'sm:text-3xl': props.compact }">
        {{ props.title || t('portfolio.title') }}
      </h2>
      <p class="text-base leading-7 text-muted sm:text-lg sm:leading-8">
        {{ props.description || t('portfolio.description') }}
      </p>
    </div>

    <div :class="[listClass, props.layout === 'grid' ? gridClass : '']">
      <article
        v-for="project in translatedProjects"
        :id="project.slug"
        :key="project.slug"
        :ref="setCardRef"
        class="projectslug hover:-translate-y-0.75 duration-600 group relative overflow-hidden rounded-3xl border border-border/60 bg-card/70 p-5 shadow-sm backdrop-blur flex flex-col justify-between"
      >
        <div class="project-card__light absolute inset-0 opacity-0 transition-opacity duration-500" aria-hidden="true" />
        <div class="relative flex flex-col h-full justify-between">
          <div>
            <div class="flex items-start justify-between gap-4">
              <div>
                <h3 class="text-lg font-extrabold">{{ project.title }}</h3>
                <p class="mt-2 text-sm text-muted">{{ project.description }}</p>
              </div>
              <span class="badge border border-border/60 rounded-full px-2 py-1 text-xs font-bold shrink-0">{{ project.tag }}</span>
            </div>

            <div class="mt-4 flex aspect-4/3 items-center justify-center overflow-hidden rounded-2xl bg-muted/60 ring-1 ring-border/60">
              <img
                v-if="project.image"
                :src="project.image"
                :alt="project.title"
                class="h-full w-full cursor-pointer object-cover transition duration-300 hover:scale-105"
                loading="lazy"
                @click="openLightbox(project.image)"
              >
              <div v-else class="project-illustration relative flex h-16 w-16 items-center justify-center rounded-full bg-blue/60">
                <span class="material-symbols-outlined text-2xl">{{ project.icon }}</span>
              </div>
            </div>

            <ul class="mt-4 space-y-2 text-sm text-muted">
              <li v-for="highlight in project.highlights" :key="highlight" class="flex gap-2">
                <span aria-hidden="true" class="material-symbols-outlined text-base text-emerald-600">check</span>
                {{ highlight }}
              </li>
            </ul>
          </div>

          <div class="mt-5 grid gap-2">
            <button
              type="button"
              class="flex items-center justify-center gap-1.5 px-3 py-2.5 text-xs sm:text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-full transition text-center leading-snug"
              @click="openProject(project.slug)"
            >
              <span>{{ t('portfolio.viewFull') }}</span>
              <span class="material-symbols-outlined text-base" aria-hidden="true">info</span>
            </button>

            <NuxtLink
              :to="{ path: '/contato', query: { projeto: project.title } }"
              class="project-action--secondary border border-border/60 bg-background hover:bg-muted rounded-full flex items-center justify-center gap-1.5 px-3 py-2.5 text-xs sm:text-sm font-semibold transition text-center leading-snug"
            >
              <span>{{ t('portfolio.wantSimilar') }}</span>
              <span class="material-symbols-outlined text-base" aria-hidden="true">chat</span>
            </NuxtLink>
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
          <div class="lightbox-container">
            <button
              type="button"
              class="lightbox-close"
              :aria-label="t('portfolio.lightboxClose')"
              @click="closeLightbox"
            >
              <span aria-hidden="true" class="material-symbols-outlined">close</span>
            </button>
            <img :src="lightboxImage" :alt="t('portfolio.lightboxAlt')" class="lightbox-image">
          </div>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>

<style scoped>
.project-showcase__list--centered {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.5rem;
}

.project-showcase__list--centered > article {
  width: 100%;
  max-width: 32rem;
}

@media (min-width: 768px) {
  .project-showcase__list--centered > article {
    flex: 1 1 20rem;
  }
}

.projectslug:hover {
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
  background: rgb(0 0 0 / 0.75);
  border-color: rgb(250, 9, 1)
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
.bg-background {
  background-color: rgb(var(--bg));
}
.text-foreground {
  color: rgb(var(--fg));
}
</style>