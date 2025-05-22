'use client'

import React, { ReactNode, useEffect, useState, useCallback } from 'react'
import { Button } from '../Button/Button'
import { AlertTriangle, RefreshCw, Home, Bug, Clock } from 'lucide-react'

interface ErrorInfo {
  componentStack: string
  errorBoundary?: string
  errorBoundaryStack?: string
}

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: (error: Error, errorInfo: ErrorInfo, resetError: () => void) => ReactNode
  onError?: (error: Error, errorInfo: ErrorInfo) => void
  enableAutoRecovery?: boolean
  recoveryTimeout?: number
}

interface ErrorState {
  hasError: boolean
  error: Error | null
  errorInfo: ErrorInfo | null
  errorBoundaryId: string
  errorCount: number
  lastErrorTime: number
}

/**
 * Modern Function Component Error Boundary
 * React 18+ uyumlu, hook tabanlı error boundary implementasyonu
 */
export function GlobalErrorBoundary({
  children,
  fallback,
  onError,
  enableAutoRecovery = true,
  recoveryTimeout = 10000,
}: ErrorBoundaryProps) {
  const [errorState, setErrorState] = useState<ErrorState>({
    hasError: false,
    error: null,
    errorInfo: null,
    errorBoundaryId: `error-boundary-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    errorCount: 0,
    lastErrorTime: 0,
  })

  const [autoRecoveryTimer, setAutoRecoveryTimer] = useState<number | null>(null)
  const [recoveryCountdown, setRecoveryCountdown] = useState<number>(0)

  // Error reporting function
  const reportError = useCallback(
    (error: Error, errorInfo: ErrorInfo) => {
      if (process.env.NODE_ENV === 'production') {
        try {
          // Send to error reporting service
          if (typeof window !== 'undefined' && (window as any).gtag) {
            return (window as any).gtag('event', 'exception', {
              description: error.message,
              fatal: true,
              error_boundary_id: errorState.errorBoundaryId,
              component_stack: errorInfo.componentStack,
              error_count: errorState.errorCount + 1,
            })
          }

          // Send to custom error endpoint
          fetch('/api/errors', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              message: error.message,
              stack: error.stack,
              componentStack: errorInfo.componentStack,
              userAgent: navigator.userAgent,
              url: window.location.href,
              timestamp: new Date().toISOString(),
              errorBoundaryId: errorState.errorBoundaryId,
              errorCount: errorState.errorCount + 1,
              sessionId: sessionStorage.getItem('sessionId'),
            }),
          }).catch((reportError) => {
            console.error('Failed to report error:', reportError)
          })
        } catch (reportError) {
          console.error('Error reporting failed:', reportError)
        }
      }
    },
    [errorState.errorBoundaryId, errorState.errorCount],
  )

  // Reset error state
  const resetError = useCallback(() => {
    setErrorState((prev) => ({
      ...prev,
      hasError: false,
      error: null,
      errorInfo: null,
    }))

    if (autoRecoveryTimer) {
      clearTimeout(autoRecoveryTimer)
      setAutoRecoveryTimer(null)
    }

    setRecoveryCountdown(0)
  }, [autoRecoveryTimer])

  // Auto recovery with countdown
  const startAutoRecovery = useCallback(() => {
    if (!enableAutoRecovery) return

    const countdownInterval = setInterval(() => {
      setRecoveryCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownInterval)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    setRecoveryCountdown(recoveryTimeout / 1000)

    const timer = setTimeout(() => {
      clearInterval(countdownInterval)
      resetError()
    }, recoveryTimeout)

    setAutoRecoveryTimer(timer as any)
  }, [enableAutoRecovery, recoveryTimeout, resetError])

  // Handle actions
  const handleReload = useCallback(() => {
    window.location.reload()
  }, [])

  const handleGoHome = useCallback(() => {
    window.location.href = '/'
  }, [])

  const handleReportBug = useCallback(() => {
    const { error, errorInfo } = errorState

    const bugReportData = {
      error: error?.message,
      stack: error?.stack,
      componentStack: errorInfo?.componentStack,
      userAgent: navigator.userAgent,
      url: window.location.href,
      timestamp: new Date().toISOString(),
      errorCount: errorState.errorCount,
    }

    const subject = encodeURIComponent('Bug Report: Application Error')
    const body = encodeURIComponent(
      `Bir hata oluştu:\n\n` +
        `Hata: ${error?.message}\n` +
        `URL: ${window.location.href}\n` +
        `Zaman: ${new Date().toLocaleString('tr-TR')}\n` +
        `Hata Sayısı: ${errorState.errorCount}\n\n` +
        `Teknik Detaylar:\n${JSON.stringify(bugReportData, null, 2)}`,
    )

    window.open(`mailto:support@yourcompany.com?subject=${subject}&body=${body}`)
  }, [errorState])

  const handleStopRecovery = useCallback(() => {
    if (autoRecoveryTimer) {
      clearTimeout(autoRecoveryTimer)
      setAutoRecoveryTimer(null)
    }
    setRecoveryCountdown(0)
  }, [autoRecoveryTimer])

  // Global error listeners
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      const error = event.error || new Error(event.message)
      const errorInfo: ErrorInfo = {
        componentStack: event.filename || 'unknown',
      }

      setErrorState((prev) => ({
        ...prev,
        hasError: true,
        error,
        errorInfo,
        errorCount: prev.errorCount + 1,
        lastErrorTime: Date.now(),
      }))

      reportError(error, errorInfo)
      onError?.(error, errorInfo)

      if (process.env.NODE_ENV === 'development') {
        console.group('🚨 Global Error Caught')
        console.error('Error:', error)
        console.error('Event:', event)
        console.groupEnd()
      }
    }

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      const error = new Error(event.reason?.message || 'Unhandled Promise Rejection')
      const errorInfo: ErrorInfo = {
        componentStack: 'Promise Rejection',
      }

      setErrorState((prev) => ({
        ...prev,
        hasError: true,
        error,
        errorInfo,
        errorCount: prev.errorCount + 1,
        lastErrorTime: Date.now(),
      }))

      reportError(error, errorInfo)
      onError?.(error, errorInfo)
    }

    const handleChunkError = (event: Event) => {
      const target = event.target as HTMLScriptElement | HTMLLinkElement
      if (target && (target.tagName === 'SCRIPT' || target.tagName === 'LINK')) {
        const url = target.tagName === 'SCRIPT' ? (target as HTMLScriptElement).src : (target as HTMLLinkElement).href
        const error = new Error(`Chunk load error: ${url}`)
        const errorInfo: ErrorInfo = {
          componentStack: 'Chunk Loading',
        }

        setErrorState((prev) => ({
          ...prev,
          hasError: true,
          error,
          errorInfo,
          errorCount: prev.errorCount + 1,
          lastErrorTime: Date.now(),
        }))

        reportError(error, errorInfo)
      }
    }

    window.addEventListener('error', handleError)
    window.addEventListener('unhandledrejection', handleUnhandledRejection)
    document.addEventListener('error', handleChunkError, true)

    return () => {
      window.removeEventListener('error', handleError)
      window.removeEventListener('unhandledrejection', handleUnhandledRejection)
      document.removeEventListener('error', handleChunkError, true)
    }
  }, [reportError, onError])

  // Start auto recovery when error occurs
  useEffect(() => {
    if (errorState.hasError && enableAutoRecovery && !autoRecoveryTimer) {
      startAutoRecovery()
    }
  }, [errorState.hasError, enableAutoRecovery, autoRecoveryTimer, startAutoRecovery])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (autoRecoveryTimer) {
        clearTimeout(autoRecoveryTimer)
      }
    }
  }, [autoRecoveryTimer])

  if (errorState.hasError && errorState.error) {
    if (fallback) {
      return fallback(errorState.error, errorState.errorInfo!, resetError)
    }

    // Determine error type for better UX
    const isChunkError =
      errorState.error.message?.includes('Loading chunk') ||
      errorState.error.message?.includes('Loading CSS chunk') ||
      errorState.error.message?.includes('Chunk load error')

    const isNetworkError =
      errorState.error.message?.includes('NetworkError') ||
      errorState.error.message?.includes('fetch') ||
      errorState.error.message?.includes('network')

    const isRepeatedError = errorState.errorCount > 1

    return (
      <div className='min-h-screen flex items-center justify-center p-4 bg-neutral-50 dark:bg-neutral-900'>
        <div className='text-center max-w-2xl w-full bg-white dark:bg-neutral-800 rounded-lg shadow-lg p-8'>
          <div className='mb-6'>
            <AlertTriangle className='h-16 w-16 text-red-500 mx-auto mb-4' />
            <h1 className='text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-2'>
              {isChunkError
                ? 'Uygulama Güncellendi'
                : isNetworkError
                  ? 'Bağlantı Hatası'
                  : isRepeatedError
                    ? 'Tekrarlayan Hata'
                    : 'Bir Hata Oluştu'}
            </h1>
            <p className='text-lg text-neutral-600 dark:text-neutral-400'>
              {isChunkError
                ? 'Uygulama güncellenmiş görünüyor. Sayfayı yenileyerek devam edebilirsiniz.'
                : isNetworkError
                  ? 'İnternet bağlantınızı kontrol edin ve tekrar deneyin.'
                  : isRepeatedError
                    ? `Bu hata ${errorState.errorCount} kez oluştu. Lütfen sayfayı yenileyin veya destek ekibiyle iletişime geçin.`
                    : 'Beklenmeyen bir hata meydana geldi. Bu durumu bildirdiğiniz için teşekkürler.'}
            </p>

            {isRepeatedError && (
              <div className='mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-md'>
                <p className='text-sm text-yellow-700 dark:text-yellow-300'>
                  Sürekli hata alıyorsanız, tarayıcı önbelleğinizi temizlemeyi deneyin.
                </p>
              </div>
            )}
          </div>

          {/* Auto Recovery Countdown */}
          {recoveryCountdown > 0 && !isChunkError && (
            <div className='mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md'>
              <div className='flex items-center justify-center space-x-2 text-blue-700 dark:text-blue-300'>
                <Clock className='h-4 w-4' />
                <span className='text-sm font-medium'>
                  {recoveryCountdown} saniye sonra otomatik olarak düzelmeye çalışılacak
                </span>
              </div>
              <button
                onClick={handleStopRecovery}
                className='mt-2 text-xs text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 underline'
              >
                Otomatik düzeltmeyi durdur
              </button>
            </div>
          )}

          {/* Error Details - Development Only */}
          {process.env.NODE_ENV === 'development' && errorState.error && (
            <div className='mb-6 text-left'>
              <details className='bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded p-4'>
                <summary className='font-medium text-red-700 dark:text-red-300 cursor-pointer'>
                  Hata Detayları (Development)
                </summary>
                <div className='mt-4 space-y-2'>
                  <div>
                    <strong className='text-red-700 dark:text-red-300'>Error:</strong>
                    <pre className='text-xs text-red-600 dark:text-red-400 mt-1 overflow-auto bg-red-100 dark:bg-red-900/30 p-2 rounded'>
                      {errorState.error.message}
                    </pre>
                  </div>
                  {errorState.error.stack && (
                    <div>
                      <strong className='text-red-700 dark:text-red-300'>Stack:</strong>
                      <pre className='text-xs text-red-600 dark:text-red-400 mt-1 overflow-auto bg-red-100 dark:bg-red-900/30 p-2 rounded max-h-40'>
                        {errorState.error.stack}
                      </pre>
                    </div>
                  )}
                  {errorState.errorInfo?.componentStack && (
                    <div>
                      <strong className='text-red-700 dark:text-red-300'>Component Stack:</strong>
                      <pre className='text-xs text-red-600 dark:text-red-400 mt-1 overflow-auto bg-red-100 dark:bg-red-900/30 p-2 rounded max-h-40'>
                        {errorState.errorInfo.componentStack}
                      </pre>
                    </div>
                  )}
                  <div className='text-xs text-red-600 dark:text-red-400'>
                    <strong>Error Count:</strong> {errorState.errorCount}
                  </div>
                </div>
              </details>
            </div>
          )}

          {/* Action Buttons */}
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <Button onClick={resetError} className='flex items-center gap-2' variant='default'>
              <RefreshCw className='h-4 w-4' />
              Tekrar Dene
            </Button>

            <Button onClick={handleReload} className='flex items-center gap-2' variant='outline'>
              <RefreshCw className='h-4 w-4' />
              Sayfayı Yenile
            </Button>

            <Button onClick={handleGoHome} className='flex items-center gap-2' variant='ghost'>
              <Home className='h-4 w-4' />
              Ana Sayfaya Dön
            </Button>

            {!isChunkError && (
              <Button onClick={handleReportBug} className='flex items-center gap-2' variant='ghost'>
                <Bug className='h-4 w-4' />
                Hatayı Bildir
              </Button>
            )}
          </div>
        </div>
      </div>
    )
  }

  return <>{children}</>
}

/**
 * Hook version for error handling
 */
export function useErrorHandler() {
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (error) {
      throw error
    }
  }, [error])

  const captureError = useCallback((error: Error) => {
    setError(error)
  }, [])

  const resetError = useCallback(() => {
    setError(null)
  }, [])

  return { captureError, resetError }
}

/**
 * Higher Order Component for error boundaries
 */
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  errorBoundaryProps?: Partial<ErrorBoundaryProps>,
) {
  const WrappedComponent = (props: P) => {
    return (
      <GlobalErrorBoundary {...errorBoundaryProps}>
        <Component {...props} />
      </GlobalErrorBoundary>
    )
  }

  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`
  return WrappedComponent
}

/**
 * Error boundary provider for multiple error boundaries
 */
export function ErrorBoundaryProvider({
  children,
  boundaries = [],
}: {
  children: ReactNode
  boundaries?: Array<Partial<ErrorBoundaryProps>>
}) {
  return boundaries.reduce(
    (wrapped, boundaryProps) => <GlobalErrorBoundary {...boundaryProps}>{wrapped}</GlobalErrorBoundary>,
    children as ReactNode,
  )
}
