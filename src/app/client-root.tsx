'use client'

import React, { useEffect, useState } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { I18nextProvider } from 'react-i18next'
import { store, persistor } from '@/store'
import { TokenManagerProvider } from '@/hooks/useTokenManager'
import { ToastContainer } from '@/components/Toast/ToastContainer'
import { GlobalLoadingOverlay, PageLoadingOverlay, LoadingProgressBar } from '@/components/Loading/GlobalLoadingOverlay'
import { LoginForm } from '@/components/auth/LoginForm'
import { type LoginFormValues } from '@/lib/validations/auth'
import i18n from '@/locales'

export function ClientRootProvider() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Theme initialization
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
      } catch (error) {
        console.warn('Theme initialization error:', error)
      }
    }

    initializeTheme()
    setMounted(true)
  }, [])

  const handleLoginSubmit = (data: LoginFormValues) => {
    console.log('Login form submitted:', data)
  }

  if (!mounted) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-900'>
        <div className='animate-spin h-8 w-8 border-2 border-primary-500 border-t-transparent rounded-full'></div>
      </div>
    )
  }

  return (
    <Provider store={store}>
      <PersistGate
        loading={
          <div className='min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-900'>
            <div className='text-center space-y-4'>
              <div className='animate-spin h-8 w-8 border-2 border-primary-500 border-t-transparent rounded-full mx-auto'></div>
              <p className='text-sm text-neutral-600 dark:text-neutral-400'>Yükleniyor...</p>
            </div>
          </div>
        }
        persistor={persistor}
      >
        <TokenManagerProvider>
          <I18nextProvider i18n={i18n}>
            <div className='min-h-screen bg-neutral-50 dark:bg-neutral-900'>
              <LoadingProgressBar />

              <main className='min-h-screen'>
                <LoginForm onSubmit={handleLoginSubmit} />
              </main>

              <GlobalLoadingOverlay showProgress={true} showMessage={true} showTimer={true} timeout={30000} />
              <PageLoadingOverlay />
              <ToastContainer position='top-right' />
            </div>
          </I18nextProvider>
        </TokenManagerProvider>
      </PersistGate>
    </Provider>
  )
}
