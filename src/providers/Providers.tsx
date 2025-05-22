'use client'

import React, { useEffect, useState } from 'react'
import { Provider } from 'react-redux'
import { I18nextProvider } from 'react-i18next'

import { store } from '@/store'
import i18n from '@/locales'

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)

  // Hydration mismatch'i önlemek için
  useEffect(() => {
    setMounted(true)
  }, [])

  // SSR sırasında sadece skeleton göster
  if (!mounted) {
    return (
      <Provider store={store}>
        <div suppressHydrationWarning>{children}</div>
      </Provider>
    )
  }

  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
    </Provider>
  )
}
