/* eslint-disable no-console */

// MSW server for Node.js environment (Docker, tests)
let serverInstance: any = null

// Dynamic import to avoid issues in browser environment
async function initializeServer() {
  if (typeof window === 'undefined') {
    try {
      const { setupServer } = await import('msw/node')
      const { handlers } = await import('./handlers')

      serverInstance = setupServer(...handlers)

      // Start server if VITE_USE_MSW is true and we're in Node environment
      if (import.meta.env['VITE_USE_MSW'] === 'true') {
        serverInstance.listen({
          onUnhandledRequest: 'bypass'
        })
        console.log('[MSW Server] Mock server started')
      }
    } catch (error) {
      console.warn('[MSW Server] Failed to initialize server:', error)
    }
  }
}

// Initialize server immediately
initializeServer()

// Export for manual control in tests
export { serverInstance as server }
