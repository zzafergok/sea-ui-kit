'use client'

import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useAppDispatch } from '@/store'
import { setLanguage } from '@/store/slices/langSlice'

export function useLanguage() {
  const { i18n } = useTranslation()
  const dispatch = useAppDispatch()

  useEffect(() => {
    // İstemci tarafında mıyız kontrol et
    if (typeof window !== 'undefined') {
      // localStorage'dan dili al
      const storedLang = localStorage.getItem('language') || 'en'
      i18n.changeLanguage(storedLang)
      dispatch(setLanguage(storedLang))
    }
  }, [dispatch, i18n])

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang)
    localStorage.setItem('language', lang)
    dispatch(setLanguage(lang))
  }

  return {
    currentLanguage: i18n.language,
    changeLanguage,
  }
}
