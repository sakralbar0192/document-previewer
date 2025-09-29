// Утилиты для работы с различными устройствами и браузерами

export interface DeviceInfo {
  isMobile: boolean
  isIOS: boolean
  isAndroid: boolean
  isDesktop: boolean
  browser: string
  os: string
}

/**
 * Определяет информацию об устройстве и браузере пользователя
 */
export function getDeviceInfo(): DeviceInfo {
  const userAgent = navigator.userAgent

  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)
  const isIOS = /iPad|iPhone|iPod/.test(userAgent)
  const isAndroid = /Android/i.test(userAgent)
  const isDesktop = !isMobile

  // Определение браузера
  let browser = 'unknown'
  if (userAgent.includes('Chrome')) {
    browser = 'Chrome'
  } else if (userAgent.includes('Firefox')) {
    browser = 'Firefox'
  } else if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) {
    browser = 'Safari'
  } else if (userAgent.includes('Edge')) {
    browser = 'Edge'
  } else if (userAgent.includes('Opera')) {
    browser = 'Opera'
  }

  // Определение ОС
  let os = 'unknown'
  if (isIOS) {
    os = 'iOS'
  } else if (isAndroid) {
    os = 'Android'
  } else if (userAgent.includes('Windows')) {
    os = 'Windows'
  } else if (userAgent.includes('Mac')) {
    os = 'macOS'
  } else if (userAgent.includes('Linux')) {
    os = 'Linux'
  }

  return {
    isMobile,
    isIOS,
    isAndroid,
    isDesktop,
    browser,
    os,
  }
}

/**
 * Проверяет, поддерживает ли браузер программное скачивание файлов
 */
export function supportsProgrammaticDownload(): boolean {
  const deviceInfo = getDeviceInfo()

  // iOS Safari не поддерживает программное скачивание
  if (deviceInfo.isIOS && deviceInfo.browser === 'Safari') {
    return false
  }

  // Старые версии Android Chrome могут иметь проблемы
  if (deviceInfo.isAndroid && deviceInfo.browser === 'Chrome') {
    // Проверяем поддержку Blob URL
    try {
      const blob = new Blob(['test'], { type: 'text/plain' })
      const url = URL.createObjectURL(blob)
      URL.revokeObjectURL(url)
      return true
    } catch {
      return false
    }
  }

  return true
}

/**
 * Проверяет, нужно ли использовать fallback для скачивания
 */
export function shouldUseDownloadFallback(): boolean {
  return !supportsProgrammaticDownload()
}
