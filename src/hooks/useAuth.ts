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
  const initializationRef = useRef<boolean>(false)

  const user = useAppSelector(selectUser)
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const isLoading = useAppSelector(selectIsLoading)
  const error = useAppSelector(selectError)

  // Auth durumu kontrolü
  const checkAuth = useCallback(async (): Promise<void> => {
    if (initializationRef.current) return

    dispatch(setLoading(true))
    dispatch(setError(null))

    try {
      const token = tokenManager.getAccessToken()
      const refreshToken = tokenManager.getRefreshToken()

      if (!token || !refreshToken) {
        await logout()
        return
      }

      // Token süresi kontrolü
      if (tokenManager.isTokenExpired()) {
        // Refresh token ile yenileme deniyoruz
        try {
          // Mock token refresh - gerçek projede API çağrısı
          await new Promise((resolve) => setTimeout(resolve, 500))

          // Yeni token'ları kaydet
          tokenManager.setTokens('new-access-token', 'new-refresh-token', 3600)

          // Kullanıcı bilgilerini yükle
          await refreshUser()
        } catch (refreshError) {
          console.error('Token refresh failed:', refreshError)
          await logout()
          return
        }
      } else {
        // Token geçerli, kullanıcı bilgilerini yükle
        await refreshUser()
      }
    } catch (error) {
      console.error('Auth check failed:', error)
      dispatch(setError('Authentication check failed'))
      await logout()
    } finally {
      dispatch(setLoading(false))
      initializationRef.current = true
    }
  }, [dispatch, tokenManager])

  // Kullanıcı bilgilerini yenileme
  const refreshUser = useCallback(async (): Promise<void> => {
    try {
      const token = tokenManager.getAccessToken()
      if (!token) return

      // Mock user fetch - gerçek projede API çağrısı
      await new Promise((resolve) => setTimeout(resolve, 300))

      // Token'dan user ID'yi decode et (mock)
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
      }
    } catch (error) {
      console.error('User refresh failed:', error)
      throw error
    }
  }, [dispatch, tokenManager])

  // Giriş işlemi
  const login = useCallback(
    async (credentials: LoginFormValues): Promise<User> => {
      dispatch(setLoading(true))
      dispatch(setError(null))

      try {
        // Mock authentication - gerçek projede API çağrısı
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Kullanıcı doğrulama
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
          expiresIn: credentials.rememberMe ? 7 * 24 * 3600 : 3600, // 7 gün vs 1 saat
        }

        // Token'ları kaydet
        tokenManager.setTokens(mockTokens.accessToken, mockTokens.refreshToken, mockTokens.expiresIn)

        // Kullanıcı bilgilerini kaydet (şifre hariç)
        // Kullanıcı bilgilerini kaydet (şifre hariç)
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

        return loginUser
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Giriş başarısız'

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
    [dispatch, tokenManager],
  )

  // Çıkış işlemi
  const logout = useCallback(async (): Promise<void> => {
    dispatch(setLoading(true))

    try {
      // Server'a logout request gönder (mock)
      if (tokenManager.getAccessToken()) {
        await new Promise((resolve) => setTimeout(resolve, 300))
      }

      // Token'ları temizle
      tokenManager.removeTokens()

      // Store'u temizle
      dispatch(logoutUser())
      dispatch(setError(null))

      // Başarı mesajı
      dispatch(
        showToast({
          type: 'success',
          title: 'Çıkış Yapıldı',
          message: 'Güvenli bir şekilde çıkış yaptınız',
          duration: 3000,
        }),
      )
    } catch (error) {
      console.warn('Logout error:', error)
      // Hata olsa bile local cleanup yapıyoruz
      tokenManager.removeTokens()
      dispatch(logoutUser())
    } finally {
      dispatch(setLoading(false))
      initializationRef.current = false
    }
  }, [dispatch, tokenManager])

  // Hata temizleme
  const clearError = useCallback(() => {
    dispatch(setError(null))
  }, [dispatch])

  // Component mount olduğunda auth durumunu kontrol et
  useEffect(() => {
    if (!initializationRef.current) {
      checkAuth()
    }
  }, [checkAuth])

  // Token süresini periyodik olarak kontrol et
  useEffect(() => {
    if (!isAuthenticated) return

    const intervalId = setInterval(() => {
      if (tokenManager.isTokenExpired()) {
        console.warn('Token expired, logging out')
        logout()
      }
    }, 60000) // Her dakika kontrol et

    return () => clearInterval(intervalId)
  }, [isAuthenticated, tokenManager, logout])

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
