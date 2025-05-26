'use client'

import React, { useState, useEffect, useCallback, useRef } from 'react'

import { Globe } from 'lucide-react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

import { useAppDispatch, useAppSelector } from '@/store'
import { setLanguage, selectCurrentLanguage, selectAvailableLanguages } from '@/store/slices/langSlice'

import { toggleButtonStyles, dropdownStyles, menuItemStyles, iconContainerStyles } from '../ToggleUtils/ToggleStyles'

import { cn } from '@/lib/utils'

interface LanguageToggleProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

interface LanguageOption {
  code: string
  name: string
  flag: React.ReactNode
}

export function LanguageToggle({ className, size = 'md' }: LanguageToggleProps) {
  const dispatch = useAppDispatch()
  const { i18n } = useTranslation()

  const currentLanguage = useAppSelector(selectCurrentLanguage)
  const availableLanguages = useAppSelector(selectAvailableLanguages)

  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Dil seçenekleri
  const languageOptions: Record<string, LanguageOption> = {
    tr: {
      code: 'tr',
      name: 'Türkçe',
      flag: <TurkishFlagIcon />,
    },
    en: {
      code: 'en',
      name: 'English',
      flag: <EnglishFlagIcon />,
    },
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  // Dropdown dışında tıklandığında kapatma
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // ESC tuşu ile kapatma
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    document.addEventListener('keydown', handleEsc)
    return () => document.removeEventListener('keydown', handleEsc)
  }, [])

  // Dil değiştirme işlevi
  const handleLanguageChange = useCallback(
    (lang: string) => {
      dispatch(setLanguage(lang))
      i18n.changeLanguage(lang)
      setIsOpen(false)

      // URL'yi güncelle
      const url = new URL(window.location.href)
      url.searchParams.set('lang', lang)
      window.history.replaceState(null, '', url.toString())

      // HTML lang attribute'unu güncelle
      document.documentElement.lang = lang
    },
    [dispatch, i18n],
  )

  // Boyut sınıfları
  const sizeMapping = {
    sm: {
      button: 'text-xs py-1 px-3',
      icon: 'h-3.5 w-3.5 mr-1',
      flag: 'h-3 w-3 mr-1.5',
    },
    md: {
      button: 'text-sm py-2 px-3',
      icon: 'h-4 w-4 mr-2',
      flag: 'h-4 w-4 mr-2',
    },
    lg: {
      button: 'text-base py-2.5 px-4',
      icon: 'h-5 w-5 mr-2',
      flag: 'h-5 w-5 mr-2',
    },
  }

  if (!mounted) {
    return <div className={cn(toggleButtonStyles({ size }), className, 'flex items-center justify-center')} />
  }

  const currentLang = languageOptions[currentLanguage] || {
    code: currentLanguage,
    name: currentLanguage.toUpperCase(),
    flag: <Globe className='h-4 w-4' />,
  }

  return (
    <div className='relative' ref={dropdownRef}>
      <button
        type='button'
        aria-label='Dil Seçimi'
        aria-expanded={isOpen}
        aria-haspopup='true'
        className={cn(
          toggleButtonStyles({ size, isActive: isOpen }),
          sizeMapping[size].button,
          'flex items-center',
          className,
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={iconContainerStyles}>{currentLang.flag}</span>
        <span>{currentLang.name}</span>
      </button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className={dropdownStyles({ align: 'left' })}
          role='menu'
          aria-orientation='vertical'
        >
          {availableLanguages.map((lang) => {
            const langOption = languageOptions[lang] || {
              code: lang,
              name: lang.toUpperCase(),
              flag: <Globe className='h-4 w-4' />,
            }

            return (
              <button
                key={lang}
                className={cn(menuItemStyles({ isActive: currentLanguage === lang }))}
                onClick={() => handleLanguageChange(lang)}
                role='menuitem'
              >
                <span className={iconContainerStyles}>{langOption.flag}</span>
                <span>{langOption.name}</span>
              </button>
            )
          })}
        </motion.div>
      )}
    </div>
  )
}

// Türk Bayrağı İkonu - Daha basit ve modern bir stille
function TurkishFlagIcon() {
  return <span className='text-2xl'>🇹🇷</span>
}

// İngiliz Bayrağı İkonu - Daha basit ve modern bir stille
function EnglishFlagIcon() {
  return <span className='text-2xl'>🇺🇸</span>
}
