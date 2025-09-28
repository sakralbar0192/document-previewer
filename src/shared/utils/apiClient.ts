import axios from 'axios'
import type { AxiosInstance, AxiosError } from 'axios'
import { useToastStore } from '@/stores/toast'

const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env['VITE_API_BASE_URL'],
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor
apiClient.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error),
)

// Response interceptor with global error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const toastStore = useToastStore()

    if (error.response) {
      // Server responded with error status
      const status = error.response.status
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const data = error.response.data as any

      let errorMessage = 'Произошла ошибка'
      let errorTitle = 'Ошибка сервера'

      switch (status) {
        case 400:
          errorTitle = 'Неверный запрос'
          errorMessage = data?.message || 'Проверьте правильность введенных данных'
          break
        case 401:
          errorTitle = 'Не авторизован'
          errorMessage = 'Требуется авторизация'
          break
        case 403:
          errorTitle = 'Доступ запрещен'
          errorMessage = 'У вас нет прав для выполнения этого действия'
          break
        case 404:
          errorTitle = 'Не найдено'
          errorMessage = 'Запрашиваемый ресурс не найден'
          break
        case 500:
          errorTitle = 'Внутренняя ошибка сервера'
          errorMessage = 'Произошла внутренняя ошибка сервера'
          break
        default:
          errorMessage = data?.message || `Ошибка ${status}`
      }

      toastStore.showError(errorTitle, errorMessage)
    } else if (error.request) {
      // Network error
      toastStore.showError(
        'Ошибка сети',
        'Не удалось подключиться к серверу. Проверьте подключение к интернету.',
      )
    } else {
      // Other error
      toastStore.showError(
        'Неизвестная ошибка',
        error.message || 'Произошла неизвестная ошибка',
      )
    }

    return Promise.reject(error)
  },
)

export { apiClient }
