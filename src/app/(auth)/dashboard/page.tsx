'use client'

import { useRouter } from 'next/navigation'

import React from 'react'

import { useAuth } from '@/hooks/useAuth'

import { Button } from '@/components/core/Button/Button'
import { LoadingSpinner } from '@/components/core/Loading/LoadingSpinner'

export default function DashboardPage() {
  const router = useRouter()
  const { user, logout, isLoading } = useAuth()

  const handleLogout = async () => {
    try {
      await logout()
      router.push('/')
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  if (isLoading) {
    return (
      <div className='flex items-center justify-center min-h-96'>
        <div className='text-center space-y-4'>
          <LoadingSpinner size='lg' />
          <p className='text-sm text-neutral-600 dark:text-neutral-400'>Yükleniyor...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className='flex items-center justify-center min-h-96'>
        <div className='text-center'>
          <p className='text-neutral-600 dark:text-neutral-400'>Kullanıcı bilgileri yüklenemedi</p>
          <Button onClick={() => router.push('/auth/login')} className='mt-4'>
            Giriş Yap
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className='px-4 py-6 sm:px-0'>
      <div className='border-4 border-dashed border-neutral-200 dark:border-neutral-700 rounded-lg p-8'>
        <div className='text-center'>
          <h1 className='text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-4'>
            Hoş Geldiniz, {user.email || 'Kullanıcı'}!
          </h1>
          <p className='text-neutral-600 dark:text-neutral-400 mb-8'>
            Bu sayfa sadece giriş yapmış kullanıcılar tarafından görülebilir.
          </p>
          <div className='space-x-4'>
            <Button onClick={() => router.push('/profile')}>Profili Görüntüle</Button>
            <Button variant='outline' onClick={handleLogout}>
              Çıkış Yap
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
