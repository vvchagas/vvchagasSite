<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import LanguageSwitcher from "./LanguageSwitcher.vue";

const { t } = useLocale();
const { lock, unlock } = useScrollLock();

type Theme = "light" | "dark";

const isDark = ref(false);
const isMenuOpen = ref(false);

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

function closeMenu() {
  isMenuOpen.value = false;
}

watch(isMenuOpen, (open) => {
  if (open) {
    lock({ stopLenis: false });
  } else {
    unlock({ stopLenis: false });
  }
});

onMounted(() => {
  const theme = detectTheme();
  applyTheme(theme);
  syncStateFromDom();
});
</script>

<template>
  <!-- Header estático fixo na raiz da aplicação (Sem Teleport) -->
  <header class="site-header fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-header/80 backdrop-blur">
    <div class="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-3 md:px-6">
      
      <!-- Esquerda: Botão Mobile + Logo -->
      <div class="flex items-center gap-3">
        <button
          type="button"
          class="inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl border border-border/70 bg-card/60 p-2 text-sm font-semibold shadow-sm backdrop-blur transition hover:border-blue-500/60 focus:outline-none focus:ring-2 focus:ring-blue-500 md:hidden"
          :aria-expanded="isMenuOpen"
          aria-controls="menu-mobile"
          :aria-label="isMenuOpen ? t('nav.closeMenu') : t('nav.openMenu')"
          @click="isMenuOpen = !isMenuOpen"
        >
          <span
            aria-hidden="true"
            class="material-symbols-outlined block text-blue-600 dark:text-blue-400 transition-transform duration-200"
            :class="{ 'rotate-90': isMenuOpen }"
          >
            {{ isMenuOpen ? 'close' : 'menu' }}
          </span>
          <span class="sr-only">{{ isMenuOpen ? t('nav.closeMenu') : t('nav.openMenu') }}</span>
        </button>

        <NuxtLink
          to="/"
          class="group inline-flex items-center gap-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          @click="closeMenu"
        >
          <span class="site-logo text-base font-black tracking-tight text-foreground">
            VVCHAGAS<span class="text-blue-600">.</span>
          </span>
        </NuxtLink>
      </div>

      <!-- Centro: Navegação Desktop -->
      <nav aria-label="Navegação principal" class="hidden items-center gap-4 lg:gap-6 md:flex">
        <NuxtLink class="nav-link transition-transform duration-300 hover:-translate-y-0.5" to="/">
          {{ t('nav.home') }}
        </NuxtLink>
        <NuxtLink class="nav-link transition-transform duration-300 hover:-translate-y-0.5" to="/sobre">
          {{ t('nav.about') }}
        </NuxtLink>
        <NuxtLink class="nav-link transition-transform duration-300 hover:-translate-y-0.5" to="/servicos">
          {{ t('nav.services') }}
        </NuxtLink>
        <NuxtLink class="nav-link transition-transform duration-300 hover:-translate-y-0.5" to="/contato">
          {{ t('nav.contact') }}
        </NuxtLink>
      </nav>

      <!-- Direita: Idioma, Theme Toggle & Botão CTA -->
      <div class="flex items-center gap-2 lg:gap-3">
        <LanguageSwitcher class="hidden sm:inline-flex" />
        
        <button
          type="button"
          class="theme-toggle inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/60 p-1.5 text-sm font-semibold shadow-sm backdrop-blur transition hover:border-blue-500/60 focus:outline-none focus:ring-2 focus:ring-blue-500"
          :aria-label="isDark ? t('nav.toggleLight') : t('nav.toggleDark')"
          @click="toggleTheme"
        >
          <span aria-hidden="true" class="inline-flex size-8 items-center justify-center rounded-full bg-muted text-foreground">
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
          class="hidden sm:inline-flex items-center justify-center rounded-full bg-blue-600 px-3 lg:px-4 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          @click="closeMenu"
        >
          {{ t('nav.talk') }}
        </NuxtLink>
      </div>
    </div>
  </header>

  <!-- Teleport mantido EXCLUSIVAMENTE para a sobreposição do Backdrop e Menu Mobile -->
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="isMenuOpen"
        class="fixed inset-0 z-40 bg-black/50 md:hidden"
        @click="closeMenu"
      />
    </Transition>

    <Transition name="slide">
      <nav
        v-if="isMenuOpen"
        id="menu-mobile"
        aria-label="Menu mobile"
        class="fixed inset-y-0 left-0 mt-14 z-50 flex w-72 max-w-[80vw] flex-col border-r border-border/60 bg-background text-foreground shadow-2xl md:hidden"
      >
        <div class="flex flex-1 flex-col gap-3 overflow-y-auto px-5 py-6">
          <NuxtLink class="nav-link block border-b border-border/40 py-2.5 text-base" to="/" @click="closeMenu">
            {{ t('nav.home') }}
          </NuxtLink>
          <NuxtLink class="nav-link block border-b border-border/40 py-2.5 text-base" to="/sobre" @click="closeMenu">
            {{ t('nav.about') }}
          </NuxtLink>
          <NuxtLink class="nav-link block border-b border-border/40 py-2.5 text-base" to="/servicos" @click="closeMenu">
            {{ t('nav.services') }}
          </NuxtLink>
          <NuxtLink class="nav-link block border-b border-border/40 py-2.5 text-base" to="/contato" @click="closeMenu">
            {{ t('nav.contact') }}
          </NuxtLink>
        </div>

        <div class="mt-4 flex flex-col gap-3 border-t border-border/60 px-5 py-6">
          <NuxtLink
            to="/contato"
            class="mt-2 flex items-center justify-center rounded-full bg-blue-600 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700"
            @click="closeMenu"
          >
            {{ t('nav.talk') }}
          </NuxtLink>
        </div>
      </nav>
    </Transition>
  </Teleport>
</template>

<style scoped>
.bg-background {
  background-color: rgb(var(--bg));
}
.text-foreground {
  color: rgb(var(--fg));
}

.site-header {
  border-color: rgb(var(--border) / 0.7);
  background: rgb(var(--bg) / 0.74);
  box-shadow: 0 8px 30px rgb(15 23 42 / 0.04);
}

.site-logo {
  letter-spacing: 0.08em;
}

/* Links de Navegação com fallback de cor estrito para Dark Mode */
.nav-link {
  position: relative;
  font-weight: 600;
  font-size: 0.9rem;
  color: rgb(var(--fg) / 0.85);
  transition: color 0.2s ease;
}
:global(html.dark) .nav-link {
  color: #e2e8f0;
}

.nav-link::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -4px;
  height: 2px;
  width: 0%;
  border-radius: 999px;
  background: #3b82f6;
  transition: width 0.25s ease;
}

.nav-link:hover,
.nav-link:focus-visible {
  color: rgb(var(--fg));
}
:global(html.dark) .nav-link:hover,
:global(html.dark) .nav-link:focus-visible {
  color: #ffffff;
}

.nav-link:hover::after,
.nav-link:focus-visible::after {
  width: 100%;
}

.nav-link:focus-visible {
  outline: 2px solid #3b82f6;
  outline-offset: 4px;
  border-radius: 2px;
}

#talk-btn:hover {
  transform: translateY(-2px);
  transition: transform 0.3s ease;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
}
</style>