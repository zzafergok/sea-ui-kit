'use client'

import { useSearchParams } from 'next/navigation'

import { useCallback, useEffect, useState } from 'react'

import { useTranslation } from 'react-i18next'

import { SupportedLocale, getUserLocale, setUserLocale, isSupportedLocale } from '@/lib/locale-utils'

/**
 * Dil yönetimi için gelişmiş hook
 * Middleware ile koordineli çalışır
 */
export function useLocale() {
  const { i18n } = useTranslation()
  const searchParams = useSearchParams()

  const [currentLocale, setCurrentLocale] = useState<SupportedLocale>(() => getUserLocale())

  // URL'deki dil parametresini kontrol et
  useEffect(() => {
    const langParam = searchParams.get('lang')
    if (langParam && isSupportedLocale(langParam) && langParam !== currentLocale) {
      changeLocale(langParam)
    }
  }, [searchParams, currentLocale])

  // i18next ile senkronize et
  useEffect(() => {
    if (i18n.language !== currentLocale) {
      i18n.changeLanguage(currentLocale)
    }
  }, [currentLocale, i18n])

  /**
   * Dili değiştirir ve gerekli güncellemeleri yapar
   */
  const changeLocale = useCallback(
    (newLocale: SupportedLocale) => {
      if (newLocale === currentLocale) return

      // State'i güncelle
      setCurrentLocale(newLocale)

      // localStorage ve cookie'yi güncelle
      setUserLocale(newLocale)

      // i18next'i güncelle
      i18n.changeLanguage(newLocale)

      // URL'yi güncelle (dil parametresi ekleyerek)
      const current = new URL(window.location.href)
      current.searchParams.set('lang', newLocale)

      // History state'ini güncelle (sayfa yenilenmeden)
      window.history.replaceState(null, '', current.toString())

      // HTML lang attribute'unu güncelle
      document.documentElement.lang = newLocale

      // Meta tag'ları güncelle
      const metaLang = document.querySelector('meta[name="language"]')
      if (metaLang) {
        metaLang.setAttribute('content', newLocale)
      } else {
        const newMetaLang = document.createElement('meta')
        newMetaLang.name = 'language'
        newMetaLang.content = newLocale
        document.head.appendChild(newMetaLang)
      }
    },
    [currentLocale, i18n],
  )

  /**
   * Sayfa yenilemesi ile dil değişikliği (tam reload)
   */
  const changeLocaleWithReload = useCallback(
    (newLocale: SupportedLocale) => {
      if (newLocale === currentLocale) return

      const current = new URL(window.location.href)
      current.searchParams.set('lang', newLocale)
      window.location.href = current.toString()
    },
    [currentLocale],
  )

  return {
    currentLocale,
    changeLocale,
    changeLocaleWithReload,
    isCurrentLocale: useCallback((locale: SupportedLocale) => locale === currentLocale, [currentLocale]),
  }
}
