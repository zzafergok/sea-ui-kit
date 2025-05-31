'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { User, Settings, LogOut, Menu, X, Home, Users, BarChart3, Sparkles } from 'lucide-react'

import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/core/Button/Button'
import { ThemeToggle } from '@/components/ui/ThemeToggle/ThemeToggle'
import { LanguageToggle } from '@/components/ui/LanguageToggle/LanguageToggle'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/core/Dropdown/Dropdown'

export function AuthNavbar() {
  const router = useRouter()
  const pathname = usePathname()
  const { t } = useTranslation()
  const { user, logout } = useAuth()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLogout = async () => {
    try {
      await logout()
      router.push('/')
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  const navigation = [
    { name: t('navigation.dashboard'), href: '/dashboard', icon: Home },
    { name: t('navigation.components'), href: '/components', icon: BarChart3 },
    { name: t('navigation.users'), href: '/users', icon: Users },
    { name: t('navigation.settings'), href: '/settings', icon: Settings },
  ]

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/')

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
              <Link href='/dashboard' className='flex items-center space-x-3 group'>
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
              {navigation.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive(item.href)
                        ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 border border-primary-200/50 dark:border-primary-700/50'
                        : 'text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                    }`}
                  >
                    <Icon className='h-4 w-4 mr-2' />
                    {item.name}
                  </Link>
                )
              })}
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

              {/* User Menu - Increased z-index */}
              <div className='relative z-[9997]'>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant='ghost'
                      size='sm'
                      className='flex items-center space-x-2 text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                    >
                      <div className='w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 dark:from-primary-600 dark:to-primary-500 rounded-full flex items-center justify-center'>
                        <User className='h-4 w-4 text-white' />
                      </div>
                      <span className='hidden xl:block font-medium'>
                        {user?.username || user?.email?.split('@')[0] || 'User'}
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align='end' className='w-56 z-[9997]' sideOffset={5}>
                    <DropdownMenuLabel className='font-normal'>
                      <div className='flex flex-col space-y-1'>
                        <p className='text-sm font-medium'>{user?.username || 'Kullanıcı'}</p>
                        <p className='text-xs text-neutral-500 dark:text-neutral-400'>{user?.email}</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => router.push('/profile')}>
                      <User className='mr-2 h-4 w-4' />
                      {t('navigation.profile')}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push('/settings')}>
                      <Settings className='mr-2 h-4 w-4' />
                      {t('navigation.settings')}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className='text-red-600 dark:text-red-400 focus:text-red-600 dark:focus:text-red-400'
                    >
                      <LogOut className='mr-2 h-4 w-4' />
                      {t('auth.logout')}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
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
                {navigation.map((item) => {
                  const Icon = item.icon
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                        isActive(item.href)
                          ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400'
                          : 'text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                      }`}
                    >
                      <Icon className='h-4 w-4 mr-3' />
                      {item.name}
                    </Link>
                  )
                })}
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

                {/* Mobile User Info */}
                <div className='flex items-center space-x-3 p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg'>
                  <div className='w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 dark:from-primary-600 dark:to-primary-500 rounded-full flex items-center justify-center'>
                    <User className='h-5 w-5 text-white' />
                  </div>
                  <div className='flex-1 min-w-0'>
                    <p className='text-sm font-medium text-neutral-900 dark:text-neutral-100 truncate'>
                      {user?.username || 'Kullanıcı'}
                    </p>
                    <p className='text-xs text-neutral-500 dark:text-neutral-400 truncate'>{user?.email}</p>
                  </div>
                  <Button
                    variant='ghost'
                    size='sm'
                    onClick={handleLogout}
                    className='text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300'
                  >
                    <LogOut className='h-4 w-4' />
                  </Button>
                </div>
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
