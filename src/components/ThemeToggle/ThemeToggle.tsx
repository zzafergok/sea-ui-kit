'use client'

import React, { useEffect, useState } from 'react'

import { motion } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { useTheme } from '@/hooks/useTheme'

import { toggleButtonStyles, dropdownStyles, menuItemStyles, iconContainerStyles } from '../ToggleUtils/ToggleStyles'

import { cn } from '@/lib/utils'

interface ThemeToggleProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export function ThemeToggle({ className, size = 'md' }: ThemeToggleProps) {
  const { t } = useTranslation()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = React.useRef<HTMLDivElement>(null)

  // Hidrasyonu önlemek için montajı bekleyin
  useEffect(() => {
    setMounted(true)
  }, [])

  // Dropdown dışında tıklandığında kapatma
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // ESC tuşu ile kapatma
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    document.addEventListener('keydown', handleEsc)
    return () => document.removeEventListener('keydown', handleEsc)
  }, [])

  // Tema değiştirme işlevi
  const handleThemeChange = (newTheme: 'light' | 'dark') => {
    setTheme(newTheme as any)
    setIsOpen(false)
  }

  // Tema ikonlarını belirleme
  const getThemeIcon = (themeType: 'light' | 'dark') => {
    switch (themeType) {
      case 'light':
        return <Sun className='h-4 w-4 text-amber-500' />
      case 'dark':
        return <Moon className='h-4 w-4 text-blue-400' />
    }
  }

  // Boyut sınıfları
  const sizeMapping = {
    sm: {
      button: 'text-xs py-1 px-3',
      icon: 'h-3.5 w-3.5 mr-1',
    },
    md: {
      button: 'text-sm py-2 px-3',
      icon: 'h-4 w-4 mr-2',
    },
    lg: {
      button: 'text-base py-2.5 px-4',
      icon: 'h-5 w-5 mr-2',
    },
  }

  // SSR sırasında veya montaj öncesinde bir yükleme arayüzü göster
  if (!mounted) {
    return <div className={cn(toggleButtonStyles({ size }), className, 'flex items-center justify-center')} />
  }

  return (
    <div className='relative' ref={dropdownRef}>
      <button
        type='button'
        aria-label={t('theme.toggle')}
        aria-expanded={isOpen}
        aria-haspopup='true'
        className={cn(
          toggleButtonStyles({ size, isActive: isOpen }),
          sizeMapping[size].button,
          'flex items-center',
          className,
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={iconContainerStyles}>{getThemeIcon(theme)}</span>
        <span>{t(`theme.${theme}`)}</span>
      </button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className={dropdownStyles({ align: 'left' })}
          role='menu'
          aria-orientation='vertical'
          aria-labelledby='theme-options'
        >
          <button
            className={cn(menuItemStyles({ isActive: theme === 'light' }))}
            role='menuitem'
            onClick={() => handleThemeChange('light')}
          >
            <span className={iconContainerStyles}>{getThemeIcon('light')}</span>
            <span>{t('theme.light')}</span>
          </button>

          <button
            className={cn(menuItemStyles({ isActive: theme === 'dark' }))}
            role='menuitem'
            onClick={() => handleThemeChange('dark')}
          >
            <span className={iconContainerStyles}>{getThemeIcon('dark')}</span>
            <span>{t('theme.dark')}</span>
          </button>
        </motion.div>
      )}
    </div>
  )
}
