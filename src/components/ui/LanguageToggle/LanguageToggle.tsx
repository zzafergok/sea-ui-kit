'use client'

import React from 'react'
import { Languages, Check } from 'lucide-react'
import { useLocale } from '@/hooks/useLocale'
import { Button } from '@/components/core/Button/Button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/core/Dropdown/Dropdown'
import { SupportedLocale } from '@/lib/locale-utils'

export function LanguageToggle() {
  const { currentLocale, changeLocale, isChangingLanguage } = useLocale()

  const languages = [
    {
      code: 'tr' as SupportedLocale,
      name: 'Türkçe',
      flag: '🇹🇷',
    },
    {
      code: 'en' as SupportedLocale,
      name: 'English',
      flag: '🇺🇸',
    },
  ]

  const currentLanguage = languages.find((lang) => lang.code === currentLocale)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          size='sm'
          disabled={isChangingLanguage}
          className='w-9 h-9 p-0 text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors'
          aria-label='Dil değiştir'
        >
          {currentLanguage ? (
            <span className='text-sm'>{currentLanguage.flag}</span>
          ) : (
            <Languages className='h-4 w-4' />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-36 z-[9998]' sideOffset={5} collisionPadding={8}>
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => changeLocale(language.code)}
            disabled={isChangingLanguage}
            className={`flex items-center cursor-pointer ${
              currentLocale === language.code
                ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400'
                : ''
            }`}
          >
            <span className='mr-2 text-sm'>{language.flag}</span>
            <span className='flex-1'>{language.name}</span>
            {currentLocale === language.code && <Check className='ml-auto h-4 w-4 text-primary-500' />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
