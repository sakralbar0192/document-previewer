/* eslint-disable no-console */
import { setupWorker } from 'msw/browser'

export async function enableMockServiceWorker() {
  // Включаем моки только в development режиме
  if (import.meta.env.DEV && import.meta.env['VITE_USE_MOCKS'] === 'true') {
    try {
      const { handlers } = await import('@/mocks/handlers')

      const worker = setupWorker(...handlers)
      await worker.start({
        onUnhandledRequest: 'bypass',
        serviceWorker: {
          url: '/mockServiceWorker.js',
        },
      })

      console.log('[MSW] Mocking enabled')
    } catch (error) {
      console.warn('[MSW] Mocking failed:', error)
    }
  }
}

// MSW server for Node.js environment (Docker, tests)
export async function enableMockServer() {
  if (import.meta.env['VITE_USE_MOCKS'] === 'true' && typeof window === 'undefined') {
    try {
      const { server } = await import('@/mocks/server')
      if (server) {
        server.listen({
          onUnhandledRequest: 'bypass',
        })
        console.log('[MSW Server] Mock server started for Docker/tests')
        return server
      }
      console.warn('[MSW Server] Failed to start mock server:', 'Sever is null')

    } catch (error) {
      console.warn('[MSW Server] Failed to start mock server:', error)
    }
  }
  return null
}
