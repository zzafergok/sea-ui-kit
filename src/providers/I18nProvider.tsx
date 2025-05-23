'use client'

import React, { Suspense } from 'react'
import { I18nextProvider } from 'react-i18next'
import i18n from '@/locales'

interface I18nProviderProps {
  children: React.ReactNode
}

export default function I18nProvider({ children }: I18nProviderProps) {
  return (
    <Suspense fallback={<div>Dil yükleniyor...</div>}>
      <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
    </Suspense>
  )
}
