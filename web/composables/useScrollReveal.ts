import type { Ref } from "vue";
import { watch, onUnmounted } from "vue";

/**
 * Composável de reveal com IntersectionObserver nativo (sem dependência de GSAP).
 */
export function useScrollReveal(
  elRef: Ref<HTMLElement | null>,
  options?: {
    y?: number;
    duration?: number;
    delay?: number;
    once?: boolean;
    scale?: number;
  },
) {
  const {
    y = 24,
    duration = 0.7,
    delay = 0,
    once = true,
    scale = 0.985,
  } = options ?? {};

  let observer: IntersectionObserver | null = null;

  function reveal(el: HTMLElement) {
    if (typeof window === "undefined") return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.opacity = "1";
      el.style.transform = "none";
      return;
    }

    el.style.opacity = "0";
    el.style.transform = `translateY(${y}px) scale(${scale})`;
    el.style.transition = `opacity ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, transform ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`;
    el.style.willChange = "opacity, transform";

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.style.opacity = "1";
            el.style.transform = "translateY(0) scale(1)";
            if (once) {
              observer?.unobserve(el);
            }
          } else if (!once) {
            el.style.opacity = "0";
            el.style.transform = `translateY(${y}px) scale(${scale})`;
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -40px 0px",
      },
    );

    observer.observe(el);
  }

  watch(
    elRef,
    (el, oldEl) => {
      if (oldEl && observer) {
        observer.unobserve(oldEl);
        observer.disconnect();
      }
      if (el) reveal(el);
    },
    { immediate: true, flush: "post" },
  );

  onUnmounted(() => {
    observer?.disconnect();
  });
}
