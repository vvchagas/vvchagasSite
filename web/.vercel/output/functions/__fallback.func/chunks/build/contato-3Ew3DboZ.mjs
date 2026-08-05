import { u as useLocale, a as useScrollReveal, _ as __nuxt_component_0, S as SiteHeader, b as SiteFooter } from './SiteFooter-CWM2p8XQ.mjs';
import { defineComponent, ref, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from 'vue/server-renderer';
import { u as useHead, a as useRoute } from './server.mjs';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
import './nuxt-link-XoKa4W7F.mjs';
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
  __name: "contato",
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = useLocale();
    useHead({
      title: "vvchagas - Contato",
      link: [
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,300,0,0"
        }
      ]
    });
    const route = useRoute();
    const toast = ref(null);
    const isSending = ref(false);
    const sendError = ref(null);
    const selectedProject = typeof route.query.projeto === "string" ? route.query.projeto : "";
    const form = ref({
      name: "",
      contact: "",
      topic: "web",
      source: "google",
      message: selectedProject ? `Olá! Quero um projeto semelhante a "${selectedProject}".` : ""
    });
    const heroSection = ref(null);
    const cardWhatsapp = ref(null);
    const cardLinkedin = ref(null);
    const cardEmail = ref(null);
    const cardForm = ref(null);
    useScrollReveal(heroSection);
    useScrollReveal(cardWhatsapp, { delay: 0 });
    useScrollReveal(cardLinkedin, { delay: 0.15 });
    useScrollReveal(cardEmail, { delay: 0.3 });
    useScrollReveal(cardForm, { delay: 0.45 });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtRouteAnnouncer = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-background text-foreground overflow-x-hidden" }, _attrs))} data-v-6d594a64>`);
      _push(ssrRenderComponent(_component_NuxtRouteAnnouncer, null, null, _parent));
      _push(`<a href="#conteudo" class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-blue-600 focus:px-3 focus:py-2 focus:text-white" data-v-6d594a64>${ssrInterpolate(unref(t)("common.skipToContent"))}</a>`);
      _push(ssrRenderComponent(SiteHeader, null, null, _parent));
      _push(`<main id="conteudo" class="mx-auto w-full max-w-6xl px-4 md:px-6" data-v-6d594a64><section class="mx-auto w-full max-w-4xl py-10 sm:py-16" data-v-6d594a64><div class="mb-8 max-w-2xl space-y-4 sm:mb-10" data-v-6d594a64><p class="text-xs font-semibold uppercase tracking-[0.3em] text-blue-600 dark:text-blue-400 sm:text-sm" data-v-6d594a64>${ssrInterpolate(unref(t)("contact.sectionLabel"))}</p><h1 class="text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl" data-v-6d594a64>${ssrInterpolate(unref(t)("contact.heading"))}</h1><p class="text-base leading-7 text-muted sm:text-lg sm:leading-8" data-v-6d594a64>${ssrInterpolate(unref(t)("contact.description"))}</p></div><div class="contact-card contact-card--whatsapp rounded-2xl border border-border/60 border-green-600 bg-card/70 p-5 shadow-sm backdrop-blur sm:rounded-[2rem] sm:p-8" data-v-6d594a64><div class="flex items-center justify-center gap-2 text-green-600 dark:text-green-400" data-v-6d594a64><svg viewBox="0 0 24 24" fill="currentColor" role="img" aria-hidden="true" class="size-5 shrink-0" data-v-6d594a64><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" data-v-6d594a64></path></svg><span class="text-sm font-semibold sm:text-base" data-v-6d594a64>WhatsApp</span></div><div class="mt-5 rounded-xl border border-border/60 border-green-600 bg-card/70 p-4 shadow-sm backdrop-blur sm:mt-6 sm:rounded-[2rem] sm:p-8" data-v-6d594a64><h3 class="text-center text-base sm:text-lg mb-4 sm:mb-5 font-bold" data-v-6d594a64>${ssrInterpolate(unref(t)("contact.whatsappResponseTitle"))}</h3><p class="text-center mb-4 text-sm sm:text-base" data-v-6d594a64>${ssrInterpolate(unref(t)("contact.whatsappResponseTime"))}</p><p class="text-sm sm:text-base text-center sm:text-start" data-v-6d594a64>${ssrInterpolate(unref(t)("contact.whatsappResponseDesc"))}</p></div><a href="http://wa.me/14997760049" target="_blank" rel="noopener noreferrer" class="contact-cta contact-cta--whatsapp mx-auto mt-5 flex w-fit items-center justify-center rounded-md bg-green-600 px-6 py-2.5 text-center text-white sm:mt-6 text-sm sm:text-base" data-v-6d594a64>${ssrInterpolate(unref(t)("contact.whatsappBtn"))}</a></div><div class="contact-card contact-card--linkedin mt-8 rounded-2xl border border-border/60 border-blue-600 bg-card/70 p-5 shadow-sm backdrop-blur sm:mt-10 sm:rounded-[2rem] sm:p-8" data-v-6d594a64><div class="flex items-center justify-center gap-2 text-blue-600 dark:text-blue-400" data-v-6d594a64><svg viewBox="0 0 24 24" fill="currentColor" role="img" aria-hidden="true" class="size-5 shrink-0" data-v-6d594a64><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" data-v-6d594a64></path></svg><span class="text-sm font-semibold sm:text-base" data-v-6d594a64>LinkedIn</span></div><div class="mt-5 rounded-xl border border-border/60 border-blue-600 bg-card/70 p-4 shadow-sm backdrop-blur sm:mt-6 sm:rounded-[2rem] sm:p-8" data-v-6d594a64><h3 class="text-center text-base sm:text-lg mb-4 sm:mb-5 font-bold" data-v-6d594a64>${ssrInterpolate(unref(t)("contact.linkedinResponseTitle"))}</h3><p class="text-center mb-4 text-sm sm:text-base" data-v-6d594a64>${ssrInterpolate(unref(t)("contact.linkedinResponseTime"))}</p><p class="text-sm sm:text-base text-center sm:text-start" data-v-6d594a64>${ssrInterpolate(unref(t)("contact.linkedinResponseDesc"))}</p></div><a href="http://linkedin.com/in/victor-vasques-chagas" target="_blank" rel="noopener noreferrer" class="contact-cta contact-cta--linkedin mx-auto mt-5 flex w-fit items-center justify-center rounded-md bg-blue-600 px-6 py-2.5 text-center text-white sm:mt-6 text-sm sm:text-base" data-v-6d594a64>${ssrInterpolate(unref(t)("contact.linkedinBtn"))}</a></div><div class="contact-card contact-card--email mt-8 rounded-2xl border border-border/60 border-red-600 bg-card/70 p-5 shadow-sm backdrop-blur sm:mt-10 sm:rounded-[2rem] sm:p-8" data-v-6d594a64><div class="flex items-center justify-center gap-2 text-red-600 dark:text-red-400" data-v-6d594a64><svg viewBox="0 0 24 24" fill="currentColor" role="img" aria-hidden="true" class="size-5 shrink-0" data-v-6d594a64><path d="M22 4H2C.9 4 0 4.9 0 6v12c0 1.1.9 2 2 2h20c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-10 6.25L2 8V6l10 6.25L22 6v2z" data-v-6d594a64></path></svg><span class="text-sm font-semibold sm:text-base" data-v-6d594a64>E-mail</span></div><div class="mt-5 rounded-xl border border-border/60 border-red-600 bg-card/70 p-4 shadow-sm backdrop-blur sm:mt-6 sm:rounded-[2rem] sm:p-8" data-v-6d594a64><h3 class="text-center text-base sm:text-lg mb-4 sm:mb-5 font-bold" data-v-6d594a64>${ssrInterpolate(unref(t)("contact.emailResponseTitle"))}</h3><p class="text-center mb-4 text-sm sm:text-base" data-v-6d594a64>${ssrInterpolate(unref(t)("contact.emailResponseTime"))}</p><p class="text-sm sm:text-base text-center sm:text-start" data-v-6d594a64>${ssrInterpolate(unref(t)("contact.emailResponseDesc"))}</p></div><a href="https://mail.google.com/mail/u/0/#inbox?compose=CllgCJZXhjGdXcDqqFVrNpsqdnDjmqDsNHZLZBKLWqnWNGkCVZSfTPmBxgsJLDhNQTtmnCbFsFL" target="_blank" rel="noopener noreferrer" class="contact-cta contact-cta--email mx-auto mt-5 flex w-fit items-center justify-center rounded-md bg-red-600 px-6 py-2.5 text-center text-white sm:mt-6 text-sm sm:text-base" data-v-6d594a64>${ssrInterpolate(unref(t)("contact.emailBtn"))}</a></div><div data-v-6d594a64><h2 class="mt-10 text-base sm:text-lg text-center font-bold" data-v-6d594a64>${ssrInterpolate(unref(t)("contact.formIntro"))}</h2></div><div class="contact-card contact-card--form mt-5 rounded-xl border border-border/60 border-gray-600 bg-card/70 p-4 shadow-sm backdrop-blur sm:mt-6 sm:rounded-[2rem] sm:p-8" data-v-6d594a64><h3 class="text-center text-base sm:text-lg mb-4 sm:mb-5 font-bold" data-v-6d594a64>${ssrInterpolate(unref(t)("contact.formResponseTitle"))}</h3><p class="text-center mb-4 text-sm sm:text-base" data-v-6d594a64>${ssrInterpolate(unref(t)("contact.formResponseTime"))}</p><p class="text-sm sm:text-base text-center sm:text-start" data-v-6d594a64>${ssrInterpolate(unref(t)("contact.formResponseDesc"))}</p><form class="bg-background rounded-3xl border border-border/60 bg-card/70 p-5 shadow-sm backdrop-blur sm:p-6 md:p-8 mt-5" data-v-6d594a64><div class="flex items-center justify-between gap-4" data-v-6d594a64><h3 class="text-lg font-extrabold" data-v-6d594a64>${ssrInterpolate(unref(t)("contact.formTitle"))}</h3><span class="text-xs font-semibold text-muted" data-v-6d594a64>${ssrInterpolate(unref(t)("contact.formFast"))}</span></div><div class="mt-5 grid gap-4" data-v-6d594a64><label class="block" data-v-6d594a64><span class="text-sm font-semibold" data-v-6d594a64>${ssrInterpolate(unref(t)("contact.formName"))}</span><input${ssrRenderAttr("value", form.value.name)} type="text" class="mt-2 w-full rounded-2xl border border-border/70 bg-background/50 px-4 py-3 text-sm outline-none transition focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/20"${ssrRenderAttr("placeholder", unref(t)("contact.formNamePlaceholder"))} required data-v-6d594a64></label><label class="block" data-v-6d594a64><span class="text-sm font-semibold" data-v-6d594a64>${ssrInterpolate(unref(t)("contact.formContact"))}</span><input${ssrRenderAttr("value", form.value.contact)} type="text" class="mt-2 w-full rounded-2xl border border-border/70 bg-background/50 px-4 py-3 text-sm outline-none transition focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/20"${ssrRenderAttr("placeholder", unref(t)("contact.formContactPlaceholder"))} required data-v-6d594a64></label><label class="block" data-v-6d594a64><span class="text-sm font-semibold" data-v-6d594a64>${ssrInterpolate(unref(t)("contact.formSubject"))}</span><select class="mt-2 w-full rounded-2xl border border-border/70 bg-background/50 px-4 py-3 text-sm outline-none transition focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/20" required data-v-6d594a64><option class="bg-background text-foreground" value="web" data-v-6d594a64${ssrIncludeBooleanAttr(Array.isArray(form.value.topic) ? ssrLooseContain(form.value.topic, "web") : ssrLooseEqual(form.value.topic, "web")) ? " selected" : ""}>${ssrInterpolate(unref(t)("contact.formSubjectWeb"))}</option><option class="bg-background text-foreground" value="ti" data-v-6d594a64${ssrIncludeBooleanAttr(Array.isArray(form.value.topic) ? ssrLooseContain(form.value.topic, "ti") : ssrLooseEqual(form.value.topic, "ti")) ? " selected" : ""}>${ssrInterpolate(unref(t)("contact.formSubjectIT"))}</option><option class="bg-background text-foreground" value="assistencia-tecnica" data-v-6d594a64${ssrIncludeBooleanAttr(Array.isArray(form.value.topic) ? ssrLooseContain(form.value.topic, "assistencia-tecnica") : ssrLooseEqual(form.value.topic, "assistencia-tecnica")) ? " selected" : ""}>${ssrInterpolate(unref(t)("contact.formSubjectTech"))}</option></select></label><label class="block" data-v-6d594a64><span class="text-sm font-semibold" data-v-6d594a64>${ssrInterpolate(unref(t)("contact.formSource"))}</span><select class="mt-2 w-full rounded-2xl border border-border/70 bg-background/50 px-4 py-3 text-sm outline-none transition focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/20" required data-v-6d594a64><option class="bg-background text-foreground" value="google" data-v-6d594a64${ssrIncludeBooleanAttr(Array.isArray(form.value.source) ? ssrLooseContain(form.value.source, "google") : ssrLooseEqual(form.value.source, "google")) ? " selected" : ""}>${ssrInterpolate(unref(t)("contact.formSourceGoogle"))}</option><option class="bg-background text-foreground" value="linkedin" data-v-6d594a64${ssrIncludeBooleanAttr(Array.isArray(form.value.source) ? ssrLooseContain(form.value.source, "linkedin") : ssrLooseEqual(form.value.source, "linkedin")) ? " selected" : ""}>${ssrInterpolate(unref(t)("contact.formSourceLinkedin"))}</option><option class="bg-background text-foreground" value="indicacao" data-v-6d594a64${ssrIncludeBooleanAttr(Array.isArray(form.value.source) ? ssrLooseContain(form.value.source, "indicacao") : ssrLooseEqual(form.value.source, "indicacao")) ? " selected" : ""}>${ssrInterpolate(unref(t)("contact.formSourceIndication"))}</option><option class="bg-background text-foreground" value="github" data-v-6d594a64${ssrIncludeBooleanAttr(Array.isArray(form.value.source) ? ssrLooseContain(form.value.source, "github") : ssrLooseEqual(form.value.source, "github")) ? " selected" : ""}>${ssrInterpolate(unref(t)("contact.formSourceGithub"))}</option></select></label><label class="block" data-v-6d594a64><span class="text-sm font-semibold" data-v-6d594a64>${ssrInterpolate(unref(t)("contact.formMessage"))}</span><textarea rows="5" class="mt-2 w-full resize-none rounded-2xl border border-border/70 bg-background/50 px-4 py-3 text-sm outline-none transition focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/20"${ssrRenderAttr("placeholder", unref(t)("contact.formMessagePlaceholder"))} required data-v-6d594a64>${ssrInterpolate(form.value.message)}</textarea></label><button type="submit"${ssrIncludeBooleanAttr(isSending.value) ? " disabled" : ""} class="inline-flex w-full items-center justify-center rounded-2xl bg-blue-600 px-4 py-3 text-sm font-extrabold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-wait disabled:opacity-55" data-v-6d594a64>${ssrInterpolate(isSending.value ? unref(t)("contact.formSending") : unref(t)("contact.formSend"))}</button>`);
      if (sendError.value) {
        _push(`<p class="rounded-2xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-700 dark:text-red-300" role="alert" data-v-6d594a64>${ssrInterpolate(sendError.value)}</p>`);
      } else {
        _push(`<!---->`);
      }
      if (toast.value) {
        _push(`<p class="rounded-2xl border border-border/70 bg-card/60 px-4 py-3 text-sm text-muted" role="status" data-v-6d594a64>${ssrInterpolate(toast.value)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></form></div></section></main>`);
      _push(ssrRenderComponent(SiteFooter, null, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/contato.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const contato = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-6d594a64"]]);

export { contato as default };
//# sourceMappingURL=contato-3Ew3DboZ.mjs.map
