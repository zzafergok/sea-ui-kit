'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '@/hooks/useTheme'
import { cn } from '@/lib/utils'
import { useTranslation } from 'react-i18next'

interface ThemeToggleProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export function ThemeToggle({ className, size = 'md' }: ThemeToggleProps) {
  const { t } = useTranslation()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Hidrasyon uyumsuzluğunu önlemek için bileşenin montajını bekleyin
  useEffect(() => {
    setMounted(true)
  }, [])

  // Tema değiştirme işlevi
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  // Boyut sınıfları
  const sizeClasses = {
    sm: 'w-10 h-5',
    md: 'w-14 h-7',
    lg: 'w-16 h-8',
  }

  // Güneş ve ay ikonları için boyutlar
  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  }

  if (!mounted) {
    return <div className={cn('rounded-full bg-neutral-200 dark:bg-neutral-700', sizeClasses[size], className)} />
  }

  return (
    <button
      type='button'
      aria-label={t(theme === 'dark' ? 'theme.light' : 'theme.dark')}
      className={cn(
        'relative rounded-full focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 dark:focus:ring-primary-600',
        'bg-neutral-100 dark:bg-neutral-800 transition-colors duration-300',
        'border border-neutral-200 dark:border-neutral-700',
        sizeClasses[size],
        className,
      )}
      onClick={toggleTheme}
    >
      <span className='sr-only'>{t(theme === 'dark' ? 'theme.light' : 'theme.dark')}</span>

      {/* Arkaplan göstergeleri */}
      <div
        className={cn('absolute inset-0 flex items-center justify-between px-1', size === 'sm' ? 'px-0.5' : 'px-1.5')}
      >
        {/* Güneş arkaplanı */}
        <span className='text-yellow-400 opacity-40 dark:opacity-0 transition-opacity'>
          <SunIcon className={iconSizes[size]} />
        </span>

        {/* Ay arkaplanı */}
        <span className='text-blue-300 opacity-0 dark:opacity-40 transition-opacity'>
          <FullMoonIcon className={iconSizes[size]} />
        </span>
      </div>

      {/* Hareketli gösterge */}
      <motion.div
        className={cn(
          'absolute bg-white rounded-full flex items-center justify-center shadow-md',
          size === 'sm'
            ? 'w-4 h-4 top-0.5 left-0.5'
            : size === 'md'
              ? 'w-5 h-5 top-[3px] left-0.5'
              : 'w-6 h-6 top-0.5 left-0.5',
        )}
        animate={{
          x: theme === 'dark' ? (size === 'sm' ? 20 : size === 'md' ? 28 : 32) : 0,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      >
        {theme === 'dark' ? (
          <FullMoonIcon
            className={cn('text-yellow-100', size === 'sm' ? 'w-3 h-3' : size === 'md' ? 'w-4.5 h-4.5' : 'w-5 h-5')}
          />
        ) : (
          <SunIcon
            className={cn('text-yellow-500', size === 'sm' ? 'w-3 h-3' : size === 'md' ? 'w-4.5 h-4.5' : 'w-5 h-5')}
          />
        )}
      </motion.div>
    </button>
  )
}

// Modern Güneş İkonu
function SunIcon({ className }: { className?: string }) {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className={className}>
      <path
        d='M12 3v2M12 19v2M18.36 5.64l-1.41 1.41M7.05 16.95l-1.41 1.41M5.64 5.64l1.41 1.41M16.95 16.95l1.41 1.41M3 12h2M19 12h2'
        strokeWidth='2'
        stroke='currentColor'
        strokeLinecap='round'
      />
      <circle cx='12' cy='12' r='5' fill='currentColor' />
    </svg>
  )
}

// Meteor Çarpmış Dolunay İkonu
function FullMoonIcon({ className }: { className?: string }) {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className={className}>
      {/* Ana dolunay dairesi */}
      <circle cx='12' cy='12' r='10' fill='currentColor' />

      {/* Meteor çarpma kraterleri - daha belirgin ve asimetrik */}
      <circle cx='8' cy='7' r='2.5' fill='rgba(0,0,0,0.15)' />
      <circle cx='15' cy='9' r='2' fill='rgba(0,0,0,0.15)' />
      <circle cx='12' cy='15' r='3' fill='rgba(0,0,0,0.15)' />
      <circle cx='17' cy='13' r='1.5' fill='rgba(0,0,0,0.15)' />
      <circle cx='7' cy='12' r='1.8' fill='rgba(0,0,0,0.15)' />

      {/* Meteor çarpma izleri - hafif ışık yansımaları */}
      <circle cx='8' cy='7' r='1' fill='rgba(255,255,255,0.1)' />
      <circle cx='15' cy='9' r='0.8' fill='rgba(255,255,255,0.1)' />
      <circle cx='12' cy='15' r='1.2' fill='rgba(255,255,255,0.1)' />
    </svg>
  )
}
