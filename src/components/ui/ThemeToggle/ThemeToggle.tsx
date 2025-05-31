'use client'

import React from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { Button } from '@/components/core/Button/Button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/core/Dropdown/Dropdown'
import { useTheme } from '@/hooks/useTheme'
import { useDropdownState } from '@/hooks/useDropdownState'

export function ThemeToggle() {
  const { theme, setTheme, isDisabled } = useTheme()
  const { t } = useTranslation()
  const { isOpen, setIsOpen } = useDropdownState({
    scrollbarCompensation: true,
    preventBodyScroll: false, // Theme için body scroll'u engellemiyoruz
  })

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

  const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
    if (!isDisabled) {
      setTheme(newTheme)
      setIsOpen(false)
    }
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          size='sm'
          disabled={isDisabled}
          className='relative h-9 w-9 rounded-md border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors'
          aria-label={`${t('theme.current')}: ${currentThemeOption.label}`}
        >
          <CurrentIcon className='h-4 w-4 text-neutral-700 dark:text-neutral-200' />
          <span className='sr-only'>{currentThemeOption.label}</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align='end'
        className='w-40 border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 shadow-lg'
        sideOffset={8}
      >
        {themeOptions.map((option) => {
          const Icon = option.icon
          const isSelected = theme === option.value

          return (
            <DropdownMenuItem
              key={option.value}
              onClick={() => handleThemeChange(option.value)}
              className={`flex items-center gap-2 px-3 py-2 text-sm cursor-pointer hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors ${
                isSelected
                  ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
                  : 'text-neutral-700 dark:text-neutral-200'
              }`}
            >
              <Icon className='h-4 w-4' />
              <span>{option.label}</span>
              {isSelected && <div className='ml-auto w-2 h-2 bg-primary-500 rounded-full' />}
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
