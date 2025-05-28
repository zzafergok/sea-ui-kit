'use client'

import { useCallback, useRef } from 'react'

import { AxiosError } from 'axios'

import { useAppDispatch } from '@/store'
import { logoutUser } from '@/store/slices/userSlice'
import { showToast } from '@/store/slices/toastSlice'

import { ApiError } from '@/services/api/types'
import { HTTP_STATUS, ERROR_CODES } from '@/services/constants'

import { useTokenManagerContext } from '@/providers/TokenManagerProvider'

export function useErrorHandler() {
  const dispatch = useAppDispatch()
  const tokenManager = useTokenManagerContext()
  const errorCountRef = useRef(0)
  const lastErrorTimeRef = useRef(0)
  const MAX_ERRORS_PER_MINUTE = 10

  const handleError = useCallback((error: AxiosError): ApiError => {
    const now = Date.now()
    if (now - lastErrorTimeRef.current > 60000) {
      errorCountRef.current = 0
      lastErrorTimeRef.current = now
    }

    errorCountRef.current++
    if (errorCountRef.current > MAX_ERRORS_PER_MINUTE) {
      console.warn('Too many API errors detected')
      return {
        message: 'Çok fazla hata oluştu, lütfen sayfayı yenileyin',
        status: 429,
        code: ERROR_CODES.RATE_LIMIT_EXCEEDED,
      }
    }

    const status = error.response?.status || 0
    const responseData = error.response?.data as any

    return createApiError(status, responseData, error)
  }, [])

  const createApiError = useCallback((status: number, responseData: any, originalError: AxiosError): ApiError => {
    const userMessage = getUserFriendlyMessage(status, responseData)

    if (process.env.NODE_ENV === 'development') {
      console.error('API Error Details:', {
        status,
        userMessage,
        url: originalError.config?.url,
        method: originalError.config?.method,
        responseData,
      })
    }

    return {
      message: userMessage,
      status,
      code: getErrorCode(status),
      details: process.env.NODE_ENV === 'development' ? responseData : undefined,
    }
  }, [])

  const getUserFriendlyMessage = useCallback((status: number, responseData: any): string => {
    switch (status) {
      case HTTP_STATUS.BAD_REQUEST:
        return responseData?.message || 'Geçersiz istek parametreleri'
      case HTTP_STATUS.UNAUTHORIZED:
        return 'Oturum süreniz dolmuş, lütfen tekrar giriş yapın'
      case HTTP_STATUS.FORBIDDEN:
        return 'Bu işlemi yapmaya yetkiniz bulunmuyor'
      case HTTP_STATUS.NOT_FOUND:
        return 'İstenen kaynak bulunamadı'
      case HTTP_STATUS.CONFLICT:
        return responseData?.message || 'Veri çakışması oluştu'
      case HTTP_STATUS.UNPROCESSABLE_ENTITY:
        return responseData?.message || 'Gönderilen veriler işlenemedi'
      case HTTP_STATUS.TOO_MANY_REQUESTS:
        return 'Çok fazla istek gönderildi, lütfen bekleyiniz'
      case HTTP_STATUS.INTERNAL_SERVER_ERROR:
        return 'Sunucu hatası oluştu, lütfen daha sonra tekrar deneyiniz'
      case HTTP_STATUS.BAD_GATEWAY:
        return 'Sunucu geçici olarak erişilemez durumda'
      case HTTP_STATUS.SERVICE_UNAVAILABLE:
        return 'Servis şu anda kullanılamıyor, lütfen daha sonra tekrar deneyiniz'
      case HTTP_STATUS.GATEWAY_TIMEOUT:
        return 'İstek zaman aşımına uğradı'
      default:
        return 'Beklenmeyen bir hata oluştu'
    }
  }, [])

  const getErrorCode = useCallback((status: number): string => {
    switch (status) {
      case HTTP_STATUS.BAD_REQUEST:
      case HTTP_STATUS.UNPROCESSABLE_ENTITY:
        return ERROR_CODES.VALIDATION_ERROR
      case HTTP_STATUS.UNAUTHORIZED:
        return ERROR_CODES.TOKEN_EXPIRED
      case HTTP_STATUS.FORBIDDEN:
        return ERROR_CODES.PERMISSION_DENIED
      case HTTP_STATUS.NOT_FOUND:
        return ERROR_CODES.RESOURCE_NOT_FOUND
      case HTTP_STATUS.TOO_MANY_REQUESTS:
        return ERROR_CODES.RATE_LIMIT_EXCEEDED
      default:
        return status === 0 ? ERROR_CODES.NETWORK_ERROR : ERROR_CODES.SERVER_ERROR
    }
  }, [])

  const showErrorToast = useCallback(
    (error: ApiError): void => {
      try {
        dispatch(
          showToast({
            type: 'error',
            title: 'Hata',
            message: error.message,
            duration: 5000,
          }),
        )
      } catch (toastError) {
        console.error('Toast error:', toastError)
      }
    },
    [dispatch],
  )

  const showSuccessToast = useCallback(
    (message: string, title: string = 'Başarılı'): void => {
      try {
        dispatch(
          showToast({
            type: 'success',
            title,
            message,
            duration: 3000,
          }),
        )
      } catch (toastError) {
        console.error('Toast error:', toastError)
      }
    },
    [dispatch],
  )

  const handleAuthError = useCallback((): void => {
    try {
      tokenManager.removeTokens()
      dispatch(logoutUser())

      showErrorToast({
        message: 'Oturumunuz sonlandırıldı, lütfen tekrar giriş yapın',
        status: 401,
        code: ERROR_CODES.TOKEN_EXPIRED,
      })

      if (typeof window !== 'undefined') {
        const currentPath = window.location.pathname
        if (currentPath !== '/login' && currentPath !== '/register') {
          setTimeout(() => {
            window.location.href = '/login'
          }, 2000)
        }
      }
    } catch (error) {
      console.error('Auth error handling failed:', error)
    }
  }, [tokenManager, dispatch, showErrorToast])

  const handleRateLimitError = useCallback((): void => {
    showErrorToast({
      message: 'Çok fazla istek gönderildi. Lütfen birkaç dakika bekleyip tekrar deneyiniz.',
      status: 429,
      code: ERROR_CODES.RATE_LIMIT_EXCEEDED,
    })
  }, [showErrorToast])

  const handleNetworkError = useCallback((): void => {
    showErrorToast({
      message: 'İnternet bağlantınızı kontrol ediniz ve tekrar deneyiniz.',
      status: 0,
      code: ERROR_CODES.NETWORK_ERROR,
    })
  }, [showErrorToast])

  const handleValidationError = useCallback(
    (details: any): void => {
      let message = 'Girilen bilgilerde hata bulunmaktadır'

      if (details?.errors && Array.isArray(details.errors)) {
        message = details.errors.join(', ')
      } else if (details?.message) {
        message = details.message
      }

      showErrorToast({
        message,
        status: 400,
        code: ERROR_CODES.VALIDATION_ERROR,
        details,
      })
    },
    [showErrorToast],
  )

  const reportError = useCallback((error: ApiError, context?: any): void => {
    if (process.env.NODE_ENV === 'production') {
      try {
        if (typeof window !== 'undefined' && (window as any).gtag) {
          return (window as any).gtag('event', 'api_error', {
            error_code: error.code,
            error_message: error.message,
            error_status: error.status,
            context: JSON.stringify(context),
          })
        }
      } catch (reportingError) {
        console.error('Error reporting failed:', reportingError)
      }
    }
  }, [])

  const isRetryableError = useCallback((error: ApiError): boolean => {
    return (
      error.code === ERROR_CODES.NETWORK_ERROR ||
      (error.status >= 500 && error.status < 600) ||
      error.status === HTTP_STATUS.TOO_MANY_REQUESTS
    )
  }, [])

  return {
    handleError,
    showErrorToast,
    showSuccessToast,
    handleAuthError,
    handleRateLimitError,
    handleNetworkError,
    handleValidationError,
    reportError,
    isRetryableError,
  }
}
