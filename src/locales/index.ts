'use client'

import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import enTranslation from './en/translation.json'
import trTranslation from './tr/translation.json'

import { isDevelopment } from '../utils/environment'

// Resources for i18next
const resources = {
  en: {
    translation: enTranslation,
  },
  tr: {
    translation: trTranslation,
  },
}

// Set up i18n
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // Varsayılan dili açıkça belirtin
    fallbackLng: 'en',
    debug: isDevelopment,
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'language',
      caches: [], // Depolama önbelleğini devre dışı bırakın
    },
  })

export default i18n

// Type definition for translations to enable type safety
export type TFunction = typeof enTranslation
