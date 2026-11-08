<script setup lang="ts">
import { ref, onBeforeUnmount, onMounted } from "vue";
import LanguageSwitcher from "./LanguageSwitcher.vue";

const { t } = useLocale();
const { lock, unlock } = useScrollLock();

// Link de navegação só com utilitários: cor, sublinhado que cresce (::after) e anel de foco.
const navLinkBase =
  "relative text-[0.9rem] font-semibold text-[rgb(var(--fg)/0.85)] transition-all duration-300 hover:text-[rgb(var(--fg))] focus-visible:text-[rgb(var(--fg))] " +
  "after:absolute after:bottom-[-4px] after:left-0 after:h-0.5 after:w-0 after:rounded-sm after:bg-violet-400 after:transition-all after:duration-300 hover:after:w-full focus-visible:after:w-full " +
  "focus-visible:rounded-xs focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-400";
const navLink = `${navLinkBase} hover:-translate-y-0.5`;
const drawerLink = `${navLinkBase} flex items-center gap-3 border-b border-border/40 py-2.5`;

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

function toggleTheme(event: MouseEvent) {
  const doc = document as Document & {
    startViewTransition?: (callback: () => void) => { ready: Promise<void> };
  };
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!doc.startViewTransition || prefersReducedMotion) {
    executeThemeToggle();
    return;
  }

  const x = event.clientX;
  const y = event.clientY;
  const endRadius = Math.hypot(
    Math.max(x, innerWidth - x),
    Math.max(y, innerHeight - y),
  );

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
        pseudoElement: isDark.value
          ? "::view-transition-old(root)"
          : "::view-transition-new(root)",
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

function openDrawer() {
  if (isMenuOpen.value) return;
  isMenuOpen.value = true;
  lock({ stopLenis: false });
}

function closeDrawer() {
  if (!isMenuOpen.value) return;
  isMenuOpen.value = false;
  unlock({ stopLenis: false });
}

function toggleDrawer() {
  if (isMenuOpen.value) closeDrawer();
  else openDrawer();
}

// Ao passar de 900px com o menu aberto, o drawer some por CSS (min-[900px]:hidden), mas o estado
// e o travamento de scroll (html.scroll-locked + body overflow:hidden) ficariam presos no desktop.
let desktopQuery: MediaQueryList | undefined;
function closeOnDesktop(event: MediaQueryListEvent) {
  if (event.matches) closeDrawer();
}

onMounted(() => {
  const theme = detectTheme();
  applyTheme(theme);
  syncStateFromDom();
  desktopQuery = window.matchMedia("(min-width: 900px)");
  desktopQuery.addEventListener("change", closeOnDesktop);
});

onBeforeUnmount(() => {
  desktopQuery?.removeEventListener("change", closeOnDesktop);
  closeDrawer();
});
</script>

