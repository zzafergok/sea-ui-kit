/* eslint-disable @typescript-eslint/no-unused-vars */

import { useCallback } from 'react'

import { useAppDispatch, useAppSelector } from '@/store'
import { setUser, logoutUser, selectUser, selectIsAuthenticated, selectIsLoading } from '@/store/slices/userSlice'

import { TokenManager } from '@/services/api/tokenManager'
import { useLoginMutation, useLogoutMutation, useGetCurrentUserQuery } from '@/services/api/apiSlice'

import { LoginFormValues } from '@/lib/validations/auth'

/**
 * Authentication işlemleri için hook
 * Login, logout ve kullanıcı durumu yönetimi sağlar
 */
export function useAuth() {
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectUser)
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const isLoading = useAppSelector(selectIsLoading)
  const [loginMutation, { isLoading: isLoginLoading }] = useLoginMutation()
  const [logoutMutation, { isLoading: isLogoutLoading }] = useLogoutMutation()
  // Current user query - sadece authenticated ise çalışır
  const { data: currentUserData, refetch: refetchCurrentUser } = useGetCurrentUserQuery(undefined, {
    skip: !isAuthenticated,
  })

  /**
   * Kullanıcı girişi yapar
   */
  const login = useCallback(
    async (credentials: LoginFormValues) => {
      const result = await loginMutation(credentials).unwrap()
      // Token'ları sakla
      const tokenManager = TokenManager.getInstance()
      tokenManager.setTokens(result.token, result.refreshToken)
      // User state'ini güncelle
      dispatch(setUser(result.user))
      return result
    },
    [loginMutation, dispatch],
  )

  /**
   * Kullanıcı çıkışı yapar
   */
  const logout = useCallback(async () => {
    try {
      // Server'a logout isteği gönder
      await logoutMutation().unwrap()
    } catch (error) {
      // Logout hatası olsa bile local cleanup yap
      console.warn('Logout request failed, but continuing with local cleanup:', error)
    } finally {
      // Token'ları temizle
      const tokenManager = TokenManager.getInstance()
      tokenManager.removeTokens()
      // Store'dan user bilgilerini temizle
      dispatch(logoutUser())
    }
  }, [logoutMutation, dispatch])

  /**
   * Token durumunu kontrol eder ve gerekirse kullanıcıyı logout eder
   */
  const checkAuthStatus = useCallback(() => {
    const tokenManager = TokenManager.getInstance()
    if (!tokenManager.getAccessToken() || tokenManager.isSessionExpired()) {
      logout()
      return false
    }
    return true
  }, [logout])

  /**
   * Kullanıcı bilgilerini yeniden yükler
   */
  const refreshUser = useCallback(async () => {
    if (isAuthenticated) {
      try {
        const userData = await refetchCurrentUser().unwrap()
        dispatch(setUser(userData.data))
        return userData.data
      } catch (error) {
        console.error('Failed to refresh user data:', error)
        throw error
      }
    }
  }, [isAuthenticated, refetchCurrentUser, dispatch])

  /**
   * Token bilgilerini döndürür (debug için)
   */
  const getTokenInfo = useCallback(() => {
    const tokenManager = TokenManager.getInstance()
    return tokenManager.getTokenInfo()
  }, [])

  return {
    // State
    user,
    isAuthenticated,
    isLoading: isLoading || isLoginLoading || isLogoutLoading,
    isLoginLoading,
    isLogoutLoading,
    // Actions
    login,
    logout,
    refreshUser,
    checkAuthStatus,
    // Utilities
    getTokenInfo,
  }
}

export default useAuth
