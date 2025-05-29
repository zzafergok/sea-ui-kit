'use client'

import React from 'react'

import { Sun, Moon } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { useTheme } from '@/hooks/useTheme'

import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/core/Dropdown/Dropdown'
import { Button } from '@/components/core/Button/Button'

export function ThemeToggle() {
  const { t } = useTranslation()
  const { theme, setTheme, isDisabled } = useTheme()

  const themeOptions = [
    {
      value: 'light' as const,
      label: t('theme.light'),
      icon: Sun,
    },
    {
      value: 'dark' as const,
      label: t('theme.dark'),
      icon: Moon,
    },
  ]

  const currentThemeOption = themeOptions.find((option) => option.value === theme) || themeOptions[2]
  const CurrentIcon = currentThemeOption.icon

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          size='icon'
          disabled={isDisabled}
          className='relative h-9 w-9 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:text-neutral-100 dark:hover:bg-neutral-800'
        >
          <CurrentIcon className='h-4 w-4 transition-all' />
          <span className='sr-only'>Tema değiştir</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-40'>
        {themeOptions.map((option) => {
          const Icon = option.icon
          const isActive = theme === option.value

          return (
            <DropdownMenuItem
              key={option.value}
              onClick={() => setTheme(option.value)}
              disabled={isDisabled}
              className={`flex items-center cursor-pointer ${
                isActive
                  ? 'bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-100'
                  : 'text-neutral-700 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-neutral-100'
              }`}
            >
              <Icon className='mr-2 h-4 w-4' />
              <span>{option.label}</span>
              {isActive && <div className='ml-auto h-2 w-2 rounded-full bg-primary-500 dark:bg-primary-400' />}
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
