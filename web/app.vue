<template>
  <NuxtPage />
</template>

<script setup lang="ts">
import Lenis from "lenis";

const route = useRoute();
let lenis: Lenis | undefined;

function revealOnScroll() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const observer = new IntersectionObserver(
    (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-revealed")),
    { threshold: 0.12 },
  );
  document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((element) => observer.observe(element));
}

onMounted(() => {
  // Lenis mantém âncoras, menu fixo e navegação por teclado funcionando.
  // A preferência de redução de movimento continua sendo respeitada.
  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    lenis = new Lenis({
      autoRaf: true,
      anchors: { offset: -80 },
      lerp: 0.09,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      stopInertiaOnNavigate: true,
    });
  }
  revealOnScroll();
});

onBeforeUnmount(() => lenis?.destroy());
watch(() => route.fullPath, async () => {
  await nextTick();
  revealOnScroll();
});
</script>
