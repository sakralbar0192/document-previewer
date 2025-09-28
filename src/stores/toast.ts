import { defineStore } from 'pinia'
import { ref } from 'vue'

export type ToastType = 'success' | 'error' | 'warning' | 'info'

export interface Toast {
  id: string
  type: ToastType
  title: string
  message?: string | undefined
  duration?: number
}

export const useToastStore = defineStore('toast', () => {
  const toasts = ref<Toast[]>([])

  const addToast = (toast: Omit<Toast, 'id'>) => {
    const id = Date.now().toString()
    const newToast: Toast = {
      id,
      duration: 5000,
      ...toast,
    }

    toasts.value.push(newToast)

    // Автоматическое удаление тоста
    if (newToast.duration && newToast.duration > 0) {
      setTimeout(() => {
        removeToast(id)
      }, newToast.duration)
    }

    return id
  }

  const removeToast = (id: string) => {
    const index = toasts.value.findIndex(toast => toast.id === id)
    if (index > -1) {
      toasts.value.splice(index, 1)
    }
  }

  const clearAllToasts = () => {
    toasts.value = []
  }

  const showSuccess = (title: string, message?: string) => {
    return addToast({ type: 'success', title, message })
  }

  const showError = (title: string, message?: string) => {
    return addToast({ type: 'error', title, message, duration: 7000 })
  }

  const showWarning = (title: string, message?: string) => {
    return addToast({ type: 'warning', title, message })
  }

  const showInfo = (title: string, message?: string) => {
    return addToast({ type: 'info', title, message })
  }

  return {
    toasts,
    addToast,
    removeToast,
    clearAllToasts,
    showSuccess,
    showError,
    showWarning,
    showInfo,
  }
})
