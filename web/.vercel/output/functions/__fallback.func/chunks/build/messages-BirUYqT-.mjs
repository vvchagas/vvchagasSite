import { u as useLocale, a as useScrollReveal, _ as __nuxt_component_0, S as SiteHeader, b as SiteFooter } from './SiteFooter-CWM2p8XQ.mjs';
import { defineComponent, ref, watch, mergeProps, unref, nextTick, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderClass, ssrRenderTeleport } from 'vue/server-renderer';
import { M as MESSAGE_TOPIC_LABELS } from '../_/messages.mjs';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
import { u as useHead } from './server.mjs';
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

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "ConfirmModal",
  __ssrInlineRender: true,
  props: {
    open: { type: Boolean },
    title: {},
    message: {},
    confirmText: {},
    cancelText: {},
    danger: { type: Boolean },
    loading: { type: Boolean }
  },
  emits: ["confirm", "cancel"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const { t } = useLocale();
    const dialogRef = ref(null);
    function cancel() {
      if (props.loading) return;
      emit("cancel");
    }
    function onKeydown(event) {
      if (event.key === "Escape") cancel();
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
      ssrRenderTeleport(_push, (_push2) => {
        if (__props.open) {
          _push2(`<div class="confirm-modal-overlay" data-v-56c6a122><div class="confirm-modal" role="dialog" aria-modal="true"${ssrRenderAttr("aria-label", __props.title)} tabindex="-1" data-v-56c6a122><div class="${ssrRenderClass([{ "confirm-modal__icon--danger": __props.danger }, "confirm-modal__icon"])}" data-v-56c6a122><span aria-hidden="true" class="material-symbols-outlined" data-v-56c6a122>${ssrInterpolate(__props.danger ? "delete_forever" : "warning")}</span></div><h2 class="confirm-modal__title" data-v-56c6a122>${ssrInterpolate(__props.title)}</h2><p class="confirm-modal__message" data-v-56c6a122>${ssrInterpolate(__props.message)}</p><div class="confirm-modal__actions" data-v-56c6a122><button type="button" class="confirm-modal__btn confirm-modal__btn--cancel"${ssrIncludeBooleanAttr(__props.loading) ? " disabled" : ""} data-v-56c6a122>${ssrInterpolate(__props.cancelText ?? unref(t)("common.cancel"))}</button><button type="button" class="${ssrRenderClass([__props.danger ? "confirm-modal__btn--danger" : "confirm-modal__btn--confirm", "confirm-modal__btn"])}"${ssrIncludeBooleanAttr(__props.loading) ? " disabled" : ""} data-v-56c6a122>`);
          if (__props.loading) {
            _push2(`<span class="confirm-modal__spinner" aria-hidden="true" data-v-56c6a122></span>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(` ${ssrInterpolate(__props.loading ? unref(t)("common.deleting") : __props.confirmText ?? unref(t)("common.confirm"))}</button></div></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ConfirmModal.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const ConfirmModal = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$1, [["__scopeId", "data-v-56c6a122"]]), { __name: "ConfirmModal" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "messages",
  __ssrInlineRender: true,
  setup(__props) {
    const { t, locale } = useLocale();
    const listHeaderSection = ref(null);
    const listSection = ref(null);
    useScrollReveal(listHeaderSection);
    useScrollReveal(listSection, { delay: 0.1 });
    const authenticated = ref(false);
    const loginUser = ref("");
    const loginPassword = ref("");
    const loginLoading = ref(false);
    const loginError = ref("");
    const passwordInputRef = ref(null);
    const basicToken = ref(null);
    function getAuthHeaders() {
      const token = basicToken.value;
      if (token) return { authorization: `Basic ${token}` };
      return {};
    }
    const messages2 = ref([]);
    const pending = ref(false);
    const error = ref(false);
    function logout() {
      basicToken.value = null;
      authenticated.value = false;
      messages2.value = [];
      loginPassword.value = "";
      nextTick(() => passwordInputRef.value?.focus());
    }
    async function loadMessages() {
      pending.value = true;
      error.value = false;
      try {
        const params = {};
        if (selectedTopic.value !== "all") params.topic = selectedTopic.value;
        const result = await $fetch("/api/messages", {
          params,
          headers: getAuthHeaders()
        });
        messages2.value = result.items;
      } catch (err) {
        const statusCode = err.statusCode;
        if (statusCode === 401) {
          logout();
          return;
        }
        error.value = true;
        messages2.value = [];
      } finally {
        pending.value = false;
      }
    }
    const selectedTopic = ref("all");
    watch(selectedTopic, () => {
      if (authenticated.value) loadMessages();
    });
    const busyId = ref(null);
    const confirmDelete = ref(null);
    const deleting = ref(false);
    function cancelRemove() {
      if (!deleting.value) confirmDelete.value = null;
    }
    async function confirmRemove() {
      const item = confirmDelete.value;
      if (!item) return;
      deleting.value = true;
      busyId.value = item.id;
      try {
        await $fetch(`/api/messages/${item.id}`, { method: "DELETE", headers: getAuthHeaders() });
        await loadMessages();
        confirmDelete.value = null;
      } finally {
        deleting.value = false;
        busyId.value = null;
      }
    }
    function topicLabel(topic) {
      return MESSAGE_TOPIC_LABELS[topic];
    }
    function formatDate(value) {
      return new Date(value).toLocaleString(locale.value === "en" ? "en-US" : "pt-BR", { dateStyle: "short", timeStyle: "short" });
    }
    useHead({
      title: "vvchagas - Mensagens",
      link: [
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
        { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,300,0,0" }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtRouteAnnouncer = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-background text-foreground overflow-x-hidden" }, _attrs))} data-v-51d01b53>`);
      _push(ssrRenderComponent(_component_NuxtRouteAnnouncer, null, null, _parent));
      _push(ssrRenderComponent(SiteHeader, null, null, _parent));
      if (!authenticated.value) {
        _push(`<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" data-v-51d01b53><form class="w-full max-w-sm rounded-3xl border border-border/70 bg-card p-6 sm:p-8 shadow-2xl backdrop-blur" data-v-51d01b53><div class="text-center" data-v-51d01b53><h2 class="text-2xl font-black tracking-tight text-foreground" data-v-51d01b53>${ssrInterpolate(unref(t)("admin.restrictedTitle"))}</h2><p class="mt-2 text-sm text-muted" data-v-51d01b53>${ssrInterpolate(unref(t)("admin.restrictedDesc"))}</p></div><div class="mt-6 space-y-4" data-v-51d01b53><div data-v-51d01b53><label for="login-user" class="text-sm font-semibold text-foreground" data-v-51d01b53>${ssrInterpolate(unref(t)("admin.userLabel"))}</label><input id="login-user"${ssrRenderAttr("value", loginUser.value)} type="text" autocomplete="username" class="mt-1 w-full rounded-2xl border border-border/70 bg-background/60 px-4 py-3 text-sm outline-none transition focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/20"${ssrRenderAttr("placeholder", unref(t)("admin.userLabel"))} data-v-51d01b53></div><div data-v-51d01b53><label for="login-pass" class="text-sm font-semibold text-foreground" data-v-51d01b53>${ssrInterpolate(unref(t)("admin.passLabel"))}</label><input id="login-pass"${ssrRenderAttr("value", loginPassword.value)} type="password" autocomplete="current-password" class="mt-1 w-full rounded-2xl border border-border/70 bg-background/60 px-4 py-3 text-sm outline-none transition focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/20"${ssrRenderAttr("placeholder", unref(t)("admin.passLabel"))} data-v-51d01b53></div>`);
        if (loginError.value) {
          _push(`<p class="rounded-xl bg-red-500/10 px-3 py-2 text-xs font-semibold text-red-600 dark:text-red-400" data-v-51d01b53>${ssrInterpolate(loginError.value)}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><button type="submit"${ssrIncludeBooleanAttr(loginLoading.value) ? " disabled" : ""} class="mt-6 w-full rounded-2xl bg-blue-600 px-4 py-3 text-sm font-extrabold text-white transition hover:bg-blue-700 disabled:cursor-wait disabled:opacity-55" data-v-51d01b53>${ssrInterpolate(loginLoading.value ? unref(t)("admin.verifying") : unref(t)("admin.loginBtn"))}</button></form></div>`);
      } else {
        _push(`<!---->`);
      }
      if (authenticated.value) {
        _push(`<!--[--><main id="conteudo" class="mx-auto w-full max-w-6xl px-4 py-8 sm:py-12 md:px-6" data-v-51d01b53><section class="rounded-3xl border border-border/70 bg-card/70 p-5 sm:p-6 md:p-8 shadow-sm backdrop-blur" data-v-51d01b53><div class="flex flex-col gap-5 md:flex-row md:items-end md:justify-between" data-v-51d01b53><div data-v-51d01b53><p class="text-xs font-semibold uppercase tracking-[0.3em] text-blue-600 dark:text-blue-400" data-v-51d01b53>Mensagens</p><h1 class="mt-2 text-2xl sm:text-3xl font-black tracking-tight md:text-4xl" data-v-51d01b53>${ssrInterpolate(unref(t)("admin.headerTitle"))}</h1><p class="mt-2 max-w-2xl text-sm text-muted sm:text-base" data-v-51d01b53>${ssrInterpolate(unref(t)("admin.headerDesc"))}</p></div><label class="block w-full md:w-72" data-v-51d01b53><span class="text-sm font-semibold" data-v-51d01b53>${ssrInterpolate(unref(t)("admin.filterLabel"))}</span><select class="mt-2 w-full rounded-2xl border border-border/70 bg-background/60 px-4 py-3 text-sm outline-none transition focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/20" data-v-51d01b53><option class="bg-background text-foreground" value="all" data-v-51d01b53${ssrIncludeBooleanAttr(Array.isArray(selectedTopic.value) ? ssrLooseContain(selectedTopic.value, "all") : ssrLooseEqual(selectedTopic.value, "all")) ? " selected" : ""}>${ssrInterpolate(unref(t)("admin.filterAll"))}</option><option class="bg-background text-foreground" value="web" data-v-51d01b53${ssrIncludeBooleanAttr(Array.isArray(selectedTopic.value) ? ssrLooseContain(selectedTopic.value, "web") : ssrLooseEqual(selectedTopic.value, "web")) ? " selected" : ""}>${ssrInterpolate(unref(t)("contact.formSubjectWeb"))}</option><option class="bg-background text-foreground" value="ti" data-v-51d01b53${ssrIncludeBooleanAttr(Array.isArray(selectedTopic.value) ? ssrLooseContain(selectedTopic.value, "ti") : ssrLooseEqual(selectedTopic.value, "ti")) ? " selected" : ""}>${ssrInterpolate(unref(t)("contact.formSubjectIT"))}</option><option class="bg-background text-foreground" value="assistencia-tecnica" data-v-51d01b53${ssrIncludeBooleanAttr(Array.isArray(selectedTopic.value) ? ssrLooseContain(selectedTopic.value, "assistencia-tecnica") : ssrLooseEqual(selectedTopic.value, "assistencia-tecnica")) ? " selected" : ""}>${ssrInterpolate(unref(t)("contact.formSubjectTech"))}</option></select></label></div></section><section class="mt-8" data-v-51d01b53>`);
        if (pending.value) {
          _push(`<p class="rounded-2xl border border-border/70 bg-card/60 px-4 py-3 text-sm text-muted" data-v-51d01b53>${ssrInterpolate(unref(t)("admin.loading"))}</p>`);
        } else if (error.value) {
          _push(`<p class="rounded-2xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-700 dark:text-red-300" data-v-51d01b53>${ssrInterpolate(unref(t)("admin.loadError"))}</p>`);
        } else if (!messages2.value.length) {
          _push(`<p class="rounded-2xl border border-border/70 bg-card/60 px-4 py-3 text-sm text-muted" data-v-51d01b53>${ssrInterpolate(unref(t)("admin.noMessages"))}</p>`);
        } else {
          _push(`<div class="grid gap-4" data-v-51d01b53><!--[-->`);
          ssrRenderList(messages2.value, (item) => {
            _push(`<article class="${ssrRenderClass([item.readAt ? "opacity-75" : "ring-1 ring-blue-500/20", "rounded-3xl border border-border/70 bg-card/70 p-5 shadow-sm backdrop-blur md:p-6"])}" data-v-51d01b53><div class="flex flex-col gap-3 md:flex-row md:items-start md:justify-between" data-v-51d01b53><div data-v-51d01b53><h2 class="text-lg font-extrabold" data-v-51d01b53>${ssrInterpolate(item.name)}</h2><p class="text-sm text-muted" data-v-51d01b53>${ssrInterpolate(item.contact)}</p></div><div class="flex flex-wrap gap-2" data-v-51d01b53><span class="rounded-full bg-blue-600/10 px-3 py-1 text-xs font-bold text-blue-700 dark:text-blue-300" data-v-51d01b53>${ssrInterpolate(topicLabel(item.topic))}</span><span class="rounded-full bg-muted px-3 py-1 text-xs font-semibold text-foreground/90" data-v-51d01b53>${ssrInterpolate(unref(t)("admin.sourcePrefix"))} ${ssrInterpolate(item.source)}</span><span class="rounded-full bg-muted px-3 py-1 text-xs font-semibold text-foreground/90" data-v-51d01b53>${ssrInterpolate(formatDate(item.createdAt))}</span>`);
            if (item.readAt) {
              _push(`<span class="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-300" data-v-51d01b53>${ssrInterpolate(unref(t)("admin.read"))}</span>`);
            } else {
              _push(`<span class="rounded-full bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-700 dark:text-amber-300" data-v-51d01b53>${ssrInterpolate(unref(t)("admin.unread"))}</span>`);
            }
            _push(`</div></div><p class="mt-4 whitespace-pre-line text-sm leading-7 text-muted" data-v-51d01b53>${ssrInterpolate(item.message)}</p><div class="mt-5 flex flex-wrap gap-2" data-v-51d01b53><button type="button" class="message-action message-action--read"${ssrIncludeBooleanAttr(busyId.value === item.id) ? " disabled" : ""} data-v-51d01b53>${ssrInterpolate(item.readAt ? unref(t)("admin.markUnread") : unref(t)("admin.markRead"))}</button><button type="button" class="message-action message-action--delete"${ssrIncludeBooleanAttr(busyId.value === item.id) ? " disabled" : ""} data-v-51d01b53>${ssrInterpolate(unref(t)("admin.deleteMsg"))}</button></div></article>`);
          });
          _push(`<!--]--></div>`);
        }
        _push(`</section></main>`);
        _push(ssrRenderComponent(SiteFooter, null, null, _parent));
        _push(ssrRenderComponent(ConfirmModal, {
          open: confirmDelete.value !== null,
          title: unref(t)("admin.confirmDeleteTitle"),
          message: unref(t)("admin.confirmDeleteMsg").replace("{name}", confirmDelete.value?.name ?? "..."),
          danger: true,
          loading: deleting.value,
          onConfirm: confirmRemove,
          onCancel: cancelRemove
        }, null, _parent));
        _push(`<!--]-->`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/messages.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const messages = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-51d01b53"]]);

export { messages as default };
//# sourceMappingURL=messages-BirUYqT-.mjs.map
