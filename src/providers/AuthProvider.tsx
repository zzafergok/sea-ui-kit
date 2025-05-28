'use client'

import { useRouter, usePathname } from 'next/navigation'

import React, { useEffect, useState } from 'react'

import { useAuth } from '@/hooks/useAuth'

import { LoadingSpinner } from '@/components/core/Loading/LoadingSpinner'

interface AuthProviderProps {
  children: React.ReactNode
  requireAuth?: boolean
  redirectTo?: string
}

export function AuthProvider({ children, requireAuth = false, redirectTo = '/auth/login' }: AuthProviderProps) {
  const { isAuthenticated, isLoading, checkAuth } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        await checkAuth()
      } finally {
        setIsInitialized(true)
      }
    }

    initializeAuth()
  }, [checkAuth])

  useEffect(() => {
    if (!isInitialized || isLoading) return

    if (requireAuth && !isAuthenticated) {
      const loginUrl = new URL(redirectTo, window.location.origin)
      if (pathname !== redirectTo) {
        loginUrl.searchParams.set('redirect', pathname)
      }
      router.push(loginUrl.toString())
      return
    }

    if (!requireAuth && isAuthenticated && pathname.startsWith('/auth/')) {
      router.push('/dashboard')
    }
  }, [isAuthenticated, isLoading, requireAuth, redirectTo, pathname, router, isInitialized])

  if (!isInitialized || isLoading) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-900'>
        <div className='text-center space-y-4'>
          <LoadingSpinner size='lg' />
          <p className='text-sm text-neutral-600 dark:text-neutral-400'>Kimlik doğrulanıyor...</p>
        </div>
      </div>
    )
  }

  if (requireAuth && !isAuthenticated) {
    return null
  }

  return <>{children}</>
}
