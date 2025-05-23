'use client'

import React, { useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import { LoadingSpinner } from '@/components/Loading/LoadingSpinner'

interface AuthLayoutProps {
  children: React.ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/auth/login')
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <LoadingSpinner size='lg' />
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className='min-h-screen bg-neutral-50 dark:bg-neutral-900'>
      <header className='bg-white dark:bg-neutral-800 shadow-sm border-b border-neutral-200 dark:border-neutral-700'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between items-center h-16'>
            <div className='flex items-center'>
              <h1 className='text-xl font-semibold text-neutral-900 dark:text-neutral-100'>Sea UI Kit Dashboard</h1>
            </div>
            <nav className='flex items-center space-x-4'>
              <a href='/dashboard' className='text-neutral-700 dark:text-neutral-300 hover:text-primary-600'>
                Dashboard
              </a>
              <a href='/profile' className='text-neutral-700 dark:text-neutral-300 hover:text-primary-600'>
                Profil
              </a>
              <a href='/settings' className='text-neutral-700 dark:text-neutral-300 hover:text-primary-600'>
                Ayarlar
              </a>
            </nav>
          </div>
        </div>
      </header>
      <main className='max-w-7xl mx-auto py-6 sm:px-6 lg:px-8'>{children}</main>
    </div>
  )
}
