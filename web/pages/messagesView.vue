<template>
  <div class="min-h-screen bg-background text-foreground">
    <NuxtRouteAnnouncer />
    <SiteHeader />

    <main id="conteudo" class="mx-auto w-full max-w-6xl px-4 py-12 md:px-6">
      <section class="rounded-3xl border border-border/70 bg-card/70 p-6 shadow-sm backdrop-blur md:p-8">
        <div class="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.3em] text-blue-600 dark:text-blue-400">
              Mensagens
            </p>
            <h1 class="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
              Caixa de mensagens do site
            </h1>
            <p class="mt-2 max-w-2xl text-sm text-muted sm:text-base">
              Aqui você visualiza os envios do formulário e pode filtrar por assunto.
            </p>
          </div>

          <label class="block w-full md:w-72">
            <span class="text-sm font-semibold">Filtrar por assunto</span>
            <select
              v-model="selectedTopic"
              class="mt-2 w-full rounded-2xl border border-border/70 bg-background/60 px-4 py-3 text-sm outline-none transition focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/20"
            >
              <option value="all" class="bg-background text-foreground">Todos</option>
              <option value="web" class="bg-background text-foreground">Web</option>
              <option value="ti" class="bg-background text-foreground">TI</option>
              <option value="assistencia-tecnica" class="bg-background text-foreground">Assistência técnica</option>
            </select>
          </label>
        </div>
      </section>

      <section class="mt-8">
        <p
          v-if="pending"
          class="rounded-2xl border border-border/70 bg-card/60 px-4 py-3 text-sm text-muted"
        >
          Carregando mensagens...
        </p>

        <p
          v-else-if="error"
          class="rounded-2xl bg-background border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-700 dark:text-red-300"
        >
          Não foi possível carregar as mensagens agora.
        </p>

        <p
          v-else-if="!messages.length"
          class="rounded-2xl border border-border/70 bg-card/60 px-4 py-3 text-sm text-muted"
        >
          Ainda não há mensagens para o filtro selecionado.
        </p>

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
                <span class="rounded-full bg-blue-600/10 px-3 py-1 text-xs font-bold text-blue-700 dark:text-blue-300">
                  {{ topicLabel(item.topic) }}
                </span>
                <span class="rounded-full bg-muted px-3 py-1 text-xs font-semibold text-foreground/90">
                  Origem: {{ item.source }}
                </span>
                <span class="rounded-full bg-muted px-3 py-1 text-xs font-semibold text-foreground/90">
                  {{ formatDate(item.createdAt) }}
                </span>
                <span v-if="item.readAt" class="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
                  Lida
                </span>
                <span v-else class="rounded-full bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-700 dark:text-amber-300">
                  Não lida
                </span>
              </div>
            </div>

            <p class="mt-4 whitespace-pre-line text-sm leading-7 text-muted">
              {{ item.message }}
            </p>

            <div class="mt-5 flex flex-wrap gap-2">
              <button type="button" class="message-action message-action--read" :disabled="busyId === item.id" @click="setRead(item, !item.readAt)">
                {{ item.readAt ? "Marcar como não lida" : "Marcar como lida" }}
              </button>
              <button type="button" class="message-action message-action--delete" :disabled="busyId === item.id" @click="removeMessage(item)">
                Excluir mensagem
              </button>
            </div>
          </article>
        </div>
      </section>
    </main>

    <SiteFooter />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import type { ContactMessage, MessageTopic } from "~/shared/messages";
import { MESSAGE_TOPIC_LABELS } from "~/shared/messages";
import SiteFooter from "../components/SiteFooter.vue";
import SiteHeader from "../components/SiteHeader.vue";

type TopicFilter = "all" | MessageTopic;

const selectedTopic = ref<TopicFilter>("all");

const query = computed(() =>
  selectedTopic.value === "all" ? {} : { topic: selectedTopic.value },
);

const { data, pending, error, refresh } = await useFetch<{ items: ContactMessage[] }>("/api/messages", {
  query,
});

const messages = computed(() => data.value?.items ?? []);
const busyId = ref<string | null>(null);

async function setRead(item: ContactMessage, read: boolean) {
  busyId.value = item.id;
  try {
    await $fetch(`/api/messages/${item.id}`, { method: "PATCH", body: { read } });
    await refresh();
  } finally {
    busyId.value = null;
  }
}

async function removeMessage(item: ContactMessage) {
  if (!window.confirm(`Excluir permanentemente a mensagem de ${item.name}?`)) return;
  busyId.value = item.id;
  try {
    await $fetch(`/api/messages/${item.id}`, { method: "DELETE" });
    await refresh();
  } finally {
    busyId.value = null;
  }
}

function topicLabel(topic: MessageTopic) {
  return MESSAGE_TOPIC_LABELS[topic];
}

function formatDate(value: string) {
  return new Date(value).toLocaleString("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  });
}

useHead({
  title: "vvchagas - Mensagens",
  link: [
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,300,0,0",
    },
  ],
});
</script>

<style scoped>
.bg-background {
  background-color: rgb(var(--bg));
}
.text-foreground {
  color: rgb(var(--fg));
}
.text-muted {
  color: rgb(var(--muted));
}
.bg-card {
  background-color: rgb(var(--card));
}
.border-border {
  border-color: rgb(var(--border));
}

.bg-muted {
  background-color: rgba(var(--muted), 0.12);
}
.message-action { border-radius: .85rem; padding: .6rem .85rem; font-size: .8rem; font-weight: 800; transition: transform .2s ease, box-shadow .2s ease; }
.message-action:hover:not(:disabled) { transform: translateY(-2px); }
.message-action:disabled { cursor: wait; opacity: .55; }
.message-action--read { background: rgb(37 99 235 / .12); color: rgb(29 78 216); }
.message-action--delete { background: rgb(239 68 68 / .12); color: rgb(185 28 28); }
:global(html.dark) .message-action--read { color: rgb(147 197 253); }
:global(html.dark) .message-action--delete { color: rgb(252 165 165); }
</style>
