import axios, { AxiosInstance } from 'axios'
import { setupAxiosInterceptors } from './axiosInterceptors'
import apiConfig from '@/config/api'

/**
 * Yeni bir Axios instance oluşturur ve interceptor'ları kurar
 */
export const createApiInstance = (baseURL?: string): AxiosInstance => {
  const instance = axios.create({
    baseURL: baseURL || apiConfig.baseURL,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    },
    timeout: apiConfig.timeout,
    withCredentials: false,
    // Retry konfigürasyonu
    // retryAttempts: apiConfig.retryAttempts, // These are not standard Axios options
    // retryDelay: apiConfig.retryDelay,      // Consider implementing retry logic in interceptors
  })

  // Interceptor'ları kur
  setupAxiosInterceptors(instance)

  return instance
}

/**
 * Varsayılan API instance
 */
export const apiInstance = createApiInstance()

/**
 * Production için optimized instance
 */
export const createProductionApiInstance = (): AxiosInstance => {
  return createApiInstance(process.env.NEXT_PUBLIC_API_URL)
}

/**
 * Development için debug instance
 */
export const createDevelopmentApiInstance = (): AxiosInstance => {
  const instance = createApiInstance('http://localhost:3000/api')
  // Development için ek debug bilgileri
  instance.interceptors.request.use((config) => {
    console.log('🔧 Development API Request:', config)
    return config
  })
  return instance
}

/**
 * Test için mock instance
 */
export const createTestApiInstance = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: 'http://localhost:3001/api',
    timeout: 5000,
    adapter: 'fetch', // Test ortamı için
  })

  return instance
}

export default apiInstance
