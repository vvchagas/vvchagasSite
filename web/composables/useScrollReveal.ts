import { onBeforeUnmount, onMounted, watch, type Ref } from "vue";

export interface ScrollRevealOptions {
  y?: number;
  scale?: number;
  /** segundos */
  duration?: number;
  /** segundos */
  delay?: number;
  /** segundos entre um alvo e o próximo (quando há vários) */
  stagger?: number;
}

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

// Linha de disparo: o alvo entra quando seu topo cruza 88% da altura da viewport.
const TRIGGER_MARGIN = "0px 0px -12% 0px";

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Esconde os alvos até o gatilho; devolve a função que desfaz tudo. */
function hide(targets: HTMLElement[], { y = 28, scale = 0.985 }: ScrollRevealOptions) {
  targets.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = `translateY(${y}px) scale(${scale})`;
  });
}

function play(targets: HTMLElement[], options: ScrollRevealOptions): () => void {
  const { y = 28, scale = 0.985, duration = 0.75, delay = 0, stagger = 0 } = options;

  const animations = targets.map((el, index) => {
    el.style.opacity = "";
    el.style.transform = "";

    // fill "backwards" mantém o estado inicial durante o delay; ao terminar não sobra estilo inline,
    // então os hovers do Tailwind (translate/scale) continuam livres.
    return el.animate(
      [
        { opacity: 0, transform: `translateY(${y}px) scale(${scale})` },
        { opacity: 1, transform: "none" },
      ],
      { duration: duration * 1000, delay: (delay + index * stagger) * 1000, easing: EASE, fill: "backwards" },
    );
  });

  return () => animations.forEach((animation) => animation.cancel());
}

/** Anima agora (sem esperar scroll), ex.: elementos do hero. */
export function revealNow(targets: HTMLElement[], options: ScrollRevealOptions = {}) {
  if (!targets.length || prefersReducedMotion()) return () => {};
  return play(targets, options);
}

/**
 * Esconde os alvos e anima uma única vez quando `trigger` entra na viewport.
 * IntersectionObserver mede a posição real a cada frame, então mudanças de layout
 * (fontes, imagens, resize) não deixam o gatilho desalinhado.
 */
export function revealOnView(
  targets: HTMLElement[],
  options: ScrollRevealOptions & { trigger?: HTMLElement } = {},
) {
  const trigger = options.trigger ?? targets[0];
  if (!trigger || !targets.length || prefersReducedMotion() || !("IntersectionObserver" in window)) {
    return () => {};
  }

  hide(targets, options);

  let cancel: (() => void) | undefined;
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (!entry?.isIntersecting) return;
      observer.disconnect();
      cancel = play(targets, options);
    },
    { rootMargin: TRIGGER_MARGIN },
  );
  observer.observe(trigger);

  return () => {
    observer.disconnect();
    cancel?.();
    targets.forEach((el) => {
      el.style.opacity = "";
      el.style.transform = "";
    });
  };
}

/** Revela o elemento do ref uma vez, ao entrar na viewport. */
export function useScrollReveal(elRef: Ref<HTMLElement | null>, options: ScrollRevealOptions = {}) {
  let stop: (() => void) | undefined;
  let cleanup: (() => void) | undefined;

  onMounted(() => {
    stop = watch(
      elRef,
      (element) => {
        cleanup?.();
        cleanup = element ? revealOnView([element], options) : undefined;
      },
      { immediate: true, flush: "post" },
    );
  });

  onBeforeUnmount(() => {
    stop?.();
    cleanup?.();
  });
}
