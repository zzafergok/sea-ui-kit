'use client'

import React from 'react'
import { Monitor, Moon, Sun } from 'lucide-react'
import { useTheme } from '@/hooks/useTheme'
import { Button } from '@/components/core/Button/Button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/core/Dropdown/Dropdown'

export function ThemeToggle() {
  const { theme, setTheme, isDisabled } = useTheme()

  const themeOptions = [
    {
      value: 'light' as const,
      label: 'Açık',
      icon: Sun,
    },
    {
      value: 'dark' as const,
      label: 'Koyu',
      icon: Moon,
    },
  ]

  const currentTheme = themeOptions.find((option) => option.value === theme)
  const CurrentIcon = currentTheme?.icon || Monitor

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          size='sm'
          disabled={isDisabled}
          className='w-9 h-9 p-0 text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors'
          aria-label='Tema değiştir'
        >
          <CurrentIcon className='h-4 w-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-40 z-[9999]' sideOffset={5} collisionPadding={8}>
        {themeOptions.map((option) => {
          const Icon = option.icon
          return (
            <DropdownMenuItem
              key={option.value}
              onClick={() => setTheme(option.value)}
              className={`flex items-center cursor-pointer ${
                theme === option.value
                  ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400'
                  : ''
              }`}
            >
              <Icon className='mr-2 h-4 w-4' />
              {option.label}
              {theme === option.value && <div className='ml-auto w-2 h-2 bg-primary-500 rounded-full' />}
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
