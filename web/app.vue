<template>
  <div class="pt-header">
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
import { nextTick, watch } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const { $lenis } = useNuxtApp();

// Atualiza o scroll do Lenis ao trocar de rota
const { reset: resetScrollLock } = useScrollLock();

watch(
  () => route.fullPath,
  async () => {
    resetScrollLock();
    await nextTick();
    if ($lenis) {
      $lenis.start();
      $lenis.scrollTo(0, { immediate: true });
    }
  },
);
</script>

<style>
/* CSS global para garantir comportamentos suaves e prevenir estouros horizontais sem travar o scroll do Lenis */
html, body {
  margin: 0;
  padding: 0;
  overflow-x: clip;
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
