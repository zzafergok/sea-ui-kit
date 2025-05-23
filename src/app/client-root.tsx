'use client'

import React, { useEffect, useState } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { I18nextProvider } from 'react-i18next'
import { store, persistor } from '@/store'
import { TokenManagerProvider } from '@/hooks/useTokenManager'
import { ToastContainer } from '@/components/Toast/ToastContainer'
import { LoadingSpinner } from '@/components/Loading/LoadingSpinner'
import i18n from '@/locales'

interface ClientRootProviderProps {
  children: React.ReactNode
}

function LoadingFallback() {
  return (
    <div className='min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-900'>
      <div className='text-center space-y-4'>
        <div className='animate-spin h-8 w-8 border-2 border-primary-500 border-t-transparent rounded-full mx-auto'></div>
        <p className='text-sm text-neutral-600 dark:text-neutral-400'>Yükleniyor...</p>
      </div>
    </div>
  )
}

function ThemeInitializer({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)
  const [themeReady, setThemeReady] = useState(false)

  useEffect(() => {
    const initializeTheme = () => {
      try {
        if (typeof window === 'undefined') return

        // Theme'i önce localStorage'dan al, yoksa sistem tercihini kullan
        const savedTheme = localStorage.getItem('theme')
        const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'

        let effectiveTheme: string
        if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
          effectiveTheme = savedTheme === 'system' ? systemPreference : savedTheme
        } else {
          effectiveTheme = systemPreference
        }

        // Theme'i hemen uygula - hydration'dan önce
        const htmlElement = document.documentElement
        htmlElement.classList.remove('light', 'dark')
        htmlElement.classList.add(effectiveTheme)

        // CSS transitions'ı başlangıçta devre dışı bırak
        htmlElement.style.transition = 'none'

        // Bir sonraki frame'de transitions'ı geri aç
        requestAnimationFrame(() => {
          htmlElement.style.transition = ''
          setThemeReady(true)
        })

        setMounted(true)
      } catch (error) {
        console.warn('Theme initialization error:', error)
        setMounted(true)
        setThemeReady(true)
      }
    }

    initializeTheme()
  }, [])

  // Theme hazır olmadan hiçbir şey render etme
  if (!mounted || !themeReady) {
    return <LoadingFallback />
  }

  return <>{children}</>
}

export function ClientRootProvider({ children }: ClientRootProviderProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={<LoadingFallback />} persistor={persistor}>
        <TokenManagerProvider>
          <I18nextProvider i18n={i18n}>
            <ThemeInitializer>
              {children}
              {/* <LoadingSpinner /> */}
              <ToastContainer position='top-right' />
            </ThemeInitializer>
          </I18nextProvider>
        </TokenManagerProvider>
      </PersistGate>
    </Provider>
  )
}
