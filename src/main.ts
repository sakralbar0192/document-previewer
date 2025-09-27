import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import App from './App.vue'
import router from './router'

import 'modern-normalize/modern-normalize.css'
import './styles/global.scss'
import { enableMockServer, enableMockServiceWorker } from './plugins/msw'

// Initialize MSW based on environment
if (typeof window !== 'undefined') {
  // Browser environment - use Service Worker
  await enableMockServiceWorker()
} else {
  // Node.js environment (Docker, tests) - use MSW server
  await enableMockServer()
}

// Инициализация приложения
async function initializeApp() {
  const pinia = createPinia()
  pinia.use(piniaPluginPersistedstate)

  const app = createApp(App)

  app.use(pinia)
  app.use(router)

  app.mount('#app')
}

// Запускаем инициализацию
initializeApp().catch((error) => {
  // eslint-disable-next-line no-console
  console.error('Failed to initialize app:', error)
})
