'use client'

import { useCallback, useEffect, useRef } from 'react'
import { useAppDispatch, useAppSelector } from '@/store'
import {
  setUser,
  logoutUser,
  setLoading,
  setError,
  selectUser,
  selectIsAuthenticated,
  selectIsLoading,
  selectError,
  User,
} from '@/store/slices/userSlice'
import { showToast } from '@/store/slices/toastSlice'
import { useTokenManagerContext } from './useTokenManager'
import { LoginFormValues } from '@/lib/validations/auth'

// Mock kullanıcı veritabanı
const MOCK_USERS_DB = [
  {
    id: '1',
    name: 'Admin Kullanıcı',
    username: 'admin',
    email: 'admin@example.com',
    password: 'Admin123!',
    role: 'admin',
    avatar: null,
    createdAt: '2024-01-01T00:00:00.000Z',
    lastLoginAt: null,
  },
  {
    id: '2',
    name: 'Standart Kullanıcı',
    username: 'user',
    email: 'user@example.com',
    password: 'User123!',
    role: 'user',
    avatar: null,
    createdAt: '2024-01-02T00:00:00.000Z',
    lastLoginAt: null,
  },
  {
    id: '3',
    name: 'Demo Kullanıcı',
    username: 'demo',
    email: 'demo@example.com',
    password: 'Demo123!',
    role: 'demo',
    avatar: null,
    createdAt: '2024-01-03T00:00:00.000Z',
    lastLoginAt: null,
  },
] as const

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

interface AuthActions {
  login: (credentials: LoginFormValues) => Promise<User>
  logout: () => Promise<void>
  checkAuth: () => Promise<void>
  clearError: () => void
  refreshUser: () => Promise<void>
}

