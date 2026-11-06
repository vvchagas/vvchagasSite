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

  let rafId: number | null = null;
  let isPageVisible = document.visibilityState === "visible";

  function raf(time: number) {
    rafId = null;
    if (!isPageVisible) return;

    lenis.raf(time);
    rafId = requestAnimationFrame(raf);
  }

  function startLoop() {
    if (!isPageVisible || rafId !== null) return;
    rafId = requestAnimationFrame(raf);
  }

  function stopLoop() {
    if (rafId === null) return;
    cancelAnimationFrame(rafId);
    rafId = null;
  }

  const onVisibilityChange = () => {
    isPageVisible = document.visibilityState === "visible";
    if (isPageVisible) startLoop();
    else stopLoop();
  };

  document.addEventListener("visibilitychange", onVisibilityChange);
  startLoop();

  return {
    provide: {
      lenis,
    },
  };
});
