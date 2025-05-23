'use client'

import React from 'react'
import { ThemeToggle } from '@/components/ThemeToggle/ThemeToggle'
import { LanguageToggle } from '@/components/LanguageToggle/LanguageToggle'

interface PublicLayoutProps {
  children: React.ReactNode
}

export default function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className='min-h-screen bg-neutral-50 dark:bg-neutral-900'>
      <header className='bg-white dark:bg-neutral-800 shadow-sm border-b border-neutral-200 dark:border-neutral-700'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between items-center h-16'>
            <div className='flex items-center'>
              <h1 className='text-xl font-semibold text-primary-700 dark:text-primary-500'>Sea UI Kit</h1>
            </div>
            <nav className='flex items-center space-x-4'>
              <a href='/' className='text-neutral-700 dark:text-neutral-300 hover:text-primary-600'>
                Ana Sayfa
              </a>
              <a href='/about' className='text-neutral-700 dark:text-neutral-300 hover:text-primary-600'>
                Hakkında
              </a>
              <a href='/contact' className='text-neutral-700 dark:text-neutral-300 hover:text-primary-600'>
                İletişim
              </a>
              <a href='/pricing' className='text-neutral-700 dark:text-neutral-300 hover:text-primary-600'>
                Fiyatlandırma
              </a>
              <a
                href='/auth/login'
                className='bg-primary-500 text-white px-4 py-2 rounded-md hover:bg-primary-600 transition-colors'
              >
                Giriş Yap
              </a>
              <ThemeToggle />
              <LanguageToggle />
            </nav>
          </div>
        </div>
      </header>
      <main>{children}</main>
      <footer className='bg-white dark:bg-neutral-800 border-t border-neutral-200 dark:border-neutral-700'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
          <div className='text-center text-neutral-600 dark:text-neutral-400'>
            <p>&copy; 2024 Sea UI Kit. Tüm hakları saklıdır.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
