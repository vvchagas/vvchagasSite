// Contador compartilhado entre todas as instâncias do composable.
// Assim, N chamadas de lock() (de modais diferentes) exigem N chamadas
// de unlock() antes de liberar o scroll da página.
let lockCount = 0;

export function useScrollLock() {
  function getLenis() {
    if (typeof window === "undefined") return undefined;
    const { $lenis } = useNuxtApp();
    return $lenis;
  }

  function lock() {
    if (typeof window === "undefined") return;
    lockCount += 1;

    const lenis = getLenis();
    if (lenis) {
      lenis.stop();
    }
    document.body.style.overflow = "hidden";
  }

  function unlock() {
    if (typeof window === "undefined") return;
    // Só libera o scroll quando todos os locks forem desfeitos,
    // evitando que um modal sibling destrave a página antes da hora.
    lockCount = Math.max(0, lockCount - 1);
    if (lockCount > 0) return;

    const lenis = getLenis();
    if (lenis) {
      lenis.start();
    }
    document.body.style.overflow = "";
  }

  return { lock, unlock };
}
