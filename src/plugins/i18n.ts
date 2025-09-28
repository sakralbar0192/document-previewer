import { createI18n } from 'vue-i18n'
import en from '@/i18n/locales/en.json'
import ru from '@/i18n/locales/ru.json'

// Define message schema type for TypeScript
type MessageSchema = typeof ru
export type SupportedLocale = 'ru' | 'en'
export const STORAGE_KEY = 'app-locale'

const getSavedLocale = (): SupportedLocale => {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '').currentLocale as SupportedLocale
    return saved || detectBrowserLocale()
  } catch {
    return detectBrowserLocale()
  }
}

const detectBrowserLocale = (): SupportedLocale => {
  const browserLang = navigator.language.split('-')[0]
  return browserLang === 'ru' ? 'ru' : 'en'
}

export const i18n = createI18n<[MessageSchema], SupportedLocale>({
  legacy: false,
  locale: getSavedLocale(),
  fallbackLocale: 'en',
  messages: {
    ru,
    en,
  },
})

export default i18n
