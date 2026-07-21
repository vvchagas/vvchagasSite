export default defineNuxtPlugin((nuxtApp) => {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
  );

  nuxtApp.vueApp.directive("reveal", {
    mounted(el: HTMLElement, binding) {
      el.classList.add(binding.value === "scale" ? "reveal-scale" : "reveal");
      observer.observe(el);
    },
    unmounted(el: HTMLElement) {
      observer.unobserve(el);
    },
  });
});
