import type { ScrollSmoother } from "gsap/ScrollSmoother";

// Substitui o antigo useLenis(): trava e libera o scroll suave (ScrollSmoother)
// enquanto um modal está aberto. Modais usam Teleport pro <body>, então ficam
// fora do #smooth-content por natureza — travar o smoother já basta.
export function useScrollLock() {
  function getSmoother(): ScrollSmoother | undefined {
    const nuxtApp = useNuxtApp();
    return (nuxtApp.$ScrollSmoother as typeof ScrollSmoother | undefined)?.get?.();
  }

  function lock() {
    getSmoother()?.paused(true);
    document.body.style.overflow = "hidden";
  }

  function unlock() {
    getSmoother()?.paused(false);
    document.body.style.overflow = "";
  }

  return { lock, unlock };
}
