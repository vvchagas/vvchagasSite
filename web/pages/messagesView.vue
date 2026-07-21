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
              </div>
            </div>

            <p class="mt-4 whitespace-pre-line text-sm leading-7 text-muted">
              {{ item.message }}
            </p>
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

const { data, pending, error } = await useFetch<{ items: ContactMessage[] }>("/api/messages", {
  query,
});

const messages = computed(() => data.value?.items ?? []);

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
</style>
