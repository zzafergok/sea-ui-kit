'use client'

import React, { ReactNode, useEffect, useState } from 'react'

interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorState {
  hasError: boolean
  error: Error | null
}

export function ErrorBoundary({ children }: ErrorBoundaryProps) {
  const [errorState, setErrorState] = useState<ErrorState>({
    hasError: false,
    error: null,
  })

  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      console.error('Global error caught:', event.error)
      setErrorState({
        hasError: true,
        error: event.error || new Error(event.message),
      })
    }

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      console.error('Unhandled promise rejection:', event.reason)
      setErrorState({
        hasError: true,
        error: new Error(event.reason?.message || 'Unhandled Promise Rejection'),
      })
    }

    window.addEventListener('error', handleError)
    window.addEventListener('unhandledrejection', handleUnhandledRejection)

    return () => {
      window.removeEventListener('error', handleError)
      window.removeEventListener('unhandledrejection', handleUnhandledRejection)
    }
  }, [])

  const resetError = () => {
    setErrorState({
      hasError: false,
      error: null,
    })
  }

  const handleReload = () => {
    window.location.reload()
  }

  if (errorState.hasError && errorState.error) {
    return (
      <div className='min-h-screen flex items-center justify-center p-4 bg-neutral-50 dark:bg-neutral-900'>
        <div className='text-center max-w-md w-full bg-white dark:bg-neutral-800 rounded-lg shadow-lg p-8'>
          <div className='mb-6'>
            <div className='h-16 w-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4'>
              <svg className='h-8 w-8 text-red-500' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z'
                />
              </svg>
            </div>
            <h1 className='text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-2'>Bir Hata Oluştu</h1>
            <p className='text-neutral-600 dark:text-neutral-400'>
              Beklenmeyen bir hata meydana geldi. Lütfen sayfayı yenileyin veya tekrar deneyin.
            </p>

            {process.env.NODE_ENV === 'development' && errorState.error && (
              <details className='mt-4 text-left'>
                <summary className='cursor-pointer text-sm font-medium text-red-600 dark:text-red-400'>
                  Hata Detayları (Development)
                </summary>
                <pre className='mt-2 text-xs text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 p-2 rounded overflow-auto max-h-32'>
                  {errorState.error.message}
                  {errorState.error.stack && '\n\n' + errorState.error.stack}
                </pre>
              </details>
            )}
          </div>

          <div className='flex flex-col sm:flex-row gap-3 justify-center'>
            <button
              onClick={resetError}
              className='px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors'
            >
              Tekrar Dene
            </button>
            <button
              onClick={handleReload}
              className='px-4 py-2 bg-neutral-200 text-neutral-700 dark:bg-neutral-700 dark:text-neutral-300 rounded-md hover:bg-neutral-300 dark:hover:bg-neutral-600 transition-colors'
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
