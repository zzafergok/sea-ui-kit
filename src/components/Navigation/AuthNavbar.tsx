'use client'

import React, { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Bell, Search, User, Settings, LogOut, Menu, X } from 'lucide-react'
import { Button } from '../Button/Button'
import { ThemeToggle } from '../ThemeToggle/ThemeToggle'
import { LanguageToggle } from '../LanguageToggle/LanguageToggle'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'

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
    { name: t('navigation.dashboard'), href: '/dashboard', current: true },
    { name: t('navigation.users'), href: '/users', current: false },
    { name: t('navigation.settings'), href: '/settings', current: false },
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
      message: t('components.navbar.notifications'),
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

  return (
    <nav className={`bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 ${className}`}>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-16'>
          <div className='flex items-center space-x-4'>
            <Button
              variant='ghost'
              size='icon'
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className='lg:hidden text-neutral-700 dark:text-neutral-300'
            >
              {isMenuOpen ? <X className='h-6 w-6' /> : <Menu className='h-6 w-6' />}
            </Button>

            <div className='flex items-center space-x-2 cursor-pointer' onClick={() => handleNavigate('/dashboard')}>
              <div className='w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center'>
                <span className='text-white font-bold text-sm'>S</span>
              </div>
              <span className='text-xl font-bold text-primary-700 dark:text-primary-400 hidden sm:block'>
                Sea UI Kit
              </span>
            </div>
          </div>

          <div className='hidden lg:flex lg:items-center lg:space-x-6'>
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavigate(item.href)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  item.current
                    ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400'
                    : 'text-neutral-700 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400'
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>

          <div className='hidden md:flex flex-1 max-w-lg mx-8'>
            <div className='relative w-full'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400' />
              <input
                type='text'
                placeholder={t('components.navbar.searchPlaceholder')}
                className='w-full pl-10 pr-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 placeholder-neutral-500 dark:placeholder-neutral-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent'
              />
            </div>
          </div>

          <div className='flex items-center space-x-3'>
            <div className='hidden sm:flex items-center space-x-2'>
              <ThemeToggle />
              <LanguageToggle />
            </div>

            <div className='relative' ref={notificationRef}>
              <Button
                variant='ghost'
                size='icon'
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                className='relative'
              >
                <Bell className='h-5 w-5' />
                {mockNotifications.some((n) => n.unread) && (
                  <span className='absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full'></span>
                )}
              </Button>

              {isNotificationOpen && (
                <div className='absolute right-0 mt-2 w-80 bg-white dark:bg-neutral-800 rounded-lg shadow-lg border border-neutral-200 dark:border-neutral-700 z-50'>
                  <div className='p-4 border-b border-neutral-200 dark:border-neutral-700'>
                    <h3 className='font-semibold text-neutral-900 dark:text-neutral-100'>
                      {t('components.navbar.notifications')}
                    </h3>
                  </div>
                  <div className='max-h-96 overflow-y-auto'>
                    {mockNotifications.length > 0 ? (
                      mockNotifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-4 border-b border-neutral-100 dark:border-neutral-700 last:border-b-0 hover:bg-neutral-50 dark:hover:bg-neutral-700 ${
                            notification.unread ? 'bg-blue-50 dark:bg-blue-900/10' : ''
                          }`}
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
                  {mockNotifications.length > 0 && (
                    <div className='p-3 border-t border-neutral-200 dark:border-neutral-700'>
                      <button className='text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300'>
                        {t('components.navbar.viewAllNotifications')}
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className='relative' ref={profileMenuRef}>
              <Button
                variant='ghost'
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className='flex items-center space-x-2 px-3'
              >
                <div className='w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center'>
                  <span className='text-white text-sm font-medium'>{user?.name?.charAt(0).toUpperCase() || 'U'}</span>
                </div>
                <span className='hidden sm:block text-sm font-medium text-neutral-700 dark:text-neutral-300'>
                  {user?.name}
                </span>
              </Button>

              {isProfileMenuOpen && (
                <div className='absolute right-0 mt-2 w-48 bg-white dark:bg-neutral-800 rounded-lg shadow-lg border border-neutral-200 dark:border-neutral-700 z-50'>
                  <div className='p-2'>
                    <button
                      onClick={() => {
                        handleNavigate('/profile')
                        setIsProfileMenuOpen(false)
                      }}
                      className='flex items-center space-x-2 w-full px-3 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-md'
                    >
                      <User className='h-4 w-4' />
                      <span>{t('navigation.profile')}</span>
                    </button>
                    <button
                      onClick={() => {
                        handleNavigate('/settings')
                        setIsProfileMenuOpen(false)
                      }}
                      className='flex items-center space-x-2 w-full px-3 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-md'
                    >
                      <Settings className='h-4 w-4' />
                      <span>{t('navigation.settings')}</span>
                    </button>
                    <hr className='my-2 border-neutral-200 dark:border-neutral-700' />
                    <button
                      onClick={() => {
                        handleLogout()
                        setIsProfileMenuOpen(false)
                      }}
                      className='flex items-center space-x-2 w-full px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md'
                    >
                      <LogOut className='h-4 w-4' />
                      <span>{t('auth.logout')}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className='lg:hidden border-t border-neutral-200 dark:border-neutral-800'>
          <div className='px-4 py-4 space-y-2'>
            <div className='relative mb-4'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400' />
              <input
                type='text'
                placeholder={t('components.navbar.searchPlaceholder')}
                className='w-full pl-10 pr-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800'
              />
            </div>

            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavigate(item.href)}
                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                  item.current
                    ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400'
                    : 'text-neutral-700 dark:text-neutral-300'
                }`}
              >
                {item.name}
              </button>
            ))}

            <div className='flex items-center justify-between pt-4 border-t border-neutral-200 dark:border-neutral-800 sm:hidden'>
              <ThemeToggle />
              <LanguageToggle />
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
