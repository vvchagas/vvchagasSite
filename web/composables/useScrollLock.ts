// Contador compartilhado entre todas as instâncias do composable.
// Assim, N chamadas de lock() (de modais diferentes) exigem N chamadas
// de unlock() antes de liberar o scroll da página.
let lockCount = 0;
let lenisStopCount = 0;

type ScrollLockOptions = {
  stopLenis?: boolean;
};

export function useScrollLock() {
  function getLenis() {
    if (typeof window === "undefined") return undefined;
    const { $lenis } = useNuxtApp();
    return $lenis;
  }

  function lock(options: ScrollLockOptions = {}) {
    if (typeof window === "undefined") return;
    lockCount += 1;

    if (options.stopLenis !== false) {
      lenisStopCount += 1;
      const lenis = getLenis();
      if (lenisStopCount === 1 && lenis) {
        lenis.stop();
      }
    }
    document.body.style.overflow = "hidden";
  }

  function unlock(options: ScrollLockOptions = {}) {
    if (typeof window === "undefined") return;
    // Só libera o scroll quando todos os locks forem desfeitos,
    // evitando que um modal sibling destrave a página antes da hora.
    lockCount = Math.max(0, lockCount - 1);
    if (options.stopLenis !== false) {
      lenisStopCount = Math.max(0, lenisStopCount - 1);
    }

    const lenis = getLenis();
    if (lenisStopCount === 0 && lenis) {
      lenis.start();
    }

    if (lockCount > 0) return;

    document.body.style.overflow = "";
  }

  return { lock, unlock };
}
