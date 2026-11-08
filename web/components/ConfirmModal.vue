<script setup lang="ts">
const props = defineProps<{
  open: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  danger?: boolean;
  loading?: boolean;
}>();

const emit = defineEmits<{
  (e: "confirm" | "cancel"): void;
}>();

const { t } = useLocale();
const { lock, unlock } = useScrollLock();
const dialogRef = ref<HTMLElement | null>(null);

function cancel() {
  if (props.loading) return;
  emit("cancel");
}

function confirm() {
  if (props.loading) return;
  emit("confirm");
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === "Escape") cancel();
}

watch(
  () => props.open,
  (isOpen) => {
    if (isOpen) {
      lock();
      document.addEventListener("keydown", onKeydown);
      nextTick(() => dialogRef.value?.focus());
    } else {
      unlock();
      document.removeEventListener("keydown", onKeydown);
    }
  },
);

onUnmounted(() => {
  document.removeEventListener("keydown", onKeydown);
  unlock();
});
</script>

<template>
  <Teleport to="body">
    <Transition :css="false" @leave="onMotionLeave">
      <div
        v-if="open"
        v-motion-fade
        class="confirm-modal-overlay"
        @mousedown.self="cancel"
      >
        <div
          ref="dialogRef"
          v-motion-pop
          class="confirm-modal tech-frame"
          role="dialog"
          aria-modal="true"
          :aria-label="title"
          tabindex="-1"
        >
          <div
            class="confirm-modal__icon"
            :class="{ 'confirm-modal__icon--danger': danger }"
          >
            <span aria-hidden="true" class="material-symbols-outlined">
              {{ danger ? "delete_forever" : "warning" }}
            </span>
          </div>

          <h2 class="confirm-modal__title">{{ title }}</h2>
          <p class="confirm-modal__message">{{ message }}</p>

          <div class="confirm-modal__actions">
            <button
              type="button"
              class="confirm-modal__btn confirm-modal__btn--cancel transition-all duration-300 enabled:hover:-translate-y-0.5 enabled:active:scale-95"
              :disabled="loading"
              @click="cancel"
            >
              {{ cancelText ?? t("common.cancel") }}
            </button>
            <button
              type="button"
              class="confirm-modal__btn transition-all duration-300 enabled:hover:-translate-y-0.5 enabled:active:scale-95"
              :class="
                danger
                  ? 'confirm-modal__btn--danger'
                  : 'confirm-modal__btn--confirm'
              "
              :disabled="loading"
              @click="confirm"
            >
              <span class="inline-flex items-center justify-center gap-2">
                <span
                  v-if="loading"
                  class="material-symbols-outlined animate-spin text-base"
                  aria-hidden="true"
                >
                  progress_activity
                </span>
                <span>
                  {{
                    loading
                      ? (danger ? t("common.deleting") : t("common.loading"))
                      : (confirmText ?? t("common.confirm"))
                  }}
                </span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.confirm-modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background-color: rgb(var(--bg) / 0.55);
  backdrop-filter: blur(8px);
}

.confirm-modal {
  position: relative;
  width: 100%;
  max-width: 26rem;
  border-radius: 0.25rem;
  border: 1px solid rgb(var(--border) / 1);
  background: rgb(var(--card));
  color: rgb(var(--fg));
  padding: 1.5rem;
  text-align: center;
}

@media (min-width: 640px) {
  .confirm-modal {
    padding: 2rem;
  }
}

.confirm-modal__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 0.25rem;
  background: rgb(59 130 246 / 0.12);
  color: rgb(37 99 235);
  margin-bottom: 1rem;
}
:global(html.dark .confirm-modal__icon) {
  color: rgb(147 197 253);
  background: rgb(59 130 246 / 0.16);
}
.confirm-modal__icon--danger {
  background: rgb(239 68 68 / 0.12);
  color: rgb(185 28 28);
}
:global(html.dark .confirm-modal__icon--danger) {
  color: rgb(252 165 165);
  background: rgb(239 68 68 / 0.16);
}

.confirm-modal__title {
  font-size: 1.25rem;
  font-weight: 900;
  letter-spacing: -0.02em;
}

.confirm-modal__message {
  margin-top: 0.5rem;
  font-size: 0.875rem;
  line-height: 1.6;
  color: rgb(var(--muted));
}

.confirm-modal__actions {
  margin-top: 1.5rem;
  display: flex;
  gap: 0.75rem;
  justify-content: center;
}

.confirm-modal__btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  border-radius: 0.25rem;
  padding: 0.6rem 1.2rem;
  font-size: 0.8rem;
  font-weight: 800;
  border: 1px solid rgb(var(--border) / 1);
  cursor: pointer;
}
.confirm-modal__btn:disabled {
  cursor: wait;
  opacity: 0.55;
}

.confirm-modal__btn--cancel {
  background: rgb(var(--bg) / 0.6);
  color: rgb(var(--fg));
}

.confirm-modal__btn--confirm {
  background: rgb(59 130 246 / 0.12);
  color: rgb(37 99 235);
  border-color: rgb(59 130 246 / 0.3);
}
:global(html.dark .confirm-modal__btn--confirm) {
  color: rgb(147 197 253);
  background: rgb(59 130 246 / 0.16);
}

.confirm-modal__btn--danger {
  background: rgba(236, 34, 34, 0.12);
  color: rgb(185 28 28);
  border-color: rgb(239 68 68 / 0.3);
}
:global(html.dark .confirm-modal__btn--danger) {
  color: rgb(219, 22, 22);
  background: rgba(224, 4, 4, 0.16);
}
</style>