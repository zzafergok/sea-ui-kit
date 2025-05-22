import { AxiosRequestConfig } from 'axios'

export interface ApiResponse<T = any> {
  data: T
  message?: string
  success: boolean
  status: number
}

export interface ApiError {
  message: string
  status: number
  code?: string
  details?: any
}

export interface RefreshTokenResponse {
  token: string
  refreshToken: string
  expiresIn: number
}

export interface RequestConfig extends AxiosRequestConfig {
  skipAuth?: boolean
  skipErrorHandling?: boolean
  retryAttempts?: number
  showErrorToast?: boolean
  skipCache?: boolean
  skipRetry?: boolean
  cacheTime?: number
}
