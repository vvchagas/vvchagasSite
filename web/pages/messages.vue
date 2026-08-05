<template>
  <div class="min-h-screen bg-background text-foreground overflow-x-hidden">
    <NuxtRouteAnnouncer />
    <SiteHeader />

    <!-- Password modal - always shows on visit until auth -->
    <div 
      v-if="!authenticated" 
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
    >
      <form 
        class="w-full max-w-sm rounded-3xl border border-border/70 bg-card p-6 sm:p-8 shadow-2xl backdrop-blur" 
        @submit.prevent="handleLogin"
      >
        <div class="text-center">
          <h2 class="text-2xl font-black tracking-tight text-foreground">{{ t('admin.restrictedTitle') }}</h2>
          <p class="mt-2 text-sm text-muted">
            {{ t('admin.restrictedDesc') }}
          </p>
        </div>

        <div class="mt-6 space-y-4">
          <div>
            <label for="login-user" class="text-sm font-semibold text-foreground">{{ t('admin.userLabel') }}</label>
            <input
              id="login-user"
              v-model="loginUser"
              type="text"
              autocomplete="username"
              class="mt-1 w-full rounded-2xl border border-border/70 bg-background/60 px-4 py-3 text-sm outline-none transition focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/20"
              :placeholder="t('admin.userLabel')"
            >
          </div>
          <div>
            <label for="login-pass" class="text-sm font-semibold text-foreground">{{ t('admin.passLabel') }}</label>
            <input
              id="login-pass"
              ref="passwordInputRef"
              v-model="loginPassword"
              type="password"
              autocomplete="current-password"
              class="mt-1 w-full rounded-2xl border border-border/70 bg-background/60 px-4 py-3 text-sm outline-none transition focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/20"
              :placeholder="t('admin.passLabel')"
            >
          </div>
          <p 
            v-if="loginError" 
            class="rounded-xl bg-red-500/10 px-3 py-2 text-xs font-semibold text-red-600 dark:text-red-400"
          >
            {{ loginError }}
          </p>
        </div>

        <button
          type="submit"
          :disabled="loginLoading"
          class="mt-6 w-full rounded-2xl bg-blue-600 px-4 py-3 text-sm font-extrabold text-white transition hover:bg-blue-700 disabled:cursor-wait disabled:opacity-55"
        >
          {{ loginLoading ? t('admin.verifying') : t('admin.loginBtn') }}
        </button>
      </form>
    </div>

    <!-- Main content (only after auth) -->
    <template v-if="authenticated">
      <main id="conteudo" class="mx-auto w-full max-w-6xl px-4 py-8 sm:py-12 md:px-6">
        <section ref="listHeaderSection" class="rounded-3xl border border-border/70 bg-card/70 p-5 sm:p-6 md:p-8 shadow-sm backdrop-blur">
          <div class="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p class="text-xs font-semibold uppercase tracking-[0.3em] text-blue-600 dark:text-blue-400">Mensagens</p>
              <h1 class="mt-2 text-2xl sm:text-3xl font-black tracking-tight md:text-4xl">{{ t('admin.headerTitle') }}</h1>
              <p class="mt-2 max-w-2xl text-sm text-muted sm:text-base">{{ t('admin.headerDesc') }}</p>
            </div>
            <label class="block w-full md:w-72">
              <span class="text-sm font-semibold">{{ t('admin.filterLabel') }}</span>
              <select
                v-model="selectedTopic"
                class="mt-2 w-full rounded-2xl border border-border/70 bg-background/60 px-4 py-3 text-sm outline-none transition focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/20"
              >
                <option class="bg-background text-foreground" value="all">{{ t('admin.filterAll') }}</option>
                <option class="bg-background text-foreground" value="web">{{ t('contact.formSubjectWeb') }}</option>
                <option class="bg-background text-foreground" value="ti">{{ t('contact.formSubjectIT') }}</option>
                <option class="bg-background text-foreground" value="assistencia-tecnica">{{ t('contact.formSubjectTech') }}</option>
              </select>
            </label>
          </div>
        </section>

        <section ref="listSection" class="mt-8">
          <p v-if="pending" class="rounded-2xl border border-border/70 bg-card/60 px-4 py-3 text-sm text-muted">{{ t('admin.loading') }}</p>
          <p v-else-if="error" class="rounded-2xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-700 dark:text-red-300">{{ t('admin.loadError') }}</p>
          <p v-else-if="!messages.length" class="rounded-2xl border border-border/70 bg-card/60 px-4 py-3 text-sm text-muted">{{ t('admin.noMessages') }}</p>

          <div v-else class="grid gap-4">
            <article
              v-for="item in messages"
              :key="item.id"
              class="rounded-3xl border border-border/70 bg-card/70 p-5 shadow-sm backdrop-blur md:p-6"
              :class="item.readAt ? 'opacity-75' : 'ring-1 ring-blue-500/20'"
            >
              <div class="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                  <h2 class="text-lg font-extrabold">{{ item.name }}</h2>
                  <p class="text-sm text-muted">{{ item.contact }}</p>
                </div>
                <div class="flex flex-wrap gap-2">
                  <span class="rounded-full bg-blue-600/10 px-3 py-1 text-xs font-bold text-blue-700 dark:text-blue-300">{{ topicLabel(item.topic) }}</span>
                  <span class="rounded-full bg-muted px-3 py-1 text-xs font-semibold text-foreground/90">{{ t('admin.sourcePrefix') }} {{ item.source }}</span>
                  <span class="rounded-full bg-muted px-3 py-1 text-xs font-semibold text-foreground/90">{{ formatDate(item.createdAt) }}</span>
                  <span v-if="item.readAt" class="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-300">{{ t('admin.read') }}</span>
                  <span v-else class="rounded-full bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-700 dark:text-amber-300">{{ t('admin.unread') }}</span>
                </div>
              </div>
              <p class="mt-4 whitespace-pre-line text-sm leading-7 text-muted">{{ item.message }}</p>
              <div class="mt-5 flex flex-wrap gap-2">
                <button type="button" class="message-action message-action--read" :disabled="busyId === item.id" @click="setRead(item, !item.readAt)">
                  {{ item.readAt ? t('admin.markUnread') : t('admin.markRead') }}
                </button>
                <button type="button" class="message-action message-action--delete" :disabled="busyId === item.id" @click="askRemove(item)">{{ t('admin.deleteMsg') }}</button>
              </div>
            </article>
          </div>
        </section>
      </main>

      <SiteFooter />
      <ConfirmModal
        :open="confirmDelete !== null"
        :title="t('admin.confirmDeleteTitle')"
        :message="t('admin.confirmDeleteMsg').replace('{name}', confirmDelete?.name ?? '...')"
        :danger="true"
        :loading="deleting"
        @confirm="confirmRemove"
        @cancel="cancelRemove"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, watch } from "vue";
