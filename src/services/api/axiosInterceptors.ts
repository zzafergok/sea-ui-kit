import { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios'

import { store } from '@/store'

import { RequestConfig } from './types'
import { HTTP_STATUS } from './constants'
import { RequestQueue } from './requestQueue'
import { ErrorHandler } from './errorHandler'

import { tokenManagerService } from '@/services/tokenManager'

import apiConfig from '@/config/api'

/**
 * Axios instance için interceptor'ları kurar
 * Request ve response interceptor'ları ile authentication, error handling ve logging işlemleri yapar
 */
export const setupAxiosInterceptors = (axiosInstance: AxiosInstance): void => {
  const requestQueue = RequestQueue.getInstance()

  // Request Interceptor
  axiosInstance.interceptors.request.use(
    async (config: InternalAxiosRequestConfig & RequestConfig) => {
      try {
        // Request ID oluştur (tracing için)
        const requestId = `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
        config.headers = config.headers || {}
        config.headers['X-Request-ID'] = requestId

        // User ID ekle (mevcut kullanıcı varsa)
        const userState = store.getState().user
        if (userState.user?.id) {
          config.headers['X-User-ID'] = userState.user.id
        }

        // Request timestamp ekle
        config.headers['X-Request-Timestamp'] = Date.now().toString()

        // Development ortamında request log
        if (apiConfig.enableLogging) {
          console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`, {
            requestId,
            data: config.data,
            params: config.params,
          })
        }

        // Auth gerektirmeyen istekler için erken dönüş
        if (config.skipAuth) {
          return config
        }

        const token = tokenManagerService.getAccessToken()
        if (token) {
          // Token süresi kontrolü
          if (tokenManagerService.isTokenExpired()) {
            try {
              console.log('Token expired, refreshing...')
              const refreshResult = await tokenManagerService.refreshAccessToken(axiosInstance)
              if (refreshResult) {
                config.headers.Authorization = `Bearer ${refreshResult.token}`
                console.log('Token refreshed successfully')
              } else {
                console.log('Token refresh failed, removing tokens')
                ErrorHandler.handleAuthError()
                return Promise.reject(new Error('Token yenileme başarısız'))
              }
            } catch (error) {
              console.error('Token refresh error:', error)
              ErrorHandler.handleAuthError()
              return Promise.reject(error)
            }
          } else {
            config.headers.Authorization = `Bearer ${token}`
          }
        }

        // Request timeout ayarla
        config.timeout = config.timeout || apiConfig.timeout

        // Last activity güncelle
        tokenManagerService.updateLastActivity()

        return config
      } catch (error) {
        console.error('Request interceptor error:', error)
        return Promise.reject(error)
      }
    },
    (error: AxiosError) => {
      console.error('Request interceptor error:', error)
      return Promise.reject(error)
    },
  )

  // Response Interceptor
  axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
      // Success response handling
      const requestId = response.config.headers?.['X-Request-ID'] as string
      const startTime = response.config.headers?.['X-Request-Timestamp'] as string
      const duration = startTime ? Date.now() - parseInt(startTime) : 0

      // Development ortamında response log
      if (apiConfig.enableLogging) {
        console.log(`✅ API Response: ${response.config.method?.toUpperCase()} ${response.config.url}`, {
          status: response.status,
          duration: `${duration}ms`,
          requestId,
          data: response.data,
        })
      }

      // Performance monitoring
      if (apiConfig.enablePerformanceMonitoring && duration > 3000) {
        console.warn(
          `🐌 Slow API Request: ${response.config.method?.toUpperCase()} ${response.config.url} took ${duration}ms`,
        )
      }

      return response
    },
    async (error: AxiosError) => {
      const originalRequest = error.config as InternalAxiosRequestConfig & RequestConfig
      // Error logging
      if (apiConfig.enableLogging) {
        console.error(`❌ API Error: ${originalRequest?.method?.toUpperCase()} ${originalRequest?.url}`, {
          status: error.response?.status,
          message: error.message,
          requestId: originalRequest?.headers?.['X-Request-ID'],
        })
      }

      // Özel hata işleme atlanacaksa
      if (originalRequest?.skipErrorHandling) {
        return Promise.reject(error)
      }

      // 401 hatası ve token yenileme işlemi
      if (error.response?.status === HTTP_STATUS.UNAUTHORIZED && originalRequest && !originalRequest.skipAuth) {
        // Zaten token yenileme işlemi devam ediyorsa, kuyruğa ekle
        if (requestQueue.isRefreshingToken()) {
          try {
            console.log('Token refresh in progress, adding to queue...')
            const newConfig = await requestQueue.addToQueue(originalRequest)
            return axiosInstance(newConfig)
          } catch (queueError) {
            console.error('Queue error:', queueError)
            return Promise.reject(queueError)
          }
        }

        // Token yenileme işlemini başlat
        requestQueue.setRefreshing(true)
        console.log('Starting token refresh process...')

        try {
          const refreshResult = await tokenManagerService.refreshAccessToken(axiosInstance)
          if (refreshResult) {
            console.log('Token refresh successful, processing queue...')
            // Başarılı token yenileme
            originalRequest.headers = originalRequest.headers || {}
            originalRequest.headers.Authorization = `Bearer ${refreshResult.token}`
            // Kuyruktaki istekleri işle
            requestQueue.processQueue(null, refreshResult.token)
            // Orijinal isteği tekrar dene
            return axiosInstance(originalRequest)
          } else {
            console.log('Token refresh failed, processing queue with error...')
            // Token yenileme başarısız
            const refreshError = new Error('Token yenileme başarısız')
            requestQueue.processQueue(refreshError, null)
            ErrorHandler.handleAuthError()
            return Promise.reject(refreshError)
          }
        } catch (refreshError) {
          console.error('Token refresh error:', refreshError)
          requestQueue.processQueue(refreshError, null)
          ErrorHandler.handleAuthError()
          return Promise.reject(refreshError)
        } finally {
          requestQueue.setRefreshing(false)
        }
      }

      // Genel hata işleme
      const apiError = ErrorHandler.handleError(error)
      // Error reporting (production)
      if (apiConfig.enableErrorReporting) {
        ErrorHandler.reportError(apiError, {
          url: originalRequest?.url,
          method: originalRequest?.method,
          requestId: originalRequest?.headers?.['X-Request-ID'],
        })
      }

      // Toast göster (istenirse)
      if (originalRequest?.showErrorToast !== false) {
        ErrorHandler.showErrorToast(apiError)
      }

      return Promise.reject(apiError)
    },
  )
}

