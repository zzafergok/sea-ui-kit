'use client'

import React, { useEffect, useState } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { I18nextProvider } from 'react-i18next'
import { store, persistor } from '@/store'
import { TokenManagerProvider } from '@/hooks/useTokenManager'
import { ErrorBoundary } from './ErrorBoundary'
import { ToastContainer } from '@/components/Toast/ToastContainer'
import { GlobalLoadingOverlay, PageLoadingOverlay, LoadingProgressBar } from '@/components/Loading/GlobalLoadingOverlay'
import i18n from '@/locales'

interface ProvidersProps {
  children: React.ReactNode
}

function LoadingFallback() {
  return (
    <div className='min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-900'>
      <div className='space-y-4 text-center'>
        <div className='animate-spin h-12 w-12 border-3 border-primary-500 border-t-transparent rounded-full mx-auto' />
        <div className='space-y-2'>
          <div className='h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-32 mx-auto animate-pulse' />
          <div className='h-3 bg-neutral-200 dark:bg-neutral-700 rounded w-24 mx-auto animate-pulse' />
        </div>
      </div>
    </div>
  )
}

function PersistLoading() {
  return (
    <div className='min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-900'>
      <div className='text-center space-y-4'>
        <div className='animate-spin h-8 w-8 border-2 border-primary-500 border-t-transparent rounded-full mx-auto' />
        <p className='text-sm text-neutral-600 dark:text-neutral-400'>Uygulama başlatılıyor...</p>
      </div>
    </div>
  )
}

function ThemeInitializer({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const initializeTheme = () => {
      try {
        if (typeof window === 'undefined') return

        const savedTheme = localStorage.getItem('theme') || 'system'
        const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
        const effectiveTheme = savedTheme === 'system' ? systemPreference : savedTheme

        if (effectiveTheme === 'dark') {
          document.documentElement.classList.add('dark')
        } else {
          document.documentElement.classList.remove('dark')
        }

        const metaColorScheme = document.querySelector('meta[name="color-scheme"]')
        if (metaColorScheme) {
          metaColorScheme.setAttribute('content', effectiveTheme)
        }
      } catch (error) {
        console.warn('Theme initialization error:', error)
      }
    }

    const timer = setTimeout(() => {
      initializeTheme()
      setMounted(true)
    }, 0)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      try {
        const savedTheme = localStorage.getItem('theme')
        if (savedTheme === 'system' || !savedTheme) {
          const newTheme = e.matches ? 'dark' : 'light'
          if (newTheme === 'dark') {
            document.documentElement.classList.add('dark')
          } else {
            document.documentElement.classList.remove('dark')
          }
        }
      } catch (error) {
        console.warn('System theme change error:', error)
      }
    }

    mediaQuery.addEventListener('change', handleSystemThemeChange)
    return () => mediaQuery.removeEventListener('change', handleSystemThemeChange)
  }, [mounted])

  if (!mounted) {
    return <LoadingFallback />
  }

  return <>{children}</>
}

export function OptimizedProviders({ children }: ProvidersProps) {
  return (
    <ErrorBoundary>
      <ThemeInitializer>
        <Provider store={store}>
          <PersistGate loading={<PersistLoading />} persistor={persistor}>
            <TokenManagerProvider>
              <I18nextProvider i18n={i18n}>
                <LoadingProgressBar />
                {children}
                <GlobalLoadingOverlay showProgress={true} showMessage={true} showTimer={true} timeout={30000} />
                <PageLoadingOverlay />
                <ToastContainer />
              </I18nextProvider>
            </TokenManagerProvider>
          </PersistGate>
        </Provider>
      </ThemeInitializer>
    </ErrorBoundary>
  )
}

export default OptimizedProviders
