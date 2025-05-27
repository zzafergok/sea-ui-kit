'use client'

import { useCallback } from 'react'

import { useTranslation } from 'react-i18next'

/**
 * Gelişmiş çeviri yardımcı hook'u
 * Sık kullanılan çeviri işlemlerini kolaylaştırır
 */
export function useTranslationHelpers() {
  const { t, i18n } = useTranslation()

  // Sayfa title'ları için
  const getPageTitle = useCallback(
    (pageKey: string) => {
      return t(`pages.${pageKey}.title`)
    },
    [t],
  )

  // Navigation metinleri için
  const getNavText = useCallback(
    (navKey: string) => {
      return t(`navigation.${navKey}`)
    },
    [t],
  )

  // Auth metinleri için
  const getAuthText = useCallback(
    (authKey: string) => {
      return t(`auth.${authKey}`)
    },
    [t],
  )

  // Common metinleri için
  const getCommonText = useCallback(
    (commonKey: string) => {
      return t(`common.${commonKey}`)
    },
    [t],
  )

  // Validation metinleri için
  const getValidationText = useCallback(
    (validationKey: string, params?: Record<string, any>) => {
      return t(`validation.${validationKey}`, params)
    },
    [t],
  )

  // Dil değiştirme
  const changeLanguage = useCallback(
    (lang: string) => {
      return i18n.changeLanguage(lang)
    },
    [i18n],
  )

  // Mevcut dil
  const getCurrentLanguage = useCallback(() => {
    return i18n.language
  }, [i18n])

  // Dil kontrolü
  const isLanguage = useCallback(
    (lang: string) => {
      return i18n.language === lang
    },
    [i18n],
  )

  return {
    t,
    getPageTitle,
    getNavText,
    getAuthText,
    getCommonText,
    getValidationText,
    changeLanguage,
    getCurrentLanguage,
    isLanguage,
  }
}
