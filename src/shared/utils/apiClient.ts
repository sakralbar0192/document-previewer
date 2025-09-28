import axios from 'axios'
import type { AxiosInstance } from 'axios'

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

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) =>  Promise.reject(error),
)

export { apiClient }
