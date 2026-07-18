<script setup lang="ts">
const isDark = ref(false)
const isMenuOpen = ref(false);
type Theme = 'light' | 'dark'

function applyTheme(theme: Theme) {
  const root = document.documentElement
  if (theme === 'dark') root.classList.add('dark')
  else root.classList.remove('dark')
}

function detectTheme(): Theme {
  const stored = typeof window !== 'undefined' ? window.localStorage.getItem('theme') : null

  if (stored === 'dark' || stored === 'light') return stored

  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

function syncStateFromDom() {
  isDark.value = document.documentElement.classList.contains('dark')
}

function toggleTheme(event: MouseEvent) {
  if (!document.startViewTransition) {
    executeThemeToggle();
    return;
  }

  const x = event.clientX;
  const y = event.clientY;
  const endRadius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));

  const transition = document.startViewTransition(() => {
    executeThemeToggle();
  });

  transition.ready.then(() => {
    const clipPath = [
      `circle(0px at ${x}px ${y}px)`,
      `circle(${endRadius}px at ${x}px ${y}px)`
    ];
    
    document.documentElement.animate(
      {
        clipPath: isDark.value ? [...clipPath].reverse() : clipPath
      },
      {
        duration: 450,
        easing: 'ease-in-out',
        pseudoElement: isDark.value ? '::view-transition-old(root)' : '::view-transition-new(root)'
      }
    );
  });
}

function executeThemeToggle() {
  const next: Theme = isDark.value ? "light" : "dark";
  window.localStorage.setItem("theme", next);
  applyTheme(next);
  syncStateFromDom();
}
onMounted(() => {
  const theme = detectTheme()
  applyTheme(theme)
  syncStateFromDom()
})
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
          @click="isMenuOpen = !isMenuOpen"
        >
          <span
            aria-hidden="true"
            class="material-symbols-outlined block text-blue-600 dark:text-blue-400 transition-transform duration-200"
            :class="{ 'rotate-90': isMenuOpen }"
          >{{ isMenuOpen ? 'close' : 'menu' }}</span>
          <span class="sr-only">Abrir menu</span>
        </button>

        <NuxtLink
          to="/"
          class="group inline-flex items-center gap-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <span class="text-base font-black tracking-tight">VVCHAGAS</span>
        </NuxtLink>
      </div>

      <nav aria-label="Navegação principal" class="hidden items-center gap-6 md:flex">
        <NuxtLink class="nav-link hover:-translate-y-0.5 duration-300" to="/">Início</NuxtLink>
        <NuxtLink class="nav-link hover:-translate-y-0.5 duration-300" to="/aboutView">Sobre</NuxtLink>
        <NuxtLink class="nav-link hover:-translate-y-0.5 duration-300" to="/servicosView">Serviços</NuxtLink>
        <NuxtLink class="nav-link hover:-translate-y-0.5 duration-300" to="/portfolioView">Portfólio</NuxtLink>
        <NuxtLink class="nav-link hover:-translate-y-0.5 duration-300" to="/contatoView">Contato</NuxtLink>
        <NuxtLink class="nav-link hover:-translate-y-0.5 duration-300" to="/messagesView">Mensagens</NuxtLink>
      </nav>

      <div class="flex items-center gap-3">
        <button
          type="button"
          class="theme-toggle inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/60 p-1.5 text-sm font-semibold shadow-sm backdrop-blur transition hover:border-blue-500/60 focus:outline-none focus:ring-2 focus:ring-blue-500"
          :aria-label="isDark ? 'Alternar para modo claro' : 'Alternar para modo escuro'"
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
          id="nuxtlink"
          to="/contatoView"
          class="hidden sm:inline-flex items-center justify-center rounded-full bg-blue-600 px-4 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Vamos conversar
        </NuxtLink>
      </div>
    </div>

    <nav
      id="menu-mobile"
      aria-label="Menu mobile"
      class="fixed left-0 bottom-0 top-[61px] z-40 w-64 border-r border-border/60 bg-background/95 backdrop-blur-md transition-transform duration-300 ease-in-out md:hidden"
      :class="isMenuOpen ? 'translate-x-0' : '-translate-x-full'"
    >
      <div class="z-50 flex flex-col gap-3 bg-background px-4 py-6 backdrop-blur">
        <NuxtLink class="nav-link block py-2 text-base" to="/" @click="isMenuOpen = false">Início</NuxtLink>
        <NuxtLink class="nav-link block py-2 text-base" to="/aboutView" @click="isMenuOpen = false">Sobre</NuxtLink>
        <NuxtLink class="nav-link block py-2 text-base" to="/servicosView" @click="isMenuOpen = false">Serviços</NuxtLink>
        <NuxtLink class="nav-link block py-2 text-base" to="/portfolioView" @click="isMenuOpen = false">Portfólio</NuxtLink>
        <NuxtLink class="nav-link block py-2 text-base" to="/contatoView" @click="isMenuOpen = false">Contato</NuxtLink>
        <NuxtLink class="nav-link block py-2 text-base" to="/messagesView" @click="isMenuOpen = false">Mensagens</NuxtLink>

        <NuxtLink
          id="nuxtlink"
          to="/contatoView"
          class="sm:inline-flex items-center justify-center rounded-full bg-blue-600 px-4 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Vamos conversar
        </NuxtLink>
      </div>
    </nav>
  </header>
</template>


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

#nuxtlink:hover {
  transform: translateY(-5px);
  transition: 0.5s
}
</style>