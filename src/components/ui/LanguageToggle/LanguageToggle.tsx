'use client'

import React from 'react'
import { Languages, Check } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { Button } from '@/components/core/Button/Button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/core/Dropdown/Dropdown'
import { useLocale } from '@/hooks/useLocale'
import { useDropdownState } from '@/hooks/useDropdownState'
import { type SupportedLocale } from '@/lib/locale-utils'

interface LanguageOption {
  code: SupportedLocale
  label: string
  nativeLabel: string
  flag: string
}

const languageOptions: LanguageOption[] = [
  {
    code: 'tr',
    label: 'Turkish',
    nativeLabel: 'Türkçe',
    flag: '🇹🇷',
  },
  {
    code: 'en',
    label: 'English',
    nativeLabel: 'English',
    flag: '🇺🇸',
  },
]

export function LanguageToggle() {
  const { currentLocale, changeLocale, isChangingLanguage } = useLocale()
  const { t } = useTranslation()
  const { isOpen, setIsOpen } = useDropdownState({
    scrollbarCompensation: true,
    preventBodyScroll: false,
  })

  const currentLanguage = languageOptions.find((lang) => lang.code === currentLocale) || languageOptions[0]

  const handleLanguageChange = (locale: SupportedLocale) => {
    if (!isChangingLanguage && locale !== currentLocale) {
      changeLocale(locale)
      setIsOpen(false)
    }
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          size='sm'
          disabled={isChangingLanguage}
          className='relative h-9 px-3 rounded-md border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors'
          aria-label={`${t('common.currentLanguage')}: ${currentLanguage.nativeLabel}`}
        >
          <div className='flex items-center gap-2'>
            <span className='text-sm'>{currentLanguage.flag}</span>
            <Languages className='h-4 w-4 text-neutral-700 dark:text-neutral-200' />
          </div>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align='end'
        className='w-48 border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 shadow-lg'
        sideOffset={8}
      >
        {languageOptions.map((language) => {
          const isSelected = currentLocale === language.code

          return (
            <DropdownMenuItem
              key={language.code}
              onClick={() => handleLanguageChange(language.code)}
              disabled={isChangingLanguage}
              className={`flex items-center gap-3 px-3 py-2.5 text-sm cursor-pointer hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors ${
                isSelected
                  ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
                  : 'text-neutral-700 dark:text-neutral-200'
              }`}
            >
              <span className='text-base'>{language.flag}</span>
              <div className='flex-1'>
                <div className='font-medium'>{language.nativeLabel}</div>
                <div className='text-xs text-neutral-500 dark:text-neutral-400'>{language.label}</div>
              </div>
              {isSelected && <Check className='h-4 w-4 text-primary-500' />}
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
