<template>
  <div class="app-root">
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
import { nextTick, watch } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const { $lenis, $ScrollTrigger } = useNuxtApp();

// Atualiza o scroll do Lenis e gatinhos do ScrollTrigger ao trocar de rota
watch(
  () => route.fullPath,
  async () => {
    await nextTick();
    if ($lenis) {
      $lenis.scrollTo(0, { immediate: true });
    }
    if ($ScrollTrigger) {
      $ScrollTrigger.refresh();
    }
  },
);
</script>

<style>
/* CSS global para garantir comportamentos suaves e prevenir estouros horizontais */
html, body {
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}

/* Evita que o Lenis interfira na rolagem suave nativa em modais ou overlays */
html.lenis, html.lenis body {
  height: auto;
}

.lenis.lenis-smooth {
  scroll-behavior: auto !important;
}

.lenis.lenis-smooth [data-lenis-prevent] {
  overscroll-behavior: contain;
}

.lenis.lenis-stopped {
  overflow: hidden;
}

.lenis.lenis-scrolling iframe {
  pointer-events: none;
}
</style>