import type { ContactMessage, MessageTopic } from "~/shared/messages";
import { MESSAGE_TOPIC_LABELS } from "~/shared/messages";
import SiteFooter from "../components/SiteFooter.vue";
import SiteHeader from "../components/SiteHeader.vue";
import ConfirmModal from "../components/ConfirmModal.vue";
import { useScrollReveal } from "~/composables/useScrollReveal";

const { t, locale } = useLocale();

const listHeaderSection = ref<HTMLElement | null>(null);
const listSection = ref<HTMLElement | null>(null);
useScrollReveal(listHeaderSection);
useScrollReveal(listSection, { delay: 0.1 });

const authenticated = ref(false);
const loginUser = ref("");
const loginPassword = ref("");
const loginLoading = ref(false);
const loginError = ref("");
const passwordInputRef = ref<HTMLInputElement | null>(null);

const basicToken = ref<string | null>(null);

function getAuthHeaders(): Record<string, string> {
  const token = basicToken.value;
  if (token) return { authorization: `Basic ${token}` };
  return {};
}

const messages = ref<ContactMessage[]>([]);
const pending = ref(false);
const error = ref(false);

async function loadMessages() {
  pending.value = true;
  error.value = false;
  try {
    const params: Record<string, string> = {};
    if (selectedTopic.value !== "all") params.topic = selectedTopic.value;
    const result = await $fetch<{ items: ContactMessage[] }>("/api/messages", {
      params,
      headers: getAuthHeaders(),
    });
    messages.value = result.items;
  } catch (err: unknown) {
    // Sessão expirada ou token inválido: volta para o login.
    const statusCode = (err as { statusCode?: number }).statusCode;
    if (statusCode === 401) {
      logout();
      return;
    }
    error.value = true;
    messages.value = [];
  } finally {
    pending.value = false;
  }
}

