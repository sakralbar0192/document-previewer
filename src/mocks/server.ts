/* eslint-disable no-console */

// MSW server for Node.js environment (Docker, tests)
let serverInstance: any = null

// Only run in Node.js environment to avoid Vite build issues
if (typeof window === 'undefined') {
  try {
    // Use dynamic imports with try-catch to handle build-time issues
    import('msw/node').then(({ setupServer }) => {
      import('./handlers').then(({ handlers }) => {
        serverInstance = setupServer(...handlers)

        // Start server if VITE_USE_MSW is true and we're in Node environment
        if (import.meta.env['VITE_USE_MSW'] === 'true') {
          serverInstance.listen({
            onUnhandledRequest: 'bypass'
          })
          console.log('[MSW Server] Mock server started')
        }
      }).catch((error) => {
        console.warn('[MSW Server] Failed to load handlers:', error)
      })
    }).catch((error) => {
      console.warn('[MSW Server] MSW not available:', error)
    })
  } catch (error) {
    console.warn('[MSW Server] Failed to initialize:', error)
  }
}

// Export for manual control in tests
export { serverInstance as server }