<template>
  <!-- Header estático fixo na raiz da aplicação (Sem Teleport) -->
  <header
    class="site-header fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-header/80"
  >
    <div
      class="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-6"
    >
      <!-- Esquerda: Botão Mobile + Logo -->
      <div class="flex items-center gap-3">
        <button
          type="button"
          class="interactive-border inline-flex min-h-11 min-w-11 items-center justify-center rounded-sm border bg-card/80 p-2 text-sm font-semibold text-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-400 min-[900px]:hidden transition-all duration-300 active:scale-95"
          :aria-expanded="isMenuOpen"
          aria-controls="menu-mobile"
          :aria-label="isMenuOpen ? t('nav.closeMenu') : t('nav.openMenu')"
          @click="toggleDrawer"
        >
          <span
            aria-hidden="true"
            class="material-symbols-outlined block transition-transform duration-300"
            :class="{ 'rotate-90': isMenuOpen }"
          >
            {{ isMenuOpen ? "close" : "menu" }}
          </span>
          <span class="sr-only">{{
            isMenuOpen ? t("nav.closeMenu") : t("nav.openMenu")
          }}</span>
        </button>

        <NuxtLink
          to="/"
          class="group inline-flex items-center gap-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
          @click="closeDrawer"
        >
          <span
            class="site-logo font-mono text-base font-bold tracking-tight text-foreground"
          >
            vvchagas<span class="text-gray-600 dark:text-gray-400">.</span>
          </span>
        </NuxtLink>
      </div>

      <!-- Centro: Navegação Desktop -->
      <nav
        aria-label="Navegação principal"
        class="hidden items-center gap-4 lg:gap-6 min-[900px]:flex"
      >
        <NuxtLink :class="navLink" to="/">
          {{ t("nav.home") }}
        </NuxtLink>
        <NuxtLink :class="navLink" to="/sobre">
          {{ t("nav.about") }}
        </NuxtLink>
        <NuxtLink :class="navLink" to="/servicos">
          {{ t("nav.services") }}
        </NuxtLink>
        <NuxtLink :class="navLink" to="/contato">
          {{ t("nav.contact") }}
        </NuxtLink>
      </nav>

      <!-- Direita: Idioma, Theme Toggle & Botão CTA -->
      <div class="flex items-center gap-2 lg:gap-3">
        <LanguageSwitcher class="hidden sm:inline-flex" />

        <button
          type="button"
          class="theme-toggle interactive-border inline-flex items-center gap-2 rounded-sm border bg-card/60 p-1.5 text-sm font-semibold shadow-sm focus:outline-none focus:ring-2 transition hover:scale-105 active:scale-95"
          :aria-label="isDark ? t('nav.toggleLight') : t('nav.toggleDark')"
          @click="toggleTheme"
        >
          <span
            aria-hidden="true"
            class="inline-flex size-8 items-center justify-center rounded-sm bg-muted text-foreground"
          >
            <svg
              v-if="isDark"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="18"
              height="18"
              fill="currentColor"
            >
              <path
                d="M21.64 13.65a1 1 0 0 0-1.17-.74 8.1 8.1 0 0 1-10.4-10.4 1 1 0 0 0-.74-1.17A10 10 0 1 0 21.64 13.65Z"
              />
            </svg>
            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="18"
              height="18"
              fill="currentColor"
            >
              <path
                d="M12 18a6 6 0 1 1 0-12 6 6 0 0 1 0 12Zm0-16a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0V3a1 1 0 0 1 1-1Zm0 18a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0v-1a1 1 0 0 1 1-1ZM4.22 5.64a1 1 0 0 1 1.41 0l.71.7a1 1 0 1 1-1.41 1.42l-.71-.71a1 1 0 0 1 0-1.41Zm13.94 13.94a1 1 0 0 1 1.41 0l.71.7a1 1 0 1 1-1.41 1.42l-.71-.71a1 1 0 0 1 0-1.41ZM1 12a1 1 0 0 1 1-1h1a1 1 0 1 1 0 2H2a1 1 0 0 1-1-1Zm18 0a1 1 0 0 1 1-1h1a1 1 0 1 1 0 2h-1a1 1 0 0 1-1-1ZM4.22 18.36a1 1 0 0 1 0-1.41l.71-.71a1 1 0 1 1 1.41 1.42l-.71.7a1 1 0 0 1-1.41 0Zm13.94-13.94a1 1 0 0 1 0-1.41l.71-.71a1 1 0 1 1 1.41 1.42l-.71.7a1 1 0 0 1-1.41 0Z"
              />
            </svg>
          </span>
        </button>

        <a
          id="talk-btn"
          :href="waLink(t('contact.whatsappPrefill'))"
          target="_blank"
          rel="noopener noreferrer"
          class="cta-primary hidden min-h-11 px-4 sm:inline-flex"
          @click="closeDrawer"
        >
          {{ t("nav.talk") }}
        </a>
      </div>
    </div>
  </header>

  <!-- Teleport mantido EXCLUSIVAMENTE para a sobreposição do Backdrop e Menu Mobile -->
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-300"
      leave-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isMenuOpen"
        class="fixed inset-0 z-40 bg-black/70 min-[900px]:hidden"
        @click="closeDrawer"
      />
    </Transition>

    <Transition
      enter-active-class="transition-transform duration-300"
      leave-active-class="transition-transform duration-300"
      enter-from-class="-translate-x-full"
      leave-to-class="-translate-x-full"
    >
      <nav
        v-if="isMenuOpen"
        id="menu-mobile"
        aria-label="Menu mobile"
        class=" bg-background fixed inset-y-0 left-0 top-0 z-50 flex h-dvh w-full max-w-full flex-col border-r border-border/70 bg-black text-foreground shadow-2xl min-[480px]:w-80 min-[480px]:max-w-xs min-[900px]:hidden"
        @keydown.esc="closeDrawer"
      >
        <div
          class="relative z-50 flex items-center justify-between border-b border-border/60 px-5 py-4"
        >
          <NuxtLink
            to="/"
            class="font-mono text-base font-bold tracking-tight text-foreground"
            @click="closeDrawer"
          >
            vvchagas<span class="text-foreground dark:text-gray-600">.</span>
          </NuxtLink>
          <button
            type="button"
            class="relative z-50 inline-flex size-11 items-center justify-center rounded-sm border border-border/70 bg-background text-foreground hover:text-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-400 transition hover:scale-105 active:scale-95"
            :aria-label="t('nav.closeMenu')"
            @click="closeDrawer"
          >
            <span aria-hidden="true" class="material-symbols-outlined"
              >close</span
            >
          </button>
        </div>

        <div class="flex flex-1 flex-col gap-3 overflow-y-auto px-5 py-6">
          <NuxtLink
            :class="drawerLink"
            to="/"
            @click="closeDrawer"
          >
            <span aria-hidden="true" class="material-symbols-outlined text-xl">
              home
            </span>
            {{ t("nav.home") }}
          </NuxtLink>

          <NuxtLink
            :class="drawerLink"
            to="/sobre"
            @click="closeDrawer"
          >
            <span aria-hidden="true" class="material-symbols-outlined text-xl">
              person
            </span>
            {{ t("nav.about") }}
          </NuxtLink>

          <NuxtLink
            :class="drawerLink"
            to="/servicos"
            @click="closeDrawer"
          >
            <span aria-hidden="true" class="material-symbols-outlined text-xl">
              build
            </span>
            {{ t("nav.services") }}
          </NuxtLink>

          <NuxtLink
            :class="drawerLink"
            to="/contato"
            @click="closeDrawer"
          >
            <span aria-hidden="true" class="material-symbols-outlined text-xl">
              mail
            </span>
            {{ t("nav.contact") }}
          </NuxtLink>
        </div>

        <div
          class="mt-4 flex flex-col gap-3 border-t border-border/60 px-5 py-6"
        >
          <a
            :href="waLink(t('contact.whatsappPrefill'))"
            target="_blank"
            rel="noopener noreferrer"
            class="cta-primary mt-2 w-full"
            @click="closeDrawer"
          >
            {{ t("nav.talk") }}
          </a>
        </div>
      </nav>
    </Transition>
  </Teleport>
</template>

<style scoped>

.site-header {
  border-color: rgb(var(--border) / 0.7);
  background: rgb(var(--bg) / 0.92);
  box-shadow: 0 8px 30px rgb(15 23 42 / 0.04);
}

.site-logo {
  letter-spacing: 0.08em;
}
</style>