onMounted(async () => {
  // Restaura a autenticação salva nesta sessão, se existir
  let token: string | null = null;
  if (import.meta.client) {
    token = sessionStorage.getItem("nuxt_messages_auth");
  }

  if (token) {
    basicToken.value = token;
    authenticated.value = true;
    await loadMessages();
  } else {
    authenticated.value = false;
    nextTick(() => passwordInputRef.value?.focus());
  }
});

async function handleLogin(): Promise<void> {
  loginError.value = '';
  loginLoading.value = true;

  try {
    const rawCredentials = `${loginUser.value}:${loginPassword.value}`;
    const token = btoa(encodeURIComponent(rawCredentials).replace(/%([0-9A-F]{2})/g, (_, p1) => 
      String.fromCharCode(parseInt(p1, 16))
    ));

    await $fetch('/api/messages', {
      headers: { 
        authorization: `Basic ${token}` 
      },
    });

    if (import.meta.client) {
      sessionStorage.setItem('nuxt_messages_auth', token);
    }

    basicToken.value = token;
    authenticated.value = true;
    await loadMessages();
  } catch (err: unknown) {
    const fetchError = err as { statusCode?: number };
    
    loginError.value = fetchError.statusCode === 401 
      ? t('admin.invalidAuth') 
      : t('admin.serverError');
      
    loginPassword.value = '';
  } finally {
    loginLoading.value = false;
  }
}

type TopicFilter = "all" | MessageTopic;
const selectedTopic = ref<TopicFilter>("all");

watch(selectedTopic, () => {
  if (authenticated.value) loadMessages();
});

const busyId = ref<string | null>(null);
const confirmDelete = ref<ContactMessage | null>(null);
const deleting = ref(false);

function askRemove(item: ContactMessage) { confirmDelete.value = item; }
function cancelRemove() { if (!deleting.value) confirmDelete.value = null; }

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

async function setRead(item: ContactMessage, read: boolean) {
  busyId.value = item.id;
  try {
    await $fetch(`/api/messages/${item.id}`, { method: "PATCH", body: { read }, headers: getAuthHeaders() });
    await loadMessages();
  } finally {
    busyId.value = null;
  }
}

function topicLabel(topic: MessageTopic) { return MESSAGE_TOPIC_LABELS[topic]; }
function formatDate(value: string) { return new Date(value).toLocaleString(locale.value === 'en' ? 'en-US' : 'pt-BR', { dateStyle: "short", timeStyle: "short" }); }

useHead({
  title: "vvchagas - Mensagens",
  link: [
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
    { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,300,0,0" },
  ],
});
</script>

<style scoped>
.bg-background { background-color: rgb(var(--bg)); }
.text-foreground { color: rgb(var(--fg)); }
.text-muted { color: rgb(var(--muted)); }
.bg-card { background-color: rgb(var(--card)); }
.border-border { border-color: rgb(var(--border)); }
.bg-muted { background-color: rgba(var(--muted), 0.12); }

.message-action { border-radius: .85rem; padding: .6rem .85rem; font-size: .8rem; font-weight: 800; transition: transform .2s ease, box-shadow .2s ease; }
.message-action:hover:not(:disabled) { transform: translateY(-2px); }
.message-action:disabled { cursor: wait; opacity: .55; }
.message-action--read { background: rgba(15, 211, 9, 0.281); color: rgb(11, 170, 6); }
.message-action--delete { background: rgb(239 68 68 / .12); color: rgb(185 28 28); }
:global(html.dark) .message-action--read { color: rgb(147 197 253); }
:global(html.dark) .message-action--delete { color: rgb(252 165 165); }
</style>
