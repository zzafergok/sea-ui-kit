'use client'

import { useCallback } from 'react'
import { useAppDispatch, useAppSelector } from '@/store'
import {
  setUser,
  logoutUser,
  setLoading,
  selectUser,
  selectIsAuthenticated,
  selectIsLoading,
} from '@/store/slices/userSlice'
import { showToast } from '@/store/slices/toastSlice'
import { useTokenManagerContext } from './useTokenManager'
import { LoginFormValues } from '@/lib/validations/auth'

interface AuthState {
  user: any
  isAuthenticated: boolean
  isLoading: boolean
}

interface AuthActions {
  login: (credentials: LoginFormValues) => Promise<any>
  logout: () => Promise<void>
}

export function useAuth(): AuthState & AuthActions {
  const dispatch = useAppDispatch()
  const tokenManager = useTokenManagerContext()

  const user = useAppSelector(selectUser)
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const isLoading = useAppSelector(selectIsLoading)

  const login = useCallback(
    async (credentials: LoginFormValues): Promise<any> => {
      dispatch(setLoading(true))

      try {
        // Mock login - gerçek API çağrısı yerine
        await new Promise((resolve) => setTimeout(resolve, 1000))

        const mockUser = {
          id: '1',
          name: 'Test User',
          username: 'Test User', // Add username property
          email: credentials.email,
          role: 'user',
        }

        const mockTokens = {
          accessToken: 'mock-access-token',
          refreshToken: 'mock-refresh-token',
        }

        tokenManager.setTokens(mockTokens.accessToken, mockTokens.refreshToken)
        dispatch(setUser(mockUser))

        dispatch(
          showToast({
            type: 'success',
            title: 'Başarılı',
            message: 'Başarıyla giriş yapıldı',
            duration: 3000,
          }),
        )

        return mockUser
      } catch (error: any) {
        dispatch(
          showToast({
            type: 'error',
            title: 'Hata',
            message: 'Giriş başarısız',
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

  const logout = useCallback(async (): Promise<void> => {
    dispatch(setLoading(true))

    try {
      tokenManager.removeTokens()
      dispatch(logoutUser())

      dispatch(
        showToast({
          type: 'success',
          title: 'Başarılı',
          message: 'Başarıyla çıkış yapıldı',
          duration: 3000,
        }),
      )
    } catch (error) {
      console.warn('Logout error:', error)
    } finally {
      dispatch(setLoading(false))
    }
  }, [dispatch, tokenManager])

  return {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
  }
}
