import { computed, ref, watch } from "vue";

export interface CountryDialCode {
  ddi: string;
  label: string;
  flag: string;
}

// Lista curada dos DDIs mais comuns pro público do site (BR em primeiro,
// por ser o público majoritário). Fácil de estender.
export const COUNTRY_DIAL_CODES: CountryDialCode[] = [
  { ddi: "+55", label: "Brasil", flag: "🇧🇷" },
  { ddi: "+1", label: "EUA / Canadá", flag: "🇺🇸" },
  { ddi: "+351", label: "Portugal", flag: "🇵🇹" },
  { ddi: "+352", label: "Luxemburgo", flag: "🇱🇺" },
  { ddi: "+34", label: "Espanha", flag: "🇪🇸" },
  { ddi: "+44", label: "Reino Unido", flag: "🇬🇧" },
];

const BRAZIL_DDI = "+55";
const MAX_INTERNATIONAL_DIGITS = 15;

/** Aplica (XX) XXXXX-XXXX (celular) ou (XX) XXXX-XXXX (fixo) conforme digita. */
function maskBrazilianPhone(digits: string): string {
  const d = digits.slice(0, 11);
  if (d.length <= 2) return d;
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

export function useInternationalPhone() {
  const ddi = ref<string>(BRAZIL_DDI);
  const displayValue = ref("");

  // Ao trocar o DDI, limpa o número pra não sobrar máscara de outro país.
  watch(ddi, () => {
    displayValue.value = "";
  });

  function onInput(rawValue: string) {
    const digits = rawValue.replace(/\D/g, "");
    if (ddi.value === BRAZIL_DDI) {
      displayValue.value = maskBrazilianPhone(digits);
    } else {
      displayValue.value = digits.slice(0, MAX_INTERNATIONAL_DIGITS);
    }
  }

  /** Dígitos puros do número local, sem DDI e sem máscara. */
  const localDigits = computed(() => displayValue.value.replace(/\D/g, ""));

  /** Número completo no padrão E.164, ex: "+5514990428832". */
  const e164 = computed(() => `${ddi.value}${localDigits.value}`);

  const isValid = computed(() => {
    const totalDigits = ddi.value.replace(/\D/g, "").length + localDigits.value.length;
    return totalDigits >= 8 && totalDigits <= MAX_INTERNATIONAL_DIGITS;
  });

  function reset() {
    ddi.value = BRAZIL_DDI;
    displayValue.value = "";
  }

  return { ddi, displayValue, onInput, e164, isValid, reset, countries: COUNTRY_DIAL_CODES };
}
