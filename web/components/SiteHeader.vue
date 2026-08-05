<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import LanguageSwitcher from "./LanguageSwitcher.vue";

const { t } = useLocale();
const { lock, unlock } = useScrollLock();
const isDark = ref(false);
const isMenuOpen = ref(false);
type Theme = "light" | "dark";

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  if (theme === "dark") root.classList.add("dark");
  else root.classList.remove("dark");
}

function detectTheme(): Theme {
  const stored = typeof window !== "undefined" ? window.localStorage.getItem("theme") : null;
  if (stored === "dark" || stored === "light") return stored;
  return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function syncStateFromDom() {
  isDark.value = document.documentElement.classList.contains("dark");
}

function toggleTheme(event: MouseEvent) {
  const doc = document as Document & { startViewTransition?: (callback: () => void) => { ready: Promise<void> } };
  if (!doc.startViewTransition) {
    executeThemeToggle();
    return;
  }

  const x = event.clientX;
  const y = event.clientY;
  const endRadius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));

  const transition = doc.startViewTransition(() => {
    executeThemeToggle();
  });

  transition.ready.then(() => {
    const clipPath = [
      `circle(0px at ${x}px ${y}px)`,
      `circle(${endRadius}px at ${x}px ${y}px)`,
    ];

    document.documentElement.animate(
      {
        clipPath: isDark.value ? [...clipPath].reverse() : clipPath,
      },
      {
        duration: 450,
        easing: "ease-in-out",
        pseudoElement: isDark.value ? "::view-transition-old(root)" : "::view-transition-new(root)",
      },
    );
  });
}

function executeThemeToggle() {
  const next: Theme = isDark.value ? "light" : "dark";
  window.localStorage.setItem("theme", next);
  applyTheme(next);
  syncStateFromDom();
}

watch(isMenuOpen, (open) => {
  if (open) {
    lock();
  } else {
    unlock();
  }
});

onMounted(() => {
  const theme = detectTheme();
  applyTheme(theme);
  syncStateFromDom();
});
</script>

