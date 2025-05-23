'use client'

import React, { useCallback, useContext, createContext } from 'react'

interface TokenManagerContextType {
  getAccessToken: () => string | null
  getRefreshToken: () => string | null
  setTokens: (accessToken: string, refreshToken: string, expiresIn?: number) => void
  removeTokens: () => void
  isTokenExpired: () => boolean
  updateLastActivity: () => void
}

const TokenManagerContext = createContext<TokenManagerContextType | null>(null)

export function useTokenManager(): TokenManagerContextType {
  const getAccessToken = useCallback((): string | null => {
    if (typeof window === 'undefined') return null
    try {
      return localStorage.getItem('accessToken')
    } catch (error) {
      console.warn('Token retrieval error:', error)
      return null
    }
  }, [])

  const getRefreshToken = useCallback((): string | null => {
    if (typeof window === 'undefined') return null
    try {
      return localStorage.getItem('refreshToken')
    } catch (error) {
      console.warn('Refresh token retrieval error:', error)
      return null
    }
  }, [])

  const setTokens = useCallback((accessToken: string, refreshToken: string, expiresIn?: number): void => {
    if (typeof window === 'undefined') return

    try {
      localStorage.setItem('accessToken', accessToken)
      localStorage.setItem('refreshToken', refreshToken)

      if (expiresIn) {
        const expiryTime = Date.now() + expiresIn * 1000
        localStorage.setItem('tokenExpiry', expiryTime.toString())
      }

      localStorage.setItem('lastActivity', Date.now().toString())
    } catch (error) {
      console.error('Token storage error:', error)
    }
  }, [])

  const removeTokens = useCallback((): void => {
    if (typeof window === 'undefined') return

    const keysToRemove = ['accessToken', 'refreshToken', 'tokenExpiry', 'lastActivity']
    keysToRemove.forEach((key) => {
      try {
        localStorage.removeItem(key)
      } catch (error) {
        console.warn(`Error removing ${key}:`, error)
      }
    })
  }, [])

  const isTokenExpired = useCallback((): boolean => {
    if (typeof window === 'undefined') return true

    const expiry = localStorage.getItem('tokenExpiry')
    if (!expiry) return true

    const bufferTime = 60000 // 1 dakika buffer
    return Date.now() > parseInt(expiry) - bufferTime
  }, [])

  const updateLastActivity = useCallback((): void => {
    if (typeof window === 'undefined') return
    try {
      localStorage.setItem('lastActivity', Date.now().toString())
    } catch (error) {
      console.warn('Failed to update last activity:', error)
    }
  }, [])

  return {
    getAccessToken,
    getRefreshToken,
    setTokens,
    removeTokens,
    isTokenExpired,
    updateLastActivity,
  }
}

export function TokenManagerProvider({ children }: { children: React.ReactNode }) {
  const tokenManager = useTokenManager()

  return <TokenManagerContext.Provider value={tokenManager}>{children}</TokenManagerContext.Provider>
}

export function useTokenManagerContext(): TokenManagerContextType {
  const context = useContext(TokenManagerContext)
  if (!context) {
    throw new Error('useTokenManagerContext must be used within TokenManagerProvider')
  }
  return context
}
