import { defineStore } from 'pinia'
import { onMounted, ref, type Ref } from 'vue'

export type Theme = 'light' | 'dark'

export const useThemeStore = defineStore('theme', () => {
  const currentTheme: Ref<Theme> = ref('light')

  const setTheme = (newTheme: Theme) => {
    currentTheme.value = newTheme
    applyTheme(newTheme)
  }

  const toggleTheme = () => {
    const newTheme = currentTheme.value === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
  }

  const applyTheme = (theme: Theme) => {
    document.documentElement.setAttribute('data-theme', theme)
  }

  onMounted(() => {
    applyTheme(currentTheme.value)
  })

  return {
    currentTheme,
    setTheme,
    toggleTheme,
  }
}, {
  persist: {
    pick: ['currentTheme'],
  },
})
