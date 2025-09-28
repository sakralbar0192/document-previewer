import { ref, computed, readonly } from 'vue'

const MOBILE_BREAKPOINT = 768
const TABLET_BREAKPOINT = 1025

const screenWidth = ref(0)
let initialized = false

const updateScreenWidth = () => {
  if (typeof window !== 'undefined') {
    screenWidth.value = window.innerWidth
  }
}

const initializeDeviceDetection = () => {
  if (initialized || typeof window === 'undefined') {
    return
  }

  updateScreenWidth()
  window.addEventListener('resize', updateScreenWidth)
  initialized = true
}

export const useDevice = () => {
  initializeDeviceDetection()

  const isMobile = computed(() => screenWidth.value < MOBILE_BREAKPOINT)
  const isTablet = computed(() => screenWidth.value >= MOBILE_BREAKPOINT && screenWidth.value < TABLET_BREAKPOINT)
  const isDesktop = computed(() => screenWidth.value >= TABLET_BREAKPOINT)

  const deviceType = computed(() => {
    if (isMobile.value) {
      return 'mobile'
    }
    if (isTablet.value) {
      return 'tablet'
    }
    return 'desktop'
  })

  return {
    screenWidth: readonly(screenWidth),
    isMobile: readonly(isMobile),
    isTablet: readonly(isTablet),
    isDesktop: readonly(isDesktop),
    deviceType: readonly(deviceType),
  }
}
