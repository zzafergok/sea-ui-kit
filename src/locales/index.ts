'use client'

import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import enTranslation from './en/translation.json'
import trTranslation from './tr/translation.json'

// İlklendirme kontrolü
let isInitialized = false

// Resources for i18next
const resources = {
  en: { translation: enTranslation },
  tr: { translation: trTranslation },
}

// i18n yapılandırmasını bir kez yap
if (!isInitialized) {
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources,
      lng: 'tr', // Türkçe varsayılan olarak ayarla
      fallbackLng: 'en',
      interpolation: {
        escapeValue: false,
      },
      detection: {
        order: ['localStorage', 'navigator'],
        lookupLocalStorage: 'language',
      },
    })
  isInitialized = true
}

export default i18n
