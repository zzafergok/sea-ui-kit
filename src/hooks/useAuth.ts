'use client'

import { useCallback, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/store'
import {
  setUser,
  logoutUser,
  setLoading,
  selectUser,
  selectIsAuthenticated,
  selectIsLoading,
  User,
} from '@/store/slices/userSlice'
import { showToast } from '@/store/slices/toastSlice'
import { useTokenManagerContext } from './useTokenManager'
import { LoginFormValues } from '@/lib/validations/auth'

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
}

interface AuthActions {
  login: (credentials: LoginFormValues) => Promise<User>
  logout: () => Promise<void>
  checkAuth: () => Promise<void>
}

export function useAuth(): AuthState & AuthActions {
  const dispatch = useAppDispatch()
  const tokenManager = useTokenManagerContext()

  const user = useAppSelector(selectUser)
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const isLoading = useAppSelector(selectIsLoading)

  const checkAuth = useCallback(async (): Promise<void> => {
    const token = tokenManager.getAccessToken()

    if (token) {
      try {
        // Token'ın geçerliliğini kontrol et
        if (!tokenManager.isTokenExpired()) {
          // Mock user data - gerçek projede API'dan user bilgilerini al
          const mockUser = {
            id: '1',
            name: 'Test User',
            username: 'testuser',
            email: 'test@example.com',
            role: 'user',
          }
          dispatch(setUser(mockUser))
        } else {
          // Token süresi dolmuş, logout yap
          await logout()
        }
      } catch (error) {
        console.error('Auth check failed:', error)
        await logout()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, tokenManager])

  const login = useCallback(
    async (credentials: LoginFormValues): Promise<User> => {
      dispatch(setLoading(true))

      try {
        // Mock login - gerçek API çağrısı yerine
        await new Promise((resolve) => setTimeout(resolve, 1000))

        const mockUser = {
          id: '1',
          name: 'Test User',
          username: 'testuser',
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
      } catch (error: unknown) {
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

  // Component mount olduğunda auth durumunu kontrol et
  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  return {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    checkAuth,
  }
}
