import { computed, onMounted, onUnmounted, ref, watch, type Ref } from "vue";

/**
 * Alterna, em loop infinito, um efeito de máquina de escrever entre
 * uma lista de textos. Cada texto fica "montado" por `holdMs`
 * após ser digitado, depois é apagado letra por letra.
 * Ao apagar completamente, espera `pauseAfterEraseMs` (ex: 1s)
 * antes de começar o próximo.
 */
export function useTypewriterCycle(
  texts: Ref<string[]> | string[],
  holdMs = 3000,
  pauseAfterEraseMs = 1000,
  typeSpeedMs = 55,
  eraseSpeedMs = 28,
) {
  const list = computed(() => (Array.isArray(texts) ? texts : texts.value));

  // No servidor (SSR), inicia com o primeiro texto completo para SEO e acessibilidade
  const displayed = ref(list.value[0] ?? "");
  const activeIndex = ref(0);
  let timer: ReturnType<typeof setTimeout> | null = null;
  let isMounted = false;

  function clear() {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  }

  function startCycle() {
    clear();
    const fullText = list.value[activeIndex.value] ?? "";
    let charIndex = 0;
    displayed.value = "";

    function typeStep() {
      if (!isMounted) return;
      if (charIndex < fullText.length) {
        charIndex++;
        displayed.value = fullText.slice(0, charIndex);
        timer = setTimeout(typeStep, typeSpeedMs);
      } else {
        // Texto montado: aguarda holdMs (ex: 3 segundos)
        timer = setTimeout(startErase, holdMs);
      }
    }

    typeStep();
  }

  function startErase() {
    clear();
    const fullText = displayed.value;
    let charIndex = fullText.length;

    function eraseStep() {
      if (!isMounted) return;
      if (charIndex > 0) {
        charIndex--;
        displayed.value = fullText.slice(0, charIndex);
        timer = setTimeout(eraseStep, eraseSpeedMs);
      } else {
        // Texto 100% apagado: pausa de pauseAfterEraseMs (ex: 1 segundo)
        timer = setTimeout(() => {
          if (!isMounted) return;
          activeIndex.value = (activeIndex.value + 1) % Math.max(list.value.length, 1);
          startCycle();
        }, pauseAfterEraseMs);
      }
    }

    eraseStep();
  }

  onMounted(() => {
    isMounted = true;
    // Pequeno intervalo inicial antes de começar a animação
    timer = setTimeout(() => {
      startCycle();
    }, 400);
  });

  watch(
    () => list.value,
    () => {
      if (!isMounted) return;
      clear();
      activeIndex.value = 0;
      startCycle();
    },
    { deep: true },
  );

  onUnmounted(() => {
    isMounted = false;
    clear();
  });

  return {
    displayed,
    activeIndex,
  };
}

export default useTypewriterCycle;

