<script setup lang="ts">
const { locale, setLocale } = useLocale();
</script>

<template>
  <div class="lang-switcher" role="group" aria-label="Idioma / Language">
    <button
      type="button"
      class="lang-btn"
      :class="{ 'lang-btn--active': locale === 'pt' }"
      :aria-pressed="locale === 'pt'"
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
      class="lang-btn"
      :class="{ 'lang-btn--active': locale === 'en' }"
      :aria-pressed="locale === 'en'"
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
  border-radius: 999px;
  border: 1px solid rgb(var(--border) / 1);
  background: rgb(var(--card) / 0.6);
  padding: 0.25rem;
}

.lang-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.9rem;
  height: 1.9rem;
  border-radius: 999px;
  border: none;
  cursor: pointer;
  background: transparent;
  opacity: 0.5;
  transition: opacity 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
}

.lang-btn:hover {
  opacity: 0.85;
  transform: translateY(-1px);
}

.lang-btn--active {
  opacity: 1;
  box-shadow: 0 0 0 2px rgb(37 99 235 / 0.55);
}

.lang-flag {
  width: 1.35rem;
  height: 0.9rem;
  border-radius: 0.2rem;
  overflow: hidden;
}
</style>
