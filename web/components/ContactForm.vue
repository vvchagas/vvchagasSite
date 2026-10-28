<script setup lang="ts">
import { computed, ref } from "vue";

import type { MessageTopic } from "@@/shared/messages";

import { useInternationalPhone } from "~/composables/useInternationalPhone";

const props = defineProps<{ initialMessage?: string }>();

const { t } = useLocale();

const topics: { value: MessageTopic; label: string }[] = [
  { value: "web", label: "contact.formSubjectWeb" },
  { value: "ti", label: "contact.formSubjectIT" },
  { value: "assistencia-tecnica", label: "contact.formSubjectTech" },
];

const contactTypes: { value: "email" | "phone"; label: string }[] = [
  { value: "email", label: "contact.formContactTypeEmail" },
  { value: "phone", label: "contact.formContactTypePhone" },
];

// Mesma regra do servidor (server/api/messages/index.post.ts).
const EMAIL_PATTERN =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

const inputBase =
  "mt-2 w-full rounded-md border bg-background/50 px-4 py-3 text-sm outline-none transition focus:ring-2";

const chipBase =
  "flex min-h-11 cursor-pointer items-center justify-center rounded-md border border-border/70 px-3 text-center text-sm font-semibold transition-colors peer-checked:border-transparent peer-checked:bg-[rgb(var(--fg))] peer-checked:text-[rgb(var(--bg))] peer-focus-visible:ring-2 peer-focus-visible:ring-blue-500/40";

const fieldOk = "border-border/70 focus:border-blue-500/60 focus:ring-blue-500/20";
const fieldBad = "border-red-500/70 focus:border-red-500 focus:ring-red-500/20";

const form = ref({
  name: "",
  email: "",
  contactType: "email" as "email" | "phone",
  topic: "web" as MessageTopic,
  message: props.initialMessage ?? "",
});

const phone = useInternationalPhone();

// O erro só aparece depois que o campo perdeu o foco uma vez.
const touchedEmail = ref(false);
const touchedPhone = ref(false);
const isSending = ref(false);
const sendError = ref<string | null>(null);
const sent = ref(false);

const isEmailValid = computed(() => EMAIL_PATTERN.test(form.value.email.trim()));

const emailError = computed(() =>
  touchedEmail.value && !isEmailValid.value ? t("contact.formEmailError") : null,
);

const phoneError = computed(() =>
  touchedPhone.value && !phone.isValid.value ? t("contact.formPhoneError") : null,
);

const isFormValid = computed(() =>
  form.value.contactType === "email" ? isEmailValid.value : phone.isValid.value,
);

async function submit() {
  touchedEmail.value = true;
  touchedPhone.value = true;

  if (!isFormValid.value) {
    return;
  }

  const byEmail = form.value.contactType === "email";

  isSending.value = true;
  sendError.value = null;

  try {
    await $fetch("/api/messages", {
      method: "POST",

      body: {
        name: form.value.name,
        email: byEmail ? form.value.email.trim() : "",
        phone: byEmail ? "" : phone.e164.value,
        contactType: form.value.contactType,
        topic: form.value.topic,
        source: "site",
        message: form.value.message.trim() || t("contact.formMessageEmpty"),
      },
    });

    sent.value = true;
  } catch {
    sendError.value = t("contact.formError");
  } finally {
    isSending.value = false;
  }
}
</script>

