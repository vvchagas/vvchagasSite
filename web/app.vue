<template>
  <div id="smooth-wrapper">
    <div id="smooth-content">
      <NuxtPage />
    </div>
  </div>
</template>

<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import type { ScrollSmoother } from "gsap/ScrollSmoother";

const route = useRoute();
const { $ScrollSmoother, $ScrollTrigger } = useNuxtApp();

let smoother: ScrollSmoother | null = null;

function createSmoother() {
  if (!$ScrollSmoother) return;

  smoother?.kill();

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    smoother = null;
    return;
  }

  smoother = $ScrollSmoother.create({
    wrapper: "#smooth-wrapper",
    content: "#smooth-content",
    smooth: 1.2,
    smoothTouch: 0.1,
    effects: true, // Habilita data-speed e data-lag em qualquer elemento
    normalizeScroll: true,
  });
}

onMounted(() => {
  createSmoother();
});

onBeforeUnmount(() => {
  smoother?.kill();
  smoother = null;
});

// Reavalia a altura da página e os gatilhos de scroll a cada troca de rota
watch(
  () => route.fullPath,
  async () => {
    await nextTick();
    // Mata o smoother anterior e recria para se adaptar ao novo conteúdo
    smoother?.kill();
    createSmoother();
    // Força o ScrollTrigger a reavaliar todos os gatilhos
    $ScrollTrigger?.refresh();
  },
);
</script>
