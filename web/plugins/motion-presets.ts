import { MotionDirective } from "@vueuse/motion";
import type { ObjectDirective } from "vue";

/**
 * Presets de entrada/saída (@vueuse/motion). Hover/active/focus NÃO ficam aqui: são classes Tailwind.
 *
 *   v-motion-reveal   sobe 24px + fade, uma vez, ao entrar na viewport   (seções, cards, listas)
 *   v-motion-fade     fade do overlay de modal (entra e sai)
 *   v-motion-pop      painel de modal: sobe 16px + fade
 *   v-motion-spin-in  botão de fechar: gira e cresce
 *
 * Escalonar listas: `:delay="index * 100"` (ms). Saída: `<Transition :css="false" @leave="onMotionLeave">`.
 * Um só lugar para curva e duração; `prefers-reduced-motion` desliga todos.
 */
const ease = [0.22, 1, 0.36, 1];

const presets = {
  "motion-reveal": {
    initial: { opacity: 0, y: 24 },
    visibleOnce: { opacity: 1, y: 0, transition: { type: "keyframes", duration: 700, ease } },
  },
  "motion-fade": {
    initial: { opacity: 0 },
    enter: { opacity: 1, transition: { type: "keyframes", duration: 300, ease: "easeOut" } },
    leave: { opacity: 0, transition: { type: "keyframes", duration: 200, ease: "easeIn" } },
  },
  "motion-pop": {
    initial: { opacity: 0, y: 16 },
    enter: { opacity: 1, y: 0, transition: { type: "keyframes", duration: 450, ease } },
  },
  "motion-spin-in": {
    initial: { opacity: 0, scale: 0.6, rotate: -45 },
    enter: { opacity: 1, scale: 1, rotate: 0, transition: { type: "keyframes", duration: 500, delay: 150, ease } },
  },
};

export default defineNuxtPlugin(({ vueApp }) => {
  const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  for (const [name, variants] of Object.entries(presets)) {
    const base = MotionDirective(variants, true) as ObjectDirective;

    vueApp.directive(name, {
      ...base,
      created(el, binding, vnode, prev) {
        if (!import.meta.client || !reducedMotion()) return base.created?.(el, binding, vnode, prev);
        // reduced-motion: mostra direto e limpa o estado inicial que o SSR escreveu no style.
        el.style.opacity = "";
        el.style.transform = "";
      },
      mounted(el, binding, vnode, prev) {
        if (!import.meta.client || !reducedMotion()) base.mounted?.(el, binding, vnode, prev);
        el.removeAttribute("delay"); // `:delay` é lido do vnode; o atributo só vaza para o DOM (Vue aplica props depois de `created`)
      },
    });
  }
});
