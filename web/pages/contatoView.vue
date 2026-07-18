<template>
  <div class="min-h-screen bg-background text-foreground">
    <NuxtRouteAnnouncer />

    <!-- Acessibilidade: âncora skip-link para o conteúdo -->

    <a
      href="#conteudo"
      class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-blue-600 focus:px-3 focus:py-2 focus:text-white"
    >
      Pular para o conteúdo
    </a>

    <SiteHeader />

    <main class="mx-auto w-full max-w-6xl px-4 md:px-6">
      <section
        class="mx-auto w-full max-w-4xl px-4 py-12 sm:px-8 sm:py-16 lg:px-10"
      >
        <div class="mb-8 max-w-2xl space-y-4 sm:mb-10">
          <p
            class="text-xs font-semibold uppercase tracking-[0.3em] text-blue-600 dark:text-blue-400 sm:text-sm"
          >
            Contato
          </p>
          <h1
            class="text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl"
          >
            Veja como e onde posso te ajudar!
          </h1>
          <p class="text-base leading-7 text-muted sm:text-lg sm:leading-8">
            Entre em contato conosco para discutir suas necessidades de
            desenvolvimento web, suporte técnico ou manutenção de notebooks.
            Estamos prontos para oferecer soluções personalizadas e eficientes.
          </p>
        </div>

        <div
          class="contact-card contact-card--whatsapp rounded-2xl border border-border/60 border-green-600 bg-card/70 p-5 shadow-sm backdrop-blur sm:rounded-[2rem] sm:p-8"
        >
          <div
            class="flex items-center justify-center gap-2 text-green-600 dark:text-green-400"
          >
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              role="img"
              aria-hidden="true"
              class="size-5 shrink-0"
            >
              <path
                d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"
              />
            </svg>
            <span class="text-sm font-semibold sm:text-base">WhatsApp</span>
          </div>

          <div
            class="mt-5 rounded-xl border border-border/60 border-green-600 bg-card/70 p-4 shadow-sm backdrop-blur sm:mt-6 sm:rounded-[2rem] sm:p-8"
          >
            <h3 class="text-center text-base sm:text-lg mb-4 sm:mb-5">
              Tempo de resposta
            </h3>
            <p class="text-center mb-4 text-sm sm:text-base">
              normalmente em até 10 horas úteis, dependendo do volume de
              solicitações
            </p>
            <p class="text-sm sm:text-base">
              pois fique a vontade para nos enviar uma mensagem, com sua
              curiosidade ou ideia para tirar do papel pelo WhatsApp!
            </p>
          </div>
          <a
            href="http://wa.me/14997760049"
            target="_blank"
            rel="noopener noreferrer"
            class="contact-cta contact-cta--whatsapp mx-auto mt-5 flex w-fit items-center justify-center rounded-md bg-green-600 px-6 py-2.5 text-center text-white sm:mt-6"
          >
            Me mande mensagem no WhatsApp!
          </a>
        </div>

        <div
          class="contact-card contact-card--linkedin mt-8 rounded-2xl border border-border/60 border-blue-600 bg-card/70 p-5 shadow-sm backdrop-blur sm:mt-10 sm:rounded-[2rem] sm:p-8"
        >
          <div
            class="flex items-center justify-center gap-2 text-blue-600 dark:text-blue-400"
          >
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              role="img"
              aria-hidden="true"
              class="size-5 shrink-0"
            >
              <path
                d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
              />
            </svg>
            <span class="text-sm font-semibold sm:text-base">LinkedIn</span>
          </div>

          <div
            class="mt-5 rounded-xl border border-border/60 border-blue-600 bg-card/70 p-4 shadow-sm backdrop-blur sm:mt-6 sm:rounded-[2rem] sm:p-8"
          >
            <h3 class="text-center text-base sm:text-lg mb-4 sm:mb-5">
              Tempo de resposta
            </h3>
            <p class="text-center mb-4 text-sm sm:text-base">
              normalmente em até 1 dia útil, dependendo do volume de
              solicitações
            </p>
            <p class="text-sm sm:text-base">
              pois fique a vontade para nos enviar uma mensagem, com sua
              curiosidade ou ideia para tirar do papel pelo Linkedin!
            </p>
          </div>
          <a
            href="http://linkedin.com/in/victor-vasques-chagas"
            target="_blank"
            rel="noopener noreferrer"
            class="contact-cta contact-cta--linkedin mx-auto mt-5 flex w-fit items-center justify-center rounded-md bg-blue-600 px-6 py-2.5 text-center text-white sm:mt-6"
          >
            Me mande mensagem no Linkedin!
          </a>
        </div>

        <div
          class="contact-card contact-card--email mt-8 rounded-2xl border border-border/60 border-red-600 bg-card/70 p-5 shadow-sm backdrop-blur sm:mt-10 sm:rounded-[2rem] sm:p-8"
        >
          <div
            class="flex items-center justify-center gap-2 text-red-600 dark:text-red-400"
          >
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              role="img"
              aria-hidden="true"
              class="size-5 shrink-0"
            >
              <path
                d="M22 4H2C.9 4 0 4.9 0 6v12c0 1.1.9 2 2 2h20c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-10 6.25L2 8V6l10 6.25L22 6v2z"
              />
            </svg>
            <span class="text-sm font-semibold sm:text-base">E-mail</span>
          </div>

          <div
            class="mt-5 rounded-xl border border-border/60 border-red-600 bg-card/70 p-4 shadow-sm backdrop-blur sm:mt-6 sm:rounded-[2rem] sm:p-8"
          >
            <h3 class="text-center text-base sm:text-lg mb-4 sm:mb-5">
              Tempo de resposta
            </h3>
            <p class="text-center mb-4 text-sm sm:text-base">
              normalmente em até 2 dias úteis, dependendo do volume de
              solicitações
            </p>
            <p class="text-sm sm:text-base">
              pois fique a vontade para nos enviar uma mensagem, com sua
              curiosidade ou ideia para tirar do papel pelo email!
            </p>
          </div>
          <a
            href="https://mail.google.com/mail/u/0/#inbox?compose=CllgCJZXhjGdXcDqqFVrNpsqdnDjmqDsNHZLZBKLWqnWNGkCVZSfTPmBxgsJLDhNQTtmnCbFsFL"
            target="_blank"
            rel="noopener noreferrer"
            class="contact-cta contact-cta--email mx-auto mt-5 flex w-fit items-center justify-center rounded-md bg-red-600 px-6 py-2.5 text-center text-white sm:mt-6"
          >
            Me mande mensagem pelo e-mail!
          </a>
        </div>

        <div>
          <h1 class="mt-10 text-lg text-center text-bold">
            Ou se preferir, me mande uma mensagem por aqui mesmo! E qual seria o
            tema para conversarmos!
          </h1>
        </div>
        <div
          class="contact-card contact-card--form mt-5 rounded-xl border border-border/60 border-gray-600 bg-card/70 p-4 shadow-sm backdrop-blur sm:mt-6 sm:rounded-[2rem] sm:p-8"
        >
          <h3 class="text-center text-base sm:text-lg mb-4 sm:mb-5">
            Tempo de resposta
          </h3>
          <p class="text-center mb-4 text-sm sm:text-base">
            normalmente em até 1 dia útil, dependendo do volume de solicitações
          </p>
          <p class="text-sm sm:text-base">
            pois fique a vontade para nos enviar uma mensagem, com sua
            curiosidade ou ideia para tirar do papel por aqui mesmo!
          </p>

          <form
            class="rounded-3xl border border-border/60 bg-card/70 p-6 shadow-sm backdrop-blur md:p-8 mt-5"
            @submit.prevent="submit"
          >
            <div class="flex items-center justify-between gap-4">
              <h3 class="text-lg font-extrabold">Enviar mensagem</h3>
            </div>

            <div class="mt-5 grid gap-4">
              <label class="block">
                <span class="text-sm font-semibold">Seu nome</span>
                <input
                  v-model="form.name"
                  type="text"
                  class="mt-2 w-full rounded-2xl border border-border/70 bg-background/50 px-4 py-3 text-sm outline-none transition focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/20"
                  placeholder="Ex: Maria"
                  required
                >
              </label>
              <label class="block">
                <span class="text-sm font-semibold"
                  >Seu <span class="font-bold">Número</span> ou
                  <span class="font-bold">E-mail</span> para contato</span
                >
                <input
                  v-model="form.contact"
                  type="text"
                  class="mt-2 w-full rounded-2xl border border-border/70 bg-background/50 px-4 py-3 text-sm outline-none transition focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/20"
                  placeholder="Ex: (11) 99999-9999 ou maria@email.com"
                  required
                >
              </label>
              <!-- v-model="form.name" -->

              <label class="block">
                <span class="text-sm font-semibold">Assunto</span>
                <select
                  v-model="form.topic"
                  class="mt-2 w-full rounded-2xl border border-border/70 bg-background/50 px-4 py-3 text-sm outline-none transition focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/20"
                  required
                >
                  <option class="bg-background text-foreground" value="web">
                    Web
                  </option>
                  <option class="bg-background text-foreground" value="ti">
                    TI
                  </option>
                  <option
                    class="bg-background text-foreground"
                    value="assistencia-tecnica"
                  >
                    Assistência técnica
                  </option>
                </select>
              </label>
               <label class="block">
                  <span class="text-sm font-semibold">Por onde você me encontrou?</span>
                  <select
                    v-model="form.source"
                    class="mt-2 w-full rounded-2xl border border-border/70 bg-background/50 px-4 py-3 text-sm outline-none transition focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/20"
                    required
                  >
                    <option class="bg-background text-foreground" value="google">Google / Web</option>
                    <option class="bg-background text-foreground" value="linkedin">Linkedin</option>
                    <option class="bg-background text-foreground" value="indicacao">Indicação</option>
                    <option class="bg-background text-foreground" value="github">Github</option>
                  </select>
                </label>

              <label class="block">
                <span class="text-sm font-semibold">Mensagem</span>
                <textarea
                  rows="5"
                  class="mt-2 w-full resize-none rounded-2xl border border-border/70 bg-background/50 px-4 py-3 text-sm outline-none transition focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/20"
                  placeholder="Conte me, qual é sua idéia de um site, qual é o problema que você está passando ou problema com seu notebook."
                  required
                />
              </label>

              <button
                type="submit"
                class="inline-flex w-full items-center justify-center rounded-2xl bg-blue-600 px-4 py-3 text-sm font-extrabold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Enviar
              </button>

              <p
                v-if="toast"
                class="rounded-2xl border border-border/70 bg-card/60 px-4 py-3 text-sm text-muted"
                role="status"
              >
                {{ toast }}
              </p>
            </div>
          </form>
        </div>
      </section>
    </main>

    <SiteFooter />
  </div>
