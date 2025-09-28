// stores/locale.ts
import { STORAGE_KEY, type SupportedLocale } from '@/plugins/i18n'
import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'
import { useI18n } from 'vue-i18n'

export const useLocaleStore = defineStore('locale', () => {
  const { locale } = useI18n()
  const currentLocale: Ref<SupportedLocale> = ref('ru')

  function setLocale(newLocale: SupportedLocale) {
    currentLocale.value = newLocale
    locale.value = newLocale
  }

  const initializeFromStorage = () => {
    const { locale } = useI18n()
    locale.value = currentLocale.value
  }

  return { currentLocale, setLocale, initializeFromStorage }
}, {
  persist: {
    key: STORAGE_KEY,
    storage: localStorage,
    pick: ['currentLocale'],
  },
})
