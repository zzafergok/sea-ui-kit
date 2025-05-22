'use client'

import { useCallback, useEffect, useMemo, useRef } from 'react'
import { useAppDispatch, useAppSelector } from '@/store'
import {
  setUser,
  logoutUser,
  setLoading,
  selectUser,
  selectIsAuthenticated,
  selectIsLoading,
} from '@/store/slices/userSlice'
import { useLoginMutation, useLogoutMutation, useGetCurrentUserQuery } from '@/services/api/apiSlice'
import { LoginFormValues } from '@/lib/validations/auth'
import { useErrorHandler } from './useErrorHandler'

interface AuthTokens {
  accessToken: string
  refreshToken: string
  expiresIn?: number | undefined
}

interface AuthState {
  user: any
  isAuthenticated: boolean
  isLoading: boolean
  hasValidSession: boolean
}

interface AuthActions {
  login: (credentials: LoginFormValues) => Promise<any>
  logout: () => Promise<void>
  refreshUser: () => Promise<any>
  checkAuthStatus: () => boolean
  clearAuthState: () => void
}

/**
 * İyileştirilmiş Authentication hook
 * - Döngüsel bağımlılık riski önlendi
 * - Memory leak koruması eklendi
 * - Error handling iyileştirildi
 * - Performance optimizasyonu yapıldı
 */
