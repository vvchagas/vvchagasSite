import Lenis from "lenis";
import "lenis/dist/lenis.css";

export default defineNuxtPlugin(() => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  // Plugin somente de cliente: evita que a biblioteca de scroll seja executada no SSR.
  const lenis = new Lenis({
    autoRaf: true,
    duration: 1.15,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 2,
    syncTouch: false,
    anchors: { offset: -80 },
    stopInertiaOnNavigate: true,
  });

  return { provide: { lenis } };
});