export function useAuth(): AuthState & AuthActions {
  const dispatch = useAppDispatch()
  const tokenManager = useTokenManagerContext()

  // Initialization state'lerini daha güvenli yönetim
  const initializationRef = useRef<{
    hasInitialized: boolean
    isInitializing: boolean
  }>({
    hasInitialized: false,
    isInitializing: false,
  })

  const user = useAppSelector(selectUser)
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const isLoading = useAppSelector(selectIsLoading)
  const error = useAppSelector(selectError)

  // Cookie'lerde token'ları ayarlama
  const setTokensInCookies = useCallback((accessToken: string, refreshToken: string) => {
    if (typeof window !== 'undefined') {
      document.cookie = `accessToken=${accessToken}; path=/; max-age=${7 * 24 * 60 * 60}; samesite=lax`
      document.cookie = `refreshToken=${refreshToken}; path=/; max-age=${7 * 24 * 60 * 60}; samesite=lax`
    }
  }, [])

  // Cookie'lerden token'ları temizleme
  const clearTokensFromCookies = useCallback(() => {
    if (typeof window !== 'undefined') {
      document.cookie = 'accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT'
      document.cookie = 'refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT'
    }
  }, [])

  // Kullanıcı bilgilerini yenileme
  const refreshUser = useCallback(async (): Promise<void> => {
    try {
      const token = tokenManager.getAccessToken()
      if (!token) {
        throw new Error('No access token available')
      }

      // Mock user fetch
      await new Promise((resolve) => setTimeout(resolve, 300))

      const userId = '1' // Gerçek projede JWT'den parse edilecek
      const mockUser = MOCK_USERS_DB.find((u) => u.id === userId)

      if (mockUser) {
        const { password: _password, ...userWithoutPassword } = mockUser
        dispatch(
          setUser({
            ...userWithoutPassword,
            avatar: userWithoutPassword.avatar || undefined,
          }),
        )
      } else {
        throw new Error('User not found')
      }
    } catch (error) {
      console.error('User refresh failed:', error)
      throw error
    }
  }, [dispatch, tokenManager])

  // Auth durumu kontrolü - STABLE referansla
  const checkAuth = useCallback(async (): Promise<void> => {
    // Zaten initialize edilmişse veya initialization devam ediyorsa çık
    if (initializationRef.current.hasInitialized || initializationRef.current.isInitializing) {
      return
    }

    initializationRef.current.isInitializing = true
    dispatch(setLoading(true))
    dispatch(setError(null))

    try {
      const token = tokenManager.getAccessToken()
      const refreshToken = tokenManager.getRefreshToken()

      if (!token || !refreshToken) {
        console.log('No tokens found, user not authenticated')
        await logout()
        return
      }

      // Token geçerliliği kontrolü
      if (tokenManager.isTokenExpired()) {
        console.log('Token expired, attempting refresh')
        try {
          // Mock token refresh
          await new Promise((resolve) => setTimeout(resolve, 500))

          const newAccessToken = `mock-access-token-refreshed-${Date.now()}`
          const newRefreshToken = `mock-refresh-token-refreshed-${Date.now()}`

          tokenManager.setTokens(newAccessToken, newRefreshToken, 3600)
          setTokensInCookies(newAccessToken, newRefreshToken)

          await refreshUser()
        } catch (refreshError) {
          console.error('Token refresh failed:', refreshError)
          await logout()
          return
        }
      }
    } catch (error) {
      console.error('Auth check failed:', error)
      dispatch(setError('Authentication check failed'))
      await logout()
    } finally {
      dispatch(setLoading(false))
      initializationRef.current.hasInitialized = true
      initializationRef.current.isInitializing = false
    }
  }, [dispatch, tokenManager, setTokensInCookies, refreshUser]) // Stable dependencies

  // Giriş işlemi
  const login = useCallback(
    async (credentials: LoginFormValues): Promise<User> => {
      dispatch(setLoading(true))
      dispatch(setError(null))

      try {
        console.log('Attempting login with:', credentials.email)

        // Mock authentication
        await new Promise((resolve) => setTimeout(resolve, 1000))

        const foundUser = MOCK_USERS_DB.find(
          (user) => user.email === credentials.email && user.password === credentials.password,
        )

        if (!foundUser) {
          throw new Error('E-posta veya şifre hatalı')
        }

        // Mock token generation
        const mockTokens = {
          accessToken: `mock-access-token-${foundUser.id}-${Date.now()}`,
          refreshToken: `mock-refresh-token-${foundUser.id}-${Date.now()}`,
          expiresIn: credentials.rememberMe ? 7 * 24 * 3600 : 3600,
        }

        console.log('Login successful, setting tokens')

        // Token'ları kaydet
        tokenManager.setTokens(mockTokens.accessToken, mockTokens.refreshToken, mockTokens.expiresIn)
        setTokensInCookies(mockTokens.accessToken, mockTokens.refreshToken)

        // Kullanıcı bilgilerini kaydet
        const { password: _password, ...userWithoutPassword } = foundUser
        const loginUser: User = {
          ...userWithoutPassword,
          avatar: userWithoutPassword.avatar || undefined,
        }

        dispatch(setUser(loginUser))

        // Başarı mesajı
        dispatch(
          showToast({
            type: 'success',
            title: 'Başarılı',
            message: `Hoş geldiniz, ${loginUser.username}!`,
            duration: 3000,
          }),
        )

        // Initialization state'ini reset et ki sonraki checkAuth çalışabilsin
        initializationRef.current.hasInitialized = true
        initializationRef.current.isInitializing = false

        console.log('Login process completed')
        return loginUser
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Giriş başarısız'
        console.error('Login failed:', errorMessage)

        dispatch(setError(errorMessage))
        dispatch(
          showToast({
            type: 'error',
            title: 'Giriş Hatası',
            message: errorMessage,
            duration: 5000,
          }),
        )

        throw error
      } finally {
        dispatch(setLoading(false))
      }
    },
    [dispatch, tokenManager, setTokensInCookies],
  )

  // Çıkış işlemi
  const logout = useCallback(async (): Promise<void> => {
    console.log('Logout initiated')
    dispatch(setLoading(true))

    try {
      // Token'ları temizle
      tokenManager.removeTokens()
      clearTokensFromCookies()

      // Store'u temizle
      dispatch(logoutUser())
      dispatch(setError(null))

      console.log('Logout completed')

      // Başarı mesajı (sadece manuel logout'ta)
      if (user) {
        dispatch(
          showToast({
            type: 'success',
            title: 'Çıkış Yapıldı',
            message: 'Güvenli bir şekilde çıkış yaptınız',
            duration: 3000,
          }),
        )
      }
    } catch (error) {
      console.warn('Logout error:', error)
      // Hata olsa bile local cleanup yapıyoruz
      tokenManager.removeTokens()
      clearTokensFromCookies()
      dispatch(logoutUser())
    } finally {
      dispatch(setLoading(false))
      // Initialization state'ini reset et
      initializationRef.current.hasInitialized = false
      initializationRef.current.isInitializing = false
    }
  }, [dispatch, tokenManager, clearTokensFromCookies, user])

  // Hata temizleme
  const clearError = useCallback(() => {
    dispatch(setError(null))
  }, [dispatch])

  // Component mount olduğunda auth durumunu kontrol et - SADECE BİR KEZ
  useEffect(() => {
    if (!initializationRef.current.hasInitialized && !initializationRef.current.isInitializing) {
      console.log('Initializing auth check')
      checkAuth()
    }
  }, []) // BOŞ dependency array - sadece mount'ta çalışır

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    logout,
    checkAuth,
    clearError,
    refreshUser,
  }
}