</template>
<script setup lang="ts">
import type { MessageTopic } from "~/shared/messages";
import SiteHeader from "../components/SiteHeader.vue";
import SiteFooter from "../components/SiteFooter.vue";
useHead({
  title: "vvchagas - Contato",
  link: [
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,300,0,0",
    },
  ],
});

const toast = ref<string | null>(null);

const form = ref({
  name: "",
  contact: "",
  topic: "web" as MessageTopic,
  source: "google",
  message: "",
});

async function submit() {
  await $fetch("/api/messages", {
    method: "POST",
    body: form.value,
  });

  toast.value =
    "Mensagem enviada! Só Esperar minha resposta, pode ser pelo seu email ou whatsapp.";
  form.value = {
    name: "",
    contact: "",
    topic: "web",
    source: "google",
    message: "",
  };
  window.setTimeout(() => (toast.value = null), 3500);
}
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

.bg-header,
.bg-footer {
  background: rgba(var(--bg), 0.75);
}

.bg-muted {
  background-color: rgba(var(--muted), 0.12);
}

#nuxtlink:hover {
  transform: translateY(-5px);
}

.material-symbols-outlined {
  font-family: "Material Symbols Outlined";
  font-weight: normal;
  font-style: normal;
  font-size: 20px;
  line-height: 1;
  letter-spacing: normal;
  text-transform: none;
  display: inline-block;
  white-space: nowrap;
  word-wrap: normal;
  direction: ltr;
  -webkit-font-smoothing: antialiased;
  vertical-align: middle;
}

