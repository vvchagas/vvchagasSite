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

const lenis = useLenis();
const dialogRef = ref<HTMLElement | null>(null);

function cancel() {
  if (props.loading) return;
  emit("cancel");
}

function confirm() {
  emit("confirm");
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === "Escape") cancel();
}

watch(
  () => props.open,
  (isOpen) => {
    if (isOpen) {
      lenis?.stop();
      document.addEventListener("keydown", onKeydown);
      nextTick(() => dialogRef.value?.focus());
    } else {
      lenis?.start();
      document.removeEventListener("keydown", onKeydown);
    }
  },
);

onUnmounted(() => {
  document.removeEventListener("keydown", onKeydown);
  lenis?.start();
});
</script>

<template>
  <Teleport to="body">
    <Transition name="confirm-modal">
      <div
        v-if="open"
        class="confirm-modal-overlay"
        @mousedown.self="cancel"
      >
        <div
          ref="dialogRef"
          class="confirm-modal"
          role="dialog"
          aria-modal="true"
          :aria-label="title"
          tabindex="-1"
          data-lenis-prevent
        >
          <div class="confirm-modal__icon" :class="{ 'confirm-modal__icon--danger': danger }">
            <span aria-hidden="true" class="material-symbols-outlined">
              {{ danger ? 'delete_forever' : 'warning' }}
            </span>
          </div>

          <h2 class="confirm-modal__title">{{ title }}</h2>
          <p class="confirm-modal__message">{{ message }}</p>

          <div class="confirm-modal__actions">
            <button
              type="button"
              class="confirm-modal__btn confirm-modal__btn--cancel"
              :disabled="loading"
              @click="cancel"
            >
              {{ cancelText ?? "Cancelar" }}
            </button>
            <button
              type="button"
              class="confirm-modal__btn"
              :class="danger ? 'confirm-modal__btn--danger' : 'confirm-modal__btn--confirm'"
              :disabled="loading"
              @click="confirm"
            >
              <span v-if="loading" class="confirm-modal__spinner" aria-hidden="true"></span>
              {{ loading ? "Excluindo…" : (confirmText ?? "Confirmar") }}
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
  background: rgb(0 0 0 / 0.55);
  backdrop-filter: blur(4px);
}

.confirm-modal {
  position: relative;
  width: 100%;
  max-width: 26rem;
  border-radius: 1.75rem;
  border: 1px solid rgb(var(--border) / 1);
  background: rgb(var(--card));
  color: rgb(var(--fg));
  padding: 2rem;
  text-align: center;
  box-shadow: 0 30px 70px -20px rgb(0 0 0 / 0.45);
}

.confirm-modal__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 999px;
  background: rgb(59 130 246 / 0.12);
  color: rgb(37 99 235);
  margin-bottom: 1rem;
}
:global(html.dark) .confirm-modal__icon {
  color: rgb(147 197 253);
  background: rgb(59 130 246 / 0.16);
}
.confirm-modal__icon--danger {
  background: rgb(239 68 68 / 0.12);
  color: rgb(185 28 28);
}
:global(html.dark) .confirm-modal__icon--danger {
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
  border-radius: 0.85rem;
  padding: 0.6rem 1.2rem;
  font-size: 0.8rem;
  font-weight: 800;
  border: 1px solid rgb(var(--border) / 1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;
}
.confirm-modal__btn:hover:not(:disabled) {
  transform: translateY(-2px);
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
:global(html.dark) .confirm-modal__btn--confirm {
  color: rgb(147 197 253);
  background: rgb(59 130 246 / 0.16);
}

.confirm-modal__btn--danger {
  background: rgb(239 68 68 / 0.12);
  color: rgb(185 28 28);
  border-color: rgb(239 68 68 / 0.3);
}
:global(html.dark) .confirm-modal__btn--danger {
  color: rgb(252 165 165);
  background: rgb(239 68 68 / 0.16);
}

.confirm-modal__spinner {
  display: inline-block;
  width: 0.9rem;
  height: 0.9rem;
  border: 2px solid currentColor;
  border-top-color: transparent;
  border-radius: 999px;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.confirm-modal-enter-active,
.confirm-modal-leave-active {
  transition: opacity 0.2s ease;
}
.confirm-modal-enter-from,
.confirm-modal-leave-to {
  opacity: 0;
}
.confirm-modal-enter-active .confirm-modal,
.confirm-modal-leave-active .confirm-modal {
  transition: transform 0.25s ease, opacity 0.25s ease;
}
.confirm-modal-enter-from .confirm-modal,
.confirm-modal-leave-to .confirm-modal {
  transform: translateY(16px) scale(0.98);
  opacity: 0;
}

@media (prefers-reduced-motion: reduce) {
  .confirm-modal-enter-active,
  .confirm-modal-leave-active,
  .confirm-modal-enter-active .confirm-modal,
  .confirm-modal-leave-active .confirm-modal {
    transition: none;
  }
}
</style>

