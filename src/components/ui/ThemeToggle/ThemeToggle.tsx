'use client'

import * as React from 'react'

import { Moon, Sun } from 'lucide-react'

import { useTheme } from '@/hooks/useTheme'

import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/core/Dropdown/Dropdown'
import { Button } from '@/components/core/Button/Button'

export function ThemeToggle() {
  const { theme, setTheme, isDisabled } = useTheme()

  const getThemeIcon = () => {
    switch (theme) {
      case 'dark':
        return <Moon className='h-4 w-4' />
      case 'light':
        return <Sun className='h-4 w-4' />
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          size='sm'
          className='h-9 w-9 p-0 hover:bg-primary-50 dark:hover:bg-primary-900/20 border border-primary-200/50 dark:border-primary-700/30'
          disabled={isDisabled}
        >
          <div className='flex items-center justify-center'>{getThemeIcon()}</div>
          <span className='sr-only'>Tema değiştir</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align='end'
        className='min-w-[140px] bg-white dark:bg-card border border-neutral-200 dark:border-border shadow-lg'
      >
        <DropdownMenuItem
          onClick={() => setTheme('light')}
          className={`flex items-center gap-2 cursor-pointer ${
            theme === 'light'
              ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
              : 'hover:bg-neutral-50 dark:hover:bg-neutral-800'
          }`}
        >
          <Sun className='h-4 w-4' />
          <span>Açık Tema</span>
          {theme === 'light' && <div className='ml-auto w-2 h-2 bg-primary-500 rounded-full' />}
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => setTheme('dark')}
          className={`flex items-center gap-2 cursor-pointer ${
            theme === 'dark'
              ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
              : 'hover:bg-neutral-50 dark:hover:bg-neutral-800'
          }`}
        >
          <Moon className='h-4 w-4' />
          <span>Koyu Tema</span>
          {theme === 'dark' && <div className='ml-auto w-2 h-2 bg-primary-500 rounded-full' />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