.nav-link {
  position: relative;
  font-weight: 600;
  font-size: 0.9rem;
  color: rgba(var(--fg), 0.75);
  transition: color 0.2s ease;
}
.nav-link::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -4px;
  height: 2px;
  width: 0%;
  border-radius: 999px;
  background: linear-gradient(90deg, #3b82f6, #a855f7);
  transition: width 0.25s ease;
}
.nav-link:hover {
  color: rgb(var(--fg));
}
.nav-link:hover::after {
  width: 100%;
}

.footer-link {
  font-weight: 600;
  color: rgba(var(--fg), 0.75);
  transition: color 0.2s ease;
}
.footer-link:hover {
  color: #3b82f6;
}

.badge {
  display: inline-flex;
  align-items: center;
  border-radius: 999px;
  padding: 0.25rem 0.7rem;
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.04em;
  color: #fff;
  background: linear-gradient(135deg, #3b82f6, #6366f1);
  box-shadow: 0 4px 14px rgba(59, 130, 246, 0.35);
}
.badge-alt {
  background: linear-gradient(135deg, #6366f1, #d946ef);
  box-shadow: 0 4px 14px rgba(168, 85, 247, 0.35);
}
.badge-3 {
  background: linear-gradient(135deg, #06b6d4, #3b82f6);
  box-shadow: 0 4px 14px rgba(6, 182, 212, 0.35);
}
.badge-4 {
  background: linear-gradient(135deg, #f59e0b, #ef4444);
  box-shadow: 0 4px 14px rgba(245, 158, 11, 0.35);
}

.card-link {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  border-radius: 1rem;
  padding: 1rem;
  border: 1px solid rgba(var(--border), 1);
  background: rgba(var(--card), 0.7);
  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease,
    border-color 0.25s ease;
}
.card-link:hover {
  transform: translateY(-4px);
  border-color: rgba(59, 130, 246, 0.6);
  box-shadow: 0 10px 30px rgba(59, 130, 246, 0.2);
}
.card-icon {
  font-size: 22px;
}
.card-title {
  font-weight: 800;
  font-size: 0.9rem;
}
.card-desc {
  font-size: 0.8rem;
  color: rgb(var(--muted));
}

section#inicio .absolute.inset-0.-z-10 > div {
  animation: float 8s ease-in-out infinite;
}
section#inicio .absolute.inset-0.-z-10 > div:nth-child(2) {
  animation-delay: -2.5s;
}
section#inicio .absolute.inset-0.-z-10 > div:nth-child(3) {
  animation-delay: -5s;
}
@keyframes float {
  0%,
  100% {
    transform: translate(-50%, 0) scale(1);
  }
  50% {
    transform: translate(-50%, 20px) scale(1.06);
  }
}
section#inicio .absolute.inset-0.-z-10 > div:not(:first-child) {
  animation-name: floatSide;
}
@keyframes floatSide {
  0%,
  100% {
    transform: translateY(0) scale(1);
  }
  50% {
    transform: translateY(18px) scale(1.05);
  }
}

