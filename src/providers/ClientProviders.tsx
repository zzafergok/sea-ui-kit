'use client'

import React, { useEffect, useState } from 'react'

import { Provider } from 'react-redux'
import { I18nextProvider } from 'react-i18next'
import { PersistGate } from 'redux-persist/integration/react'

import { store, persistor } from '@/store'

import { TokenManagerProvider } from '@/providers/TokenManagerProvider'

import { LoadingSpinner } from '@/components/Loading/LoadingSpinner'
import { ToastContainer } from '@/components/ToastContainer/ToastContainer'
import { GlobalErrorBoundary } from '@/components/ErrorBoundary/GlobalErrorBoundary'

import i18n from '@/locales'

interface ClientProvidersProps {
  children: React.ReactNode
}

function LoadingFallback() {
  return (
    <div className='min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-900'>
      <div className='text-center space-y-4'>
        <LoadingSpinner size='lg' />
        <p className='text-sm text-neutral-600 dark:text-neutral-400'>Uygulama yükleniyor...</p>
      </div>
    </div>
  )
}

function ThemeInitializer({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const initializeTheme = () => {
      try {
        const savedTheme = localStorage.getItem('theme') || 'system'
        const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
        const effectiveTheme = savedTheme === 'system' ? systemPreference : savedTheme

        document.documentElement.classList.remove('light', 'dark')
        document.documentElement.classList.add(effectiveTheme)

        setMounted(true)
      } catch (error) {
        console.warn('Theme initialization error:', error)
        setMounted(true)
      }
    }

    initializeTheme()
  }, [])

  if (!mounted) {
    return <LoadingFallback />
  }

  return <>{children}</>
}

export function ClientProviders({ children }: ClientProvidersProps) {
  return (
    <GlobalErrorBoundary
      enableAutoRecovery={true}
      recoveryTimeout={10000}
      onError={(error, errorInfo) => {
        if (process.env.NODE_ENV === 'production') {
          console.error('Global Error:', error, errorInfo)
        }
      }}
    >
      <ThemeInitializer>
        <Provider store={store}>
          <PersistGate loading={<LoadingFallback />} persistor={persistor}>
            <TokenManagerProvider>
              <I18nextProvider i18n={i18n}>
                {children}
                <ToastContainer position='top-right' />
              </I18nextProvider>
            </TokenManagerProvider>
          </PersistGate>
        </Provider>
      </ThemeInitializer>
    </GlobalErrorBoundary>
  )
}
