'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useAppDispatch } from '@/store'
import { showToast } from '@/store/slices/toastSlice'
import { Button } from '@/components/Button/Button'

interface ErrorInfo {
  componentStack?: string
  timestamp: number
  errorId: string
  userAgent: string
  url: string
}

interface UseErrorBoundaryOptions {
  enableReporting?: boolean
  enableToasts?: boolean
  maxRetries?: number
  retryDelay?: number
  onError?: (error: Error, errorInfo: ErrorInfo) => void
  onRetry?: (attempt: number) => void
  onMaxRetriesReached?: (error: Error) => void
}

interface ErrorState {
  error: Error | null
  errorInfo: ErrorInfo | null
  retryCount: number
  isRetrying: boolean
  hasReachedMaxRetries: boolean
}

/**
 * Modern error boundary hook for function components
 * React 18+ uyumlu, class component gerektirmeyen error handling
 */
export function useErrorBoundary({
  enableReporting = true,
  enableToasts = true,
  maxRetries = 3,
  retryDelay = 1000,
  onError,
  onRetry,
  onMaxRetriesReached,
}: UseErrorBoundaryOptions = {}) {
  const dispatch = useAppDispatch()
  const [errorState, setErrorState] = useState<ErrorState>({
    error: null,
    errorInfo: null,
    retryCount: 0,
    isRetrying: false,
    hasReachedMaxRetries: false,
  })

  const retryTimeoutRef = useRef<NodeJS.Timeout>()
  const errorIdRef = useRef<string>()

  // Generate unique error ID
  const generateErrorId = useCallback(() => {
    return `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }, [])

  // Error reporting function
  const reportError = useCallback(
    async (error: Error, errorInfo: ErrorInfo) => {
      if (!enableReporting || process.env.NODE_ENV !== 'production') {
        return
      }

      try {
        // Send to error reporting service
        await fetch('/api/errors', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: error.message,
            stack: error.stack,
            name: error.name,
            errorInfo,
            sessionId: sessionStorage.getItem('sessionId'),
            userId: localStorage.getItem('userId'),
          }),
        })

        // Send to analytics
        if (typeof window !== 'undefined' && (window as any).gtag) {
          return (window as any).gtag('event', 'exception', {
            description: error.message,
            fatal: false,
            error_id: errorInfo.errorId,
            component_stack: errorInfo.componentStack,
          })
        }
      } catch (reportingError) {
        console.error('Failed to report error:', reportingError)
      }
    },
    [enableReporting],
  )

  // Show error toast
  const showErrorToast = useCallback(
    (error: Error, canRetry: boolean, retryFn?: () => void) => {
      if (!enableToasts) return

      dispatch(
        showToast({
          type: 'error',
          title: 'Bir Hata Oluştu',
          message: error.message,
          duration: canRetry ? 7000 : 5000,
          ...(canRetry &&
            retryFn && {
              action: {
                label: 'Tekrar Dene',
                onClick: retryFn,
              },
            }),
        }),
      )
    },
    [enableToasts, dispatch],
  )

  // Retry function
  const retry = useCallback(() => {
    if (errorState.retryCount >= maxRetries) {
      setErrorState((prev) => ({
        ...prev,
        hasReachedMaxRetries: true,
      }))
      onMaxRetriesReached?.(errorState.error!)
      return
    }

    setErrorState((prev) => ({
      ...prev,
      isRetrying: true,
      retryCount: prev.retryCount + 1,
    }))

    onRetry?.(errorState.retryCount + 1)

    // Delay retry
    retryTimeoutRef.current = setTimeout(() => {
      setErrorState((prev) => ({
        ...prev,
        error: null,
        errorInfo: null,
        isRetrying: false,
      }))
    }, retryDelay)
  }, [errorState.retryCount, errorState.error, maxRetries, retryDelay, onRetry, onMaxRetriesReached])

  // Capture error function
  const captureError = useCallback(
    (error: Error, componentStack?: string) => {
      const errorId = generateErrorId()
      errorIdRef.current = errorId

      const errorInfo: ErrorInfo = {
        ...(componentStack !== undefined && { componentStack }),
        timestamp: Date.now(),
        errorId,
        userAgent: navigator.userAgent,
        url: window.location.href,
      }

      setErrorState((prev) => ({
        ...prev,
        error,
        errorInfo,
        isRetrying: false,
      }))

      // Report error
      reportError(error, errorInfo)

      // Call custom error handler
      onError?.(error, errorInfo)

      // Show toast if retries available
      const canRetry = errorState.retryCount < maxRetries
      showErrorToast(error, canRetry, canRetry ? retry : undefined)

      // Development logging
      if (process.env.NODE_ENV === 'development') {
        console.group(`🚨 Error Captured [${errorId}]`)
        console.error('Error:', error)
        console.error('Component Stack:', componentStack)
        console.error('Retry Count:', errorState.retryCount)
        console.groupEnd()
      }
    },
    [generateErrorId, reportError, onError, showErrorToast, errorState.retryCount, maxRetries, retry],
  )

  // Reset error state
  const resetError = useCallback(() => {
    if (retryTimeoutRef.current) {
      clearTimeout(retryTimeoutRef.current)
    }

    setErrorState({
      error: null,
      errorInfo: null,
      retryCount: 0,
      isRetrying: false,
      hasReachedMaxRetries: false,
    })
  }, [])

  // Auto-reset on component unmount
  useEffect(() => {
    return () => {
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current)
      }
    }
  }, [])

  return {
    // State
    error: errorState.error,
    errorInfo: errorState.errorInfo,
    hasError: !!errorState.error,
    isRetrying: errorState.isRetrying,
    retryCount: errorState.retryCount,
    canRetry: errorState.retryCount < maxRetries && !errorState.hasReachedMaxRetries,
    hasReachedMaxRetries: errorState.hasReachedMaxRetries,

    // Actions
    captureError,
    retry,
    resetError,
  }
}

/**
 * React Error Boundary Hook
 * Throws errors to trigger React's error boundary
 */
export function useReactErrorBoundary() {
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (error) {
      throw error
    }
  }, [error])

  const throwError = useCallback((error: Error) => {
    setError(error)
  }, [])

  const resetError = useCallback(() => {
    setError(null)
  }, [])

  return { throwError, resetError }
}

/**
 * Safe async function wrapper
 * Automatically catches and handles async errors
 */
export function useSafeAsync() {
  const { captureError } = useErrorBoundary()

  const safeAsync = useCallback(
    <T extends any[], R>(asyncFn: (...args: T) => Promise<R>, fallbackValue?: R) => {
      return async (...args: T): Promise<R | typeof fallbackValue> => {
        try {
          return await asyncFn(...args)
        } catch (error) {
          captureError(error as Error, 'Async Function')
          return fallbackValue as R
        }
      }
    },
    [captureError],
  )

  return { safeAsync }
}

/**
 * Component wrapper for error boundary functionality
 */
export function withErrorHandler<P extends object>(
  Component: React.ComponentType<P>,
  options?: UseErrorBoundaryOptions,
) {
  const WrappedComponent = (props: P) => {
    const { hasError, error, retry, resetError, canRetry } = useErrorBoundary(options)

    if (hasError && error) {
      return (
        <div className='p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg'>
          <h3 className='text-lg font-semibold text-red-700 dark:text-red-300 mb-2'>Component Error</h3>
          <p className='text-red-600 dark:text-red-400 text-sm mb-4'>{error.message}</p>
          <div className='flex space-x-2'>
            {canRetry && (
              <Button
                onClick={retry}
                className='px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 transition-colors'
              >
                Tekrar Dene
              </Button>
            )}

            <Button
              onClick={resetError}
              className='px-3 py-1 bg-neutral-600 text-white rounded text-sm hover:bg-neutral-700 transition-colors'
            >
              Sıfırla
            </Button>
          </div>
        </div>
      )
    }

    return <Component {...props} />
  }

  WrappedComponent.displayName = `withErrorHandler(${Component.displayName || Component.name})`
  return WrappedComponent
}

/**
 * Custom hook for handling specific error types
 */
export function useSpecificErrorHandler<T extends Error>(
  ErrorClass: new (...args: any[]) => T,
  handler: (error: T) => void,
) {
  const { captureError } = useErrorBoundary({
    onError: (error) => {
      if (error instanceof ErrorClass) {
        handler(error as T)
      }
    },
  })

  const handleError = useCallback(
    (error: unknown) => {
      if (error instanceof ErrorClass) {
        handler(error)
      } else if (error instanceof Error) {
        captureError(error)
      } else {
        captureError(new Error(String(error)))
      }
    },
    [ErrorClass, handler, captureError],
  )

  return { handleError }
}

export default useErrorBoundary
