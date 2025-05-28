'use client'

import { useCallback, useMemo } from 'react'

import { useAppSelector } from '@/store'
import { selectUser, selectIsAuthenticated, selectIsLoading } from '@/store/slices/userSlice'

export function useOptimizedAuth() {
  const user = useAppSelector(selectUser)
  const isLoading = useAppSelector(selectIsLoading)
  const isAuthenticated = useAppSelector(selectIsAuthenticated)

  // Memoized computed values
  const authState = useMemo(
    () => ({
      user,
      isAuthenticated,
      isLoading,
      hasUser: !!user,
      userRole: user?.role || 'guest',
    }),
    [user, isAuthenticated, isLoading],
  )

  const checkPermission = useCallback(
    (requiredRole: string) => {
      return authState.userRole === requiredRole || authState.userRole === 'admin'
    },
    [authState.userRole],
  )

  return {
    ...authState,
    checkPermission,
  }
}
