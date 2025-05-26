'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { Menu, X, Github } from 'lucide-react'

import { Button } from '@/components/Button/Button'
import { ThemeToggle } from '@/components/ThemeToggle/ThemeToggle'
import { LanguageToggle } from '@/components/LanguageToggle/LanguageToggle'
import { useAuth } from '@/hooks/useAuth'
import { cn } from '@/lib/utils'

const navigationItems = [
  { href: '/', labelKey: 'navigation.home' },
  { href: '/about', labelKey: 'navigation.about' },
  { href: '/contact', labelKey: 'navigation.contact' },
  { href: '/pricing', labelKey: 'navigation.pricing' },
] as const

export function PublicNavbar() {
  const router = useRouter()
  const pathname = usePathname()
  const { t } = useTranslation()
  const { isAuthenticated, user } = useAuth()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false)
  }, [])

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev)
  }, [])

  const handleNavigation = useCallback(
    (href: string) => {
      router.push(href)
      closeMobileMenu()
    },
    [router, closeMobileMenu],
  )

  const handleAuthAction = useCallback(() => {
    if (isAuthenticated) {
      router.push('/dashboard')
    } else {
      router.push('/auth/login')
    }
    closeMobileMenu()
  }, [isAuthenticated, router, closeMobileMenu])

  // Scroll event handler
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    closeMobileMenu()
  }, [pathname, closeMobileMenu])

  // Close mobile menu on escape key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isMobileMenuOpen) {
        closeMobileMenu()
      }
    }

    if (isMobileMenuOpen) {
      document.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen, closeMobileMenu])

  return (
    <header
      className={cn(
        'sticky top-0 z-navbar w-full transition-all duration-300',
        isScrolled
          ? 'bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800 shadow-sm'
          : 'bg-transparent',
      )}
    >
      <nav className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16'>
          {/* Logo */}
          <div className='flex-shrink-0'>
            <button
              onClick={() => handleNavigation('/')}
              className='text-2xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 dark:from-primary-400 dark:to-accent-400 bg-clip-text text-transparent hover:opacity-80 transition-opacity'
            >
              Sea UI Kit
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className='hidden md:block'>
            <div className='flex items-center space-x-8'>
              {navigationItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleNavigation(item.href)}
                  className={cn(
                    'text-sm font-medium transition-colors duration-200 hover:text-primary-600 dark:hover:text-primary-400',
                    pathname === item.href
                      ? 'text-primary-600 dark:text-primary-400'
                      : 'text-neutral-700 dark:text-neutral-300',
                  )}
                >
                  {t(item.labelKey)}
                </button>
              ))}
            </div>
          </div>

          {/* Desktop Actions */}
          <div className='hidden md:flex items-center space-x-4'>
            <ThemeToggle />
            <LanguageToggle />

            <Button
              variant='ghost'
              size='sm'
              onClick={() => window.open('https://github.com/zzafergok/sea-ui-kit', '_blank')}
              className='flex items-center gap-2'
            >
              <Github className='h-4 w-4' />
              GitHub
            </Button>

            <Button onClick={handleAuthAction} size='sm'>
              {isAuthenticated ? t('pages.home.goToDashboard') : t('auth.login')}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className='md:hidden'>
            <Button
              variant='ghost'
              size='sm'
              onClick={toggleMobileMenu}
              className='p-2'
              aria-label='Toggle mobile menu'
            >
              {isMobileMenuOpen ? <X className='h-5 w-5' /> : <Menu className='h-5 w-5' />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className='md:hidden'>
            <div className='absolute left-0 right-0 top-16 bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 shadow-lg'>
              <div className='px-4 py-6 space-y-6'>
                {/* Navigation Links */}
                <div className='space-y-4'>
                  {navigationItems.map((item) => (
                    <button
                      key={item.href}
                      onClick={() => handleNavigation(item.href)}
                      className={cn(
                        'block w-full text-left text-base font-medium transition-colors duration-200',
                        pathname === item.href
                          ? 'text-primary-600 dark:text-primary-400'
                          : 'text-neutral-700 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400',
                      )}
                    >
                      {t(item.labelKey)}
                    </button>
                  ))}
                </div>

                {/* Mobile Actions */}
                <div className='space-y-4 pt-4 border-t border-neutral-200 dark:border-neutral-800'>
                  <div className='flex items-center justify-between'>
                    <span className='text-sm font-medium text-neutral-700 dark:text-neutral-300'>
                      {t('theme.light')}/{t('theme.dark')}
                    </span>
                    <ThemeToggle />
                  </div>

                  <div className='flex items-center justify-between'>
                    <span className='text-sm font-medium text-neutral-700 dark:text-neutral-300'>Dil / Language</span>
                    <LanguageToggle />
                  </div>

                  <Button
                    variant='outline'
                    onClick={() => window.open('https://github.com/zzafergok/sea-ui-kit', '_blank')}
                    className='w-full justify-start'
                  >
                    <Github className='h-4 w-4 mr-2' />
                    GitHub&apos;da Görüntüle
                  </Button>

                  <Button onClick={handleAuthAction} className='w-full'>
                    {isAuthenticated
                      ? `${t('pages.home.goToDashboard')} ${user?.username ? `(${user.username})` : ''}`
                      : t('auth.login')}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
