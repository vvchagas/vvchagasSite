<script setup lang="ts">
import type { Project } from "~/shared/projects";

const props = defineProps<{
  project: Project | null;
  open: boolean;
}>();

const emit = defineEmits<{ (e: "close"): void }>();

const lenis = useLenis();
const dialogRef = ref<HTMLElement | null>(null);

function close() {
  emit("close");
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === "Escape") close();
}

watch(
  () => props.open,
  (isOpen) => {
    if (isOpen) {
      lenis?.stop();
      document.addEventListener("keydown", onKeydown);
      nextTick(() => dialogRef.value?.focus());
    } else {
      lenis?.start();
      document.removeEventListener("keydown", onKeydown);
    }
  },
);

onUnmounted(() => {
  document.removeEventListener("keydown", onKeydown);
  lenis?.start();
});
</script>

<template>
  <Teleport to="body">
    <Transition name="project-modal">
      <div
        v-if="open && project"
        class="project-modal-overlay"
        @mousedown.self="close"
      >
        <div
          ref="dialogRef"
          class="project-modal"
          role="dialog"
          aria-modal="true"
          :aria-label="project.title"
          tabindex="-1"
          data-lenis-prevent
        >
          <button
            type="button"
            class="project-modal__close"
            aria-label="Fechar"
            @click="close"
          >
            <span aria-hidden="true" class="material-symbols-outlined">close</span>
          </button>

          <div class="flex items-start justify-between gap-4 pr-10">
            <div>
              <p class="text-xs font-semibold uppercase tracking-[0.3em] text-blue-600 dark:text-blue-400">
                {{ project.tag }}
              </p>
              <h2 class="mt-1 text-2xl font-black tracking-tight sm:text-3xl">{{ project.title }}</h2>
            </div>
            <div class=" hidden shrink-0 sm:grid" aria-hidden="true">
              <span class="material-symbols-outlined">{{ project.icon }}</span>
            </div>
          </div>

          <p class="mt-5 text-sm leading-7 text-muted sm:text-base sm:leading-8">
            {{ project.longDescription }}
          </p>

          <ul class="mt-5 grid gap-2 text-sm text-muted sm:grid-cols-2">
            <li v-for="highlight in project.highlights" :key="highlight" class="flex gap-2">
              <span aria-hidden="true" class="material-symbols-outlined text-base text-emerald-600">check</span>
              {{ highlight }}
            </li>
          </ul>

          <div class="mt-6">
            <p class="text-xs font-semibold uppercase tracking-[0.2em] text-muted">Tecnologias</p>
            <div class="mt-2 flex flex-wrap gap-2">
              <span v-for="tech in project.stack" :key="tech" class="stack-badge">{{ tech }}</span>
            </div>
          </div>

          <div class="mt-7 grid gap-2 sm:grid-cols-2">
            <a
              v-if="project.githubUrl"
              :href="project.githubUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="project-action project-action--github"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                <path
                  d="M12 .5C5.73.5.5 5.73.5 12c0 5.09 3.29 9.4 7.86 10.93.58.1.79-.25.79-.56v-2.17c-3.2.7-3.88-1.36-3.88-1.36-.53-1.33-1.29-1.69-1.29-1.69-1.05-.72.08-.7.08-.7 1.17.08 1.78 1.2 1.78 1.2 1.03 1.78 2.71 1.26 3.37.97.1-.75.4-1.26.73-1.55-2.56-.29-5.26-1.28-5.26-5.7 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.24 2.77.12 3.06.74.8 1.18 1.83 1.18 3.09 0 4.43-2.7 5.4-5.28 5.69.42.36.78 1.07.78 2.16v3.2c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z"
                />
              </svg>
              Ver projeto no GitHub
            </a>
            <NuxtLink
              :to="{ path: '/contatoView', query: { projeto: project.title } }"
              class="project-action project-action--secondary"
              @click="close"
            >
              Eu quero um projeto semelhante <span class="material-symbols-outlined">chat</span>
            </NuxtLink>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.project-modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background: rgb(0 0 0 / 0.55);
  backdrop-filter: blur(4px);
}

.project-modal {
  position: relative;
  width: 100%;
  max-width: 40rem;
  max-height: 85vh;
  overflow-y: auto;
  border-radius: 1.75rem;
  border: 1px solid rgb(var(--border) / 1);
  background: rgb(var(--card));
  color: rgb(var(--fg));
  padding: 2rem;
  box-shadow: 0 30px 70px -20px rgb(0 0 0 / 0.45);
}

.project-modal__close {
  position: absolute;
  top: 1.25rem;
  right: 1.25rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 999px;
  border: 1px solid rgb(var(--border) / 1);
  background: rgb(var(--bg) / 0.6);
  color: rgb(var(--fg));
  transition: transform 0.2s ease, border-color 0.2s ease;
}
.project-modal__close:hover {
  transform: rotate(90deg);
  border-color: rgb(233 103 54 / 0.75);
}

.stack-badge {
  border-radius: 999px;
  border: 1px solid rgb(var(--border) / 1);
  background: rgb(59 130 246 / 0.1);
  color: rgb(37 99 235);
  padding: 0.3rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 700;
}
:global(html.dark) .stack-badge {
  color: rgb(147 197 253);
  background: rgb(59 130 246 / 0.16);
}

.project-action--github {
  background: #171515;
  color: #fff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}
.project-action--github:hover {
  background: #2b2828;
}

.project-modal-enter-active,
.project-modal-leave-active {
  transition: opacity 0.2s ease;
}
.project-modal-enter-from,
.project-modal-leave-to {
  opacity: 0;
}
.project-modal-enter-active .project-modal,
.project-modal-leave-active .project-modal {
  transition: transform 0.25s ease, opacity 0.25s ease;
}
.project-modal-enter-from .project-modal,
.project-modal-leave-to .project-modal {
  transform: translateY(16px) scale(0.98);
  opacity: 0;
}

@media (prefers-reduced-motion: reduce) {
  .project-modal-enter-active,
  .project-modal-leave-active,
  .project-modal-enter-active .project-modal,
  .project-modal-leave-active .project-modal {
    transition: none;
  }
}

::-webkit-scrollbar{
  background-color: rgb(var(--bg));
  width: 10px;
  border-radius: 999px;
}
::-webkit-scrollbar-thumb{
  background-color: rgb(var(--muted) / 0.3);
  border-radius: 999px;
}
</style>
