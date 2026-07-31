// plugins/gsap.client.ts
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

export default defineNuxtPlugin(() => {
  // Registra os plugins oficiais do GSAP.
  // ScrollSmoother é o substituto do Lenis (mesmo fabricante do ScrollTrigger,
  // então os dois já nascem integrados — sem gambiarra de sincronização).
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

  return {
    provide: {
      gsap,
      ScrollTrigger,
      ScrollSmoother,
    },
  };
});
