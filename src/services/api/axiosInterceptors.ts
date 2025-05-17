import { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios'

import { store } from '@/store'
import { logoutUser } from '@/store/slices/userSlice'

/**
 * Setup axios interceptors for handling authentication and error cases
 */
export const setupAxiosInterceptors = (axiosInstance: AxiosInstance) => {
  // Request interceptor
  axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      // Get token from localStorage if available
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null

      // Add token to headers if available
      // config.headers is guaranteed to be defined with InternalAxiosRequestConfig
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }

      return config
    },
    (error: AxiosError) => Promise.reject(error),
  )

  // Response interceptor
  axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config

      // Handle token expiration
      if (error.response?.status === 401 && originalRequest) {
        // Try to refresh token if refresh token is available
        const refreshToken = typeof window !== 'undefined' ? localStorage.getItem('refreshToken') : null

        if (refreshToken) {
          try {
            // Call refresh token endpoint
            const response = await axiosInstance.post('/auth/refresh', {
              refreshToken,
            })

            // Update tokens in localStorage
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('refreshToken', response.data.refreshToken)

            // Update Authorization header
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${response.data.token}`
            }

            // Retry the original request
            return axiosInstance(originalRequest)
          } catch (refreshError) {
            // If refresh token is invalid, log out the user
            store.dispatch(logoutUser())
            localStorage.removeItem('token')
            localStorage.removeItem('refreshToken')
          }
        } else {
          // If no refresh token available, log out user
          store.dispatch(logoutUser())
        }
      }

      // Global error handler
      switch (error.response?.status) {
        case 400:
          console.error('Bad Request:', error.response.data)
          break
        case 403:
          console.error('Forbidden:', error.response.data)
          break
        case 404:
          console.error('Not Found:', error.response.data)
          break
        case 500:
          console.error('Server Error:', error.response.data)
          break
        default:
          console.error('Network Error:', error.message)
      }
      return Promise.reject(error)
    },
  )
}
