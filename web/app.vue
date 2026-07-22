<template>
  <NuxtPage />
</template>

<script setup lang="ts">
const route = useRoute();

function revealOnScroll() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const observer = new IntersectionObserver(
    (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-revealed")),
    { threshold: 0.12 },
  );
  document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((element) => observer.observe(element));
}

onMounted(() => revealOnScroll());
watch(() => route.fullPath, async () => {
  await nextTick();
  revealOnScroll();
});
</script>
