import { AxiosRequestConfig } from 'axios'

// API Response Types
export interface BaseApiResponse {
  success: boolean
  message?: string
  timestamp: string
  requestId?: string
}

export interface ApiResponse<T = unknown> extends BaseApiResponse {
  data: T
  status: number
  meta?: {
    page?: number
    limit?: number
    total?: number
    hasNext?: boolean
    hasPrev?: boolean
  }
}

export interface ApiListResponse<T = unknown> extends BaseApiResponse {
  data: T[]
  status: number
  meta: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
}

// Error Types
export interface ApiError {
  message: string
  status: number
  code: string
  details?: Record<string, unknown>
  timestamp?: string
  requestId?: string
  path?: string
}

export interface ValidationError extends Omit<ApiError, 'details'> {
  code: 'VALIDATION_ERROR'
  details: {
    field: string
    message: string
    value?: unknown
  }[]
}

export interface AuthError extends ApiError {
  code: 'AUTH_ERROR' | 'TOKEN_EXPIRED' | 'INVALID_TOKEN'
  details?: {
    redirectTo?: string
    retryAfter?: number
  }
}

// Request Config Types
export interface ExtendedRequestConfig extends AxiosRequestConfig {
  skipAuth?: boolean
  skipErrorHandling?: boolean
  retryAttempts?: number
  showErrorToast?: boolean
  showSuccessToast?: boolean
  skipCache?: boolean
  skipRetry?: boolean
  cacheTime?: number
  cacheTags?: string[]
  timeout?: number
  priority?: 'low' | 'normal' | 'high'
}

// Authentication Types
export interface LoginCredentials {
  email: string
  password: string
  rememberMe?: boolean
}

export interface RegisterCredentials {
  name: string
  email: string
  password: string
  confirmPassword: string
  terms: boolean
}

export interface AuthTokens {
  accessToken: string
  refreshToken: string
  expiresIn: number
  tokenType?: string
}

export interface AuthUser {
  id: string
  email: string
  name: string
  avatar?: string
  role: string
  permissions?: string[]
  preferences?: Record<string, unknown>
  lastLoginAt?: string
  createdAt: string
  updatedAt: string
}

export interface AuthResponse {
  user: AuthUser
  tokens: AuthTokens
  redirectTo?: string
}

// User Types
export interface UserProfile extends AuthUser {
  phone?: string
  bio?: string
  location?: string
  timezone?: string
  language?: string
  theme?: 'light' | 'dark' | 'system'
  notifications?: {
    email: boolean
    push: boolean
    sms: boolean
  }
}

export interface UpdateUserProfile {
  name?: string
  phone?: string
  bio?: string
  location?: string
  timezone?: string
  language?: string
  theme?: 'light' | 'dark' | 'system'
  notifications?: Partial<UserProfile['notifications']>
}

// Theme Types
export type ThemeMode = 'light' | 'dark' | 'system'

export interface ThemeConfig {
  mode: ThemeMode
  systemPreference: 'light' | 'dark'
  colorScheme?: string
  customColors?: Record<string, string>
}

// Language Types
export type SupportedLanguage = 'en' | 'tr'

export interface LanguageConfig {
  currentLanguage: SupportedLanguage
  availableLanguages: SupportedLanguage[]
  fallbackLanguage: SupportedLanguage
}

// Toast/Notification Types
export interface Toast {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message: string
  duration?: number
  persistent?: boolean
  action?: {
    label: string
    onClick: () => void
  }
  createdAt: number
}

export interface ToastOptions {
  type: Toast['type']
  title: string
  message: string
  duration?: number
  persistent?: boolean
  action?: Toast['action']
}

// Store Types
export interface UserState {
  user: AuthUser | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  lastActivity?: number
  sessionTimeout?: number
}

export interface ThemeState {
  mode: ThemeMode
  systemPreference: 'light' | 'dark'
  colorScheme?: string
  customColors?: Record<string, string>
}

export interface LanguageState {
  currentLanguage: SupportedLanguage
  availableLanguages: SupportedLanguage[]
  fallbackLanguage: SupportedLanguage
  isLoading: boolean
}

export interface ToastState {
  toasts: Toast[]
  maxToasts: number
}

// Component Props Types
export interface BaseComponentProps {
  className?: string
  children?: React.ReactNode
  'data-testid'?: string
}

export interface LoadingProps extends BaseComponentProps {
  size?: 'sm' | 'md' | 'lg'
  variant?: 'spinner' | 'skeleton' | 'pulse'
  text?: string
}

export interface EmptyStateProps extends BaseComponentProps {
  title: string
  description?: string
  icon?: React.ComponentType<any>
  action?: {
    label: string
    onClick: () => void
  }
}

// Utility Types
export type Prettify<T> = {
  [K in keyof T]: T[K]
} & {}

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

export type NonEmptyArray<T> = [T, ...T[]]

export type ValueOf<T> = T[keyof T]

export type KeysOfType<T, U> = {
  [K in keyof T]: T[K] extends U ? K : never
}[keyof T]

// Constants
export const ERROR_CODES = {
  TOKEN_EXPIRED: 'TOKEN_EXPIRED',
  INVALID_TOKEN: 'INVALID_TOKEN',
  NETWORK_ERROR: 'NETWORK_ERROR',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  SERVER_ERROR: 'SERVER_ERROR',
  RATE_LIMIT_EXCEEDED: 'RATE_LIMIT_EXCEEDED',
  PERMISSION_DENIED: 'PERMISSION_DENIED',
  RESOURCE_NOT_FOUND: 'RESOURCE_NOT_FOUND',
  CHUNK_LOAD_ERROR: 'CHUNK_LOAD_ERROR',
  AUTH_ERROR: 'AUTH_ERROR',
} as const

export type ErrorCode = ValueOf<typeof ERROR_CODES>

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
} as const

export type HttpStatus = ValueOf<typeof HTTP_STATUS>
