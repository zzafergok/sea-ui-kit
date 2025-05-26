'use client'

import { useRouter } from 'next/navigation'

import React, { useState, useRef, useEffect } from 'react'

import { useTranslation } from 'react-i18next'
import { Bell, Search, User, Settings, LogOut, Menu, X, ChevronDown } from 'lucide-react'

import { Button } from '../Button/Button'
import { ThemeToggle } from '../ThemeToggle/ThemeToggle'
import { LanguageToggle } from '../LanguageToggle/LanguageToggle'

import { useAuth } from '@/hooks/useAuth'

import { cn } from '@/lib/utils'

interface AuthNavbarProps {
  className?: string
}

export function AuthNavbar({ className }: AuthNavbarProps) {
  const { t } = useTranslation()
  const { user, logout } = useAuth()
  const router = useRouter()

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
  const [isNotificationOpen, setIsNotificationOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')

  const profileMenuRef = useRef<HTMLDivElement>(null)
  const notificationRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setIsProfileMenuOpen(false)
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setIsNotificationOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const navigation = [
    { name: t('navigation.users'), href: '/users' },
    { name: t('navigation.settings'), href: '/settings' },
  ]

  const handleNavigate = (href: string) => {
    router.push(href)
    setIsMenuOpen(false)
  }

  const handleLogout = async () => {
    await logout()
    router.push('/')
  }

  const mockNotifications = [
    {
      id: 1,
      message: 'Yeni kullanıcı kaydı alındı',
      time: '5 dk önce',
      unread: true,
    },
    {
      id: 2,
      message: 'Sistem güncellemesi tamamlandı',
      time: '1 saat önce',
      unread: false,
    },
  ]

  const getInitials = (name?: string, email?: string) => {
    if (name) {
      return name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    }
    if (email) {
      return email[0].toUpperCase()
    }
    return 'U'
  }

  return (
    <nav
      className={cn(
        'sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80',
        'dark:bg-neutral-950/95 dark:supports-[backdrop-filter]:bg-neutral-950/80 dark:border-neutral-800',
        className,
      )}
    >
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='flex h-16 items-center justify-between'>
          {/* Logo ve Navigasyon */}
          <div className='flex items-center space-x-8'>
            {/* Mobile Menu Button */}
            <Button
              variant='ghost'
              size='icon'
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className='lg:hidden text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100'
            >
              {isMenuOpen ? <X className='h-5 w-5' /> : <Menu className='h-5 w-5' />}
            </Button>

            {/* Logo */}
            <div className='flex items-center space-x-3'>
              <div className='relative'>
                <div className='flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 shadow-sm'>
                  <span className='text-sm font-bold text-white'>S</span>
                </div>
                <div className='absolute -right-1 -top-1 h-2 w-2 rounded-full bg-accent-400 animate-pulse' />
              </div>
              <div className='hidden sm:block'>
                <span className='text-lg font-semibold bg-gradient-to-r from-primary-700 to-accent-600 bg-clip-text text-transparent dark:from-primary-400 dark:to-accent-400'>
                  Sea UI Kit
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className='hidden lg:flex lg:items-center lg:space-x-1'>
              {navigation.map((item) => (
                <Button
                  key={item.name}
                  variant='ghost'
                  onClick={() => handleNavigate(item.href)}
                  className='px-3 py-2 text-sm font-medium text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:text-neutral-100 dark:hover:bg-neutral-800'
                >
                  {item.name}
                </Button>
              ))}
            </div>
          </div>

          {/* Search Bar - Desktop */}
          <div className='hidden md:flex flex-1 max-w-lg mx-8'>
            <div className='relative w-full'>
              <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400 dark:text-neutral-500' />
              <input
                type='text'
                placeholder={t('components.navbar.searchPlaceholder')}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className={cn(
                  'w-full rounded-lg border bg-white pl-10 pr-4 py-2 text-sm placeholder:text-neutral-500',
                  'border-neutral-300 focus:border-primary-500 focus:ring-1 focus:ring-primary-500',
                  'dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-100 dark:placeholder:text-neutral-400',
                  'dark:focus:border-primary-400 dark:focus:ring-primary-400',
                )}
              />
            </div>
          </div>

          {/* Right Side Actions */}
          <div className='flex items-center space-x-2'>
            {/* Theme & Language Toggle */}
            <div className='hidden sm:flex items-center space-x-1'>
              <ThemeToggle />
              <LanguageToggle />
            </div>

            {/* Notifications */}
            <div className='relative' ref={notificationRef}>
              <Button
                variant='ghost'
                size='icon'
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                className='relative text-neutral-700 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-neutral-100'
              >
                <Bell className='h-5 w-5' />
                {mockNotifications.some((n) => n.unread) && (
                  <span className='absolute -right-1 -top-1 flex h-3 w-3'>
                    <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75'></span>
                    <span className='relative inline-flex h-3 w-3 rounded-full bg-red-500'></span>
                  </span>
                )}
              </Button>

              {isNotificationOpen && (
                <div className='absolute right-0 mt-2 w-80 rounded-lg border bg-white shadow-lg ring-1 ring-black ring-opacity-5 dark:bg-neutral-900 dark:border-neutral-700 z-50'>
                  <div className='p-4 border-b border-neutral-200 dark:border-neutral-700'>
                    <h3 className='font-medium text-neutral-900 dark:text-neutral-100'>
                      {t('components.navbar.notifications')}
                    </h3>
                  </div>
                  <div className='max-h-96 overflow-y-auto'>
                    {mockNotifications.length > 0 ? (
                      mockNotifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={cn(
                            'p-4 border-b border-neutral-100 dark:border-neutral-700 last:border-b-0',
                            'hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors',
                            notification.unread && 'bg-blue-50/50 dark:bg-blue-900/10',
                          )}
                        >
                          <p className='text-sm text-neutral-900 dark:text-neutral-100'>{notification.message}</p>
                          <p className='text-xs text-neutral-500 dark:text-neutral-400 mt-1'>{notification.time}</p>
                        </div>
                      ))
                    ) : (
                      <div className='p-4 text-center text-neutral-500 dark:text-neutral-400'>
                        {t('components.navbar.noNotifications')}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Profile Menu */}
            <div className='relative' ref={profileMenuRef}>
              <Button
                variant='ghost'
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className='flex items-center space-x-2 px-3 py-2 text-neutral-700 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-neutral-100'
              >
                <div className='flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-accent-500 text-sm font-medium text-white shadow-sm'>
                  {getInitials(user?.username, user?.email)}
                </div>
                <div className='hidden sm:block text-left'>
                  <p className='text-sm font-medium'>{user?.username || 'Kullanıcı'}</p>
                </div>
                <ChevronDown className='h-4 w-4' />
              </Button>

              {isProfileMenuOpen && (
                <div className='absolute right-0 mt-2 w-56 rounded-lg border bg-white shadow-lg ring-1 ring-black ring-opacity-5 dark:bg-neutral-900 dark:border-neutral-700 z-50'>
                  <div className='p-4 border-b border-neutral-200 dark:border-neutral-700'>
                    <p className='text-sm font-medium text-neutral-900 dark:text-neutral-100'>
                      {user?.username || 'Kullanıcı'}
                    </p>
                    <p className='text-xs text-neutral-500 dark:text-neutral-400 truncate'>{user?.email}</p>
                  </div>

                  <div className='p-2'>
                    <Button
                      onClick={() => {
                        handleNavigate('/profile')
                        setIsProfileMenuOpen(false)
                      }}
                      variant='ghost'
                      className='flex w-full items-center space-x-2 px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800'
                    >
                      <User className='h-4 w-4' />
                      <span>{t('navigation.profile')}</span>
                    </Button>

                    <Button
                      onClick={() => {
                        handleNavigate('/settings')
                        setIsProfileMenuOpen(false)
                      }}
                      variant='ghost'
                      className='flex w-full items-center space-x-2 px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800'
                    >
                      <Settings className='h-4 w-4' />
                      <span>{t('navigation.settings')}</span>
                    </Button>

                    <div className='my-2 h-px bg-neutral-200 dark:bg-neutral-700' />

                    <Button
                      onClick={() => {
                        handleLogout()
                        setIsProfileMenuOpen(false)
                      }}
                      variant='ghost'
                      className='flex w-full items-center space-x-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20'
                    >
                      <LogOut className='h-4 w-4' />
                      <span>{t('auth.logout')}</span>
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className='lg:hidden border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950'>
          <div className='space-y-1 px-4 pb-3 pt-2'>
            {/* Mobile Search */}
            <div className='relative mb-4'>
              <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400 dark:text-neutral-500' />
              <input
                type='text'
                placeholder={t('components.navbar.searchPlaceholder')}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className={cn(
                  'w-full rounded-lg border bg-white pl-10 pr-4 py-2 text-sm placeholder:text-neutral-500',
                  'border-neutral-300 focus:border-primary-500 focus:ring-1 focus:ring-primary-500',
                  'dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-100 dark:placeholder:text-neutral-400',
                )}
              />
            </div>

            {/* Mobile Navigation Links */}
            {navigation.map((item) => (
              <Button
                key={item.name}
                onClick={() => handleNavigate(item.href)}
                variant='ghost'
                className='w-full justify-start px-3 py-2 text-base font-medium text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:text-neutral-100 dark:hover:bg-neutral-800'
              >
                {item.name}
              </Button>
            ))}

            {/* Mobile Theme & Language */}
            <div className='flex items-center justify-between pt-4 border-t border-neutral-200 dark:border-neutral-800 sm:hidden'>
              <span className='text-sm font-medium text-neutral-700 dark:text-neutral-300'>Tema & Dil</span>
              <div className='flex items-center space-x-2'>
                <ThemeToggle />
                <LanguageToggle />
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
