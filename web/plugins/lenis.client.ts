// plugins/lenis.client.ts
import Lenis from "lenis";

export default defineNuxtPlugin(() => {
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: "vertical",
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 1.5,
  });

  let rafId: number;

  function raf(time: number) {
    lenis.raf(time);
    rafId = requestAnimationFrame(raf);
  }

  rafId = requestAnimationFrame(raf);

  return {
    provide: {
      lenis,
    },
  };
});
