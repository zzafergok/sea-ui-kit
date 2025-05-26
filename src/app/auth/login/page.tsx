'use client'

import React, { useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { LoginForm } from '@/components/auth/LoginForm'
import { useAuth } from '@/hooks/useAuth'
import { LoginFormValues } from '@/lib/validations/auth'
import { LoadingSpinner } from '@/components/Loading/LoadingSpinner'
import { Button } from '@/components/Button/Button'
import { ArrowLeft } from 'lucide-react'

function LoginPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { isAuthenticated, login, isLoading } = useAuth()

  const redirectTo = searchParams.get('redirect') || '/dashboard'
  const error = searchParams.get('error')

  // Login işlemi
  const handleLogin = async (data: LoginFormValues) => {
    try {
      console.log('Login form submitted from page')
      await login(data)
      // LoginForm kendi yönlendirmesini yapacak
    } catch (error) {
      console.error('Login failed:', error)
    }
  }

  // Zaten giriş yapılmışsa yönlendir - SADECE ilk yüklemede
  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      console.log('Already authenticated on page load, redirecting to:', redirectTo)
      router.replace(redirectTo) // replace kullan push yerine
    }
  }, []) // Boş dependency array - sadece mount'ta çalışır

  // Loading durumunda spinner göster
  if (isLoading) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-900'>
        <div className='text-center space-y-4'>
          <LoadingSpinner size='lg' />
          <p className='text-sm text-neutral-600 dark:text-neutral-400'>Kimlik doğrulanıyor...</p>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-neutral-50 dark:bg-neutral-900'>
      {/* Header with back button */}
      <div className='absolute top-4 left-4 z-10'>
        <Button
          variant='ghost'
          size='sm'
          onClick={() => router.push('/')}
          className='flex items-center space-x-2 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100'
        >
          <ArrowLeft className='h-4 w-4' />
          <span>Ana Sayfaya Dön</span>
        </Button>
      </div>

      {/* Error message from URL */}
      {error && (
        <div className='absolute top-16 left-1/2 transform -translate-x-1/2 z-10'>
          <div className='bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-2 rounded-lg text-sm'>
            {error === 'unauthorized' && 'Bu sayfaya erişim için giriş yapmalısınız'}
            {error === 'session_expired' && 'Oturumunuz sona erdi, lütfen tekrar giriş yapın'}
            {error === 'invalid_token' && 'Geçersiz token, lütfen tekrar giriş yapın'}
          </div>
        </div>
      )}

      {/* Login Form */}
      <LoginForm
        onSubmit={handleLogin}
        redirectOnSuccess={redirectTo}
        variant='default'
        showRememberMe={true}
        showForgotPassword={true}
        showRegisterLink={true}
      />
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className='min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-900'>
          <div className='text-center space-y-4'>
            <LoadingSpinner size='lg' />
            <p className='text-sm text-neutral-600 dark:text-neutral-400'>Sayfa yükleniyor...</p>
          </div>
        </div>
      }
    >
      <LoginPageContent />
    </Suspense>
  )
}
