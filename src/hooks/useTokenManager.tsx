import { useCallback, useContext, useRef } from 'react'
import { AxiosInstance } from 'axios'
import { API_ENDPOINTS } from '@/services/api/constants'
import { RefreshTokenResponse } from '@/services/api/types'
import apiConfig from '@/config/api'
import React from 'react'

interface TokenInfo {
  hasAccessToken: boolean
  hasRefreshToken: boolean
  isExpired: boolean
  isSessionExpired: boolean
  lastActivity: string | null
  tokenExpiry: string | null
}

export function useTokenManager() {
  const refreshPromiseRef = useRef<Promise<RefreshTokenResponse> | null>(null)
  const tokenStorageRef = useRef<'localStorage' | 'sessionStorage' | 'memory'>('localStorage')

  const getStorage = useCallback(() => {
    if (typeof window === 'undefined') return null

    switch (tokenStorageRef.current) {
      case 'sessionStorage':
        return sessionStorage
      case 'localStorage':
        return localStorage
      default:
        return localStorage
    }
  }, [])

  const getAccessToken = useCallback((): string | null => {
    const storage = getStorage()
    if (!storage) return null

    const encodedToken = storage.getItem('at')
    if (!encodedToken) return null

    try {
      return atob(encodedToken)
    } catch {
      removeTokens()
      return null
    }
  }, [getStorage])

  const getRefreshToken = useCallback((): string | null => {
    const storage = getStorage()
    if (!storage) return null

    const encodedToken = storage.getItem('rt')
    if (!encodedToken) return null

    try {
      return atob(encodedToken)
    } catch {
      removeTokens()
      return null
    }
  }, [getStorage])

  const setTokens = useCallback(
    (accessToken: string, refreshToken: string, expiresIn?: number): void => {
      const storage = getStorage()
      if (!storage) return

      try {
        const encodedAccessToken = btoa(accessToken)
        const encodedRefreshToken = btoa(refreshToken)

        storage.setItem('at', encodedAccessToken)
        storage.setItem('rt', encodedRefreshToken)

        const expiryTime = Date.now() + (expiresIn ? expiresIn * 1000 : apiConfig.tokenRefreshBuffer)
        storage.setItem('te', expiryTime.toString())
        storage.setItem('la', Date.now().toString())
      } catch (error) {
        console.error('Token storage error:', error)
      }
    },
    [getStorage],
  )

  const removeTokens = useCallback((): void => {
    const storage = getStorage()
    if (!storage) return

    storage.removeItem('at')
    storage.removeItem('rt')
    storage.removeItem('te')
    storage.removeItem('la')
  }, [getStorage])

  const isTokenExpired = useCallback((): boolean => {
    const storage = getStorage()
    if (!storage) return true

    const expiry = storage.getItem('te')
    if (!expiry) return true

    const bufferTime = 60000 // 1 dakika buffer
    return Date.now() > parseInt(expiry) - bufferTime
  }, [getStorage])

  const isSessionExpired = useCallback(
    (timeoutMinutes: number = 30): boolean => {
      const storage = getStorage()
      if (!storage) return true

      const lastActivity = storage.getItem('la')
      if (!lastActivity) return true

      const sessionTimeout = timeoutMinutes * 60 * 1000
      return Date.now() - parseInt(lastActivity) > sessionTimeout
    },
    [getStorage],
  )

  const updateLastActivity = useCallback((): void => {
    const storage = getStorage()
    if (!storage) return
    storage.setItem('la', Date.now().toString())
  }, [getStorage])

  const refreshAccessToken = useCallback(
    async (axiosInstance: AxiosInstance): Promise<RefreshTokenResponse | null> => {
      if (refreshPromiseRef.current) {
        return refreshPromiseRef.current
      }

      const refreshToken = getRefreshToken()
      if (!refreshToken) {
        removeTokens()
        return null
      }

      refreshPromiseRef.current = performTokenRefresh(axiosInstance, refreshToken)

      try {
        const result = await refreshPromiseRef.current
        return result
      } catch (error) {
        removeTokens()
        throw error
      } finally {
        refreshPromiseRef.current = null
      }
    },
    [getRefreshToken, removeTokens],
  )

  const performTokenRefresh = useCallback(
    async (axiosInstance: AxiosInstance, refreshToken: string): Promise<RefreshTokenResponse> => {
      try {
        const response = await axiosInstance.post(
          API_ENDPOINTS.AUTH.REFRESH,
          { refreshToken },
          {
            skipAuth: true,
            skipErrorHandling: true,
            timeout: 10000,
          },
        )

        if (response.data?.success && response.data?.data) {
          const tokenData = response.data.data
          setTokens(tokenData.token, tokenData.refreshToken, tokenData.expiresIn)
          return tokenData
        }

        throw new Error('Token yenileme yanıtı geçersiz')
      } catch (error) {
        console.error('Token yenileme hatası:', error)
        throw new Error('Token yenileme başarısız')
      }
    },
    [setTokens],
  )

  const getTokenInfo = useCallback((): TokenInfo => {
    return {
      hasAccessToken: !!getAccessToken(),
      hasRefreshToken: !!getRefreshToken(),
      isExpired: isTokenExpired(),
      isSessionExpired: isSessionExpired(),
      lastActivity: getStorage()?.getItem('la') || null,
      tokenExpiry: getStorage()?.getItem('te') || null,
    }
  }, [getAccessToken, getRefreshToken, isTokenExpired, isSessionExpired, getStorage])

  return {
    getAccessToken,
    getRefreshToken,
    setTokens,
    removeTokens,
    isTokenExpired,
    isSessionExpired,
    updateLastActivity,
    refreshAccessToken,
    getTokenInfo,
  }
}

// Global token manager instance için context pattern
export const TokenManagerContext = React.createContext<ReturnType<typeof useTokenManager> | null>(null)

export function TokenManagerProvider({ children }: { children: React.ReactNode }) {
  const tokenManager = useTokenManager()

  return <TokenManagerContext.Provider value={tokenManager}>{children}</TokenManagerContext.Provider>
}

export function useTokenManagerContext() {
  const context = useContext(TokenManagerContext)
  if (!context) {
    throw new Error('useTokenManagerContext must be used within TokenManagerProvider')
  }
  return context
}
