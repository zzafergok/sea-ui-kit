'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useAppDispatch, useAppSelector } from '@/store'
import { setLanguage, selectCurrentLanguage, selectAvailableLanguages } from '@/store/slices/langSlice'
import { cn } from '@/lib/utils'

interface LanguageToggleProps {
  className?: string
}

export function LanguageToggle({ className }: LanguageToggleProps) {
  const dispatch = useAppDispatch()
  const { i18n } = useTranslation()

  const currentLanguage = useAppSelector(selectCurrentLanguage)
  const availableLanguages = useAppSelector(selectAvailableLanguages)

  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleLanguageChange = (lang: string) => {
    dispatch(setLanguage(lang))
    i18n.changeLanguage(lang)
    setIsOpen(false)
  }

  // Dil bayrak ikonları
  const languageFlags: Record<string, React.ReactNode> = {
    tr: <TurkishFlagIcon />,
    en: <EnglishFlagIcon />,
  }

  if (!mounted) {
    return <div className={cn('h-10 w-20 rounded-md bg-neutral-200 dark:bg-neutral-700', className)} />
  }

  return (
    <div className={cn('relative', className)} ref={dropdownRef}>
      <button
        type='button'
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex items-center justify-between w-20 h-10 px-3 py-2 rounded-md',
          'bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700',
          'text-sm font-medium text-neutral-900 dark:text-neutral-100',
          'hover:bg-neutral-50 dark:hover:bg-neutral-750 transition-colors duration-200',
          'focus:outline-none focus:ring-2 focus:ring-primary-400 dark:focus:ring-primary-600 focus:ring-offset-2',
        )}
        aria-expanded={isOpen}
        aria-haspopup='listbox'
      >
        <span className='flex items-center'>
          <span className='mr-2 flex-shrink-0'>{languageFlags[currentLanguage]}</span>
          <span className='uppercase'>{currentLanguage}</span>
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={cn(
              'absolute top-full mt-1 w-full rounded-md shadow-lg',
              'bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700',
              'py-1 z-50',
            )}
            role='listbox'
          >
            {availableLanguages.map((lang) => (
              <button
                key={lang}
                className={cn(
                  'w-full flex items-center px-3 py-2 text-sm',
                  'hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors duration-150',
                  currentLanguage === lang
                    ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                    : 'text-neutral-900 dark:text-neutral-100',
                )}
                onClick={() => handleLanguageChange(lang)}
                role='option'
                aria-selected={currentLanguage === lang}
              >
                <span className='mr-2 flex-shrink-0'>{languageFlags[lang]}</span>
                <span className='uppercase'>{lang}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Türk Bayrağı İkonu
function TurkishFlagIcon() {
  return (
    <svg width='16' height='16' viewBox='0 0 512 512' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <rect width='512' height='512' rx='256' fill='#E30A17' />
      <circle cx='256' cy='256' r='128' fill='#FFFFFF' />
      <circle cx='296' cy='256' r='96' fill='#E30A17' />
      <path
        d='M355.43 256L392 292.57L382.63 301.94L346.06 265.37L309.49 301.94L300.12 292.57L336.69 256L300.12 219.43L309.49 210.06L346.06 246.63L382.63 210.06L392 219.43L355.43 256Z'
        fill='#FFFFFF'
      />
    </svg>
  )
}

// İngiliz Bayrağı İkonu
function EnglishFlagIcon() {
  return (
    <svg width='16' height='16' viewBox='0 0 512 512' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <rect width='512' height='512' rx='256' fill='#012169' />
      <path d='M0 0L512 512M512 0L0 512' stroke='#FFFFFF' strokeWidth='102.4' />
      <path d='M256 0V512M0 256H512' stroke='#FFFFFF' strokeWidth='170.67' />
      <path d='M0 0L512 512M512 0L0 512' stroke='#C8102E' strokeWidth='68.27' />
      <path d='M256 0V512M0 256H512' stroke='#C8102E' strokeWidth='102.4' />
    </svg>
  )
}