/**
 * Interceptor'ları temizler
 */
export const clearAxiosInterceptors = (axiosInstance: AxiosInstance): void => {
  axiosInstance.interceptors.request.clear()
  axiosInstance.interceptors.response.clear()
}

/**
 * Request bilgilerini loglar
 */
export const logRequest = (config: InternalAxiosRequestConfig): void => {
  if (apiConfig.enableLogging && process.env.NODE_ENV === 'development') {
    console.group(`🚀 ${config.method?.toUpperCase()} ${config.url}`)
    console.log('Headers:', config.headers)
    if (config.data) console.log('Data:', config.data)
    if (config.params) console.log('Params:', config.params)
    console.groupEnd()
  }
}

/**
 * Response bilgilerini loglar
 */
export const logResponse = (response: AxiosResponse): void => {
  if (apiConfig.enableLogging && process.env.NODE_ENV === 'development') {
    console.group(`✅ ${response.status} ${response.config.method?.toUpperCase()} ${response.config.url}`)
    console.log('Data:', response.data)
    console.groupEnd()
  }
}

/**
 * Error bilgilerini loglar
 */
export const logError = (error: AxiosError): void => {
  if (apiConfig.enableLogging && process.env.NODE_ENV === 'development') {
    console.group(
      `❌ ${error.response?.status || 'Network'} ${error.config?.method?.toUpperCase()} ${error.config?.url}`,
    )
    console.error('Error:', error.message)
    if (error.response?.data) console.error('Response:', error.response.data)
    console.groupEnd()
  }
}