.bg-green-500 {
  position: relative;
}
.bg-green-500::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 999px;
  background: rgb(34, 197, 94);
  animation: pulseDot 1.6s ease-out infinite;
}
@keyframes pulseDot {
  0% {
    box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.55);
  }
  100% {
    box-shadow: 0 0 0 8px rgba(34, 197, 94, 0);
  }
}

.bg-blue-600 {
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    background-color 0.2s ease;
}
a.bg-blue-600:hover,
button.bg-blue-600:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(37, 99, 235, 0.45);
}

article.rounded-3xl {
  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease;
}
article.rounded-3xl:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 40px rgba(59, 130, 246, 0.15);
}

h1 span.bg-clip-text {
  background-size: 200% auto;
  animation: shine 6s linear infinite;
}
@keyframes shine {
  to {
    background-position: 200% center;
  }
}

/* Cards de contato: entrada e hover criativos */
.contact-card {
  opacity: 0;
  animation: cardIn 0.6s ease forwards;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease,
    border-color 0.3s ease;
}
.contact-card--whatsapp {
  animation-delay: 0.05s;
}
.contact-card--linkedin {
  animation-delay: 0.15s;
}
.contact-card--email {
  animation-delay: 0.25s;
}
.contact-card--form {
  animation-delay: 0.35s;
}
@keyframes cardIn {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.contact-card:hover {
  transform: translateY(-6px);
}
.contact-card--whatsapp:hover {
  box-shadow: 0 20px 45px rgba(22, 163, 74, 0.25);
  border-color: rgba(22, 163, 74, 0.9);
}
.contact-card--linkedin:hover {
  box-shadow: 0 20px 45px rgba(37, 99, 235, 0.25);
  border-color: rgba(37, 99, 235, 0.9);
}
.contact-card--email:hover {
  box-shadow: 0 20px 45px rgba(220, 38, 38, 0.25);
  border-color: rgba(220, 38, 38, 0.9);
}
.contact-card--form:hover {
  box-shadow: 0 20px 45px rgba(73, 71, 71, 0.25);
  border-color: rgba(73, 71, 71, 0.9);
}
@media (prefers-reduced-motion: reduce) {
  .contact-card {
    animation: none;
    opacity: 1;
  }
  .contact-card:hover {
    transform: none;
  }
}

/* CTAs: shine sweep + elevação + glow por marca */
.contact-cta {
  position: relative;
  overflow: hidden;
  font-weight: 700;
  isolation: isolate;
  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease,
    background-color 0.25s ease;
}
.contact-cta::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  background: linear-gradient(
    120deg,
    transparent 30%,
    rgba(255, 255, 255, 0.35) 50%,
    transparent 70%
  );
  transform: translateX(-100%);
  transition: transform 0.6s ease;
}
.contact-cta:hover::before {
  transform: translateX(100%);
}
.contact-cta:hover {
  transform: translateY(-3px) scale(1.03);
}
.contact-cta--whatsapp:hover {
  background-color: #15803d;
  box-shadow: 0 12px 28px rgba(21, 128, 61, 0.45);
}
.contact-cta--linkedin:hover {
  background-color: #1e3a8a;
  box-shadow: 0 12px 28px rgba(30, 58, 138, 0.45);
}
.contact-cta--email:hover {
  background-color: #991b1b;
  box-shadow: 0 12px 28px rgba(153, 27, 27, 0.45);
}
.contact-cta:active {
  transform: translateY(-1px) scale(1.01);
}
@media (prefers-reduced-motion: reduce) {
  .contact-cta:hover {
    transform: none;
  }
  .contact-cta::before {
    display: none;
  }
}
</style>