export function useAuth(): AuthState & AuthActions {
  const dispatch = useAppDispatch()
  const { showErrorToast, showSuccessToast, handleAuthError } = useErrorHandler()

  // Refs for preventing unnecessary re-renders
  const isUnmountedRef = useRef(false)
  const lastAuthCheckRef = useRef(0)

  // Selectors
  const user = useAppSelector(selectUser)
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const isLoading = useAppSelector(selectIsLoading)

  // API mutations
  const [loginMutation, { isLoading: isLoginLoading }] = useLoginMutation()
  const [logoutMutation, { isLoading: isLogoutLoading }] = useLogoutMutation()

  // Current user query - memoized skip condition
  const shouldSkipUserQuery = useMemo(() => !isAuthenticated, [isAuthenticated])

  const {
    data: currentUserData,
    refetch: refetchCurrentUser,
    isError: isCurrentUserError,
    error: currentUserError,
  } = useGetCurrentUserQuery(undefined, {
    skip: shouldSkipUserQuery,
    pollingInterval: 5 * 60 * 1000, // 5 dakikada bir kontrol
    refetchOnMountOrArgChange: true,
  })

  // Token management utilities - memoized
  const tokenUtils = useMemo(
    () => ({
      getTokens: (): AuthTokens | null => {
        if (typeof window === 'undefined') return null

        try {
          const accessToken = localStorage.getItem('accessToken')
          const refreshToken = localStorage.getItem('refreshToken')
          const expiresIn = localStorage.getItem('tokenExpiry')

          if (!accessToken || !refreshToken) return null

          return {
            accessToken,
            refreshToken,
            expiresIn: expiresIn ? parseInt(expiresIn) : undefined,
          }
        } catch (error) {
          console.error('Token retrieval error:', error)
          return null
        }
      },

      setTokens: (tokens: AuthTokens) => {
        if (typeof window === 'undefined') return

        try {
          localStorage.setItem('accessToken', tokens.accessToken)
          localStorage.setItem('refreshToken', tokens.refreshToken)

          if (tokens.expiresIn) {
            const expiryTime = Date.now() + tokens.expiresIn * 1000
            localStorage.setItem('tokenExpiry', expiryTime.toString())
          }

          localStorage.setItem('lastActivity', Date.now().toString())
        } catch (error) {
          console.error('Token storage error:', error)
          showErrorToast({
            message: 'Token saklama hatası oluştu',
            status: 500,
            code: 'TOKEN_STORAGE_ERROR',
          })
        }
      },

      clearTokens: () => {
        if (typeof window === 'undefined') return

        const keysToRemove = ['accessToken', 'refreshToken', 'tokenExpiry', 'lastActivity']
        keysToRemove.forEach((key) => {
          try {
            localStorage.removeItem(key)
          } catch (error) {
            console.error(`Error removing ${key}:`, error)
          }
        })
      },

      isTokenExpired: (): boolean => {
        if (typeof window === 'undefined') return true

        const expiry = localStorage.getItem('tokenExpiry')
        if (!expiry) return true

        const bufferTime = 60000 // 1 dakika buffer
        return Date.now() > parseInt(expiry) - bufferTime
      },
    }),
    [showErrorToast],
  )

  /**
   * Login işlemi - optimized
   */
  const login = useCallback(
    async (credentials: LoginFormValues): Promise<any> => {
      if (isUnmountedRef.current) return

      dispatch(setLoading(true))

      try {
        const result = await loginMutation(credentials).unwrap()

        if (isUnmountedRef.current) return result

        // Token'ları güvenli şekilde sakla
        tokenUtils.setTokens({
          accessToken: result.token,
          refreshToken: result.refreshToken,
        })

        // User state'ini güncelle
        dispatch(setUser(result.user))

        showSuccessToast('Başarıyla giriş yapıldı')

        return result
      } catch (error: any) {
        if (isUnmountedRef.current) return

        console.error('Login error:', error)
        throw error // Let the error handler in interceptor handle this
      } finally {
        if (!isUnmountedRef.current) {
          dispatch(setLoading(false))
        }
      }
    },
    [loginMutation, dispatch, tokenUtils, showSuccessToast],
  )

  /**
   * Logout işlemi - improved
   */
  const logout = useCallback(async (): Promise<void> => {
    if (isUnmountedRef.current) return

    dispatch(setLoading(true))

    try {
      // Server'a logout isteği gönder
      await logoutMutation().unwrap()
      showSuccessToast('Başarıyla çıkış yapıldı')
    } catch (error) {
      // Logout hatası olsa bile local cleanup yap
      console.warn('Logout request failed, continuing with local cleanup:', error)
    } finally {
      if (!isUnmountedRef.current) {
        // Her durumda local cleanup yap
        tokenUtils.clearTokens()
        dispatch(logoutUser())
        dispatch(setLoading(false))
      }
    }
  }, [logoutMutation, dispatch, tokenUtils, showSuccessToast])

  /**
   * Auth durumu kontrolü - throttled
   */
  const checkAuthStatus = useCallback((): boolean => {
    const now = Date.now()

    // Throttle check to prevent excessive calls
    if (now - lastAuthCheckRef.current < 1000) {
      return isAuthenticated
    }

    lastAuthCheckRef.current = now
    const tokens = tokenUtils.getTokens()

    if (!tokens || tokenUtils.isTokenExpired()) {
      if (isAuthenticated && !isUnmountedRef.current) {
        // Silent logout
        tokenUtils.clearTokens()
        dispatch(logoutUser())
      }
      return false
    }

    return true
  }, [tokenUtils, isAuthenticated, dispatch])

  /**
   * User bilgilerini yenile
   */
  const refreshUser = useCallback(async (): Promise<any> => {
    if (!isAuthenticated || isUnmountedRef.current) {
      throw new Error('User not authenticated')
    }

    try {
      const userData = await refetchCurrentUser().unwrap()

      if (isUnmountedRef.current) return userData

      if (userData?.data) {
        dispatch(setUser(userData.data))
        return userData.data
      }

      throw new Error('Invalid user data received')
    } catch (error: any) {
      if (isUnmountedRef.current) return

      console.error('Failed to refresh user data:', error)

      // Eğer 401 hatası ise logout yap
      if (error?.status === 401) {
        handleAuthError()
        return
      }

      throw error
    }
  }, [isAuthenticated, refetchCurrentUser, dispatch, handleAuthError])

  /**
   * Auth state'ini temizle
   */
  const clearAuthState = useCallback(() => {
    if (isUnmountedRef.current) return

    tokenUtils.clearTokens()
    dispatch(logoutUser())
  }, [tokenUtils, dispatch])

  /**
   * Component unmount tracking
   */
  useEffect(() => {
    isUnmountedRef.current = false

    return () => {
      isUnmountedRef.current = true
    }
  }, [])

  /**
   * Session validation on mount
   */
  useEffect(() => {
    if (isAuthenticated && !checkAuthStatus()) {
      clearAuthState()
    }
  }, []) // Run only on mount

  /**
   * Handle current user fetch errors
   */
  useEffect(() => {
    if (isCurrentUserError && isAuthenticated && !isUnmountedRef.current) {
      const error = currentUserError as any

      if (error?.status === 401) {
        console.warn('Current user fetch failed with 401, logging out')
        handleAuthError()
      } else {
        console.warn('Current user fetch failed:', error)
      }
    }
  }, [isCurrentUserError, isAuthenticated, handleAuthError, currentUserError])

  /**
   * Update user data when received from API
   */
  useEffect(() => {
    if (currentUserData?.data && isAuthenticated && !isUnmountedRef.current) {
      dispatch(setUser(currentUserData.data))
    }
  }, [currentUserData, isAuthenticated, dispatch])

  // Session durumu hesaplama - memoized
  const hasValidSession = useMemo(() => {
    return isAuthenticated && !!user && !!tokenUtils.getTokens() && !tokenUtils.isTokenExpired()
  }, [isAuthenticated, user, tokenUtils])

  return {
    // State
    user,
    isAuthenticated,
    isLoading: isLoading || isLoginLoading || isLogoutLoading,
    hasValidSession,

    // Actions
    login,
    logout,
    refreshUser,
    checkAuthStatus,
    clearAuthState,
  }
}
