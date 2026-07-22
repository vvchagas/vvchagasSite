import Lenis from "lenis";
import "lenis/dist/lenis.css";

export default defineNuxtPlugin(() => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  // Plugin somente de cliente: evita que a biblioteca de scroll seja executada no SSR.
  const lenis = new Lenis({
    autoRaf: true,
    anchors: { offset: -80 },
    lerp: 0.075,
    smoothWheel: true,
    wheelMultiplier: 0.9,
    stopInertiaOnNavigate: true,
  });

  return { provide: { lenis } };
});
