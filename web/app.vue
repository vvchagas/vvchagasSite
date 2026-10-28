<template>
  <div class="pt-header" :class="{ 'pb-20 sm:pb-0': showQuickBar }">
    <NuxtPage />
  </div>

  
</template>

<script setup lang="ts">
import { computed, nextTick, watch } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

// /messages é a área administrativa: sem barra de contato.
const showQuickBar = computed(() => route.path !== "/messages");

// Ao trocar de rota, libera qualquer trava de scroll que tenha ficado aberta.
const { reset: resetScrollLock } = useScrollLock();

const { $lenis } = useNuxtApp();

// Ao trocar de rota: solta travas de scroll e volta ao topo sem animar.
watch(
  () => route.fullPath,
  async () => {
    resetScrollLock();
    await nextTick();
    $lenis?.start();
    $lenis?.scrollTo(0, { immediate: true });
  },
);
</script>

<style>
/* Previne estouros horizontais sem travar o scroll do Lenis */
html, body {
  margin: 0;
  padding: 0;
  overflow-x: clip;
}

/* Lenis: regras recomendadas pela lib */
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
