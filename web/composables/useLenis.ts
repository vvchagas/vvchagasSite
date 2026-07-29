import type Lenis from "lenis";

export function useLenis() {
  const nuxtApp = useNuxtApp();
  return (nuxtApp.$lenis as Lenis | undefined) ?? undefined;
}
