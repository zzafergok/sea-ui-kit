'use client'

import React, { useEffect } from 'react'
import i18n from '@/locales'
import { I18nextProvider } from 'react-i18next'

export function I18nProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Tarayıcı tarafında çalıştığından emin olun
    if (typeof window !== 'undefined') {
      const storedLang = localStorage.getItem('language') || 'en'
      i18n.changeLanguage(storedLang)
    }
  }, [])

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
}
