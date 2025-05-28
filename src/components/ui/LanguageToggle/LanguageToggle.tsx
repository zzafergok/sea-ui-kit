'use client'

import React, { useCallback, useState, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'
import { useLocale } from '@/hooks/useLocale'
import { cn } from '@/lib/utils'

interface LanguageToggleProps {
  variant?: 'dropdown' | 'cycle'
  size?: 'sm' | 'md' | 'lg'
  align?: 'left' | 'right'
  showLabel?: boolean
  className?: string
}

const languageConfig = {
  tr: {
    label: 'Türkçe',
    nativeLabel: 'Türkçe',
    flag: '🇹🇷',
    description: 'Turkish',
  },
  en: {
    label: 'English',
    nativeLabel: 'English',
    flag: '🇺🇸',
    description: 'English',
  },
} as const

export function LanguageToggle({
  variant = 'dropdown',
  size: _size = 'md',
  align = 'right',
  showLabel = true,
  className,
}: LanguageToggleProps) {
  const { currentLocale, changeLocale, isChangingLanguage } = useLocale()
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (!isOpen) return

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if (!target.closest('[data-language-toggle]')) {
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

  const handleLanguageChange = useCallback(
    (newLocale: 'tr' | 'en') => {
      console.log('[LanguageToggle] Language change requested:', newLocale)

      if (isChangingLanguage || newLocale === currentLocale) {
        console.log('[LanguageToggle] Language change blocked:', {
          isChangingLanguage,
          isSame: newLocale === currentLocale,
        })
        return
      }

      changeLocale(newLocale)
      setIsOpen(false)

      if (typeof window !== 'undefined' && 'vibrate' in navigator) {
        navigator.vibrate(50)
      }
    },
    [changeLocale, isChangingLanguage, currentLocale],
  )

  const handleCycleLanguage = useCallback(() => {
    const languages: Array<'tr' | 'en'> = ['tr', 'en']
    const currentIndex = languages.indexOf(currentLocale)
    const nextLanguage = languages[(currentIndex + 1) % languages.length]
    handleLanguageChange(nextLanguage)
  }, [currentLocale, handleLanguageChange])

  const currentConfig = languageConfig[currentLocale]

  if (variant === 'cycle') {
    return (
      <button
        onClick={handleCycleLanguage}
        disabled={isChangingLanguage}
        className={cn(
          'relative rounded-md px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2',
          'transition-colors duration-300 flex items-center gap-2',
          isChangingLanguage && 'opacity-50 cursor-not-allowed',
          className,
        )}
        aria-label={`Switch language (current: ${currentConfig.label})`}
      >
        <span className='text-sm' role='img' aria-label={currentConfig.description}>
          {currentConfig.flag}
        </span>
        {showLabel && <span className='text-sm font-medium'>{currentConfig.nativeLabel}</span>}
      </button>
    )
  }

  return (
    <div className='relative' data-language-toggle>
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isChangingLanguage}
        className={cn(
          'relative rounded-md px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2',
          'transition-colors duration-300 flex items-center justify-between gap-2 min-w-24',
          isOpen && 'border-primary-300 dark:border-primary-700 shadow-sm',
          isChangingLanguage && 'opacity-50 cursor-not-allowed',
          className,
        )}
        aria-label={`Language options (current: ${currentConfig.label})`}
        aria-expanded={isOpen}
        aria-haspopup='listbox'
      >
        <div className='flex items-center gap-2'>
          <span className='text-sm' role='img' aria-label={currentConfig.description}>
            {currentConfig.flag}
          </span>
          {showLabel && <span className='text-sm font-medium'>{currentConfig.nativeLabel}</span>}
        </div>
        <ChevronDown
          className={cn(
            'h-4 w-4 transition-transform duration-200 flex-shrink-0',
            isOpen && 'rotate-180',
            isChangingLanguage && 'opacity-50',
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
          aria-label='Language options'
        >
          {Object.entries(languageConfig).map(([localeKey, config]) => {
            const isActive = currentLocale === localeKey

            return (
              <button
                key={localeKey}
                onClick={() => handleLanguageChange(localeKey as 'tr' | 'en')}
                disabled={isChangingLanguage}
                className={cn(
                  'w-full flex items-center px-3 py-2 text-sm transition-colors text-left',
                  'hover:bg-neutral-50 dark:hover:bg-neutral-700',
                  isActive && 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400',
                  !isActive && 'text-neutral-900 dark:text-neutral-100',
                  isChangingLanguage && 'opacity-50 cursor-not-allowed',
                )}
                role='option'
                aria-selected={isActive}
                aria-label={config.label}
              >
                <div className='flex-shrink-0 flex items-center justify-center w-6 h-6 mr-2'>
                  <span className='text-sm' role='img' aria-label={config.description}>
                    {config.flag}
                  </span>
                </div>
                <div className='flex flex-col gap-0.5 flex-1 min-w-0'>
                  <span className='text-sm font-medium truncate'>{config.nativeLabel}</span>
                  <span className='text-xs text-neutral-500 dark:text-neutral-400 truncate'>{config.description}</span>
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
