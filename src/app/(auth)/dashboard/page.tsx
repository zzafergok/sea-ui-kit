'use client'

import React from 'react'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/Button/Button'
import { useRouter } from 'next/navigation'

export default function DashboardPage() {
  const { user, logout } = useAuth()
  const router = useRouter()

  const handleLogout = async () => {
    await logout()
    router.push('/')
  }

  return (
    <div className='px-4 py-6 sm:px-0'>
      <div className='border-4 border-dashed border-neutral-200 dark:border-neutral-700 rounded-lg p-8'>
        <div className='text-center'>
          <h1 className='text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-4'>
            Hoş Geldiniz, {user?.name}!
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