<template>
  <header class="sticky top-0 z-50 border-b border-border/60 bg-header/80 backdrop-blur">
    <div class="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-3 md:px-6">
      <div class="flex items-center gap-3">
        <button
          type="button"
          class="inline-flex items-center justify-center rounded-full border border-border/70 bg-card/60 p-2 text-sm font-semibold shadow-sm backdrop-blur transition hover:border-blue-500/60 focus:outline-none focus:ring-2 focus:ring-blue-500 md:hidden"
          :aria-expanded="isMenuOpen"
          aria-controls="menu-mobile"
          :aria-label="isMenuOpen ? t('nav.closeMenu') : t('nav.openMenu')"
          @click="isMenuOpen = !isMenuOpen"
        >
          <span
            aria-hidden="true"
            class="material-symbols-outlined block text-blue-600 dark:text-blue-400 transition-transform duration-200"
            :class="{ 'rotate-90': isMenuOpen }"
          >{{ isMenuOpen ? 'close' : 'menu' }}</span>
          <span class="sr-only">{{ isMenuOpen ? t('nav.closeMenu') : t('nav.openMenu') }}</span>
        </button>

        <NuxtLink
          to="/"
          class="group inline-flex items-center gap-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          @click="isMenuOpen = false"
        >
          <span class="text-base font-black tracking-tight">VVCHAGAS</span>
        </NuxtLink>
      </div>

      <nav aria-label="Navegação principal" class="hidden items-center gap-6 md:flex">
        <NuxtLink class="nav-link hover:-translate-y-0.5 duration-300" to="/">{{ t('nav.home') }}</NuxtLink>
        <NuxtLink class="nav-link hover:-translate-y-0.5 duration-300" to="/sobre">{{ t('nav.about') }}</NuxtLink>
        <NuxtLink class="nav-link hover:-translate-y-0.5 duration-300" to="/servicos">{{ t('nav.services') }}</NuxtLink>
        <NuxtLink class="nav-link hover:-translate-y-0.5 duration-300" to="/contato">{{ t('nav.contact') }}</NuxtLink>
      </nav>

      <div class="flex items-center gap-3">
        <LanguageSwitcher class="hidden sm:inline-flex" />
        <button
          type="button"
          class="theme-toggle inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/60 p-1.5 text-sm font-semibold shadow-sm backdrop-blur transition hover:border-blue-500/60 focus:outline-none focus:ring-2 focus:ring-blue-500"
          :aria-label="isDark ? t('nav.toggleLight') : t('nav.toggleDark')"
          @click="toggleTheme"
        >
          <span aria-hidden="true" class="inline-flex size-8 items-center justify-center rounded-full bg-muted text-foreground/90">
            <svg v-if="isDark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M21.64 13.65a1 1 0 0 0-1.17-.74 8.1 8.1 0 0 1-10.4-10.4 1 1 0 0 0-.74-1.17A10 10 0 1 0 21.64 13.65Z" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M12 18a6 6 0 1 1 0-12 6 6 0 0 1 0 12Zm0-16a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0V3a1 1 0 0 1 1-1Zm0 18a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0v-1a1 1 0 0 1 1-1ZM4.22 5.64a1 1 0 0 1 1.41 0l.71.7a1 1 0 1 1-1.41 1.42l-.71-.71a1 1 0 0 1 0-1.41Zm13.94 13.94a1 1 0 0 1 1.41 0l.71.7a1 1 0 1 1-1.41 1.42l-.71-.71a1 1 0 0 1 0-1.41ZM1 12a1 1 0 0 1 1-1h1a1 1 0 1 1 0 2H2a1 1 0 0 1-1-1Zm18 0a1 1 0 0 1 1-1h1a1 1 0 1 1 0 2h-1a1 1 0 0 1-1-1ZM4.22 18.36a1 1 0 0 1 0-1.41l.71-.71a1 1 0 1 1 1.41 1.42l-.71.7a1 1 0 0 1-1.41 0Zm13.94-13.94a1 1 0 0 1 0-1.41l.71-.71a1 1 0 1 1 1.41 1.42l-.71.7a1 1 0 0 1-1.41 0Z" />
            </svg>
          </span>
        </button>

        <NuxtLink
          id="talk-btn"
          to="/contato"
          class="hidden sm:inline-flex items-center justify-center rounded-full bg-blue-600 px-4 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {{ t('nav.talk') }}
        </NuxtLink>
      </div>
    </div>

    <!-- Backdrop do menu mobile -->
    <Transition name="fade">
      <div
        v-if="isMenuOpen"
        class="fixed inset-0 top-[61px] z-40 bg-black/50 backdrop-blur-xs md:hidden"
        @click="isMenuOpen = false"
      />
    </Transition>

    <!-- Menu mobile -->
    <nav
      id="menu-mobile"
      aria-label="Menu mobile"
      class="fixed left-0 bottom-0 top-[61px] w-72 max-w-[80vw] border-r border-border/60 bg-background/95 bg-background  transition-transform duration-300 ease-in-out md:hidden"
      :class="isMenuOpen ? 'translate-x-0' : '-translate-x-full'"
    >
      <div class="flex flex-col gap-3 h-full overflow-y-auto px-5 py-6 bg-card text-foreground">
        <NuxtLink class="nav-link block py-2.5 text-base border-b border-border/40" to="/" @click="isMenuOpen = false">{{ t('nav.home') }}</NuxtLink>
        <NuxtLink class="nav-link block py-2.5 text-base border-b border-border/40" to="/sobre" @click="isMenuOpen = false">{{ t('nav.about') }}</NuxtLink>
        <NuxtLink class="nav-link block py-2.5 text-base border-b border-border/40" to="/servicos" @click="isMenuOpen = false">{{ t('nav.services') }}</NuxtLink>
        <NuxtLink class="nav-link block py-2.5 text-base border-b border-border/40" to="/contato" @click="isMenuOpen = false">{{ t('nav.contact') }}</NuxtLink>
        
        <div class="mt-4 pt-4 border-t border-border/60 flex flex-col gap-3">
          <LanguageSwitcher class="w-full justify-start" />
          <NuxtLink
            to="/contato"
            class="mt-2 flex items-center justify-center rounded-full bg-blue-600 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700"
            @click="isMenuOpen = false"
          >
            {{ t('nav.talk') }}
          </NuxtLink>
        </div>
      </div>
    </nav>
  </header>
</template>

<style scoped>
#talk-btn:hover {
  transform: translateY(-2px);
  transition: transform 0.3s ease;
}
.bg-background {
  background-color: rgb(var(--bg));
}
.text-foreground {
  color: rgb(var(--fg));
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>