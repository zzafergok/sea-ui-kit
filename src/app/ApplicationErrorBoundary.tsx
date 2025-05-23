'use client'

import React, { ReactNode, useEffect, useState } from 'react'

interface ErrorState {
  hasError: boolean
  error: Error | null
  errorId: string
}

interface ApplicationErrorBoundaryProps {
  children: ReactNode
}

export function ApplicationErrorBoundary({ children }: ApplicationErrorBoundaryProps) {
  const [errorState, setErrorState] = useState<ErrorState>({
    hasError: false,
    error: null,
    errorId: '',
  })

  useEffect(() => {
    function handleGlobalError(event: ErrorEvent) {
      const errorId = `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

      console.error('Global error intercepted:', {
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        error: event.error,
        errorId,
      })

      setErrorState({
        hasError: true,
        error: event.error || new Error(event.message),
        errorId,
      })
    }

    function handlePromiseRejection(event: PromiseRejectionEvent) {
      const errorId = `rejection_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

      console.error('Unhandled promise rejection:', {
        reason: event.reason,
        errorId,
      })

      setErrorState({
        hasError: true,
        error: new Error(event.reason?.message || 'Promise rejection'),
        errorId,
      })
    }

    window.addEventListener('error', handleGlobalError)
    window.addEventListener('unhandledrejection', handlePromiseRejection)

    return () => {
      window.removeEventListener('error', handleGlobalError)
      window.removeEventListener('unhandledrejection', handlePromiseRejection)
    }
  }, [])

  function resetApplication() {
    setErrorState({
      hasError: false,
      error: null,
      errorId: '',
    })
  }

  function reloadApplication() {
    window.location.reload()
  }

  if (errorState.hasError) {
    return (
      <div className='min-h-screen flex items-center justify-center p-6 bg-red-50 dark:bg-red-900/10'>
        <div className='max-w-md w-full bg-white dark:bg-neutral-800 rounded-xl shadow-2xl p-8 text-center'>
          <div className='mb-6'>
            <div className='w-20 h-20 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4'>
              <svg className='w-10 h-10 text-red-500' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z'
                />
              </svg>
            </div>
            <h1 className='text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-2'>Uygulama Hatası</h1>
            <p className='text-neutral-600 dark:text-neutral-400 mb-4'>
              Beklenmeyen bir sistem hatası oluştu. Lütfen uygulamayı yeniden başlatın.
            </p>
            <p className='text-xs text-neutral-500 dark:text-neutral-500'>Hata ID: {errorState.errorId}</p>
          </div>

          {process.env.NODE_ENV === 'development' && errorState.error && (
            <details className='mb-6 text-left bg-neutral-50 dark:bg-neutral-700 rounded-lg p-4'>
              <summary className='cursor-pointer font-medium text-neutral-700 dark:text-neutral-300'>
                Geliştirici Bilgileri
              </summary>
              <pre className='mt-3 text-xs text-neutral-600 dark:text-neutral-400 whitespace-pre-wrap overflow-auto max-h-32'>
                {errorState.error.message}
                {errorState.error.stack && '\n\n' + errorState.error.stack}
              </pre>
            </details>
          )}

          <div className='space-y-3'>
            <button
              onClick={resetApplication}
              className='w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium'
            >
              Uygulamayı Sıfırla
            </button>
            <button
              onClick={reloadApplication}
              className='w-full px-4 py-2 bg-neutral-200 text-neutral-700 dark:bg-neutral-700 dark:text-neutral-300 rounded-lg hover:bg-neutral-300 dark:hover:bg-neutral-600 transition-colors font-medium'
            >
              Sayfayı Yenile
            </button>
          </div>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
