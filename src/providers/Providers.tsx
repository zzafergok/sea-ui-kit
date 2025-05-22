'use client'

import React, { useEffect, useState, Suspense } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { I18nextProvider } from 'react-i18next'

import { store, persistor } from '@/store'
import { TokenManagerProvider } from '@/hooks/useTokenManager'
import { GlobalErrorBoundary } from '@/components/ErrorBoundary/GlobalErrorBoundary'
import { GlobalLoadingOverlay, PageLoadingOverlay, LoadingProgressBar } from '@/components/Loading/GlobalLoadingOverlay'
import { ToastContainer } from '@/components/Toast/ToastContainer'
import { Skeleton } from '@/components/Skeleton/Skeleton'
import i18n from '@/locales'

/**
 * Loading fallback component
 */
function ProvidersLoading() {
  return (
    <div className='min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-900'>
      <div className='space-y-4 text-center'>
        <Skeleton variant='circular' width={64} height={64} className='mx-auto' />
        <Skeleton variant='text' width={200} height={24} className='mx-auto' />
        <Skeleton variant='text' width={150} height={16} className='mx-auto' />
      </div>
    </div>
  )
}

/**
 * Persist Gate Loading Component
 */
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

/**
 * Development mode indicator
 */
function DevelopmentIndicator() {
  if (process.env.NODE_ENV !== 'development') return null

  return (
    <div className='fixed bottom-4 left-4 z-50 bg-yellow-500 text-yellow-900 px-3 py-1 rounded-full text-xs font-medium shadow-lg'>
      🚧 Development
    </div>
  )
}

/**
 * Performance monitor component
 */
function PerformanceMonitor({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      // Monitor slow components
      let renderCount = 0
      const renderTimes: number[] = []

      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        entries.forEach((entry) => {
          if (entry.entryType === 'measure' && entry.name.includes('React')) {
            renderTimes.push(entry.duration)
            renderCount++

            if (entry.duration > 16) {
              // 60fps threshold
              console.warn(`[Performance] Slow render detected: ${entry.name} took ${entry.duration.toFixed(2)}ms`)
            }

            // Log average render time every 100 renders
            if (renderCount % 100 === 0) {
              const avgTime = renderTimes.slice(-100).reduce((a, b) => a + b, 0) / 100
              console.log(`[Performance] Average render time (last 100): ${avgTime.toFixed(2)}ms`)
            }
          }
        })
      })

      observer.observe({ entryTypes: ['measure'] })

      return () => {
        observer.disconnect()
      }
    }
  }, [])

  return <>{children}</>
}

/**
 * Theme initializer
 */
function ThemeInitializer({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Theme initialization
    const initializeTheme = () => {
      const savedTheme = localStorage.getItem('theme') || 'system'
      const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'

      const effectiveTheme = savedTheme === 'system' ? systemPreference : savedTheme

      // Apply theme immediately to prevent flash
      if (effectiveTheme === 'dark') {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }

      // Set color scheme meta tag
      const metaColorScheme = document.querySelector('meta[name="color-scheme"]')
      if (metaColorScheme) {
        metaColorScheme.setAttribute('content', effectiveTheme === 'dark' ? 'dark' : 'light')
      }
    }

    initializeTheme()
    setMounted(true)

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      const savedTheme = localStorage.getItem('theme')
      if (savedTheme === 'system' || !savedTheme) {
        const newTheme = e.matches ? 'dark' : 'light'
        if (newTheme === 'dark') {
          document.documentElement.classList.add('dark')
        } else {
          document.documentElement.classList.remove('dark')
        }
      }
    }

    mediaQuery.addEventListener('change', handleSystemThemeChange)

    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange)
    }
  }, [])

  if (!mounted) {
    return <ProvidersLoading />
  }

  return <>{children}</>
}

/**
 * Main Providers Component
 * Artık tüm client-side komponentleri (error boundary dahil) burada sarmalanır
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <GlobalErrorBoundary
      enableAutoRecovery={true}
      recoveryTimeout={10000}
      // Error handling mantığı client-side'da
      onError={(error, errorInfo) => {
        // Error reporting için
        console.error('Global Error:', error, errorInfo)

        // Production'da error reporting service'e gönder
        if (process.env.NODE_ENV === 'production') {
          // Sentry, LogRocket vs. error reporting
          try {
            if (typeof window !== 'undefined' && (window as any).gtag) {
              return (window as any).gtag('event', 'exception', {
                description: error.message,
                fatal: true,
                component_stack: errorInfo.componentStack,
              })
            }
          } catch (reportError) {
            console.error('Error reporting failed:', reportError)
          }
        }
      }}
    >
      <Suspense fallback={<ProvidersLoading />}>
        <ThemeInitializer>
          <Provider store={store}>
            <PersistGate loading={<PersistLoading />} persistor={persistor}>
              <TokenManagerProvider>
                <I18nextProvider i18n={i18n}>
                  <PerformanceMonitor>
                    {/* Loading Progress Bar */}
                    <LoadingProgressBar />

                    {children}

                    {/* Global Loading Overlays */}
                    <GlobalLoadingOverlay showProgress={true} showMessage={true} showTimer={true} timeout={30000} />
                    <PageLoadingOverlay />

                    {/* Toast Notifications */}
                    <ToastContainer />

                    <DevelopmentIndicator />
                  </PerformanceMonitor>
                </I18nextProvider>
              </TokenManagerProvider>
            </PersistGate>
          </Provider>
        </ThemeInitializer>
      </Suspense>
    </GlobalErrorBoundary>
  )
}

/**
 * HOC for page-level providers
 */
export function withProviders<P extends object>(Component: React.ComponentType<P>) {
  const WrappedComponent = (props: P) => {
    return (
      <Providers>
        <Component {...props} />
      </Providers>
    )
  }

  WrappedComponent.displayName = `withProviders(${Component.displayName || Component.name})`
  return WrappedComponent
}

export default Providers
