import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { enableMockServer, enableMockServiceWorker } from './plugins/msw'
import i18n from './plugins/i18n'

import App from './App.vue'
import router from './router'

import 'modern-normalize/modern-normalize.css'
import './styles/global.scss'

if (typeof window !== 'undefined') await enableMockServiceWorker()
else await enableMockServer()

// Инициализация приложения
async function initializeApp() {
  const pinia = createPinia()
  pinia.use(piniaPluginPersistedstate)

  const app = createApp(App)

  app.use(pinia)
  app.use(router)
  app.use(i18n)

  app.mount('#app')
}

// Запускаем инициализацию
initializeApp().catch((error) => {
  // eslint-disable-next-line no-console
  console.error('Failed to initialize app:', error)
})
