'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Home, Users, Settings, LogOut, Menu, X, User, BarChart3, ChevronDown } from 'lucide-react'

import { useAuth } from '@/hooks/useAuth'

import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/core/Dropdown/Dropdown'
import { Button } from '@/components/core/Button/Button'
import { ThemeToggle } from '@/components/ui/ThemeToggle/ThemeToggle'
import { LanguageToggle } from '@/components/ui/LanguageToggle/LanguageToggle'

import { cn } from '@/lib/utils'

export function AuthNavbar() {
  const router = useRouter()
  const { t } = useTranslation()
  const { user, logout } = useAuth()

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleLogout = async () => {
    try {
      await logout()
      router.push('/')
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  const navigationItems = [
    {
      name: t('navigation.dashboard'),
      href: '/dashboard',
      icon: Home,
    },
    {
      name: t('navigation.components'),
      href: '/components',
      icon: BarChart3,
    },
    {
      name: t('navigation.users'),
      href: '/users',
      icon: Users,
    },
    {
      name: t('navigation.settings'),
      href: '/settings',
      icon: Settings,
    },
  ]

  return (
    <nav className='sticky top-0 z-50 w-full bg-white/80 dark:bg-background/80 backdrop-blur-xl border-b border-neutral-200 dark:border-border navbar-glass'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between h-16'>
          {/* Logo and Brand */}
          <div className='flex items-center'>
            <Link href='/dashboard' className='flex items-center space-x-2 text-xl font-bold'>
              <span className='text-2xl'>🌊</span>
              <span className='bg-gradient-to-r from-primary-600 to-accent-600 dark:from-primary-400 dark:to-accent-400 bg-clip-text text-transparent'>
                Sea UI Kit
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className='hidden md:flex items-center space-x-1'>
            {navigationItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className='flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium text-neutral-700 dark:text-neutral-200 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-neutral-100 dark:hover:bg-neutral-800/50 transition-all duration-200'
                >
                  <Icon className='h-4 w-4' />
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </div>

          {/* Right Side Actions */}
          <div className='flex items-center space-x-3'>
            {/* Theme and Language Toggles */}
            <div className='hidden md:flex items-center space-x-2'>
              <ThemeToggle />
              <LanguageToggle />
            </div>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant='ghost'
                  className='flex items-center space-x-2 px-3 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800/50'
                >
                  <div className='w-8 h-8 rounded-full bg-gradient-to-br from-primary-400 to-accent-400 dark:from-primary-500 dark:to-accent-500 flex items-center justify-center text-white text-sm font-medium'>
                    {user?.username?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <span className='hidden md:block text-sm font-medium text-neutral-700 dark:text-neutral-200'>
                    {user?.username || user?.email}
                  </span>
                  <ChevronDown className='h-4 w-4 text-neutral-500 dark:text-neutral-400' />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align='end'
                className='w-56 bg-white dark:bg-popover border-neutral-200 dark:border-border shadow-lg dark:shadow-xl'
              >
                <DropdownMenuLabel className='text-neutral-900 dark:text-foreground'>
                  {t('navigation.profile')}
                </DropdownMenuLabel>
                <DropdownMenuSeparator className='bg-neutral-200 dark:bg-border' />
                <DropdownMenuItem
                  onClick={() => router.push('/profile')}
                  className='text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800/50 cursor-pointer'
                >
                  <User className='mr-2 h-4 w-4' />
                  {t('navigation.profile')}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => router.push('/settings')}
                  className='text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800/50 cursor-pointer'
                >
                  <Settings className='mr-2 h-4 w-4' />
                  {t('navigation.settings')}
                </DropdownMenuItem>
                <DropdownMenuSeparator className='bg-neutral-200 dark:bg-border' />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className='text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 cursor-pointer'
                >
                  <LogOut className='mr-2 h-4 w-4' />
                  {t('auth.logout')}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu Button */}
            <Button variant='ghost' size='sm' className='md:hidden' onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className='h-5 w-5' /> : <Menu className='h-5 w-5' />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          'md:hidden overflow-hidden transition-all duration-300 ease-in-out',
          mobileMenuOpen ? 'max-h-96' : 'max-h-0',
        )}
      >
        <div className='px-4 pt-2 pb-4 space-y-1 bg-white dark:bg-card border-t border-neutral-200 dark:border-border'>
          {navigationItems.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.name}
                href={item.href}
                className='flex items-center space-x-3 px-3 py-2 rounded-lg text-base font-medium text-neutral-700 dark:text-neutral-200 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-neutral-100 dark:hover:bg-neutral-800/50'
                onClick={() => setMobileMenuOpen(false)}
              >
                <Icon className='h-5 w-5' />
                <span>{item.name}</span>
              </Link>
            )
          })}

          <div className='pt-4 flex items-center space-x-2'>
            <ThemeToggle />
            <LanguageToggle />
          </div>
        </div>
      </div>
    </nav>
  )
}
