'use client'

import React, { useState, useEffect } from 'react'
import { Provider } from 'react-redux'
import { I18nextProvider } from 'react-i18next'
import { store } from '@/store'
import i18n from '@/locales'

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    if (typeof window !== 'undefined') {
      const storedLang = localStorage.getItem('language')
      if (storedLang) {
        i18n.changeLanguage(storedLang)
      }
    }
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
    </Provider>
  )
}
