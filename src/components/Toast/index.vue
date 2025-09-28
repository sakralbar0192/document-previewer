<template>
  <TransitionGroup name="toast" tag="div" :class="styles['toast-container']">
    <div
      v-for="toast in toasts"
      :key="toast.id"
      :class="[
        styles['toast'],
        styles[`toast--${toast.type}`]
      ]"
      role="alert"
      :aria-live="toast.type === 'error' ? 'assertive' : 'polite'"
    >
      <div :class="styles['toast-icon']">
        <component :is="getIconComponent(toast.type)" />
      </div>
      <div :class="styles['toast-content']">
        <div :class="styles['toast-title']">{{ toast.title }}</div>
        <div v-if="toast.message" :class="styles['toast-message']">
          {{ toast.message }}
        </div>
      </div>
      <button
        :class="styles['toast-close']"
        @click="removeToast(toast.id)"
        :aria-label="$t('common.close')"
      >
        ✕
      </button>
    </div>
  </TransitionGroup>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useToastStore, type ToastType } from '@/stores/toast'
import styles from './styles.module.scss'

const getIconComponent = (type: ToastType) => {
  const icons = {
    success: '✓',
    error: '⚠',
    warning: '⚠',
    info: 'ℹ',
  }
  return icons[type]
}

const store = useToastStore()
const toasts = computed(() => store.toasts)
const removeToast = (id: string) => {
  store.removeToast(id)
}
</script>
