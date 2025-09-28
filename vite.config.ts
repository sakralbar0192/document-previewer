import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig(({ mode }) => ({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      'documents': fileURLToPath(new URL('./src/features/documents', import.meta.url)),
    },
  },
  build: {
    rollupOptions: {
      external: (id) => {
        if (mode === 'production' && id.includes('msw')) {
          return true
        }
        return false
      },
      output: {
        manualChunks: {
          vendor: ['vue', 'pinia', 'vue-router', 'vue-i18n'],
        },
      },
    },
  },
  optimizeDeps: {
    exclude: mode === 'production' ? ['msw'] : [],
  },
  define: {
    __DEV__: mode === 'development',
  },
}))
