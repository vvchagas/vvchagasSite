<script setup lang="ts">
const { locale, setLocale } = useLocale();

// Inativo: 50% de opacidade, sobe no hover. Ativo: opaco, com anel.
const langBtn = (active: boolean) =>
  [
    "inline-flex size-[1.9rem] cursor-pointer items-center justify-center rounded-sm bg-transparent transition-all duration-300 hover:-translate-y-px active:scale-95",
    active ? "opacity-100 shadow-[0_0_0_2px_rgb(94_98_104/.55)]" : "opacity-50 hover:opacity-85",
  ];
</script>

<template>
  <div class="lang-switcher" role="group" aria-label="Idioma / Language">
    <button
      type="button"
:class="langBtn(locale === 'pt')"
      :aria-pressed="locale === 'pt'"
      aria-label="Português"
      title="Português"
      @click="setLocale('pt')"
    >
      <svg viewBox="0 0 30 20" class="lang-flag" aria-hidden="true">
        <rect width="30" height="20" fill="#009739" />
        <polygon points="15,3 27,10 15,17 3,10" fill="#fedd00" />
        <circle cx="15" cy="10" r="5" fill="#012169" />
        <path d="M10,10 a5,5 0 0,0 10,0" fill="none" stroke="#fff" stroke-width="1.1" />
      </svg>
      <span class="sr-only">Português</span>
    </button>

    <button
      type="button"
:class="langBtn(locale === 'en')"
      :aria-pressed="locale === 'en'"
      aria-label="English"
      title="English"
      @click="setLocale('en')"
    >
      <svg viewBox="0 0 30 20" class="lang-flag" aria-hidden="true">
        <rect width="30" height="20" fill="#b22234" />
        <g fill="#ffffff">
          <rect y="1.54" width="30" height="1.54" />
          <rect y="4.62" width="30" height="1.54" />
          <rect y="7.69" width="30" height="1.54" />
          <rect y="10.77" width="30" height="1.54" />
          <rect y="13.85" width="30" height="1.54" />
          <rect y="16.92" width="30" height="1.54" />
        </g>
        <rect width="12" height="10.77" fill="#3c3b6e" />
      </svg>
      <span class="sr-only">English</span>
    </button>
  </div>
</template>

<style scoped>
.lang-switcher {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  border-radius: .25rem;
  border: 1px solid rgb(var(--border) / 1);
  background: rgb(var(--card) / 0.6);
  padding: 0.25rem;
}

.lang-flag {
  width: 1.35rem;
  height: 0.9rem;
  border-radius: 0.2rem;
  overflow: hidden;
}
</style>
