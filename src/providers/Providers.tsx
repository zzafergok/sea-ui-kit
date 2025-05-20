'use client'

import React, { useEffect } from 'react'
import { Provider } from 'react-redux'
import { I18nextProvider } from 'react-i18next'
import { store } from '@/store'
import i18n from '@/locales'

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Sayfa daha önce yenilenmiş mi kontrol et
    const hasRefreshed = sessionStorage.getItem('hasRefreshed')

    // Eğer ilk defa yükleniyorsa ve tarayıcı ortamındaysa
    if (!hasRefreshed && typeof window !== 'undefined') {
      // Yenilendiğini işaretle
      sessionStorage.setItem('hasRefreshed', 'true')

      // 100ms sonra yenile (kullanıcı fark etmeyecek kadar kısa)
      setTimeout(() => {
        window.location.reload()
      }, 100)
    }
  }, [])

  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
    </Provider>
  )
}
