import { u as useLocale, a as useScrollReveal, _ as __nuxt_component_0, S as SiteHeader, b as SiteFooter } from './SiteFooter-CWM2p8XQ.mjs';
import { _ as __nuxt_component_0$1 } from './nuxt-link-XoKa4W7F.mjs';
import { defineComponent, ref, mergeProps, unref, withCtx, createTextVNode, toDisplayString, createVNode, computed, toValue, reactive, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from 'vue/server-renderer';
import { u as useHead, f as fetchDefaults, b as useNuxtApp } from './server.mjs';
import { d as defineKeyedFunctionFactory, u as useAsyncData } from './asyncData-ZfEst2DI.mjs';
import { H as hash } from '../_/nitro.mjs';
import { isPlainObject } from '@vue/shared';
import { P as ProjectShowcase } from './ProjectShowcase-BUm9dfsm.mjs';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
import 'vue-router';
import '@iconify/vue';
import 'tailwindcss/colors';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:path';
import 'node:url';
import 'node:crypto';
import '@prisma/client-runtime-utils';
import 'node:fs';
import 'node:async_hooks';
import 'node:os';
import '@prisma/adapter-pg';
import 'pg';
import '@iconify/utils';
import 'consola';

function useRequestEvent(nuxtApp) {
  nuxtApp ||= useNuxtApp();
  return nuxtApp.ssrContext?.event;
}
function useRequestFetch() {
  return useRequestEvent()?.$fetch || globalThis.$fetch;
}
function generateOptionSegments(opts) {
  const segments = [
    toValue(opts.method)?.toUpperCase() || "GET",
    toValue(opts.baseURL)
  ];
  for (const _obj of [opts.query || opts.params]) {
    const obj = toValue(_obj);
    if (!obj) {
      continue;
    }
    const unwrapped = {};
    for (const [key, value] of Object.entries(obj)) {
      unwrapped[toValue(key)] = toValue(value);
    }
    segments.push(unwrapped);
  }
  if (opts.body) {
    const value = toValue(opts.body);
    if (!value) {
      segments.push(hash(value));
    } else if (value instanceof ArrayBuffer) {
      segments.push(hash(Object.fromEntries([...new Uint8Array(value).entries()].map(([k, v]) => [k, v.toString()]))));
    } else if (value instanceof FormData) {
      const entries = [];
      for (const entry of value.entries()) {
        const [key, val] = entry;
        entries.push([key, val instanceof File ? `${val.name}:${val.size}:${val.lastModified}` : val]);
      }
      segments.push(hash(entries));
    } else if (isPlainObject(value)) {
      segments.push(hash(reactive(value)));
    } else {
      try {
        segments.push(hash(value));
      } catch {
        console.warn("[useFetch] Failed to hash body", value);
      }
    }
  }
  return segments;
}
const createUseFetch = defineKeyedFunctionFactory({
  name: "createUseFetch",
  factory(options = {}) {
    function useFetch2(request, arg1, arg2) {
      const [opts = {}, autoKey] = typeof arg1 === "string" ? [{}, arg1] : [arg1, arg2];
      const factoryOptions = typeof options === "function" ? options(opts) : options;
      const {
        server,
        lazy,
        default: defaultFn,
        transform,
        pick,
        watch: watchSources,
        immediate,
        getCachedData,
        deep,
        dedupe,
        timeout,
        ...fetchOptions
      } = {
        ...typeof options === "function" ? {} : factoryOptions,
        ...opts,
        ...typeof options === "function" ? factoryOptions : {}
      };
      const _request = computed(() => toValue(request));
      const key = computed(() => toValue(fetchOptions.key) || "$f" + hash([autoKey, typeof _request.value === "string" ? _request.value : "", ...generateOptionSegments(fetchOptions)]));
      if (!fetchOptions.baseURL && typeof _request.value === "string" && (_request.value[0] === "/" && _request.value[1] === "/")) {
        throw new Error('[nuxt] [useFetch] the request URL must not start with "//".');
      }
      const _fetchOptions = reactive({
        ...fetchDefaults,
        ...fetchOptions,
        cache: typeof fetchOptions.cache === "boolean" ? void 0 : fetchOptions.cache
      });
      const _asyncDataOptions = {
        server,
        lazy,
        default: defaultFn,
        transform,
        pick,
        immediate,
        getCachedData,
        deep,
        dedupe,
        timeout,
        watch: watchSources === false ? [] : [...watchSources || [], _fetchOptions]
      };
      if (watchSources === false) {
        _asyncDataOptions._keyTriggersExecute = false;
      }
      const asyncData = useAsyncData(key, (_, { signal }) => {
        let _$fetch = fetchOptions.$fetch || globalThis.$fetch;
        if (!fetchOptions.$fetch) {
          const isLocalFetch = typeof _request.value === "string" && _request.value[0] === "/" && (!toValue(fetchOptions.baseURL) || toValue(fetchOptions.baseURL)[0] === "/");
          if (isLocalFetch) {
            _$fetch = useRequestFetch();
          }
        }
        return _$fetch(_request.value, { signal, ..._fetchOptions });
      }, _asyncDataOptions);
      return asyncData;
    }
    return useFetch2;
  }
});
createUseFetch.__nuxt_factory();
createUseFetch.__nuxt_factory({
  lazy: true,
  // @ts-expect-error private property
  _functionName: "useLazyFetch"
});
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = useLocale();
    useHead({
      title: "vvchagas - Início",
      link: [
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,300,0,0"
        }
      ]
    });
    const sobreSection = ref(null);
    const sobreCard1 = ref(null);
    const sobreCard2 = ref(null);
    const sobreCard3 = ref(null);
    useScrollReveal(sobreSection);
    useScrollReveal(sobreCard1, { delay: 0 });
    useScrollReveal(sobreCard2, { delay: 0.1 });
    useScrollReveal(sobreCard3, { delay: 0.2 });
    const servicosSection = ref(null);
    const servCard1 = ref(null);
    const servCard2 = ref(null);
    const servCard3 = ref(null);
    const servCard4 = ref(null);
    const servCta = ref(null);
    useScrollReveal(servicosSection);
    useScrollReveal(servCard1, { delay: 0 });
    useScrollReveal(servCard2, { delay: 0.1 });
    useScrollReveal(servCard3, { delay: 0.2 });
    useScrollReveal(servCard4, { delay: 0.3 });
    useScrollReveal(servCta, { delay: 0.4 });
    const portfolioSection = ref(null);
    useScrollReveal(portfolioSection);
    const contatoSection = ref(null);
    const contatoInfo = ref(null);
    const contatoForm = ref(null);
    useScrollReveal(contatoSection);
    useScrollReveal(contatoInfo, { delay: 0 });
    useScrollReveal(contatoForm, { delay: 0.15 });
    const toast = ref(null);
    const sendError = ref(null);
    const isSending = ref(false);
    const form = ref({
      name: "",
      contact: "",
      topic: "web",
      source: "google",
      message: ""
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtRouteAnnouncer = __nuxt_component_0;
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-background text-foreground overflow-x-hidden" }, _attrs))} data-v-609bbb3b>`);
      _push(ssrRenderComponent(_component_NuxtRouteAnnouncer, null, null, _parent));
      _push(`<a href="#conteudo" class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-blue-600 focus:px-3 focus:py-2 focus:text-white" data-v-609bbb3b>${ssrInterpolate(unref(t)("common.skipToContent"))}</a>`);
      _push(ssrRenderComponent(SiteHeader, null, null, _parent));
      _push(`<main id="conteudo" class="mx-auto w-full max-w-6xl px-4 md:px-6" data-v-609bbb3b><section id="inicio" class="relative overflow-hidden pt-8 md:pt-14" data-v-609bbb3b><div class="absolute inset-0 -z-10" data-v-609bbb3b><div class="absolute left-1/2 top-[-120px] h-[300px] w-[300px] sm:top-[-220px] sm:h-[520px] sm:w-[520px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-blue-500/30 via-indigo-500/20 to-fuchsia-500/20 blur-3xl" data-v-609bbb3b></div><div class="absolute -left-8 top-28 h-40 w-40 sm:-left-24 sm:h-64 sm:w-64 rounded-full bg-blue-500/15 blur-2xl" data-v-609bbb3b></div><div class="absolute -right-8 top-52 h-48 w-48 sm:-right-24 sm:h-72 sm:w-72 rounded-full bg-indigo-500/15 blur-2xl" data-v-609bbb3b></div></div><div class="grid items-center gap-10 md:grid-cols-2" data-v-609bbb3b><div data-v-609bbb3b><p class="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/60 px-3 py-1.5 text-xs font-semibold text-foreground/90 backdrop-blur" data-v-609bbb3b><span aria-hidden="true" class="inline-flex size-2 rounded-full bg-blue-600 shadow-[0_0_0_4px_rgba(12,129,232,.15)] shrink-0" data-v-609bbb3b></span><span class="leading-tight" data-v-609bbb3b>${ssrInterpolate(unref(t)("hero.badge"))}</span></p><h1 class="mt-5 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl" data-v-609bbb3b> Victor <span class="text-blue-600" data-v-609bbb3b>Chagas</span></h1><p class="mt-4 max-w-prose text-base text-muted sm:text-lg leading-relaxed" data-v-609bbb3b>${ssrInterpolate(unref(t)("hero.description"))}</p><div class="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center" data-v-609bbb3b>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        id: "hero-cta-btn",
        to: "/servicos",
        class: "inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(t)("hero.cta"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(t)("hero.cta")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><dl class="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3" data-v-609bbb3b><div class="rounded-2xl border border-border/60 bg-card/60 p-4 backdrop-blur" data-v-609bbb3b><dt class="text-xs sm:text-sm font-semibold text-foreground/80" data-v-609bbb3b>${ssrInterpolate(unref(t)("hero.statDeliveryLabel"))}</dt><dd class="mt-1 text-xl sm:text-2xl font-black" data-v-609bbb3b>${ssrInterpolate(unref(t)("hero.statDeliveryValue"))}</dd><dd class="mt-1 text-xs text-muted" data-v-609bbb3b>${ssrInterpolate(unref(t)("hero.statDeliveryDesc"))}</dd></div><div class="rounded-2xl border border-border/60 bg-card/60 p-4 backdrop-blur" data-v-609bbb3b><dt class="text-xs sm:text-sm font-semibold text-foreground/80" data-v-609bbb3b>${ssrInterpolate(unref(t)("hero.statFocusLabel"))}</dt><dd class="mt-1 text-xl sm:text-2xl font-black" data-v-609bbb3b>${ssrInterpolate(unref(t)("hero.statFocusValue"))}</dd><dd class="mt-1 text-xs text-muted" data-v-609bbb3b>${ssrInterpolate(unref(t)("hero.statFocusDesc"))}</dd></div><div class="rounded-2xl border border-border/60 bg-card/60 p-4 backdrop-blur" data-v-609bbb3b><dt class="text-xs sm:text-sm font-semibold text-foreground/80" data-v-609bbb3b>${ssrInterpolate(unref(t)("hero.statSupportLabel"))}</dt><dd class="mt-1 text-xl sm:text-2xl font-black" data-v-609bbb3b>${ssrInterpolate(unref(t)("hero.statSupportValue"))}</dd><dd class="mt-1 text-xs text-muted" data-v-609bbb3b>${ssrInterpolate(unref(t)("hero.statSupportDesc"))}</dd></div></dl></div><div class="relative" data-v-609bbb3b><div class="absolute inset-0 -z-10 rounded-[2rem] bg-gradient-to-b from-blue-500/15 to-transparent blur-2xl" data-v-609bbb3b></div><div class="rounded-[2rem] border border-border/70 bg-card/70 p-5 shadow-sm backdrop-blur" data-v-609bbb3b><div class="flex items-center justify-between gap-4" data-v-609bbb3b><div data-v-609bbb3b><p class="text-xs font-semibold text-muted" data-v-609bbb3b>${ssrInterpolate(unref(t)("hero.statusLabel"))}</p><p class="text-base sm:text-lg font-extrabold" data-v-609bbb3b>${ssrInterpolate(unref(t)("hero.statusValue"))}</p></div><span class="inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1 text-xs font-semibold text-foreground/90 shrink-0" data-v-609bbb3b><span aria-hidden="true" class="size-2 rounded-full bg-green-500" data-v-609bbb3b></span> ${ssrInterpolate(unref(t)("hero.statusOnline"))}</span></div><div class="mt-5 grid gap-3" data-v-609bbb3b><div class="rounded-2xl bg-muted/60 p-4" data-v-609bbb3b><h3 class="font-bold text-sm sm:text-base" data-v-609bbb3b>${ssrInterpolate(unref(t)("hero.step1Title"))}</h3><p class="mt-1 text-xs sm:text-sm text-muted" data-v-609bbb3b>${ssrInterpolate(unref(t)("hero.step1Desc"))}</p></div><div class="rounded-2xl bg-muted/60 p-4" data-v-609bbb3b><h3 class="font-bold text-sm sm:text-base" data-v-609bbb3b>${ssrInterpolate(unref(t)("hero.step2Title"))}</h3><p class="mt-1 text-xs sm:text-sm text-muted" data-v-609bbb3b>${ssrInterpolate(unref(t)("hero.step2Desc"))}</p></div><div class="rounded-2xl bg-muted/60 p-4" data-v-609bbb3b><h3 class="font-bold text-sm sm:text-base" data-v-609bbb3b>${ssrInterpolate(unref(t)("hero.step3Title"))}</h3><p class="mt-1 text-xs sm:text-sm text-muted" data-v-609bbb3b>${ssrInterpolate(unref(t)("hero.step3Desc"))}</p></div></div><div class="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2" data-v-609bbb3b>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        class: "card-link",
        to: "/contato"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="card-icon material-symbols-outlined text-blue-500" aria-hidden="true" data-v-609bbb3b${_scopeId}>chat</span><span class="card-title" data-v-609bbb3b${_scopeId}>${ssrInterpolate(unref(t)("hero.cardAttendTitle"))}</span><span class="card-desc" data-v-609bbb3b${_scopeId}>${ssrInterpolate(unref(t)("hero.cardAttendDesc"))}</span>`);
          } else {
            return [
              createVNode("span", {
                class: "card-icon material-symbols-outlined text-blue-500",
                "aria-hidden": "true"
              }, "chat"),
              createVNode("span", { class: "card-title" }, toDisplayString(unref(t)("hero.cardAttendTitle")), 1),
              createVNode("span", { class: "card-desc" }, toDisplayString(unref(t)("hero.cardAttendDesc")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        class: "card-link",
        to: "/servicos"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="card-icon material-symbols-outlined text-purple-500" aria-hidden="true" data-v-609bbb3b${_scopeId}>settings</span><span class="card-title" data-v-609bbb3b${_scopeId}>${ssrInterpolate(unref(t)("hero.cardSolutionsTitle"))}</span><span class="card-desc" data-v-609bbb3b${_scopeId}>${ssrInterpolate(unref(t)("hero.cardSolutionsDesc"))}</span>`);
          } else {
            return [
              createVNode("span", {
                class: "card-icon material-symbols-outlined text-purple-500",
                "aria-hidden": "true"
              }, "settings"),
              createVNode("span", { class: "card-title" }, toDisplayString(unref(t)("hero.cardSolutionsTitle")), 1),
              createVNode("span", { class: "card-desc" }, toDisplayString(unref(t)("hero.cardSolutionsDesc")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div></div></section><section id="sobre" class="mt-14 md:mt-18" data-v-609bbb3b><div class="flex items-end justify-between gap-4" data-v-609bbb3b><div data-v-609bbb3b><h2 class="text-2xl font-black tracking-tight md:text-3xl" data-v-609bbb3b>${ssrInterpolate(unref(t)("indexSections.aboutTitle"))}</h2><p class="mt-2 text-muted" data-v-609bbb3b>${ssrInterpolate(unref(t)("indexSections.aboutDesc"))}</p></div><div class="hidden sm:block rounded-2xl border border-border/60 bg-card/60 px-4 py-3 text-sm text-muted" data-v-609bbb3b><p class="font-semibold text-foreground/90" data-v-609bbb3b>${ssrInterpolate(unref(t)("indexSections.aboutWork"))}</p><p class="mt-1" data-v-609bbb3b>${ssrInterpolate(unref(t)("indexSections.aboutWorkDesc"))}</p></div></div><div class="mt-7 grid gap-4 md:grid-cols-3" data-v-609bbb3b><article class="rounded-3xl border border-border/60 bg-card/60 p-6 shadow-sm backdrop-blur" data-v-609bbb3b><h3 class="text-lg font-extrabold" data-v-609bbb3b>${ssrInterpolate(unref(t)("indexSections.aboutWebTitle"))}</h3><p class="mt-3 text-sm text-muted" data-v-609bbb3b>${ssrInterpolate(unref(t)("indexSections.aboutWebDesc"))}</p><ul class="mt-4 space-y-2 text-sm text-muted" data-v-609bbb3b><li class="flex gap-2" data-v-609bbb3b><span aria-hidden="true" class="material-symbols-outlined text-base text-emerald-500" data-v-609bbb3b>task_alt</span> ${ssrInterpolate(unref(t)("indexSections.aboutWebItem1"))}</li><li class="flex gap-2" data-v-609bbb3b><span aria-hidden="true" class="material-symbols-outlined text-base text-emerald-500" data-v-609bbb3b>task_alt</span> ${ssrInterpolate(unref(t)("indexSections.aboutWebItem2"))}</li><li class="flex gap-2" data-v-609bbb3b><span aria-hidden="true" class="material-symbols-outlined text-base text-emerald-500" data-v-609bbb3b>task_alt</span> ${ssrInterpolate(unref(t)("indexSections.aboutWebItem3"))}</li></ul></article><article class="rounded-3xl border border-border/60 bg-card/60 p-6 shadow-sm backdrop-blur" data-v-609bbb3b><h3 class="text-lg font-extrabold" data-v-609bbb3b>${ssrInterpolate(unref(t)("indexSections.aboutItTitle"))}</h3><p class="mt-3 text-sm text-muted" data-v-609bbb3b>${ssrInterpolate(unref(t)("indexSections.aboutItDesc"))}</p><ul class="mt-4 space-y-2 text-sm text-muted" data-v-609bbb3b><li class="flex gap-2" data-v-609bbb3b><span aria-hidden="true" class="material-symbols-outlined text-base text-violet-500" data-v-609bbb3b>psychology</span> ${ssrInterpolate(unref(t)("indexSections.aboutItItem1"))}</li><li class="flex gap-2" data-v-609bbb3b><span aria-hidden="true" class="material-symbols-outlined text-base text-teal-500" data-v-609bbb3b>shield</span> ${ssrInterpolate(unref(t)("indexSections.aboutItItem2"))}</li><li class="flex gap-2" data-v-609bbb3b><span aria-hidden="true" class="material-symbols-outlined text-base text-amber-500" data-v-609bbb3b>build</span> ${ssrInterpolate(unref(t)("indexSections.aboutItItem3"))}</li></ul></article><article class="rounded-3xl border border-border/60 bg-card/60 p-6 shadow-sm backdrop-blur" data-v-609bbb3b><h3 class="text-lg font-extrabold" data-v-609bbb3b>${ssrInterpolate(unref(t)("indexSections.aboutNotebookTitle"))}</h3><p class="mt-3 text-sm text-muted" data-v-609bbb3b>${ssrInterpolate(unref(t)("indexSections.aboutNotebookDesc"))}</p><ul class="mt-4 space-y-2 text-sm text-muted" data-v-609bbb3b><li class="flex gap-2" data-v-609bbb3b><span aria-hidden="true" class="material-symbols-outlined text-base text-rose-500" data-v-609bbb3b>thermostat</span> ${ssrInterpolate(unref(t)("indexSections.aboutNotebookItem1"))}</li><li class="flex gap-2" data-v-609bbb3b><span aria-hidden="true" class="material-symbols-outlined text-base text-sky-500" data-v-609bbb3b>save</span> ${ssrInterpolate(unref(t)("indexSections.aboutNotebookItem2"))}</li><li class="flex gap-2" data-v-609bbb3b><span aria-hidden="true" class="material-symbols-outlined text-base text-amber-500" data-v-609bbb3b>bolt</span> ${ssrInterpolate(unref(t)("indexSections.aboutNotebookItem3"))}</li></ul></article></div></section><section id="servicos" class="mt-14 md:mt-18" data-v-609bbb3b><div class="flex flex-col gap-3 md:flex-row md:items-end md:justify-between" data-v-609bbb3b><div data-v-609bbb3b><h2 class="text-2xl font-black tracking-tight md:text-3xl" data-v-609bbb3b>${ssrInterpolate(unref(t)("indexSections.servicesTitle"))}</h2><p class="mt-2 text-muted" data-v-609bbb3b>${ssrInterpolate(unref(t)("indexSections.servicesDesc"))}</p></div></div><div class="mt-7 grid gap-4 md:grid-cols-2" data-v-609bbb3b><article class="rounded-3xl border border-border/60 bg-card/60 p-6 shadow-sm backdrop-blur" data-v-609bbb3b><div class="flex items-start justify-between gap-4" data-v-609bbb3b><div data-v-609bbb3b><h3 class="text-lg font-extrabold" data-v-609bbb3b>${ssrInterpolate(unref(t)("indexSections.servWebTitle"))}</h3><p class="mt-2 text-sm text-muted" data-v-609bbb3b>${ssrInterpolate(unref(t)("indexSections.servWebDesc"))}</p></div><span class="badge border border-border/60" data-v-609bbb3b>WEB</span></div><ul class="mt-4 space-y-2 text-sm text-muted" data-v-609bbb3b><li class="flex gap-2" data-v-609bbb3b><span aria-hidden="true" class="material-symbols-outlined text-base text-amber-500" data-v-609bbb3b>bolt</span> ${ssrInterpolate(unref(t)("indexSections.servWebItem1"))}</li><li class="flex gap-2" data-v-609bbb3b><span aria-hidden="true" class="material-symbols-outlined text-base text-fuchsia-500" data-v-609bbb3b>palette</span> ${ssrInterpolate(unref(t)("indexSections.servWebItem2"))}</li><li class="flex gap-2" data-v-609bbb3b><span aria-hidden="true" class="material-symbols-outlined text-base text-cyan-500" data-v-609bbb3b>accessibility_new</span> ${ssrInterpolate(unref(t)("indexSections.servWebItem3"))}</li></ul></article><article class="rounded-3xl border border-border/60 bg-card/60 p-6 shadow-sm backdrop-blur" data-v-609bbb3b><div class="flex items-start justify-between gap-4" data-v-609bbb3b><div data-v-609bbb3b><h3 class="text-lg font-extrabold" data-v-609bbb3b>${ssrInterpolate(unref(t)("indexSections.servAdjTitle"))}</h3><p class="mt-2 text-sm text-muted" data-v-609bbb3b>${ssrInterpolate(unref(t)("indexSections.servAdjDesc"))}</p></div><span class="badge border border-border/60" data-v-609bbb3b>UI/UX</span></div><ul class="mt-4 space-y-2 text-sm text-muted" data-v-609bbb3b><li class="flex gap-2" data-v-609bbb3b><span aria-hidden="true" class="material-symbols-outlined text-base text-indigo-500" data-v-609bbb3b>widgets</span> ${ssrInterpolate(unref(t)("indexSections.servAdjItem1"))}</li><li class="flex gap-2" data-v-609bbb3b><span aria-hidden="true" class="material-symbols-outlined text-base text-emerald-500" data-v-609bbb3b>trending_up</span> ${ssrInterpolate(unref(t)("indexSections.servAdjItem2"))}</li><li class="flex gap-2" data-v-609bbb3b><span aria-hidden="true" class="material-symbols-outlined text-base text-blue-500" data-v-609bbb3b>search</span> ${ssrInterpolate(unref(t)("indexSections.servAdjItem3"))}</li></ul></article><article class="rounded-3xl border border-border/60 bg-card/60 p-6 shadow-sm backdrop-blur" data-v-609bbb3b><div class="flex items-start justify-between gap-4" data-v-609bbb3b><div data-v-609bbb3b><h3 class="text-lg font-extrabold" data-v-609bbb3b>${ssrInterpolate(unref(t)("indexSections.servItTitle"))}</h3><p class="mt-2 text-sm text-muted" data-v-609bbb3b>${ssrInterpolate(unref(t)("indexSections.servItDesc"))}</p></div><span class="badge border border-border/60" data-v-609bbb3b>TI</span></div><ul class="mt-4 space-y-2 text-sm text-muted" data-v-609bbb3b><li class="flex gap-2" data-v-609bbb3b><span aria-hidden="true" class="material-symbols-outlined text-base text-orange-500" data-v-609bbb3b>construction</span> ${ssrInterpolate(unref(t)("indexSections.servItItem1"))}</li><li class="flex gap-2" data-v-609bbb3b><span aria-hidden="true" class="material-symbols-outlined text-base text-cyan-500" data-v-609bbb3b>wifi</span> ${ssrInterpolate(unref(t)("indexSections.servItItem2"))}</li><li class="flex gap-2" data-v-609bbb3b><span aria-hidden="true" class="material-symbols-outlined text-base text-amber-500" data-v-609bbb3b>build</span> ${ssrInterpolate(unref(t)("indexSections.servItItem3"))}</li></ul></article><article class="rounded-3xl border border-border/60 bg-card/60 p-6 shadow-sm backdrop-blur" data-v-609bbb3b><div class="flex items-start justify-between gap-4" data-v-609bbb3b><div data-v-609bbb3b><h3 class="text-lg font-extrabold" data-v-609bbb3b>${ssrInterpolate(unref(t)("indexSections.servNotebookTitle"))}</h3><p class="mt-2 text-sm text-muted" data-v-609bbb3b>${ssrInterpolate(unref(t)("indexSections.servNotebookDesc"))}</p></div><span class="badge border border-border/60" data-v-609bbb3b>NOTEBOOK</span></div><ul class="mt-4 space-y-2 text-sm text-muted" data-v-609bbb3b><li class="flex gap-2" data-v-609bbb3b><span aria-hidden="true" class="material-symbols-outlined text-base text-teal-500" data-v-609bbb3b>cleaning_services</span> ${ssrInterpolate(unref(t)("indexSections.servNotebookItem1"))}</li><li class="flex gap-2" data-v-609bbb3b><span aria-hidden="true" class="material-symbols-outlined text-base text-purple-500" data-v-609bbb3b>memory</span> ${ssrInterpolate(unref(t)("indexSections.servNotebookItem2"))}</li><li class="flex gap-2" data-v-609bbb3b><span aria-hidden="true" class="material-symbols-outlined text-base text-emerald-500" data-v-609bbb3b>battery_charging_full</span> ${ssrInterpolate(unref(t)("indexSections.servNotebookItem3"))}</li></ul></article></div><div class="mt-6 text-foreground rounded-3xl border border-blue-300/50 bg-blue-500/10 p-5 text-center shadow-sm dark:border-blue-500/30 dark:bg-blue-500/15" data-v-609bbb3b><div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between" data-v-609bbb3b><div data-v-609bbb3b><h3 class="text-lg font-extrabold text-start" data-v-609bbb3b>${ssrInterpolate(unref(t)("indexSections.servCtaTitle"))}</h3><p class="mt-1 text-sm text-start" data-v-609bbb3b>${ssrInterpolate(unref(t)("indexSections.servCtaDesc"))}</p></div>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/contato",
        class: "inline-flex items-center justify-center rounded-full bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 shrink-0"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(t)("indexSections.servCtaBtn"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(t)("indexSections.servCtaBtn")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></section><section id="portfolio" class="mt-14 md:mt-18" data-v-609bbb3b><div class="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between" data-v-609bbb3b><div data-v-609bbb3b><h2 class="text-2xl font-black tracking-tight md:text-3xl" data-v-609bbb3b>${ssrInterpolate(unref(t)("indexSections.portfolioTitle"))}</h2><p class="mt-2 text-muted" data-v-609bbb3b>${ssrInterpolate(unref(t)("indexSections.portfolioDesc"))}</p></div>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/about",
        class: "border border-border/60 rounded-full px-3 py-1.5 hover:-translate-y-0.5 duration-300 text-sm text-center font-semibold shrink-0"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(t)("indexSections.portfolioMore"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(t)("indexSections.portfolioMore")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(ProjectShowcase, {
        columns: 2,
        "hide-heading": true,
        slugs: ["yu-gi-oh-api", "loja-do-seu-ze"],
        class: "mt-7"
      }, null, _parent));
      _push(`</section><section id="contato" class="mt-14 pb-12 md:mt-18" data-v-609bbb3b><div class="rounded-[2.5rem] border border-border/70 from-blue-500/15 via-indigo-500/10 to-fuchsia-500/15 p-5 shadow-sm backdrop-blur sm:p-8 md:p-10" data-v-609bbb3b><div class="grid gap-8 md:grid-cols-2 md:items-start" data-v-609bbb3b><div data-v-609bbb3b><h2 class="text-2xl font-black tracking-tight md:text-3xl" data-v-609bbb3b>${ssrInterpolate(unref(t)("indexSections.contactTitle"))}</h2><p class="mt-3 text-muted" data-v-609bbb3b>${ssrInterpolate(unref(t)("indexSections.contactDesc"))}</p><ul class="mt-6 space-y-3 text-sm text-muted" data-v-609bbb3b><li class="flex items-start gap-3" data-v-609bbb3b><span aria-hidden="true" class="material-symbols-outlined mt-0.5 flex size-9 items-center justify-center rounded-xl bg-muted/60 text-lg text-rose-500 shrink-0" data-v-609bbb3b>location_on</span><div data-v-609bbb3b><p class="font-semibold text-foreground/90" data-v-609bbb3b>${ssrInterpolate(unref(t)("indexSections.contactLocLabel"))}</p><p data-v-609bbb3b>${ssrInterpolate(unref(t)("indexSections.contactLocDesc"))}</p></div></li><li class="flex items-start gap-3" data-v-609bbb3b><span aria-hidden="true" class="material-symbols-outlined mt-0.5 flex size-9 items-center justify-center rounded-xl bg-muted/60 text-lg text-amber-500 shrink-0" data-v-609bbb3b>bolt</span><div data-v-609bbb3b><p class="font-semibold text-foreground/90" data-v-609bbb3b>${ssrInterpolate(unref(t)("indexSections.contactObjLabel"))}</p><p data-v-609bbb3b>${ssrInterpolate(unref(t)("indexSections.contactObjDesc"))}</p></div></li></ul></div><form class="bg-background rounded-3xl border border-border/60 bg-card/70 p-5 shadow-sm backdrop-blur sm:p-6 md:p-8" data-v-609bbb3b><div class="flex items-center justify-between gap-4" data-v-609bbb3b><h3 class="text-lg font-extrabold" data-v-609bbb3b>${ssrInterpolate(unref(t)("contact.formTitle"))}</h3><span class="text-xs font-semibold text-muted" data-v-609bbb3b>${ssrInterpolate(unref(t)("contact.formFast"))}</span></div><div class="mt-5 grid gap-4" data-v-609bbb3b><label class="block" data-v-609bbb3b><span class="text-sm font-semibold" data-v-609bbb3b>${ssrInterpolate(unref(t)("contact.formName"))}</span><input${ssrRenderAttr("value", form.value.name)} type="text" class="mt-2 w-full rounded-2xl border border-border/70 bg-background/50 px-4 py-3 text-sm outline-none transition focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/20"${ssrRenderAttr("placeholder", unref(t)("contact.formNamePlaceholder"))} required data-v-609bbb3b></label><label class="block" data-v-609bbb3b><span class="text-sm font-semibold" data-v-609bbb3b>${ssrInterpolate(unref(t)("contact.formContact"))}</span><input${ssrRenderAttr("value", form.value.contact)} type="text" class="mt-2 w-full rounded-2xl border border-border/70 bg-background/50 px-4 py-3 text-sm outline-none transition focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/20"${ssrRenderAttr("placeholder", unref(t)("contact.formContactPlaceholder"))} required data-v-609bbb3b></label><label class="block" data-v-609bbb3b><span class="text-sm font-semibold" data-v-609bbb3b>${ssrInterpolate(unref(t)("contact.formSubject"))}</span><select class="mt-2 w-full rounded-2xl border border-border/70 bg-background/50 px-4 py-3 text-sm outline-none transition focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/20" required data-v-609bbb3b><option class="bg-background text-foreground" value="web" data-v-609bbb3b${ssrIncludeBooleanAttr(Array.isArray(form.value.topic) ? ssrLooseContain(form.value.topic, "web") : ssrLooseEqual(form.value.topic, "web")) ? " selected" : ""}>${ssrInterpolate(unref(t)("contact.formSubjectWeb"))}</option><option class="bg-background text-foreground" value="ti" data-v-609bbb3b${ssrIncludeBooleanAttr(Array.isArray(form.value.topic) ? ssrLooseContain(form.value.topic, "ti") : ssrLooseEqual(form.value.topic, "ti")) ? " selected" : ""}>${ssrInterpolate(unref(t)("contact.formSubjectIT"))}</option><option class="bg-background text-foreground" value="assistencia-tecnica" data-v-609bbb3b${ssrIncludeBooleanAttr(Array.isArray(form.value.topic) ? ssrLooseContain(form.value.topic, "assistencia-tecnica") : ssrLooseEqual(form.value.topic, "assistencia-tecnica")) ? " selected" : ""}>${ssrInterpolate(unref(t)("contact.formSubjectTech"))}</option></select></label><label class="block" data-v-609bbb3b><span class="text-sm font-semibold" data-v-609bbb3b>${ssrInterpolate(unref(t)("contact.formSource"))}</span><select class="mt-2 w-full rounded-2xl border border-border/70 bg-background/50 px-4 py-3 text-sm outline-none transition focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/20" required data-v-609bbb3b><option class="bg-background text-foreground" value="google" data-v-609bbb3b${ssrIncludeBooleanAttr(Array.isArray(form.value.source) ? ssrLooseContain(form.value.source, "google") : ssrLooseEqual(form.value.source, "google")) ? " selected" : ""}>${ssrInterpolate(unref(t)("contact.formSourceGoogle"))}</option><option class="bg-background text-foreground" value="linkedin" data-v-609bbb3b${ssrIncludeBooleanAttr(Array.isArray(form.value.source) ? ssrLooseContain(form.value.source, "linkedin") : ssrLooseEqual(form.value.source, "linkedin")) ? " selected" : ""}>${ssrInterpolate(unref(t)("contact.formSourceLinkedin"))}</option><option class="bg-background text-foreground" value="indicacao" data-v-609bbb3b${ssrIncludeBooleanAttr(Array.isArray(form.value.source) ? ssrLooseContain(form.value.source, "indicacao") : ssrLooseEqual(form.value.source, "indicacao")) ? " selected" : ""}>${ssrInterpolate(unref(t)("contact.formSourceIndication"))}</option><option class="bg-background text-foreground" value="github" data-v-609bbb3b${ssrIncludeBooleanAttr(Array.isArray(form.value.source) ? ssrLooseContain(form.value.source, "github") : ssrLooseEqual(form.value.source, "github")) ? " selected" : ""}>${ssrInterpolate(unref(t)("contact.formSourceGithub"))}</option></select></label><label class="block" data-v-609bbb3b><span class="text-sm font-semibold" data-v-609bbb3b>${ssrInterpolate(unref(t)("contact.formMessage"))}</span><textarea rows="5" class="mt-2 w-full resize-none rounded-2xl border border-border/70 bg-background/50 px-4 py-3 text-sm outline-none transition focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/20"${ssrRenderAttr("placeholder", unref(t)("contact.formMessagePlaceholder"))} required data-v-609bbb3b>${ssrInterpolate(form.value.message)}</textarea></label><button type="submit"${ssrIncludeBooleanAttr(isSending.value) ? " disabled" : ""} class="inline-flex w-full items-center justify-center rounded-2xl bg-blue-600 px-4 py-3 text-sm font-extrabold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-wait disabled:opacity-55" data-v-609bbb3b>${ssrInterpolate(isSending.value ? unref(t)("contact.formSending") : unref(t)("contact.formSend"))}</button>`);
      if (sendError.value) {
        _push(`<p class="rounded-2xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-700 dark:text-red-300" role="alert" data-v-609bbb3b>${ssrInterpolate(sendError.value)}</p>`);
      } else {
        _push(`<!---->`);
      }
      if (toast.value) {
        _push(`<p class="rounded-2xl border border-border/70 bg-card/60 px-4 py-3 text-sm text-muted" role="status" data-v-609bbb3b>${ssrInterpolate(toast.value)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></form></div></div></section></main>`);
      _push(ssrRenderComponent(SiteFooter, null, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-609bbb3b"]]);

export { index as default };
//# sourceMappingURL=index-Cx_AJHEP.mjs.map
