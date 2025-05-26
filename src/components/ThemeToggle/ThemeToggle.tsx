'use client'

import React, { useState, useEffect } from 'react'
import { Sun, Moon, Monitor, Check } from 'lucide-react'

import { Button } from '@/components/Button/Button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/Dropdown/Dropdown'
import { useTheme } from '@/hooks/useTheme'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'

const themes = [
  {
    key: 'light',
    icon: Sun,
    labelKey: 'theme.light',
  },
  {
    key: 'dark',
    icon: Moon,
    labelKey: 'theme.dark',
  },
  {
    key: 'system',
    icon: Monitor,
    labelKey: 'theme.system',
  },
] as const

type _ThemeKey = (typeof themes)[number]['key']

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const { t } = useTranslation()
  const [mounted, setMounted] = useState(false)

  // Hydration mismatch'i önlemek için
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant='ghost' size='sm' className='w-9 h-9 p-0'>
        <Monitor className='h-4 w-4' />
        <span className='sr-only'>Toggle theme</span>
      </Button>
    )
  }

  const currentTheme = themes.find((t) => t.key === theme) || themes[2]
  const CurrentIcon = currentTheme.icon

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          size='sm'
          className='w-9 h-9 p-0 hover:bg-neutral-100 dark:hover:bg-neutral-800'
          aria-label={`Current theme: ${t(currentTheme.labelKey)}`}
        >
          <CurrentIcon className='h-4 w-4 transition-transform duration-200 hover:scale-110' />
          <span className='sr-only'>Tema değiştir</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align='end' className='w-48'>
        {themes.map((themeOption) => {
          const Icon = themeOption.icon
          const isActive = theme === themeOption.key

          return (
            <DropdownMenuItem
              key={themeOption.key}
              onClick={() => setTheme(themeOption.key)}
              className={cn(
                'flex items-center justify-between cursor-pointer',
                isActive && 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400',
              )}
            >
              <div className='flex items-center space-x-2'>
                <Icon className='h-4 w-4' />
                <span>{t(themeOption.labelKey)}</span>
              </div>
              {isActive && <Check className='h-4 w-4 text-primary-600 dark:text-primary-400' />}
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

// Basit toggle versiyonu (sadece light/dark)
export function SimpleThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant='ghost' size='sm' className='w-9 h-9 p-0'>
        <Sun className='h-4 w-4' />
      </Button>
    )
  }

  const isDark = theme === 'dark'

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark')
  }

  return (
    <Button
      variant='ghost'
      size='sm'
      onClick={toggleTheme}
      className='w-9 h-9 p-0 hover:bg-neutral-100 dark:hover:bg-neutral-800'
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? (
        <Sun className='h-4 w-4 transition-transform duration-200 hover:scale-110' />
      ) : (
        <Moon className='h-4 w-4 transition-transform duration-200 hover:scale-110' />
      )}
    </Button>
  )
}
