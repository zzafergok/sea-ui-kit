'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/Button/Button'
import { ThemeToggle } from '@/components/ThemeToggle/ThemeToggle'
import { LanguageToggle } from '@/components/LanguageToggle/LanguageToggle'
import { useAuth } from '@/hooks/useAuth'
import { Menu, X, Home, Info, Phone, DollarSign, LogIn, User } from 'lucide-react'
import { cn } from '@/lib/utils'

export function PublicNavbar() {
  const router = useRouter()
  const pathname = usePathname()
  const { t } = useTranslation()
  const { isAuthenticated, user, isLoading } = useAuth()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Hydration mismatch'i önlemek için
  useEffect(() => {
    setMounted(true)
  }, [])

  // Mobile menu kapatma (route değişikliğinde)
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  const navigation = [
    {
      name: t('navigation.home'),
      href: '/',
      icon: Home,
      current: pathname === '/',
    },
    {
      name: t('navigation.about'),
      href: '/about',
      icon: Info,
      current: pathname === '/about',
    },
    {
      name: t('navigation.contact'),
      href: '/contact',
      icon: Phone,
      current: pathname === '/contact',
    },
    {
      name: t('navigation.pricing'),
      href: '/pricing',
      icon: DollarSign,
      current: pathname === '/pricing',
    },
  ]

  const handleAuthAction = () => {
    if (isAuthenticated) {
      router.push('/dashboard')
    } else {
      router.push('/auth/login')
    }
  }

  // Hydration tamamlanmamışsa basit navbar göster
  if (!mounted) {
    return (
      <nav className='bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-700 sticky top-0 z-50'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between h-16'>
            <div className='flex items-center'>
              <Link href='/' className='text-xl font-bold text-primary-600 dark:text-primary-400'>
                Sea UI Kit
              </Link>
            </div>
            <div className='flex items-center space-x-2'>
              <ThemeToggle />
              <LanguageToggle />
            </div>
          </div>
        </div>
      </nav>
    )
  }

  return (
    <nav className='bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-700 sticky top-0 z-50 backdrop-blur-sm bg-white/80 dark:bg-neutral-900/80'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between h-16'>
          {/* Logo */}
          <div className='flex items-center'>
            <Link
              href='/'
              className='text-xl font-bold text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors'
            >
              Sea UI Kit
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className='hidden md:flex items-center space-x-8'>
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'flex items-center space-x-1 text-sm font-medium transition-colors',
                    item.current
                      ? 'text-primary-600 dark:text-primary-400'
                      : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100',
                  )}
                >
                  <Icon className='h-4 w-4' />
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </div>

          {/* Desktop Actions */}
          <div className='hidden md:flex items-center space-x-4'>
            <ThemeToggle />
            <LanguageToggle />

            {isLoading ? (
              <div className='w-20 h-9 bg-neutral-200 dark:bg-neutral-700 animate-pulse rounded' />
            ) : isAuthenticated ? (
              <div className='flex items-center space-x-3'>
                <span className='text-sm text-neutral-600 dark:text-neutral-400'>
                  Hoş geldin, {user?.username || user?.email}
                </span>
                <Button size='sm' onClick={handleAuthAction} className='flex items-center space-x-2'>
                  <User className='h-4 w-4' />
                  <span>Dashboard</span>
                </Button>
              </div>
            ) : (
              <Button size='sm' onClick={handleAuthAction} className='flex items-center space-x-2'>
                <LogIn className='h-4 w-4' />
                <span>{t('auth.login')}</span>
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className='md:hidden flex items-center space-x-2'>
            <ThemeToggle />
            <LanguageToggle />
            <Button variant='ghost' size='sm' onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className='p-2'>
              {isMobileMenuOpen ? <X className='h-5 w-5' /> : <Menu className='h-5 w-5' />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className='md:hidden border-t border-neutral-200 dark:border-neutral-700 py-4'>
            <div className='space-y-1'>
              {navigation.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      'flex items-center space-x-3 px-3 py-2 rounded-md text-base font-medium transition-colors',
                      item.current
                        ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                        : 'text-neutral-500 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-neutral-100',
                    )}
                  >
                    <Icon className='h-5 w-5' />
                    <span>{item.name}</span>
                  </Link>
                )
              })}
            </div>

            {/* Mobile Auth Section */}
            <div className='mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-700'>
              {isLoading ? (
                <div className='px-3 py-2'>
                  <div className='w-32 h-8 bg-neutral-200 dark:bg-neutral-700 animate-pulse rounded' />
                </div>
              ) : isAuthenticated ? (
                <div className='space-y-3 px-3'>
                  <div className='text-sm text-neutral-600 dark:text-neutral-400'>
                    Hoş geldin, {user?.username || user?.email}
                  </div>
                  <Button size='sm' onClick={handleAuthAction} className='w-full justify-start'>
                    <User className='h-4 w-4 mr-2' />
                    Dashboard
                  </Button>
                </div>
              ) : (
                <div className='px-3'>
                  <Button size='sm' onClick={handleAuthAction} className='w-full justify-start'>
                    <LogIn className='h-4 w-4 mr-2' />
                    {t('auth.login')}
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
