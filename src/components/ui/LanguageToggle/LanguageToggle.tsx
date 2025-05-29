'use client'

import React from 'react'

import { useLocale } from '@/hooks/useLocale'

import { Globe } from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/core/Dropdown/Dropdown'
import { Button } from '@/components/core/Button/Button'

import { SupportedLocale } from '@/lib/locale-utils'

export function LanguageToggle() {
  const { currentLocale, changeLocale, isChangingLanguage } = useLocale()

  const languageOptions = [
    {
      value: 'tr' as SupportedLocale,
      label: 'Türkçe',
      shortLabel: 'TR',
      flag: '🇹🇷',
    },
    {
      value: 'en' as SupportedLocale,
      label: 'English',
      shortLabel: 'EN',
      flag: '🇺🇸',
    },
  ]

  const currentLanguage = languageOptions.find((lang) => lang.value === currentLocale) || languageOptions[0]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          size='icon'
          disabled={isChangingLanguage}
          className='relative h-9 w-9 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:text-neutral-100 dark:hover:bg-neutral-800'
        >
          <Globe className='h-4 w-4 transition-all' />
          <span className='absolute -bottom-1 -right-1 text-xs font-bold text-neutral-600 dark:text-neutral-400'>
            {currentLanguage.shortLabel}
          </span>
          <span className='sr-only'>Dil değiştir</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-40'>
        {languageOptions.map((option) => {
          const isActive = currentLocale === option.value

          return (
            <DropdownMenuItem
              key={option.value}
              onClick={() => changeLocale(option.value)}
              disabled={isChangingLanguage}
              className={`flex items-center cursor-pointer ${
                isActive
                  ? 'bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-100'
                  : 'text-neutral-700 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-neutral-100'
              }`}
            >
              <span className='mr-2 text-base'>{option.flag}</span>
              <span>{option.label}</span>
              {isActive && <div className='ml-auto h-2 w-2 rounded-full bg-primary-500 dark:bg-primary-400' />}
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
