<template>
  <main class="error-page" :class="`error-page--${errorCode}`">
    <div class="error-grid" aria-hidden="true" />
    <div class="error-orbit error-orbit--one" aria-hidden="true" />
    <div class="error-orbit error-orbit--two" aria-hidden="true" />

    <section class="error-panel" aria-labelledby="error-title">
      <p class="error-code">{{ errorCode }}</p>
      <p class="error-kicker">vvchagas / sinal interrompido</p>
      <h1 id="error-title">{{ errorTitle }}</h1>
      <p class="error-message">{{ errorMessage }}</p>
      <button type="button" @click="handleRecovery">
        <span aria-hidden="true">&#8592;</span>
        {{ errorCode === 404 ? "Voltar para o inicio" : "Tentar novamente" }}
      </button>
    </section>
  </main>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";

const props = defineProps<{ error: { statusCode?: number; statusMessage?: string } }>();
const errorCode = computed(() => props.error.statusCode === 404 ? 404 : 500);
const errorTitle = computed(() => errorCode.value === 404 ? "Essa pagina nao existe." : "Algo saiu do eixo.");
const errorMessage = computed(() => errorCode.value === 404
  ? "O endereco pode estar incorreto ou a pagina foi movida."
  : "O servidor encontrou um problema inesperado. Tente novamente em alguns instantes.");

onMounted(() => {
  if (import.meta.dev && errorCode.value >= 500) {
    console.error("Erro interno da aplicacao:", props.error);
  }
});

function handleRecovery() {
  if (errorCode.value === 404) {
    clearError({ redirect: "/" });
    return;
  }

  clearError({ redirect: "/" });
}
</script>

<style>
.error-page {
  --error-ink: #f4f0e8;
  --error-muted: #a8aaa5;
  --error-accent: #0b4dc7;
  position: relative;
  display: grid;
  min-height: 100vh;
  overflow: hidden;
  place-items: center;
  background: #111311;
  color: var(--error-ink);
  isolation: isolate;
}

.error-page::before {
  position: absolute;
  inset: -30%;
  z-index: -2;
  background: radial-gradient(circle at 50% 50%, #262b30 0, #111311 38%, #080908 72%);
  content: "";
  animation: error-breathe 10s ease-in-out infinite alternate;
}

.error-grid {
  position: absolute;
  inset: 0;
  z-index: -1;
  opacity: .2;
  background-image: linear-gradient(#c8d0be 1px, transparent 1px), linear-gradient(90deg, #c8d0be 1px, transparent 1px);
  background-size: 48px 48px;
  mask-image: radial-gradient(ellipse at center, black, transparent 72%);
  animation: error-drift 18s linear infinite;
}

.error-orbit {
  position: absolute;
  border: 1px solid rgba(8, 159, 247, 0.562);
  border-radius: 50%;
  pointer-events: none;
}

.error-orbit--one { width: min(72vw, 720px); aspect-ratio: 1; transform: rotate(26deg) skew(-12deg); animation: error-spin 24s linear infinite; }
.error-orbit--two { width: min(48vw, 480px); aspect-ratio: 1; transform: rotate(-38deg) skew(15deg); animation: error-spin 17s linear infinite reverse; }

.error-panel { width: min(90vw, 620px); padding: 3rem 0; text-align: center; }
.error-code { margin: 0; color: var(--error-accent); font: 900 clamp(6rem, 20vw, 12rem)/.8 ui-monospace, SFMono-Regular, Consolas, monospace; letter-spacing: -.08em; }
.error-kicker { margin: 1.75rem 0 0; color: var(--error-muted); font: 700 .7rem/1.4 ui-monospace, SFMono-Regular, Consolas, monospace; letter-spacing: .2em; text-transform: uppercase; }
.error-panel h1 { margin: 1rem 0 0; font: 800 clamp(2rem, 5vw, 3.6rem)/1.05 Georgia, serif; letter-spacing: -.03em; }
.error-message { max-width: 34rem; margin: 1.25rem auto 0; color: var(--error-muted); font: 400 1rem/1.7 ui-monospace, SFMono-Regular, Consolas, monospace; }
.error-panel button { display: inline-flex; align-items: center; gap: .65rem; margin-top: 2rem; border: 0; border-radius: 999px; padding: .85rem 1.2rem; background: var(--error-accent); color: #111311; cursor: pointer; font: 800 .85rem/1 ui-monospace, SFMono-Regular, Consolas, monospace; transition: transform .2s ease, box-shadow .2s ease; }
.error-panel button:hover { box-shadow: 0 0 28px rgba(16, 99, 207, 0.24); transform: translateY(-2px); }
.error-panel button:focus-visible { outline: 3px solid var(--error-ink); outline-offset: 4px; }

@keyframes error-breathe { to { transform: scale(1.12); } }
@keyframes error-drift { to { transform: translate3d(48px, 48px, 0); } }
@keyframes error-spin { to { rotate: 360deg; } }
@media (prefers-reduced-motion: reduce) { .error-page::before, .error-grid, .error-orbit { animation: none; } }
</style>