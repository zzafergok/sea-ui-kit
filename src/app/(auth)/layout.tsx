'use client'

import React, { useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import { LoadingSpinner } from '@/components/Loading/LoadingSpinner'
import { AuthNavbar, AuthFooter } from '@/components/Navigation'

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
    <div className='min-h-screen flex flex-col bg-neutral-50 dark:bg-neutral-900'>
      <AuthNavbar />
      <main className='flex-1 max-w-7xl mx-auto w-full py-6 px-4 sm:px-6 lg:px-8'>{children}</main>
      <AuthFooter />
    </div>
  )
}
