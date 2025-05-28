'use client'

import React, { useCallback, useState, useEffect } from 'react'
import { Moon, Sun, ChevronDown } from 'lucide-react'
import { useTheme } from '@/hooks/useTheme'
import { cn } from '@/lib/utils'

interface ThemeToggleProps {
  variant?: 'dropdown' | 'cycle'
  size?: 'sm' | 'md' | 'lg'
  align?: 'left' | 'right'
  showLabel?: boolean
  className?: string
}

const themeConfig = {
  light: {
    label: 'Açık Tema',
    labelEn: 'Light Theme',
    icon: Sun,
    description: 'Açık renkli arayüz',
    descriptionEn: 'Light colored interface',
  },
  dark: {
    label: 'Koyu Tema',
    labelEn: 'Dark Theme',
    icon: Moon,
    description: 'Koyu renkli arayüz',
    descriptionEn: 'Dark colored interface',
  },
} as const

export function ThemeToggle({
  variant = 'dropdown',
  size: _size = 'md',
  align = 'right',
  showLabel = true,
  className,
}: ThemeToggleProps) {
  const { theme, setTheme, isTransitioning, isDisabled, isInitialized } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const [currentLanguage, setCurrentLanguage] = useState('tr')

  useEffect(() => {
    if (typeof window === 'undefined') return

    const detectLanguage = () => {
      const savedLang = localStorage.getItem('language')
      if (savedLang) {
        setCurrentLanguage(savedLang)
        return
      }
      const browserLang = navigator.language.startsWith('en') ? 'en' : 'tr'
      setCurrentLanguage(browserLang)
    }

    detectLanguage()

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'language' && e.newValue) {
        setCurrentLanguage(e.newValue)
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  useEffect(() => {
    if (!isOpen) return

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if (!target.closest('[data-theme-toggle]')) {
        setIsOpen(false)
      }
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen])

  const handleThemeChange = useCallback(
    (newTheme: 'light' | 'dark' | 'system') => {
      console.log('[ThemeToggle] Theme change requested:', newTheme)

      if (isDisabled || !isInitialized || isTransitioning || newTheme === theme) {
        console.log('[ThemeToggle] Theme change blocked:', {
          isDisabled,
          isInitialized,
          isTransitioning,
          isSame: newTheme === theme,
        })
        return
      }

      setTheme(newTheme)
      setIsOpen(false)

      if (typeof window !== 'undefined' && 'vibrate' in navigator) {
        navigator.vibrate(50)
      }
    },
    [setTheme, isDisabled, isInitialized, isTransitioning, theme],
  )

  const handleCycleTheme = useCallback(() => {
    const themes: Array<'light' | 'dark' | 'system'> = ['light', 'dark', 'system']
    const currentIndex = themes.indexOf(theme)
    const nextTheme = themes[(currentIndex + 1) % themes.length]
    handleThemeChange(nextTheme)
  }, [theme, handleThemeChange])

  const getCurrentConfig = useCallback(
    (themeKey: string) => {
      const config = themeConfig[themeKey as keyof typeof themeConfig]
      return {
        ...config,
        label: currentLanguage === 'en' ? config.labelEn : config.label,
        description: currentLanguage === 'en' ? config.descriptionEn : config.description,
      }
    },
    [currentLanguage],
  )

  const currentConfig = getCurrentConfig(theme)
  const CurrentIcon = currentConfig.icon

  if (!isInitialized) {
    return (
      <div
        className={cn(
          'relative rounded-md px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 opacity-50',
          className,
        )}
      >
        <div className='flex items-center gap-2'>
          <div className='h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent' />
          {showLabel && <span className='text-sm'>Loading...</span>}
        </div>
      </div>
    )
  }

  if (variant === 'cycle') {
    return (
      <button
        onClick={handleCycleTheme}
        disabled={isDisabled}
        className={cn(
          'relative rounded-md px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2',
          'transition-colors duration-300 flex items-center gap-2',
          isDisabled && 'opacity-50 cursor-not-allowed',
          className,
        )}
        aria-label={`${currentLanguage === 'en' ? 'Switch theme' : 'Tema değiştir'} (${
          currentLanguage === 'en' ? 'current' : 'şu an'
        }: ${currentConfig.label})`}
      >
        <CurrentIcon
          className={cn(
            'h-4 w-4 transition-transform duration-150',
            isTransitioning || isDisabled ? 'scale-90 opacity-50' : 'scale-100 opacity-100',
          )}
        />
        {showLabel && <span className='text-sm font-medium'>{currentConfig.label}</span>}
      </button>
    )
  }

  return (
    <div className='relative' data-theme-toggle>
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isDisabled}
        className={cn(
          'relative rounded-md px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2',
          'transition-colors duration-300 flex items-center justify-between gap-2 min-w-24',
          isOpen && 'border-primary-300 dark:border-primary-700 shadow-sm',
          isDisabled && 'opacity-50 cursor-not-allowed',
          className,
        )}
        aria-label={`${currentLanguage === 'en' ? 'Theme options' : 'Tema seçenekleri'} (${
          currentLanguage === 'en' ? 'current' : 'şu an'
        }: ${currentConfig.label})`}
        aria-expanded={isOpen}
        aria-haspopup='listbox'
      >
        <div className='flex items-center gap-2'>
          <CurrentIcon
            className={cn(
              'h-4 w-4 transition-all duration-150',
              isTransitioning || isDisabled ? 'scale-90 opacity-50' : 'scale-100 opacity-100',
            )}
          />
          {showLabel && <span className='text-sm font-medium'>{currentConfig.label}</span>}
        </div>
        <ChevronDown
          className={cn(
            'h-4 w-4 transition-transform duration-200 flex-shrink-0',
            isOpen && 'rotate-180',
            isDisabled && 'opacity-50',
          )}
        />
      </button>

      {isOpen && (
        <div
          className={cn(
            'absolute top-full mt-1 rounded-md shadow-lg bg-white dark:bg-neutral-800',
            'border border-neutral-200 dark:border-neutral-700 py-1 z-50 min-w-48',
            align === 'right' ? 'right-0' : 'left-0',
            'animate-fade-in',
          )}
          role='listbox'
          aria-label={currentLanguage === 'en' ? 'Theme options' : 'Tema seçenekleri'}
        >
          {Object.entries(themeConfig).map(([themeKey, config]) => {
            const IconComponent = config.icon
            const isActive = theme === themeKey
            const itemConfig = getCurrentConfig(themeKey)

            return (
              <button
                key={themeKey}
                onClick={() => handleThemeChange(themeKey as 'light' | 'dark' | 'system')}
                disabled={isDisabled}
                className={cn(
                  'w-full flex items-center px-3 py-2 text-sm transition-colors text-left',
                  'hover:bg-neutral-50 dark:hover:bg-neutral-700',
                  isActive && 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400',
                  !isActive && 'text-neutral-900 dark:text-neutral-100',
                  isDisabled && 'opacity-50 cursor-not-allowed',
                )}
                role='option'
                aria-selected={isActive}
                aria-label={itemConfig.label}
              >
                <div className='flex-shrink-0 flex items-center justify-center w-6 h-6 mr-2'>
                  <IconComponent className='h-4 w-4' />
                </div>
                <div className='flex flex-col gap-0.5 flex-1 min-w-0'>
                  <span className='text-sm font-medium truncate'>{itemConfig.label}</span>
                  <span className='text-xs text-neutral-500 dark:text-neutral-400 truncate'>
                    {itemConfig.description}
                  </span>
                </div>
                {isActive && <div className='flex-shrink-0 w-2 h-2 bg-current rounded-full ml-2 opacity-60' />}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
