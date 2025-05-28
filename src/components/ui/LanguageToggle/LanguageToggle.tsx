'use client'

import React, { useState, useEffect } from 'react'

import { Check, Globe } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { Button } from '@/components/core/Button/Button'
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from '@/components/core/Dropdown/Dropdown'

import { useAppSelector, useAppDispatch } from '@/store'
import { selectCurrentLanguage, setLanguage } from '@/store/slices/langSlice'

import { cn } from '@/lib/utils'

const languages = [
  {
    code: 'tr',
    name: 'Türkçe',
    nativeName: 'Türkçe',
    flag: '🇹🇷',
  },
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '🇺🇸',
  },
] as const

export function LanguageToggle() {
  const dispatch = useAppDispatch()
  const currentLanguage = useAppSelector(selectCurrentLanguage)
  const { i18n } = useTranslation()
  const [mounted, setMounted] = useState(false)

  // Hydration mismatch'i önlemek için
  useEffect(() => {
    setMounted(true)
  }, [])

  // Language sync with i18next
  useEffect(() => {
    if (mounted && currentLanguage && i18n.language !== currentLanguage) {
      i18n.changeLanguage(currentLanguage)
    }
  }, [mounted, currentLanguage, i18n])

  const handleLanguageChange = (languageCode: string) => {
    dispatch(setLanguage(languageCode))

    // URL'e lang parametresi ekle (optional)
    const url = new URL(window.location.href)
    url.searchParams.set('lang', languageCode)
    window.history.replaceState(null, '', url.toString())
  }

  if (!mounted) {
    return (
      <Button variant='ghost' size='sm' className='w-9 h-9 p-0'>
        <Globe className='h-4 w-4' />
        <span className='sr-only'>Select language</span>
      </Button>
    )
  }

  const currentLang = languages.find((lang) => lang.code === currentLanguage) || languages[0]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          size='sm'
          className='flex items-center space-x-2 h-9 px-2 hover:bg-neutral-100 dark:hover:bg-neutral-800'
          aria-label={`Current language: ${currentLang.name}`}
        >
          <span className='text-sm'>{currentLang.flag}</span>
          <span className='hidden sm:inline text-sm font-medium'>{currentLang.code.toUpperCase()}</span>
          <span className='sr-only'>Dil değiştir</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align='end' className='w-48'>
        {languages.map((language) => {
          const isActive = currentLanguage === language.code

          return (
            <DropdownMenuItem
              key={language.code}
              onClick={() => handleLanguageChange(language.code)}
              className={cn(
                'flex items-center justify-between cursor-pointer',
                isActive && 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400',
              )}
            >
              <div className='flex items-center space-x-3'>
                <span className='text-base'>{language.flag}</span>
                <div className='flex flex-col'>
                  <span className='text-sm font-medium'>{language.name}</span>
                  <span className='text-xs text-neutral-500 dark:text-neutral-400'>{language.nativeName}</span>
                </div>
              </div>
              {isActive && <Check className='h-4 w-4 text-primary-600 dark:text-primary-400' />}
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

// Compact versiyonu
export function CompactLanguageToggle() {
  const dispatch = useAppDispatch()
  const currentLanguage = useAppSelector(selectCurrentLanguage)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant='ghost' size='sm' className='w-9 h-9 p-0'>
        🌐
      </Button>
    )
  }

  const currentLang = languages.find((lang) => lang.code === currentLanguage) || languages[0]
  const otherLang = languages.find((lang) => lang.code !== currentLanguage) || languages[1]

  const toggleLanguage = () => {
    dispatch(setLanguage(otherLang.code))
  }

  return (
    <Button
      variant='ghost'
      size='sm'
      onClick={toggleLanguage}
      className='w-9 h-9 p-0 hover:bg-neutral-100 dark:hover:bg-neutral-800'
      aria-label={`Switch to ${otherLang.name}`}
      title={`${currentLang.name} → ${otherLang.name}`}
    >
      <span className='text-sm transition-transform duration-200 hover:scale-110'>{currentLang.flag}</span>
    </Button>
  )
}
