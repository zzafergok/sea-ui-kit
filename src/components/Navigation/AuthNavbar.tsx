'use client'

import { useRouter, usePathname } from 'next/navigation'

import React, { useState, useCallback } from 'react'

import { useTranslation } from 'react-i18next'
import { Menu, X, Bell, Search, Settings, LogOut, User, ChevronDown, Home, Users, BarChart3 } from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/Dropdown/Dropdown'
import { Input } from '@/components/Input/Input'
import { Button } from '@/components/Button/Button'
import { ThemeToggle } from '@/components/ThemeToggle/ThemeToggle'
import { LanguageToggle } from '@/components/LanguageToggle/LanguageToggle'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/Avatar/Avatar'

import { useAuth } from '@/hooks/useAuth'

import { cn } from '@/lib/utils'

const navigationItems = [
  { href: '/dashboard', labelKey: 'navigation.dashboard', icon: Home },
  { href: '/users', labelKey: 'navigation.users', icon: Users },
  { href: '/components', labelKey: 'navigation.components', icon: BarChart3 },
] as const

export function AuthNavbar() {
  const router = useRouter()
  const pathname = usePathname()
  const { t } = useTranslation()
  const { user, logout } = useAuth()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const handleNavigation = useCallback(
    (href: string) => {
      router.push(href)
      setIsMobileMenuOpen(false)
    },
    [router],
  )

  const handleLogout = useCallback(async () => {
    try {
      await logout()
      router.push('/')
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }, [logout, router])

  const handleProfileClick = useCallback(() => {
    router.push('/profile')
  }, [router])

  const handleSettingsClick = useCallback(() => {
    router.push('/settings')
  }, [router])

  const getUserInitials = useCallback(() => {
    if (user?.username) {
      return user.username.substring(0, 2).toUpperCase()
    }
    return user?.email?.substring(0, 2).toUpperCase() || 'U'
  }, [user])

  return (
    <header className='sticky top-0 z-navbar bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 shadow-sm'>
      <nav className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16'>
          {/* Left Side - Logo & Navigation */}
          <div className='flex items-center space-x-8'>
            {/* Logo */}
            <button
              onClick={() => handleNavigation('/dashboard')}
              className='text-xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 dark:from-primary-400 dark:to-accent-400 bg-clip-text text-transparent hover:opacity-80 transition-opacity'
            >
              Sea UI Kit
            </button>

            {/* Desktop Navigation */}
            <div className='hidden lg:flex items-center space-x-6'>
              {navigationItems.map((item) => {
                const Icon = item.icon
                return (
                  <button
                    key={item.href}
                    onClick={() => handleNavigation(item.href)}
                    className={cn(
                      'flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-all duration-200',
                      pathname === item.href
                        ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                        : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 hover:text-primary-600 dark:hover:text-primary-400',
                    )}
                  >
                    <Icon className='h-4 w-4' />
                    {t(item.labelKey)}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Center - Search */}
          <div className='hidden md:flex flex-1 max-w-md mx-8'>
            <div className='relative w-full'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400' />
              <Input
                placeholder={t('components.navbar.searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className='pl-10 pr-4'
              />
            </div>
          </div>

          {/* Right Side - Actions & User Menu */}
          <div className='flex items-center space-x-4'>
            {/* Theme & Language Toggles */}
            <div className='hidden sm:flex items-center space-x-2'>
              <ThemeToggle />
              <LanguageToggle />
            </div>

            {/* Notifications */}
            <Button variant='ghost' size='sm' className='relative p-2'>
              <Bell className='h-5 w-5' />
              <span className='absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full'></span>
            </Button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant='ghost'
                  className='flex items-center space-x-2 hover:bg-neutral-50 dark:hover:bg-neutral-800'
                >
                  <Avatar className='h-8 w-8'>
                    <AvatarImage src={user?.avatar} />
                    <AvatarFallback className='text-xs font-medium'>{getUserInitials()}</AvatarFallback>
                  </Avatar>
                  <div className='hidden sm:block text-left'>
                    <p className='text-sm font-medium text-neutral-900 dark:text-neutral-100'>
                      {user?.username || user?.email}
                    </p>
                    <p className='text-xs text-neutral-500 dark:text-neutral-400'>{user?.role}</p>
                  </div>
                  <ChevronDown className='h-4 w-4 text-neutral-400' />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align='end' className='w-56'>
                <DropdownMenuLabel className='font-normal'>
                  <div className='flex flex-col space-y-1'>
                    <p className='text-sm font-medium'>{user?.username || user?.email}</p>
                    <p className='text-xs text-neutral-500 dark:text-neutral-400'>{user?.email}</p>
                  </div>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuItem onClick={handleProfileClick}>
                  <User className='mr-2 h-4 w-4' />
                  {t('navigation.profile')}
                </DropdownMenuItem>

                <DropdownMenuItem onClick={handleSettingsClick}>
                  <Settings className='mr-2 h-4 w-4' />
                  {t('navigation.settings')}
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem onClick={handleLogout} className='text-red-600 dark:text-red-400'>
                  <LogOut className='mr-2 h-4 w-4' />
                  {t('auth.logout')}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu Button */}
            <div className='lg:hidden'>
              <Button variant='ghost' size='sm' onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className='p-2'>
                {isMobileMenuOpen ? <X className='h-5 w-5' /> : <Menu className='h-5 w-5' />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className='lg:hidden border-t border-neutral-200 dark:border-neutral-800'>
            <div className='px-4 py-6 space-y-6'>
              {/* Mobile Search */}
              <div className='md:hidden'>
                <div className='relative'>
                  <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400' />
                  <Input
                    placeholder={t('components.navbar.searchPlaceholder')}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className='pl-10 pr-4 w-full'
                  />
                </div>
              </div>

              {/* Mobile Navigation */}
              <div className='space-y-2'>
                {navigationItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <button
                      key={item.href}
                      onClick={() => handleNavigation(item.href)}
                      className={cn(
                        'flex items-center gap-3 w-full px-3 py-3 text-base font-medium rounded-md transition-all duration-200',
                        pathname === item.href
                          ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                          : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800',
                      )}
                    >
                      <Icon className='h-5 w-5' />
                      {t(item.labelKey)}
                    </button>
                  )
                })}
              </div>

              {/* Mobile Theme & Language */}
              <div className='sm:hidden space-y-4 pt-4 border-t border-neutral-200 dark:border-neutral-800'>
                <div className='flex items-center justify-between'>
                  <span className='text-sm font-medium'>
                    {t('theme.light')}/{t('theme.dark')}
                  </span>
                  <ThemeToggle />
                </div>
                <div className='flex items-center justify-between'>
                  <span className='text-sm font-medium'>Dil / Language</span>
                  <LanguageToggle />
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
