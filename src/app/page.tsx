'use client'

import React, { Suspense } from 'react'
import dynamic from 'next/dynamic'

import { type LoginFormValues } from '@/lib/validations/auth'

// Yükleme sırasında gösterilecek bileşen
const LoadingComponent = () => (
  <div className='min-h-screen w-full flex items-center justify-center p-4 bg-neutral-50 dark:bg-neutral-900'>
    <div className='w-full max-w-md p-6 bg-white dark:bg-neutral-800 rounded-lg shadow-md'>
      <div className='animate-pulse'>
        <div className='h-8 bg-neutral-200 dark:bg-neutral-700 rounded mb-6'></div>
        <div className='space-y-4'>
          <div className='h-4 bg-neutral-200 dark:bg-neutral-700 rounded'></div>
          <div className='h-10 bg-neutral-200 dark:bg-neutral-700 rounded'></div>
          <div className='h-4 bg-neutral-200 dark:bg-neutral-700 rounded'></div>
          <div className='h-10 bg-neutral-200 dark:bg-neutral-700 rounded'></div>
          <div className='h-10 bg-neutral-200 dark:bg-neutral-700 rounded'></div>
        </div>
      </div>
    </div>
  </div>
)

// Dinamik import ile LoginForm yükle
const LoginForm = dynamic(() => import('@/components/auth/LoginForm').then((mod) => ({ default: mod.LoginForm })), {
  ssr: false,
  loading: LoadingComponent,
})

export default function HomePage() {
  const handleSubmit = (data: LoginFormValues) => {
    console.log('Form submitted:', data)
  }

  return (
    <Suspense fallback={<LoadingComponent />}>
      <LoginForm onSubmit={handleSubmit} />
    </Suspense>
  )
}
