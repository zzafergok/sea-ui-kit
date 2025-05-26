'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/Button/Button'
import { ThemeToggle } from '@/components/ThemeToggle/ThemeToggle'
import { LanguageToggle } from '@/components/LanguageToggle/LanguageToggle'
import { Menu, X, LogIn, UserPlus, Waves, ExternalLink, Github, BookOpen } from 'lucide-react'
import { cn } from '@/lib/utils'

export function PublicNavbar() {
  const { t } = useTranslation()
  const router = useRouter()
  const pathname = usePathname()
  const { isAuthenticated } = useAuth()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navigation = [
    {
      name: t('navigation.home'),
      href: '/',
      current: pathname === '/',
    },
    {
      name: t('navigation.about'),
      href: '/about',
      current: pathname === '/about',
    },
    {
      name: t('navigation.pricing'),
      href: '/pricing',
      current: pathname === '/pricing',
    },
    {
      name: t('navigation.contact'),
      href: '/contact',
      current: pathname === '/contact',
    },
  ]

  const externalLinks = [
    {
      name: 'Dokümantasyon',
      href: 'https://sea-ui-kit-docs.vercel.app',
      icon: BookOpen,
    },
    {
      name: 'GitHub',
      href: 'https://github.com/zzafergok/sea-ui-kit',
      icon: Github,
    },
  ]

  return (
    <nav className='bg-white/80 dark:bg-neutral-900/80 backdrop-blur-lg border-b border-neutral-200/50 dark:border-neutral-800/50 sticky top-0 z-navbar'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between h-16'>
          {/* Logo and Navigation */}
          <div className='flex items-center'>
            {/* Logo */}
            <Link href='/' className='flex items-center space-x-2'>
              <div className='flex items-center justify-center w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg shadow-lg'>
                <Waves className='h-5 w-5 text-white' />
              </div>
              <span className='text-xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 dark:from-primary-400 dark:to-accent-400 bg-clip-text text-transparent'>
                Sea UI Kit
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className='hidden md:ml-10 md:flex md:space-x-1'>
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                    item.current
                      ? 'bg-primary-50 dark:bg-primary-950/50 text-primary-700 dark:text-primary-300 border border-primary-200/50 dark:border-primary-800/50'
                      : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-50 dark:hover:bg-neutral-800/50',
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Right side - External Links, Theme, Auth */}
          <div className='flex items-center space-x-4'>
            {/* External Links (Desktop) */}
            <div className='hidden lg:flex items-center space-x-2'>
              {externalLinks.map((link) => {
                const Icon = link.icon
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='inline-flex items-center space-x-2 px-3 py-1.5 text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 rounded-md transition-colors'
                  >
                    <Icon className='h-4 w-4' />
                    <span>{link.name}</span>
                    <ExternalLink className='h-3 w-3 opacity-50' />
                  </a>
                )
              })}
            </div>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Language Toggle */}
            <LanguageToggle />

            {/* Auth Buttons */}
            <div className='hidden md:flex items-center space-x-2'>
              {isAuthenticated ? (
                <Button onClick={() => router.push('/dashboard')} className='flex items-center space-x-2'>
                  <span>Dashboard</span>
                </Button>
              ) : (
                <>
                  <Button
                    variant='ghost'
                    onClick={() => router.push('/auth/login')}
                    className='flex items-center space-x-2'
                  >
                    <LogIn className='h-4 w-4' />
                    <span>{t('auth.login')}</span>
                  </Button>
                  <Button
                    onClick={() => router.push('/auth/register')}
                    className='flex items-center space-x-2 bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700'
                  >
                    <UserPlus className='h-4 w-4' />
                    <span>{t('auth.register')}</span>
                  </Button>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <Button
              variant='ghost'
              size='sm'
              className='md:hidden p-2'
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className='h-5 w-5' /> : <Menu className='h-5 w-5' />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className='md:hidden border-t border-neutral-200/50 dark:border-neutral-800/50 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-lg'>
          <div className='px-2 pt-2 pb-3 space-y-1'>
            {/* Navigation Items */}
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'block px-3 py-2 rounded-lg text-base font-medium transition-colors',
                  item.current
                    ? 'bg-primary-50 dark:bg-primary-950/50 text-primary-700 dark:text-primary-300 border border-primary-200/50 dark:border-primary-800/50'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-50 dark:hover:bg-neutral-800/50',
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}

            {/* External Links */}
            <div className='pt-2 border-t border-neutral-200/50 dark:border-neutral-800/50'>
              {externalLinks.map((link) => {
                const Icon = link.icon
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='flex items-center space-x-3 px-3 py-2 rounded-lg text-base font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-50 dark:hover:bg-neutral-800/50'
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Icon className='h-5 w-5' />
                    <span>{link.name}</span>
                    <ExternalLink className='h-4 w-4 opacity-50' />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Mobile Auth Section */}
          <div className='pt-4 pb-3 border-t border-neutral-200/50 dark:border-neutral-800/50'>
            <div className='px-2 space-y-2'>
              {isAuthenticated ? (
                <Button
                  onClick={() => {
                    setIsMobileMenuOpen(false)
                    router.push('/dashboard')
                  }}
                  className='w-full flex items-center justify-center space-x-2'
                >
                  <span>Dashboard</span>
                </Button>
              ) : (
                <>
                  <Button
                    variant='outline'
                    onClick={() => {
                      setIsMobileMenuOpen(false)
                      router.push('/auth/login')
                    }}
                    className='w-full flex items-center justify-center space-x-2'
                  >
                    <LogIn className='h-4 w-4' />
                    <span>{t('auth.login')}</span>
                  </Button>
                  <Button
                    onClick={() => {
                      setIsMobileMenuOpen(false)
                      router.push('/auth/register')
                    }}
                    className='w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700'
                  >
                    <UserPlus className='h-4 w-4' />
                    <span>{t('auth.register')}</span>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
