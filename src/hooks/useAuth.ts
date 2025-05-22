/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCallback, useEffect, useMemo } from 'react'
import { useAppDispatch, useAppSelector } from '@/store'
import {
  setUser,
  logoutUser,
  setLoading,
  selectUser,
  selectIsAuthenticated,
  selectIsLoading,
} from '@/store/slices/userSlice'
import {
  useLoginMutation,
  useLogoutMutation,
  useGetCurrentUserQuery,
  useRefreshTokenMutation,
} from '@/services/api/apiSlice'
import { LoginFormValues } from '@/lib/validations/auth'
import { ErrorHandler } from '@/services/api/errorHandler'

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
 * - Döngüsel bağımlılık riski eliminated
 * - Better error handling
 * - Type safety improved
 * - Memory leak prevention
 */
export function useAuth(): AuthState & AuthActions {
  const dispatch = useAppDispatch()

  // Selectors
  const user = useAppSelector(selectUser)
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const isLoading = useAppSelector(selectIsLoading)

  // API hooks
  const [loginMutation, { isLoading: isLoginLoading }] = useLoginMutation()
  const [logoutMutation, { isLoading: isLogoutLoading }] = useLogoutMutation()
  const [refreshTokenMutation] = useRefreshTokenMutation()

  // Current user query - sadece authenticated ise çalışır
  const {
    data: currentUserData,
    refetch: refetchCurrentUser,
    isError: isCurrentUserError,
  } = useGetCurrentUserQuery(undefined, {
    skip: !isAuthenticated,
    pollingInterval: 5 * 60 * 1000, // 5 dakikada bir kontrol
  })

  // Token management utilities
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
    [],
  )

  /**
   * Login işlemi
   */
  const login = useCallback(
    async (credentials: LoginFormValues) => {
      dispatch(setLoading(true))

      try {
        const result = (await loginMutation(credentials).unwrap()) as {
          user: any
          token: string
          refreshToken: string
          expiresIn?: number
        }

        // Token'ları güvenli şekilde sakla
        tokenUtils.setTokens({
          accessToken: result.token,
          refreshToken: result.refreshToken,
          expiresIn: result.expiresIn,
        })

        // User state'ini güncelle
        dispatch(setUser(result.user))

        return result
      } finally {
        dispatch(setLoading(false))
      }
    },
    [loginMutation, dispatch, tokenUtils],
  )

  /**
   * Logout işlemi
   */
  const logout = useCallback(async () => {
    dispatch(setLoading(true))

    try {
      // Server'a logout isteği gönder
      await logoutMutation().unwrap()
    } catch (error) {
      // Logout hatası olsa bile local cleanup yap
      console.warn('Logout request failed, continuing with local cleanup:', error)
    } finally {
      // Her durumda local cleanup yap
      tokenUtils.clearTokens()
      dispatch(logoutUser())
      dispatch(setLoading(false))
    }
  }, [logoutMutation, dispatch, tokenUtils])

  /**
   * Auth durumu kontrolü
   */
  const checkAuthStatus = useCallback((): boolean => {
    const tokens = tokenUtils.getTokens()

    if (!tokens || tokenUtils.isTokenExpired()) {
      if (isAuthenticated) {
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
  const refreshUser = useCallback(async () => {
    if (!isAuthenticated) {
      throw new Error('User not authenticated')
    }

    try {
      const userData = await refetchCurrentUser().unwrap()

      if (userData?.data) {
        dispatch(setUser(userData.data))
        return userData.data
      }

      throw new Error('Invalid user data received')
    } catch (error) {
      console.error('Failed to refresh user data:', error)

      // Eğer 401 hatası ise logout yap
      if ((error as any)?.status === 401) {
        await logout()
      }

      throw error
    }
  }, [isAuthenticated, refetchCurrentUser, dispatch, logout])

  /**
   * Auth state'ini temizle
   */
  const clearAuthState = useCallback(() => {
    tokenUtils.clearTokens()
    dispatch(logoutUser())
  }, [tokenUtils, dispatch])

  /**
   * Session validation on mount and user error
   */
  useEffect(() => {
    if (isAuthenticated && !checkAuthStatus()) {
      clearAuthState()
    }
  }, [isAuthenticated, checkAuthStatus, clearAuthState])

  /**
   * Handle current user fetch errors
   */
  useEffect(() => {
    if (isCurrentUserError && isAuthenticated) {
      console.warn('Current user fetch failed, logging out')
      logout()
    }
  }, [isCurrentUserError, isAuthenticated, logout])

  // Session durumu hesaplama
  const hasValidSession = useMemo(() => {
    return isAuthenticated && !!user && !!tokenUtils.getTokens()
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
