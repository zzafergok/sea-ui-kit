'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Waves } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { cn } from '@/lib/utils'
import { ThemeToggle } from '@/components/ui/ThemeToggle/ThemeToggle'
import { LanguageToggle } from '@/components/ui/LanguageToggle/LanguageToggle'
import { UserDropdown } from '@/components/ui/UserDropdown/UserDropdown'

export function AuthNavbar() {
  const pathname = usePathname()
  const { t } = useTranslation()

  const navigation = [
    { name: t('navigation.dashboard'), href: '/dashboard' },
    { name: t('navigation.components'), href: '/components' },
    { name: t('navigation.users'), href: '/users' },
    { name: t('navigation.settings'), href: '/settings' },
  ]

  return (
    <nav className='sticky top-0 z-50 bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-700 backdrop-blur-sm'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-16'>
          {/* Logo */}
          <Link href='/dashboard' className='flex items-center space-x-2 hover:opacity-80 transition-opacity'>
            <div className='w-8 h-8 bg-gradient-to-r from-primary-500 to-accent-500 rounded-lg flex items-center justify-center'>
              <Waves className='h-5 w-5 text-white' />
            </div>
            <span className='text-xl font-bold text-neutral-900 dark:text-neutral-100'>Sea UI Kit</span>
          </Link>

          {/* Desktop Navigation */}
          <div className='hidden md:flex items-center space-x-1'>
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'px-3 py-2 rounded-md text-sm font-medium transition-colors',
                  pathname === item.href
                    ? 'bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
                    : 'text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800',
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className='flex items-center space-x-2 dropdown-container'>
            <ThemeToggle />
            <LanguageToggle />
            <UserDropdown />
          </div>
        </div>
      </div>
    </nav>
  )
}
