'use client'

import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Menu, X, ChevronDown } from 'lucide-react'
import { Button } from '../Button/Button'
import { ThemeToggle } from '../ThemeToggle/ThemeToggle'
import { LanguageToggle } from '../LanguageToggle/LanguageToggle'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'

interface PublicNavbarProps {
  className?: string
}

export function PublicNavbar({ className }: PublicNavbarProps) {
  const { t } = useTranslation()
  const { isAuthenticated } = useAuth()
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])

  const navigation = [
    { name: t('navigation.home'), href: '/', current: false },
    { name: t('navigation.about'), href: '/about', current: false },
    { name: t('navigation.contact'), href: '/contact', current: false },
    { name: t('navigation.pricing'), href: '/pricing', current: false },
  ]

  const handleNavigate = (href: string) => {
    router.push(href)
    setIsMenuOpen(false)
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md shadow-lg border-b border-neutral-200 dark:border-neutral-800'
          : 'bg-transparent'
      } ${className}`}
    >
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-16 lg:h-20'>
          <div className='flex-shrink-0 cursor-pointer' onClick={() => handleNavigate('/')}>
            <div className='flex items-center space-x-2'>
              <div className='w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center'>
                <span className='text-white font-bold text-sm lg:text-base'>S</span>
              </div>
              <span className='text-xl lg:text-2xl font-bold text-primary-700 dark:text-primary-400'>Sea UI Kit</span>
            </div>
          </div>

          <div className='hidden lg:flex lg:items-center lg:space-x-8'>
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavigate(item.href)}
                className='text-neutral-700 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200 font-medium'
              >
                {item.name}
              </button>
            ))}
          </div>

          <div className='hidden lg:flex lg:items-center lg:space-x-4'>
            <ThemeToggle />
            <LanguageToggle />

            {isAuthenticated ? (
              <Button onClick={() => handleNavigate('/dashboard')} variant='default' size='sm'>
                {t('navigation.dashboard')}
              </Button>
            ) : (
              <div className='flex items-center space-x-3'>
                <Button onClick={() => handleNavigate('/auth/login')} variant='ghost' size='sm'>
                  {t('auth.login')}
                </Button>
                <Button onClick={() => handleNavigate('/auth/register')} variant='default' size='sm'>
                  {t('auth.register')}
                </Button>
              </div>
            )}
          </div>

          <div className='flex items-center space-x-2 lg:hidden'>
            <ThemeToggle />
            <LanguageToggle />
            <Button
              variant='ghost'
              size='icon'
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className='text-neutral-700 dark:text-neutral-300'
            >
              {isMenuOpen ? <X className='h-6 w-6' /> : <Menu className='h-6 w-6' />}
            </Button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className='lg:hidden fixed inset-0 top-16 bg-white dark:bg-neutral-900 z-40'>
          <div className='px-4 py-6 space-y-6'>
            <div className='space-y-4'>
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavigate(item.href)}
                  className='block w-full text-left px-4 py-3 text-lg font-medium text-neutral-700 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-lg transition-all duration-200'
                >
                  {item.name}
                </button>
              ))}
            </div>

            <div className='border-t border-neutral-200 dark:border-neutral-800 pt-6'>
              {isAuthenticated ? (
                <Button
                  onClick={() => handleNavigate('/dashboard')}
                  variant='default'
                  className='w-full justify-center'
                  size='lg'
                >
                  {t('navigation.dashboard')}
                </Button>
              ) : (
                <div className='space-y-3'>
                  <Button
                    onClick={() => handleNavigate('/auth/login')}
                    variant='outline'
                    className='w-full justify-center'
                    size='lg'
                  >
                    {t('auth.login')}
                  </Button>
                  <Button
                    onClick={() => handleNavigate('/auth/register')}
                    variant='default'
                    className='w-full justify-center'
                    size='lg'
                  >
                    {t('auth.register')}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
