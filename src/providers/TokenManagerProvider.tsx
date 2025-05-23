'use client'

import React, { createContext, useContext, useCallback } from 'react'

interface TokenManagerContextType {
  getAccessToken: () => string | null
  setTokens: (accessToken: string, refreshToken: string) => void
  removeTokens: () => void
}

const TokenManagerContext = createContext<TokenManagerContextType | null>(null)

export function TokenManagerProvider({ children }: { children: React.ReactNode }) {
  const getAccessToken = useCallback(() => {
    if (typeof window === 'undefined') return null
    return localStorage.getItem('accessToken')
  }, [])

  const setTokens = useCallback((accessToken: string, refreshToken: string) => {
    if (typeof window === 'undefined') return
    localStorage.setItem('accessToken', accessToken)
    localStorage.setItem('refreshToken', refreshToken)
  }, [])

  const removeTokens = useCallback(() => {
    if (typeof window === 'undefined') return
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
  }, [])

  const value = {
    getAccessToken,
    setTokens,
    removeTokens,
  }

  return <TokenManagerContext.Provider value={value}>{children}</TokenManagerContext.Provider>
}

export function useTokenManager() {
  const context = useContext(TokenManagerContext)
  if (!context) {
    throw new Error('useTokenManager must be used within TokenManagerProvider')
  }
  return context
}