<template>
  <!-- Sucesso: permanece na tela e leva o visitante ao canal mais rápido -->
  <div
    v-if="sent"
    role="status"
    class="rounded-md border border-border/70 bg-background p-5 shadow-sm sm:p-6 md:p-8"
  >
    <h3 class="text-lg font-extrabold">
      {{ t("contact.formSuccessTitle") }}
    </h3>

    <p class="mt-2 text-sm text-muted">
      {{ t("contact.formSuccess") }}
    </p>

    <a
      :href="waLink(t('contact.whatsappPrefillSent'))"
      target="_blank"
      rel="noopener noreferrer"
      class="cta-primary mt-5 w-full sm:w-auto"
    >
      {{ t("contact.formSuccessWhatsapp") }}
    </a>
  </div>

  <form
    v-else
    class="rounded-md border border-border/70 bg-background p-5 shadow-sm sm:p-6 md:p-8"
    @submit.prevent="submit"
  >
    <div class="flex items-center justify-between gap-4">
      <h3 class="text-lg font-extrabold">
        {{ t("contact.formTitle") }}
      </h3>

      <span class="text-xs font-semibold text-muted">
        {{ t("contact.formFast") }}
      </span>
    </div>

    <div class="mt-5 grid gap-4">
      <!-- Assunto: escolha rápida, sem abrir select -->
      <fieldset class="grid gap-2 sm:grid-cols-3">
        <legend class="mb-2 text-sm font-semibold">
          {{ t("contact.formSubject") }}
        </legend>

        <label v-for="topic in topics" :key="topic.value" class="block">
          <input
            v-model="form.topic"
            type="radio"
            name="topic"
            class="peer sr-only"
            :value="topic.value"
          >

          <span :class="chipBase">{{ t(topic.label) }}</span>
        </label>
      </fieldset>

      <!-- Nome -->
      <label class="block">
        <span class="text-sm font-semibold">
          {{ t("contact.formName") }}
        </span>

        <input
          v-model="form.name"
          type="text"
          autocomplete="name"
          maxlength="100"
          :class="[inputBase, fieldOk]"
          :placeholder="t('contact.formNamePlaceholder')"
          required
        >
      </label>

      <!-- Como prefere ser contatado -->
      <fieldset class="grid grid-cols-2 gap-2">
        <legend class="mb-2 text-sm font-semibold">
          {{ t("contact.formContactType") }}
        </legend>

        <label v-for="type in contactTypes" :key="type.value" class="block">
          <input
            v-model="form.contactType"
            type="radio"
            name="contactType"
            class="peer sr-only"
            :value="type.value"
          >

          <span :class="chipBase">{{ t(type.label) }}</span>
        </label>
      </fieldset>

      <!-- E-mail -->
      <label v-if="form.contactType === 'email'" class="block">
        <span class="text-sm font-semibold">
          {{ t("contact.formEmail") }}
        </span>

        <input
          v-model="form.email"
          type="email"
          inputmode="email"
          autocomplete="email"
          :class="[inputBase, emailError ? fieldBad : fieldOk]"
          :aria-invalid="Boolean(emailError)"
          :aria-describedby="emailError ? 'email-error' : undefined"
          :placeholder="t('contact.formEmailPlaceholder')"
          required
          @blur="touchedEmail = true"
        >

        <p
          v-if="emailError"
          id="email-error"
          class="mt-1.5 text-xs font-medium text-red-500"
          role="alert"
        >
          {{ emailError }}
        </p>
      </label>

      <!-- Telefone (DDI + máscara brasileira) -->
      <div v-else class="block">
        <label for="phone-number" class="text-sm font-semibold">
          {{ t("contact.formPhone") }}
        </label>

        <div class="mt-2 flex gap-2">
          <label for="phone-ddi" class="sr-only">
            {{ t("contact.formPhoneDdiLabel") }}
          </label>

          <select
            id="phone-ddi"
            v-model="phone.ddi.value"
            class="w-26 shrink-0 rounded-md border border-border/70 bg-background/50 px-2 py-3 text-sm outline-none transition focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/20"
          >
            <option
              v-for="country in phone.countries"
              :key="country.ddi"
              class="bg-background text-foreground"
              :value="country.ddi"
            >
              {{ country.flag }} {{ country.ddi }}
            </option>
          </select>

          <input
            id="phone-number"
            :value="phone.displayValue.value"
            type="tel"
            inputmode="tel"
            autocomplete="tel-national"
            :class="[inputBase, 'mt-0', phoneError ? fieldBad : fieldOk]"
            :aria-invalid="Boolean(phoneError)"
            :aria-describedby="phoneError ? 'phone-error' : undefined"
            :placeholder="t('contact.formPhonePlaceholder')"
            required
            @input="phone.onInput(($event.target as HTMLInputElement).value)"
            @blur="touchedPhone = true"
          >
        </div>

        <p
          v-if="phoneError"
          id="phone-error"
          class="mt-1.5 text-xs font-medium text-red-500"
          role="alert"
        >
          {{ phoneError }}
        </p>
      </div>

      <!-- Mensagem (opcional) -->
      <label class="block">
        <span class="text-sm font-semibold">
          {{ t("contact.formMessage") }}
        </span>

        <textarea
          v-model="form.message"
          rows="3"
          maxlength="3000"
          :class="[inputBase, 'resize-none', fieldOk]"
          :placeholder="t('contact.formMessagePlaceholder')"
        />
      </label>

      <button
        type="submit"
        :disabled="isSending"
        class="text-foreground border border-gray-600 hover:border-gray-800 flex justify-center py-1 px-6 font-semibold text-center items-center  w-full disabled:cursor-not-allowed disabled:opacity-55"
      >
        {{ isSending ? t("contact.formSending") : t("contact.formSend") }}
      </button>

      <p
        v-if="sendError"
        class="rounded-md border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-700 dark:text-red-300"
        role="alert"
      >
        {{ sendError }}
      </p>
    </div>
  </form>
</template>
