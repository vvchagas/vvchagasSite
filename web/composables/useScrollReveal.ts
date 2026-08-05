/**
 * Composável reutilizável que substitui o componente ScrollReveal.
 *
 * Cria uma animação de entrada com ScrollTrigger (GSAP) para um elemento ref.
 * O cleanup é automático no onUnmounted do componente hospedeiro.
 *
 * Uso básico:
 *   const el = ref<HTMLElement | null>(null)
 *   useScrollReveal(el, { y: 30, duration: 0.6, start: "top 85%" })
 *
 * Uso com template:
 *   <div ref="el">...</div>
 */
export function useScrollReveal(
  elRef: Ref<HTMLElement | null>,
  options?: {
    y?: number;
    duration?: number;
    delay?: number;
    start?: string;
    once?: boolean;
    scale?: number;
  },
) {
  const { $gsap } = useNuxtApp();

  const {
    y = 24,
    duration = 0.8,
    delay = 0,
    start = "top 88%",
    once = true,
    scale = 0.985,
  } = options ?? {};

  let ctx: gsap.Context | undefined;

  function reveal(el: HTMLElement) {
    if (!$gsap) return;

    // Acessibilidade: respeita preferências de movimento reduzido
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      $gsap.set(el, { opacity: 1, y: 0, scale: 1 });
      return;
    }

    ctx = $gsap.context(() => {
      $gsap.fromTo(
        el,
        { opacity: 0, y, scale },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration,
          delay,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start,
            toggleActions: once ? "play none none none" : "play reverse play reverse",
          },
        },
      );
    }, el);
  }

  // watch (não só onMounted) porque o elemento pode só existir depois do
  // mount inicial — ex: uma seção atrás de um v-if que muda de estado
  // (login -> conteúdo). onMounted sozinho perderia esse caso.
  watch(
    elRef,
    (el, oldEl) => {
      if (oldEl) {
        ctx?.revert();
        ctx = undefined;
      }
      if (el) reveal(el);
    },
    { immediate: true, flush: "post" },
  );

  onUnmounted(() => {
    ctx?.revert();
  });
}

