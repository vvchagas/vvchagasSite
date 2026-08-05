import { computed, readonly, ref } from "vue";
import { dictionaries, type Locale } from "~/i18n/dictionaries";

const STORAGE_KEY = "vvchagas-locale";

// Estado global (um só ref compartilhado por toda a aplicação, mesmo
// chamando useLocale() em vários componentes).
const locale = ref<Locale>("pt");
let initialized = false;

function detectInitialLocale(): Locale {
  if (typeof window === "undefined") return "pt";

  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "pt" || stored === "en") return stored;

  return navigator.language?.toLowerCase().startsWith("en") ? "en" : "pt";
}

function getByPath(obj: unknown, path: string): unknown {
  return path.split(".").reduce<unknown>((acc, key) => {
    if (acc && typeof acc === "object" && key in acc) {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj);
}

export function useLocale() {
  if (!initialized && typeof window !== "undefined") {
    locale.value = detectInitialLocale();
    document.documentElement.lang = locale.value;
    initialized = true;
  }

  function setLocale(next: Locale) {
    locale.value = next;
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, next);
      document.documentElement.lang = next;
    }
  }

  function t(key: string): string {
    const value = getByPath(dictionaries[locale.value], key);
    if (typeof value === "string") return value;

    // Fallback pro português se a chave não existir no idioma atual
    // (evita tela em branco enquanto uma tradução nova ainda não foi feita).
    const fallback = getByPath(dictionaries.pt, key);
    return typeof fallback === "string" ? fallback : key;
  }

  return {
    locale: readonly(locale),
    isPt: computed(() => locale.value === "pt"),
    isEn: computed(() => locale.value === "en"),
    setLocale,
    t,
  };
}
