import { u as useLocale, a as useScrollReveal, _ as __nuxt_component_0, S as SiteHeader, b as SiteFooter } from './SiteFooter-CWM2p8XQ.mjs';
import { _ as __nuxt_component_0$1 } from './nuxt-link-XoKa4W7F.mjs';
import { defineComponent, ref, mergeProps, unref, withCtx, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { u as useHead } from './server.mjs';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
import '../_/nitro.mjs';
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
import 'vue-router';
import '@iconify/vue';
import 'tailwindcss/colors';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "servicos",
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = useLocale();
    useHead({
      title: "vvchagas - Meus Serviços",
      link: [
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,300,0,0"
        }
      ]
    });
    const heroSection = ref(null);
    const ctaSection = ref(null);
    useScrollReveal(heroSection);
    useScrollReveal(ctaSection, { delay: 0.1 });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtRouteAnnouncer = __nuxt_component_0;
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-background text-foreground overflow-x-hidden" }, _attrs))} data-v-145ed46f>`);
      _push(ssrRenderComponent(_component_NuxtRouteAnnouncer, null, null, _parent));
      _push(`<a href="#conteudo" class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-blue-600 focus:px-3 focus:py-2 focus:text-white" data-v-145ed46f>${ssrInterpolate(unref(t)("common.skipToContent"))}</a>`);
      _push(ssrRenderComponent(SiteHeader, null, null, _parent));
      _push(`<main id="conteudo" class="mx-auto w-full max-w-6xl px-4 md:px-6" data-v-145ed46f><section class="mx-auto flex w-full max-w-7xl flex-col gap-10 py-10 sm:py-16" data-v-145ed46f><div class="max-w-3xl space-y-4" data-v-145ed46f><p class="text-xs sm:text-sm font-semibold uppercase tracking-[0.3em] text-cyan-700 dark:text-cyan-400" data-v-145ed46f>${ssrInterpolate(unref(t)("services.sectionLabel"))}</p><h1 class="text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl" data-v-145ed46f>${ssrInterpolate(unref(t)("services.heading"))}</h1><p class="max-w-2xl text-base leading-7 sm:text-lg sm:leading-8 text-muted" data-v-145ed46f>${ssrInterpolate(unref(t)("services.description"))}</p></div><div class="grid gap-6 lg:grid-cols-3" data-v-145ed46f><article class="rounded-3xl border border-border/60 bg-card/70 p-6 sm:p-8 shadow-sm backdrop-blur transition hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between" data-v-145ed46f><div data-v-145ed46f><div class="mb-6 inline-flex rounded-2xl bg-cyan-100 px-4 py-2 text-xs sm:text-sm font-semibold text-cyan-800 dark:bg-cyan-950 dark:text-cyan-300" data-v-145ed46f>${ssrInterpolate(unref(t)("services.webBadge"))}</div><h2 class="text-xl sm:text-2xl font-bold" data-v-145ed46f>${ssrInterpolate(unref(t)("services.webTitle"))}</h2><p class="mt-4 text-sm leading-7 text-muted" data-v-145ed46f>${ssrInterpolate(unref(t)("services.webDesc"))}</p><ul class="mt-6 space-y-3 text-sm text-muted" data-v-145ed46f><li class="flex gap-3" data-v-145ed46f><span class="mt-2 h-2 w-2 shrink-0 rounded-full bg-cyan-500" data-v-145ed46f></span><span data-v-145ed46f>${ssrInterpolate(unref(t)("services.webItem1"))}</span></li><li class="flex gap-3" data-v-145ed46f><span class="mt-2 h-2 w-2 shrink-0 rounded-full bg-cyan-500" data-v-145ed46f></span><span data-v-145ed46f>${ssrInterpolate(unref(t)("services.webItem2"))}</span></li><li class="flex gap-3" data-v-145ed46f><span class="mt-2 h-2 w-2 shrink-0 rounded-full bg-cyan-500" data-v-145ed46f></span><span data-v-145ed46f>${ssrInterpolate(unref(t)("services.webItem3"))}</span></li></ul></div>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/contato",
        class: "mt-8 inline-flex items-center justify-center rounded-full bg-zinc-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-cyan-600 dark:bg-white dark:text-zinc-950 dark:hover:bg-cyan-300"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(t)("services.webBtn"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(t)("services.webBtn")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</article><article class="rounded-3xl border border-border/60 bg-card/70 p-6 sm:p-8 shadow-sm backdrop-blur transition hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between" data-v-145ed46f><div data-v-145ed46f><div class="mb-6 inline-flex rounded-2xl bg-emerald-100 px-4 py-2 text-xs sm:text-sm font-semibold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300" data-v-145ed46f>${ssrInterpolate(unref(t)("services.itBadge"))}</div><h2 class="text-xl sm:text-2xl font-bold" data-v-145ed46f>${ssrInterpolate(unref(t)("services.itTitle"))}</h2><p class="mt-4 text-sm leading-7 text-muted" data-v-145ed46f>${ssrInterpolate(unref(t)("services.itDesc"))}</p><ul class="mt-6 space-y-3 text-sm text-muted" data-v-145ed46f><li class="flex gap-3" data-v-145ed46f><span class="mt-2 h-2 w-2 shrink-0 rounded-full bg-emerald-500" data-v-145ed46f></span><span data-v-145ed46f>${ssrInterpolate(unref(t)("services.itItem1"))}</span></li><li class="flex gap-3" data-v-145ed46f><span class="mt-2 h-2 w-2 shrink-0 rounded-full bg-emerald-500" data-v-145ed46f></span><span data-v-145ed46f>${ssrInterpolate(unref(t)("services.itItem2"))}</span></li><li class="flex gap-3" data-v-145ed46f><span class="mt-2 h-2 w-2 shrink-0 rounded-full bg-emerald-500" data-v-145ed46f></span><span data-v-145ed46f>${ssrInterpolate(unref(t)("services.itItem3"))}</span></li></ul></div>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/contato",
        class: "mt-8 inline-flex items-center justify-center rounded-full bg-zinc-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-600 dark:bg-white dark:text-zinc-950 dark:hover:bg-emerald-300"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(t)("services.itBtn"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(t)("services.itBtn")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</article><article class="rounded-3xl border border-border/60 bg-card/70 p-6 sm:p-8 shadow-sm backdrop-blur transition hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between" data-v-145ed46f><div data-v-145ed46f><div class="mb-6 inline-flex rounded-2xl bg-amber-100 px-4 py-2 text-xs sm:text-sm font-semibold text-amber-800 dark:bg-amber-950 dark:text-amber-300" data-v-145ed46f>${ssrInterpolate(unref(t)("services.notebookBadge"))}</div><h2 class="text-xl sm:text-2xl font-bold" data-v-145ed46f>${ssrInterpolate(unref(t)("services.notebookTitle"))}</h2><p class="mt-4 text-sm leading-7 text-muted" data-v-145ed46f>${ssrInterpolate(unref(t)("services.notebookDesc"))}</p><ul class="mt-6 space-y-3 text-sm text-muted" data-v-145ed46f><li class="flex gap-3" data-v-145ed46f><span class="mt-2 h-2 w-2 shrink-0 rounded-full bg-amber-500" data-v-145ed46f></span><span data-v-145ed46f>${ssrInterpolate(unref(t)("services.notebookItem1"))}</span></li><li class="flex gap-3" data-v-145ed46f><span class="mt-2 h-2 w-2 shrink-0 rounded-full bg-amber-500" data-v-145ed46f></span><span data-v-145ed46f>${ssrInterpolate(unref(t)("services.notebookItem2"))}</span></li><li class="flex gap-3" data-v-145ed46f><span class="mt-2 h-2 w-2 shrink-0 rounded-full bg-amber-500" data-v-145ed46f></span><span data-v-145ed46f>${ssrInterpolate(unref(t)("services.notebookItem3"))}</span></li></ul></div>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/contato",
        class: "mt-8 inline-flex items-center justify-center rounded-full bg-zinc-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-amber-600 dark:bg-white dark:text-zinc-950 dark:hover:bg-amber-300"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(t)("services.notebookBtn"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(t)("services.notebookBtn")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</article></div><section class="rounded-[2rem] border border-border/60 bg-card/70 p-6 shadow-sm backdrop-blur sm:p-10" data-v-145ed46f><div class="grid gap-6 lg:grid-cols-[1.25fr_0.75fr] lg:items-center" data-v-145ed46f><div data-v-145ed46f><p class="text-xs sm:text-sm font-semibold uppercase tracking-[0.3em] text-muted" data-v-145ed46f>${ssrInterpolate(unref(t)("services.ctaLabel"))}</p><h2 class="mt-3 text-2xl font-black tracking-tight sm:text-3xl lg:text-4xl" data-v-145ed46f>${ssrInterpolate(unref(t)("services.ctaHeading"))}</h2><p class="mt-4 max-w-2xl text-base leading-7 text-muted" data-v-145ed46f>${ssrInterpolate(unref(t)("services.ctaDesc"))}</p></div><div class="flex flex-col gap-3 sm:flex-row lg:justify-end" data-v-145ed46f>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/contato",
        class: "inline-flex items-center justify-center rounded-full bg-zinc-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-cyan-600 dark:bg-white dark:text-zinc-950 dark:hover:bg-cyan-300"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(t)("services.ctaBtn"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(t)("services.ctaBtn")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/about",
        class: "inline-flex items-center justify-center rounded-full border border-border/70 px-6 py-3 text-sm font-semibold text-foreground/90 transition hover:border-blue-500/60 hover:text-foreground"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(t)("services.ctaBtnSecondary"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(t)("services.ctaBtnSecondary")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></section></section></main>`);
      _push(ssrRenderComponent(SiteFooter, null, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/servicos.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const servicos = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-145ed46f"]]);

export { servicos as default };
//# sourceMappingURL=servicos-sRQNRjnr.mjs.map
