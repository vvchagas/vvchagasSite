import { _ as __nuxt_component_0 } from './nuxt-link-XoKa4W7F.mjs';
import { defineComponent, computed, ref, watch, mergeProps, unref, withCtx, createVNode, toDisplayString, nextTick, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderClass, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrRenderComponent, ssrRenderTeleport } from 'vue/server-renderer';
import { u as useLocale, a as useScrollReveal } from './SiteFooter-CWM2p8XQ.mjs';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';

const rawProjects = [
  {
    slug: "yu-gi-oh-api",
    title: {
      pt: "YU-GI-OH! API",
      en: "YU-GI-OH! API"
    },
    description: {
      pt: "Projeto com API de cartas do jogo YU-GI-OH!",
      en: "Project with YU-GI-OH! card game API"
    },
    longDescription: {
      pt: "O projeto YU-GI-OH! API \xE9 um sistema que consome e apresenta dados de cartas do jogo YU-GI-OH! de forma organizada e responsiva. O objetivo \xE9 oferecer uma experi\xEAncia fluida e clara para quem deseja consultar informa\xE7\xF5es das cartas, com foco em performance, sem\xE2ntica e navega\xE7\xE3o intuitiva.",
      en: "The YU-GI-OH! API project is a system that consumes and presents YU-GI-OH! card game data in an organized and responsive way. It aims to offer a fluid and clear experience for those who want to look up card information, focused on performance, semantics, and intuitive navigation."
    },
    tag: {
      pt: "SITE",
      en: "SITE"
    },
    icon: "smart_toy",
    image: "/yu-gi-oh_foto.webp",
    highlights: [
      { pt: "Responsivo", en: "Responsive" },
      { pt: "Sem\xE2ntica", en: "Semantic" },
      { pt: "Estrutura clara", en: "Clear structure" }
    ],
    stack: ["Vue 3", "TypeScript", "Tailwind CSS", "API REST"],
    githubUrl: "https://github.com/vvchagas/YU-GI-OH"
  },
  {
    slug: "loja-do-seu-ze",
    title: {
      pt: "Loja do Seu Z\xE9",
      en: "Seu Z\xE9's Store"
    },
    description: {
      pt: "ERP com cobran\xE7a",
      en: "ERP with billing"
    },
    longDescription: {
      pt: "O projeto Loja do Seu Z\xE9 \xE9 um sistema ERP com foco em cobran\xE7a e gest\xE3o de vendas. O objetivo \xE9 centralizar o fluxo de pedidos, pagamentos e controle financeiro em uma interface simples e acess\xEDvel, proporcionando performance e responsividade para o uso di\xE1rio.",
      en: "The Seu Z\xE9's Store project is an ERP system focused on billing and sales management. It centralizes the order, payment, and financial control flow in a simple and accessible interface, providing performance and responsiveness for daily use."
    },
    tag: {
      pt: "SITE",
      en: "SITE"
    },
    icon: "storefront",
    image: "/loja-do-seu-ze.webp",
    highlights: [
      { pt: "Acessibilidade", en: "Accessibility" },
      { pt: "Responsividade", en: "Responsiveness" },
      { pt: "Performance", en: "Performance" }
    ],
    stack: ["HTML5", "CSS3", "SQL", "JavaScript", "PHP"],
    githubUrl: "https://github.com/vvchagas/loja-do-seu-ze"
  },
  {
    slug: "sige-sistema-de-emergencias",
    title: {
      pt: "SIGE - Sistema de Emerg\xEAncias",
      en: "SIGE - Emergency Management System"
    },
    description: {
      pt: "Sistema de gest\xE3o de ocorr\xEAncias",
      en: "Incident management system"
    },
    longDescription: {
      pt: "O projeto SIGE \xE9 um sistema de gerenciamento de emerg\xEAncias desenvolvido como um projeto facultativo. Ele foi criado com o objetivo de fornecer uma solu\xE7\xE3o eficiente para lidar com situa\xE7\xF5es de emerg\xEAncia, permitindo que os usu\xE1rios registrem, acompanhem e gerenciem incidentes de forma organizada. Desenvolvido com Vue 3, Tailwind CSS, C#, ASP.NET Core e Entity Framework.",
      en: "The SIGE project is an emergency management system developed as an optional project. It was created to provide an efficient solution for handling emergency situations, allowing users to register, track, and manage incidents in an organized manner. Built with Vue 3, Tailwind CSS, C#, ASP.NET Core, and Entity Framework."
    },
    tag: {
      pt: "SITE",
      en: "SITE"
    },
    icon: "ambulance",
    image: "/SIGE.webp",
    highlights: [
      { pt: "Responsivo e sem\xE2ntico", en: "Responsive and semantic" },
      { pt: "UI clara para convers\xE3o", en: "Clear UI for conversion" },
      { pt: "Performance e acessibilidade", en: "Performance and accessibility" }
    ],
    stack: ["Vue 3", "Tailwind CSS", "C#", "ASP.NET Core", "Entity Framework"],
    githubUrl: "https://github.com/vvchagas/SIGE-Sistema-de-Emergencias"
  },
  {
    slug: "data-secreta",
    title: {
      pt: "Data Secreta",
      en: "Secret Date"
    },
    description: {
      pt: "Mini jogo de adivinha\xE7\xE3o de datas",
      en: "Date guessing mini game"
    },
    longDescription: {
      pt: "Data Secreta \xE9 um mini jogo de adivinha\xE7\xE3o de datas desenvolvido para projeto pessoal. O objetivo do jogo \xE9 desafiar os jogadores a adivinhar uma data secreta com base em dicas fornecidas. O jogo foi criado com foco em acessibilidade, garantindo que todos os usu\xE1rios possam desfrutar da experi\xEAncia de forma inclusiva. Al\xE9m disso, o projeto priorizou a performance, proporcionando uma experi\xEAncia r\xE1pida e fluida para os jogadores.",
      en: "Secret Date is a date-guessing mini game developed as a personal project. The goal of the game is to challenge players to guess a secret date based on provided clues. Built with accessibility in mind, ensuring an inclusive experience for all players with fast and fluid performance."
    },
    tag: {
      pt: "GAME",
      en: "GAME"
    },
    icon: "calendar_month",
    image: "/DataSecreta.webp",
    highlights: [
      { pt: "L\xF3gica de Programa\xE7\xE3o", en: "Programming Logic" },
      { pt: "Mini jogo", en: "Mini game" },
      { pt: "Performance", en: "Performance" }
    ],
    stack: ["C#", "ASP.NET Core"],
    githubUrl: "https://github.com/vvchagas/DataSecreta"
  },
  {
    slug: "nuvemshop-erp",
    title: {
      pt: "NuvemShop ERP",
      en: "NuvemShop ERP"
    },
    description: {
      pt: "Loja com integra\xE7\xE3o ERP com a NuvemShop",
      en: "Store integrated with NuvemShop ERP system"
    },
    longDescription: {
      pt: "O projeto NuvemShop ERP \xE9 uma loja online desenvolvida com integra\xE7\xE3o a um sistema ERP, utilizando a plataforma NuvemShop. O objetivo do projeto \xE9 fornecer uma solu\xE7\xE3o completa para gerenciamento de vendas, estoque e processos log\xEDsticos, permitindo que os usu\xE1rios tenham uma experi\xEAncia de compra eficiente e organizada. Desenvolvido com Vue 3, Prisma, PostgreSQL, Tailwind CSS e TypeScript.",
      en: "The NuvemShop ERP project is an online store integrated with an ERP system using the NuvemShop platform. It provides a complete solution for sales, inventory, and logistics management, ensuring an efficient shopping experience. Built with Vue 3, Prisma, PostgreSQL, Tailwind CSS, and TypeScript."
    },
    tag: {
      pt: "SITE",
      en: "SITE"
    },
    icon: "shopping_cart",
    image: "/erp.webp",
    highlights: [
      { pt: "UX clara", en: "Clear UX" },
      { pt: "API", en: "API" },
      { pt: "Fluxo de envio direto", en: "Direct shipping workflow" }
    ],
    stack: ["Vue 3", "Prisma", "PostgreSQL", "Tailwind CSS", "TypeScript"],
    githubUrl: "https://github.com/vvchagas/ERP-project"
  }
];
function resolveText(text, locale = "pt") {
  var _a;
  if (typeof text === "string") return text;
  return (_a = text[locale]) != null ? _a : text.pt;
}
function getTranslatedProjects(locale = "pt") {
  return rawProjects.map((p) => ({
    ...p,
    title: resolveText(p.title, locale),
    description: resolveText(p.description, locale),
    longDescription: resolveText(p.longDescription, locale),
    tag: resolveText(p.tag, locale),
    highlights: p.highlights.map((h) => resolveText(h, locale))
  }));
}
getTranslatedProjects("pt");

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "ProjectModal",
  __ssrInlineRender: true,
  props: {
    project: {},
    open: { type: Boolean }
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const { t } = useLocale();
    const dialogRef = ref(null);
    function close() {
      emit("close");
    }
    function onKeydown(event) {
      if (event.key === "Escape") close();
    }
    watch(
      () => props.open,
      (isOpen) => {
        if (isOpen) {
          (void 0).addEventListener("keydown", onKeydown);
          nextTick(() => dialogRef.value?.focus());
        } else {
          (void 0).removeEventListener("keydown", onKeydown);
        }
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      ssrRenderTeleport(_push, (_push2) => {
        if (__props.open && __props.project) {
          _push2(`<div class="project-modal-overlay" data-v-ae556b3f><div class="project-modal" role="dialog" aria-modal="true"${ssrRenderAttr("aria-label", __props.project.title)} tabindex="-1" data-v-ae556b3f><button type="button" class="project-modal__close"${ssrRenderAttr("aria-label", unref(t)("common.close"))} data-v-ae556b3f><span aria-hidden="true" class="material-symbols-outlined" data-v-ae556b3f>close</span></button><div class="flex items-start justify-between gap-4 pr-10" data-v-ae556b3f><div data-v-ae556b3f><p class="text-xs font-semibold uppercase tracking-[0.3em] text-blue-600 dark:text-blue-400" data-v-ae556b3f>${ssrInterpolate(__props.project.tag)}</p><h2 class="mt-1 text-2xl font-black tracking-tight sm:text-3xl" data-v-ae556b3f>${ssrInterpolate(__props.project.title)}</h2></div><div class="hidden shrink-0 sm:grid" aria-hidden="true" data-v-ae556b3f><span class="material-symbols-outlined" data-v-ae556b3f>${ssrInterpolate(__props.project.icon)}</span></div></div><p class="mt-5 text-sm leading-7 text-muted sm:text-base sm:leading-8" data-v-ae556b3f>${ssrInterpolate(__props.project.longDescription)}</p><ul class="mt-5 grid gap-2 text-sm text-muted sm:grid-cols-2" data-v-ae556b3f><!--[-->`);
          ssrRenderList(__props.project.highlights, (highlight) => {
            _push2(`<li class="flex gap-2" data-v-ae556b3f><span aria-hidden="true" class="material-symbols-outlined text-base text-emerald-600" data-v-ae556b3f>check</span> ${ssrInterpolate(highlight)}</li>`);
          });
          _push2(`<!--]--></ul><div class="mt-6" data-v-ae556b3f><p class="text-xs font-semibold uppercase tracking-[0.2em] text-muted" data-v-ae556b3f>${ssrInterpolate(unref(t)("portfolio.technologies"))}</p><div class="mt-2 flex flex-wrap gap-2" data-v-ae556b3f><!--[-->`);
          ssrRenderList(__props.project.stack, (tech) => {
            _push2(`<span class="stack-badge" data-v-ae556b3f>${ssrInterpolate(tech)}</span>`);
          });
          _push2(`<!--]--></div></div><div class="mt-7 grid gap-3 sm:grid-cols-2" data-v-ae556b3f>`);
          if (__props.project.githubUrl) {
            _push2(`<a${ssrRenderAttr("href", __props.project.githubUrl)} target="_blank" rel="noopener noreferrer" class="project-action project-action--github rounded-full py-2.5 px-4 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition" data-v-ae556b3f><svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true" data-v-ae556b3f><path d="M12 .5C5.73.5.5 5.73.5 12c0 5.09 3.29 9.4 7.86 10.93.58.1.79-.25.79-.56v-2.17c-3.2.7-3.88-1.36-3.88-1.36-.53-1.33-1.29-1.69-1.29-1.69-1.05-.72.08-.7.08-.7 1.17.08 1.78 1.2 1.78 1.2 1.03 1.78 2.71 1.26 3.37.97.1-.75.4-1.26.73-1.55-2.56-.29-5.26-1.28-5.26-5.7 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.24 2.77.12 3.06.74.8 1.18 1.83 1.18 3.09 0 4.43-2.7 5.4-5.28 5.69.42.36.78 1.07.78 2.16v3.2c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z" data-v-ae556b3f></path></svg><span data-v-ae556b3f>${ssrInterpolate(unref(t)("portfolio.viewGithub"))}</span></a>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(ssrRenderComponent(_component_NuxtLink, {
            to: { path: "/contato", query: { projeto: __props.project.title } },
            class: "project-action project-action--secondary rounded-full py-2.5 px-4 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 border border-border/60 transition",
            onClick: close
          }, {
            default: withCtx((_, _push3, _parent2, _scopeId) => {
              if (_push3) {
                _push3(`<span data-v-ae556b3f${_scopeId}>${ssrInterpolate(unref(t)("portfolio.wantSimilar"))}</span><span class="material-symbols-outlined text-base" data-v-ae556b3f${_scopeId}>chat</span>`);
              } else {
                return [
                  createVNode("span", null, toDisplayString(unref(t)("portfolio.wantSimilar")), 1),
                  createVNode("span", { class: "material-symbols-outlined text-base" }, "chat")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push2(`</div></div></div>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", false, _parent);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ProjectModal.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$1, [["__scopeId", "data-v-ae556b3f"]]), { __name: "ProjectModal" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ProjectShowcase",
  __ssrInlineRender: true,
  props: {
    eyebrow: { default: "" },
    title: { default: "" },
    description: { default: "" },
    compact: { type: Boolean, default: false },
    columns: { default: 3 },
    hideHeading: { type: Boolean, default: false },
    slugs: { default: () => [] }
  },
  setup(__props) {
    const props = __props;
    const { t, locale } = useLocale();
    const allProjects = computed(() => getTranslatedProjects(locale.value));
    const translatedProjects = computed(() => {
      if (!props.slugs.length) return allProjects.value;
      return allProjects.value.filter((project) => props.slugs.includes(project.slug));
    });
    const gridClasses = {
      1: "md:grid-cols-1",
      2: "md:grid-cols-2",
      3: "md:grid-cols-3"
    };
    const gridClass = computed(() => gridClasses[props.columns] ?? "md:grid-cols-3");
    const activeSlug = ref(null);
    const activeProject = computed(
      () => translatedProjects.value.find((project) => project.slug === activeSlug.value) ?? null
    );
    const lightboxImage = ref(null);
    const sectionEl = ref(null);
    useScrollReveal(sectionEl);
    ref([]);
    function closeProject() {
      activeSlug.value = null;
    }
    function closeLightbox() {
      lightboxImage.value = null;
    }
    function onLightboxKeydown(event) {
      if (event.key === "Escape") closeLightbox();
    }
    watch(lightboxImage, (val) => {
      if (val) {
        (void 0).addEventListener("keydown", onLightboxKeydown);
      } else {
        (void 0).removeEventListener("keydown", onLightboxKeydown);
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_ProjectModal = __nuxt_component_1;
      _push(`<section${ssrRenderAttrs(mergeProps({
        ref_key: "sectionEl",
        ref: sectionEl,
        class: "project-showcase mt-10"
      }, _attrs))} data-v-b4b203a7>`);
      if (!props.hideHeading) {
        _push(`<div class="${ssrRenderClass([{ "mb-7": props.compact }, "mb-10 max-w-3xl space-y-4"])}" data-v-b4b203a7><p class="mt-10 text-xs font-semibold uppercase tracking-[0.3em] text-blue-600 dark:text-blue-400 sm:text-sm" data-v-b4b203a7>${ssrInterpolate(props.eyebrow || unref(t)("portfolio.eyebrow"))}</p><h2 class="${ssrRenderClass([{ "sm:text-3xl": props.compact }, "text-3xl font-black tracking-tight sm:text-4xl"])}" data-v-b4b203a7>${ssrInterpolate(props.title || unref(t)("portfolio.title"))}</h2><p class="text-base leading-7 text-muted sm:text-lg sm:leading-8" data-v-b4b203a7>${ssrInterpolate(props.description || unref(t)("portfolio.description"))}</p></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="${ssrRenderClass([unref(gridClass), "grid gap-6"])}" data-v-b4b203a7><!--[-->`);
      ssrRenderList(unref(translatedProjects), (project) => {
        _push(`<article${ssrRenderAttr("id", project.slug)} class="projectslug hover:-translate-y-[3px] duration-600 group relative overflow-hidden rounded-3xl border border-border/60 bg-card/70 p-5 shadow-sm backdrop-blur flex flex-col justify-between" data-v-b4b203a7><div class="project-card__light absolute inset-0 opacity-0 transition-opacity duration-500" aria-hidden="true" data-v-b4b203a7></div><div class="relative flex flex-col h-full justify-between" data-v-b4b203a7><div data-v-b4b203a7><div class="flex items-start justify-between gap-4" data-v-b4b203a7><div data-v-b4b203a7><h3 class="text-lg font-extrabold" data-v-b4b203a7>${ssrInterpolate(project.title)}</h3><p class="mt-2 text-sm text-muted" data-v-b4b203a7>${ssrInterpolate(project.description)}</p></div><span class="badge border border-border/60 rounded-full px-2 py-1 text-xs font-bold shrink-0" data-v-b4b203a7>${ssrInterpolate(project.tag)}</span></div><div class="mt-4 flex aspect-[4/3] items-center justify-center overflow-hidden rounded-2xl bg-muted/60 ring-1 ring-border/60" data-v-b4b203a7>`);
        if (project.image) {
          _push(`<img${ssrRenderAttr("src", project.image)}${ssrRenderAttr("alt", project.title)} class="h-full w-full cursor-pointer object-cover transition duration-300 hover:scale-105" loading="lazy" data-v-b4b203a7>`);
        } else {
          _push(`<div class="project-illustration relative flex h-16 w-16 items-center justify-center rounded-full bg-blue/60" data-v-b4b203a7><span class="material-symbols-outlined text-2xl" data-v-b4b203a7>${ssrInterpolate(project.icon)}</span></div>`);
        }
        _push(`</div><ul class="mt-4 space-y-2 text-sm text-muted" data-v-b4b203a7><!--[-->`);
        ssrRenderList(project.highlights, (highlight) => {
          _push(`<li class="flex gap-2" data-v-b4b203a7><span aria-hidden="true" class="material-symbols-outlined text-base text-emerald-600" data-v-b4b203a7>check</span> ${ssrInterpolate(highlight)}</li>`);
        });
        _push(`<!--]--></ul></div><div class="mt-5 grid gap-2" data-v-b4b203a7><button type="button" class="flex items-center justify-center gap-1.5 px-3 py-2.5 text-xs sm:text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-full transition text-center leading-snug" data-v-b4b203a7><span data-v-b4b203a7>${ssrInterpolate(unref(t)("portfolio.viewFull"))}</span><span class="material-symbols-outlined text-base" aria-hidden="true" data-v-b4b203a7>info</span></button>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: { path: "/contato", query: { projeto: project.title } },
          class: "project-action--secondary border border-border/60 bg-background hover:bg-muted rounded-full flex items-center justify-center gap-1.5 px-3 py-2.5 text-xs sm:text-sm font-semibold transition text-center leading-snug"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span data-v-b4b203a7${_scopeId}>${ssrInterpolate(unref(t)("portfolio.wantSimilar"))}</span><span class="material-symbols-outlined text-base" aria-hidden="true" data-v-b4b203a7${_scopeId}>chat</span>`);
            } else {
              return [
                createVNode("span", null, toDisplayString(unref(t)("portfolio.wantSimilar")), 1),
                createVNode("span", {
                  class: "material-symbols-outlined text-base",
                  "aria-hidden": "true"
                }, "chat")
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</div></div></article>`);
      });
      _push(`<!--]--></div>`);
      _push(ssrRenderComponent(_component_ProjectModal, {
        project: unref(activeProject),
        open: !!unref(activeProject),
        onClose: closeProject
      }, null, _parent));
      ssrRenderTeleport(_push, (_push2) => {
        if (unref(lightboxImage)) {
          _push2(`<div class="lightbox-overlay" data-v-b4b203a7><div class="lightbox-container" data-v-b4b203a7><button type="button" class="lightbox-close"${ssrRenderAttr("aria-label", unref(t)("portfolio.lightboxClose"))} data-v-b4b203a7><span aria-hidden="true" class="material-symbols-outlined" data-v-b4b203a7>close</span></button><img${ssrRenderAttr("src", unref(lightboxImage))}${ssrRenderAttr("alt", unref(t)("portfolio.lightboxAlt"))} class="lightbox-image" data-v-b4b203a7></div></div>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", false, _parent);
      _push(`</section>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ProjectShowcase.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const ProjectShowcase = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main, [["__scopeId", "data-v-b4b203a7"]]), { __name: "ProjectShowcase" });

export { ProjectShowcase as P };
//# sourceMappingURL=ProjectShowcase-BUm9dfsm.mjs.map
