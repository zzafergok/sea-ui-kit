'use client'

import React from 'react'
import { Button } from '@/components/Button/Button'
import { useRouter } from 'next/navigation'

export default function NotFound() {
  const router = useRouter()

  return (
    <div className='min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-900'>
      <div className='text-center'>
        <h1 className='text-6xl font-bold text-primary-500 mb-4'>404</h1>
        <h2 className='text-2xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4'>Sayfa Bulunamadı</h2>
        <p className='text-neutral-600 dark:text-neutral-400 mb-8'>
          Aradığınız sayfa mevcut değil veya kaldırılmış olabilir.
        </p>
        <div className='space-x-4'>
          <Button onClick={() => router.push('/')}>Ana Sayfaya Dön</Button>
          <Button variant='outline' onClick={() => router.back()}>
            Geri Git
          </Button>
        </div>
      </div>
    </div>
  )
}
