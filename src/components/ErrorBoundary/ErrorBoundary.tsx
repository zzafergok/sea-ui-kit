'use client'

import React, { useState, useEffect, ReactNode } from 'react'
import { Button } from '../Button/Button'

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ((error: Error, resetError: () => void) => ReactNode) | undefined
  onError?: (error: Error, errorInfo: string) => void
}

interface ErrorInfo {
  error: Error | null
  hasError: boolean
}

export function ErrorBoundary({ children, fallback, onError }: ErrorBoundaryProps) {
  const [errorInfo, setErrorInfo] = useState<ErrorInfo>({ error: null, hasError: false })

  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      const error = event.error || new Error(event.message)
      setErrorInfo({ error, hasError: true })

      if (onError) {
        onError(error, event.filename || 'unknown')
      }

      // Error reporting service'e gönder
      if (process.env.NODE_ENV === 'production') {
        console.error('Global Error caught:', error)
        // Sentry, LogRocket vb. servislere error report
      }
    }

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      const error = new Error(event.reason?.message || 'Unhandled Promise Rejection')
      setErrorInfo({ error, hasError: true })

      if (onError) {
        onError(error, 'Promise Rejection')
      }
    }

    window.addEventListener('error', handleError)
    window.addEventListener('unhandledrejection', handleUnhandledRejection)

    return () => {
      window.removeEventListener('error', handleError)
      window.removeEventListener('unhandledrejection', handleUnhandledRejection)
    }
  }, [onError])

  const resetError = () => {
    setErrorInfo({ error: null, hasError: false })
  }

  if (errorInfo.hasError && errorInfo.error) {
    if (fallback) {
      return fallback(errorInfo.error, resetError)
    }

    return (
      <div className='min-h-screen flex items-center justify-center p-4'>
        <div className='text-center max-w-md'>
          <h2 className='text-2xl font-bold text-red-600 mb-4'>Bir Hata Oluştu</h2>
          <p className='text-neutral-600 dark:text-neutral-400 mb-6'>
            Beklenmeyen bir hata meydana geldi. Lütfen sayfayı yenileyin veya daha sonra tekrar deneyin.
          </p>
          {process.env.NODE_ENV === 'development' && (
            <div className='bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded p-4 mb-4 text-left'>
              <pre className='text-xs text-red-700 dark:text-red-300 overflow-auto'>{errorInfo.error.stack}</pre>
            </div>
          )}
          <div className='space-x-4'>
            <Button onClick={resetError} variant='outline'>
              Tekrar Dene
            </Button>
            <Button onClick={() => window.location.reload()}>Sayfayı Yenile</Button>
          </div>
        </div>
      </div>
    )
  }

  return <>{children}</>
}

// React Error Boundary Hook (experimental pattern)
export function useErrorHandler() {
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (error) {
      throw error
    }
  }, [error])

  const resetError = () => setError(null)
  const captureError = (error: Error) => setError(error)

  return { captureError, resetError }
}

// Higher Order Component pattern for error boundaries
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  errorFallback?: (error: Error, resetError: () => void) => ReactNode,
) {
  const WrappedComponent = (props: P) => {
    return (
      <ErrorBoundary fallback={errorFallback}>
        <Component {...props} />
      </ErrorBoundary>
    )
  }

  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`

  return WrappedComponent
}
