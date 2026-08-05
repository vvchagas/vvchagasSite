// plugins/gsap.client.ts

import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

export default defineNuxtPlugin(() => {
  // Registra o ScrollTrigger do GSAP
  gsap.registerPlugin(ScrollTrigger);

  // Inicializa o Lenis para scroll suave
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: "vertical",
    smoothWheel: true,
  });

  // Sincroniza o Lenis com o ScrollTrigger do GSAP
  lenis.on("scroll", () => {
    ScrollTrigger.update();
  });

  gsap.ticker.add((time: number) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  return {
    provide: {
      gsap,
      ScrollTrigger,
      lenis,
    },
  };
});
