'use client'

import { useRouter } from 'next/navigation'

import React, { useState, useEffect, useCallback, useRef, ReactNode } from 'react'

import { Button } from '@/components/core/Button/Button'

interface ErrorInfo {
  componentStack: string
  errorBoundary?: string
  errorBoundaryStack?: string
}

interface EnhancedErrorBoundaryProps {
  children: ReactNode
  fallback?: (error: Error, errorInfo: ErrorInfo, retry: () => void) => ReactNode
  onError?: (error: Error, errorInfo: ErrorInfo) => void
  resetOnPropsChange?: boolean
  resetKeys?: Array<string | number | boolean | null | undefined>
  autoResetDelay?: number
  maxRetries?: number
  showErrorDetails?: boolean
  isolateErrors?: boolean
}

interface ErrorState {
  hasError: boolean
  error: Error | null
  errorInfo: ErrorInfo | null
  retryCount: number
  errorId: string
}

export function EnhancedErrorBoundary({
  children,
  fallback,
  onError,
  resetOnPropsChange = true,
  resetKeys = [],
  autoResetDelay = 5000,
  maxRetries = 3,
  showErrorDetails = process.env.NODE_ENV === 'development',
  isolateErrors = false,
}: EnhancedErrorBoundaryProps) {
  const router = useRouter()
  const [errorState, setErrorState] = useState<ErrorState>({
    hasError: false,
    error: null,
    errorInfo: null,
    retryCount: 0,
    errorId: '',
  })

  const resetTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const previousResetKeysRef = useRef(resetKeys)

  // Error yakalama ve state güncellemesi
  const handleError = useCallback(
    (error: Error, errorInfo: ErrorInfo) => {
      const errorId = `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

      setErrorState((prevState) => ({
        hasError: true,
        error,
        errorInfo,
        retryCount: prevState.retryCount,
        errorId,
      }))

      // Error reporting
      onError?.(error, errorInfo)

      // Production ortamında error service'e gönderme
      if (process.env.NODE_ENV === 'production') {
        reportErrorToService(error, errorInfo, errorId)
      }

      // Console logging for development
      if (process.env.NODE_ENV === 'development') {
        console.group(`🚨 Enhanced Error Boundary - ${errorId}`)
        console.error('Error:', error)
        console.error('Error Info:', errorInfo)
        console.error('Component Stack:', errorInfo.componentStack)
        console.groupEnd()
      }
    },
    [onError],
  )

  // Error boundary reset fonksiyonu
  const resetErrorBoundary = useCallback(() => {
    if (resetTimeoutRef.current) {
      clearTimeout(resetTimeoutRef.current)
      resetTimeoutRef.current = null
    }

    setErrorState((prevState) => ({
      hasError: false,
      error: null,
      errorInfo: null,
      retryCount: prevState.retryCount + 1,
      errorId: '',
    }))
  }, [])

  // Otomatik reset mekanizması
  const scheduleAutoReset = useCallback(() => {
    if (autoResetDelay > 0 && errorState.retryCount < maxRetries) {
      resetTimeoutRef.current = setTimeout(() => {
        resetErrorBoundary()
      }, autoResetDelay)
    }
  }, [autoResetDelay, errorState.retryCount, maxRetries, resetErrorBoundary])

  // Props değişikliklerini izleme ve reset tetikleme
  useEffect(() => {
    if (resetOnPropsChange && errorState.hasError) {
      const hasResetKeyChanged = resetKeys.some((key, index) => key !== previousResetKeysRef.current[index])

      if (hasResetKeyChanged) {
        resetErrorBoundary()
      }
    }

    previousResetKeysRef.current = resetKeys
  }, [resetKeys, resetOnPropsChange, errorState.hasError, resetErrorBoundary])

  // Auto reset scheduling
  useEffect(() => {
    if (errorState.hasError) {
      scheduleAutoReset()
    }

    return () => {
      if (resetTimeoutRef.current) {
        clearTimeout(resetTimeoutRef.current)
      }
    }
  }, [errorState.hasError, scheduleAutoReset])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (resetTimeoutRef.current) {
        clearTimeout(resetTimeoutRef.current)
      }
    }
  }, [])

  // Error service'e rapor gönderme
  const reportErrorToService = useCallback((error: Error, errorInfo: ErrorInfo, errorId: string) => {
    try {
      // Gerçek projede error tracking service'e gönderilecek
      const errorReport = {
        errorId,
        message: error.message,
        stack: error.stack,
        componentStack: errorInfo.componentStack,
        url: window.location.href,
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString(),
        userId: null, // User context'ten alınabilir
        sessionId: null, // Session management'ten alınabilir
      }

      console.info('Error report prepared:', errorReport)
      // fetch('/api/errors', { method: 'POST', body: JSON.stringify(errorReport) })
    } catch (reportingError) {
      console.error('Error reporting failed:', reportingError)
    }
  }, [])

  // Sayfa yenileme fonksiyonu
  const handlePageReload = useCallback(() => {
    if (typeof window !== 'undefined') {
      window.location.reload()
    }
  }, [])

  // Ana sayfaya yönlendirme
  const handleGoHome = useCallback(() => {
    router.push('/')
  }, [router])

  // Error state render
  if (errorState.hasError) {
    const { error, errorInfo, retryCount } = errorState

    // Custom fallback varsa kullan
    if (fallback && error && errorInfo) {
      return fallback(error, errorInfo, resetErrorBoundary)
    }

    const canRetry = retryCount < maxRetries
    const isAutoResetting = autoResetDelay > 0 && canRetry

    return (
      <div className='min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-900 p-4'>
        <div className='max-w-2xl w-full text-center space-y-6 bg-white dark:bg-neutral-800 rounded-lg shadow-lg p-8'>
          {/* Error Icon */}
          <div className='text-red-500 text-6xl mb-4'>⚠️</div>

          {/* Error Title */}
          <div className='space-y-2'>
            <h1 className='text-3xl font-bold text-neutral-900 dark:text-neutral-100'>Beklenmeyen Bir Hata Oluştu</h1>
            <p className='text-lg text-neutral-600 dark:text-neutral-400'>
              Uygulama beklenmeyen bir durumla karşılaştı. Bu hatayı düzeltmek için çalışıyoruz.
            </p>
          </div>

          {/* Retry Information */}
          {retryCount > 0 && (
            <div className='bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4'>
              <p className='text-amber-800 dark:text-amber-200 text-sm'>
                Deneme sayısı: {retryCount} / {maxRetries}
              </p>
            </div>
          )}

          {/* Auto Reset Timer */}
          {isAutoResetting && (
            <div className='bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4'>
              <p className='text-blue-800 dark:text-blue-200 text-sm'>
                Otomatik olarak {Math.ceil(autoResetDelay / 1000)} saniye içinde yeniden denenecek...
              </p>
            </div>
          )}

          {/* Error Details (Development Only) */}
          {showErrorDetails && error && (
            <details className='text-left bg-neutral-100 dark:bg-neutral-700 rounded-lg p-4'>
              <summary className='cursor-pointer text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-3'>
                Geliştirici Hata Detayları
              </summary>

              <div className='space-y-3'>
                <div>
                  <h4 className='font-medium text-sm text-neutral-600 dark:text-neutral-400'>Hata Mesajı:</h4>
                  <pre className='text-xs bg-red-50 dark:bg-red-900/20 p-3 rounded mt-1 overflow-auto text-red-700 dark:text-red-300'>
                    {error.message}
                  </pre>
                </div>

                {error.stack && (
                  <div>
                    <h4 className='font-medium text-sm text-neutral-600 dark:text-neutral-400'>Stack Trace:</h4>
                    <pre className='text-xs bg-neutral-50 dark:bg-neutral-800 p-3 rounded mt-1 overflow-auto max-h-40'>
                      {error.stack}
                    </pre>
                  </div>
                )}

                {errorInfo?.componentStack && (
                  <div>
                    <h4 className='font-medium text-sm text-neutral-600 dark:text-neutral-400'>Component Stack:</h4>
                    <pre className='text-xs bg-neutral-50 dark:bg-neutral-800 p-3 rounded mt-1 overflow-auto max-h-40'>
                      {errorInfo.componentStack}
                    </pre>
                  </div>
                )}
              </div>
            </details>
          )}

          {/* Action Buttons */}
          <div className='flex flex-col sm:flex-row gap-3 justify-center pt-4'>
            {canRetry && (
              <Button
                onClick={resetErrorBoundary}
                className='bg-primary-500 hover:bg-primary-600 text-white px-6 py-3'
                disabled={isAutoResetting}
              >
                {isAutoResetting ? 'Otomatik Yenileniyor...' : 'Tekrar Dene'}
              </Button>
            )}

            <Button variant='outline' onClick={handlePageReload} className='px-6 py-3'>
              Sayfayı Yenile
            </Button>

            <Button variant='ghost' onClick={handleGoHome} className='px-6 py-3'>
              Ana Sayfaya Dön
            </Button>
          </div>

          {/* Support Information */}
          <div className='pt-4 border-t border-neutral-200 dark:border-neutral-700'>
            <p className='text-sm text-neutral-500 dark:text-neutral-400'>
              Bu hata devam ederse, lütfen destek ekibimizle iletişime geçin.
            </p>
            {errorState.errorId && (
              <p className='text-xs text-neutral-400 dark:text-neutral-500 mt-1'>Hata ID: {errorState.errorId}</p>
            )}
          </div>
        </div>
      </div>
    )
  }

  // Error isolation wrapper
  if (isolateErrors) {
    return <ErrorBoundaryWrapper onError={handleError}>{children}</ErrorBoundaryWrapper>
  }

  return <>{children}</>
}

// Error yakalama için wrapper component
function ErrorBoundaryWrapper({
  children,
  onError,
}: {
  children: ReactNode
  onError: (error: Error, errorInfo: ErrorInfo) => void
}) {
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      onError(event.error, {
        componentStack: 'Global error boundary',
        errorBoundary: 'ErrorBoundaryWrapper',
      })
    }

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      onError(new Error(event.reason), {
        componentStack: 'Unhandled promise rejection',
        errorBoundary: 'ErrorBoundaryWrapper',
      })
    }

    window.addEventListener('error', handleError)
    window.addEventListener('unhandledrejection', handleUnhandledRejection)

    return () => {
      window.removeEventListener('error', handleError)
      window.removeEventListener('unhandledrejection', handleUnhandledRejection)
    }
  }, [onError])

  return <>{children}</>
}

// Export default
export default EnhancedErrorBoundary
