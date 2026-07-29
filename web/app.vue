<template>
  <div>
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, nextTick, watch } from "vue";
import { useRoute } from "vue-router";
// No Nuxt 3, useRoute é auto-importado nativamente.
// Se ainda assim o editor reclamar antes de rodar 'nuxi prepare', a referência do tipo é inferida.
const route = useRoute();

let activeObserver: IntersectionObserver | null = null;

function revealOnScroll(): void {
  // Cancela o observador anterior se houver troca de rota para evitar memory leak
  if (activeObserver) {
    activeObserver.disconnect();
    activeObserver = null;
  }

  // Respeita as preferências de acessibilidade do usuário (sem animação)
  if (typeof window === "undefined" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  activeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-revealed");
          // Deixa de observar o elemento após ter sido revelado
          activeObserver?.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  const elements = document.querySelectorAll<HTMLElement>("[data-reveal]");
  elements.forEach((element) => activeObserver?.observe(element));
}

onMounted(() => {
  revealOnScroll();
});

// Desconecta o observador ao desmontar o componente global
onUnmounted(() => {
  if (activeObserver) {
    activeObserver.disconnect();
  }
});

// Reavalia os elementos a serem revelados em cada navegação de página
watch(
  () => route.fullPath,
  async () => {
    await nextTick();
    revealOnScroll();
  }
);
</script>