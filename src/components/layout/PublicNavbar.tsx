'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { Menu, X, Sparkles, ArrowRight } from 'lucide-react'

import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/core/Button/Button'
import { ThemeToggle } from '@/components/ui/ThemeToggle/ThemeToggle'
import { LanguageToggle } from '@/components/ui/LanguageToggle/LanguageToggle'

export function PublicNavbar() {
  const router = useRouter()
  const pathname = usePathname()
  const { t } = useTranslation()
  const { isAuthenticated } = useAuth()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navigation = [
    { name: t('navigation.home'), href: '/' },
    { name: t('navigation.about'), href: '/about' },
    { name: t('navigation.contact'), href: '/contact' },
    { name: t('navigation.pricing'), href: '/pricing' },
  ]

  const isActive = (href: string) => pathname === href

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md border-b border-neutral-200/60 dark:border-neutral-700/60 shadow-lg'
            : 'bg-transparent'
        }`}
      >
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between items-center h-16'>
            {/* Logo ve Brand */}
            <div className='flex items-center'>
              <Link href='/' className='flex items-center space-x-3 group'>
                <div className='w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 dark:from-primary-600 dark:to-primary-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200'>
                  <Sparkles className='h-4 w-4 text-white' />
                </div>
                <span className='text-xl font-bold bg-gradient-to-r from-primary-600 to-blue-600 dark:from-primary-400 dark:to-blue-400 bg-clip-text text-transparent'>
                  Sea UI Kit
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className='hidden lg:flex lg:items-center lg:space-x-1'>
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive(item.href)
                      ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 border border-primary-200/50 dark:border-primary-700/50'
                      : 'text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Desktop Actions - Increased z-index */}
            <div className='hidden lg:flex lg:items-center lg:space-x-3'>
              {/* Theme Toggle - Increased z-index */}
              <div className='relative z-[9999]'>
                <ThemeToggle />
              </div>

              {/* Language Toggle - Increased z-index */}
              <div className='relative z-[9998]'>
                <LanguageToggle />
              </div>

              {/* Auth Actions */}
              {isAuthenticated ? (
                <Button
                  onClick={() => router.push('/dashboard')}
                  className='bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 dark:from-primary-600 dark:to-primary-500 dark:hover:from-primary-500 dark:hover:to-primary-400 text-white border-0'
                >
                  {t('navigation.dashboard')}
                  <ArrowRight className='ml-2 h-4 w-4' />
                </Button>
              ) : (
                <div className='flex items-center space-x-2'>
                  <Button
                    variant='ghost'
                    onClick={() => router.push('/auth/login')}
                    className='text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100'
                  >
                    {t('auth.login')}
                  </Button>
                  <Button
                    onClick={() => router.push('/auth/register')}
                    className='bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 dark:from-primary-600 dark:to-primary-500 dark:hover:from-primary-500 dark:hover:to-primary-400 text-white border-0'
                  >
                    {t('auth.register')}
                  </Button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className='lg:hidden'>
              <Button
                variant='ghost'
                size='sm'
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className='text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100'
              >
                {isMobileMenuOpen ? <X className='h-5 w-5' /> : <Menu className='h-5 w-5' />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu - Increased z-index */}
        {isMobileMenuOpen && (
          <div className='lg:hidden absolute top-full left-0 right-0 z-[9999] bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md border-b border-neutral-200/60 dark:border-neutral-700/60 shadow-lg'>
            <div className='px-4 py-6 space-y-4'>
              {/* Mobile Navigation Links */}
              <div className='space-y-2'>
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive(item.href)
                        ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400'
                        : 'text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              {/* Mobile Actions */}
              <div className='border-t border-neutral-200 dark:border-neutral-700 pt-4'>
                <div className='flex items-center justify-between mb-4'>
                  <span className='text-sm font-medium text-neutral-900 dark:text-neutral-100'>
                    {t('navigation.settings')}
                  </span>
                  <div className='flex items-center space-x-2'>
                    <div className='relative z-[9999]'>
                      <ThemeToggle />
                    </div>
                    <div className='relative z-[9998]'>
                      <LanguageToggle />
                    </div>
                  </div>
                </div>

                {/* Mobile Auth Actions */}
                {isAuthenticated ? (
                  <Button
                    onClick={() => {
                      setIsMobileMenuOpen(false)
                      router.push('/dashboard')
                    }}
                    className='w-full bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white'
                  >
                    {t('navigation.dashboard')}
                    <ArrowRight className='ml-2 h-4 w-4' />
                  </Button>
                ) : (
                  <div className='space-y-2'>
                    <Button
                      variant='outline'
                      onClick={() => {
                        setIsMobileMenuOpen(false)
                        router.push('/auth/login')
                      }}
                      className='w-full border-neutral-200 dark:border-neutral-600'
                    >
                      {t('auth.login')}
                    </Button>
                    <Button
                      onClick={() => {
                        setIsMobileMenuOpen(false)
                        router.push('/auth/register')
                      }}
                      className='w-full bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white'
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

      {/* Spacer for fixed navbar */}
      <div className='h-16' />
    </>
  )
}
