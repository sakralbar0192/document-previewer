import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig(({ mode }) => ({
  base: process.env.NODE_ENV === 'production' ? '/document-previewer/' : '/',
  plugins: [
    vue(),
    vueDevTools(),
  ],
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
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      'documents': fileURLToPath(new URL('./src/features/documents', import.meta.url)),
    },
  },
  optimizeDeps: {
    exclude: mode === 'production' ? ['msw'] : [],
  },
  define: {
    __DEV__: mode === 'development',
  },
}))
