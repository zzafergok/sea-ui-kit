'use client'

import React from 'react'

import { Provider } from 'react-redux'
import { I18nextProvider } from 'react-i18next'

import { store } from '@/store'

import i18n from '@/locales'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
    </Provider>
  )
}
