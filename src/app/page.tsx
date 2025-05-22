'use client'

import React, { Suspense } from 'react'
import dynamic from 'next/dynamic'

import { type LoginFormValues } from '@/lib/validations/auth'

// İyileştirilmiş dynamic import
const LoginForm = dynamic(() => import('@/components/auth/LoginForm').then((mod) => ({ default: mod.LoginForm })), {
  ssr: false,
  loading: () => <LoginFormSkeleton />,
})

// Dedicated skeleton component
const LoginFormSkeleton = () => (
  <div className='min-h-screen w-full flex items-center justify-center p-4 bg-neutral-50 dark:bg-neutral-900'>
    <div className='w-full max-w-md p-6 bg-white dark:bg-neutral-800 rounded-lg shadow-md'>
      <div className='animate-pulse space-y-4'>
        <div className='h-8 bg-neutral-200 dark:bg-neutral-700 rounded mb-6'></div>
        <div className='h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-1/4'></div>
        <div className='h-10 bg-neutral-200 dark:bg-neutral-700 rounded'></div>
        <div className='h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-1/4'></div>
        <div className='h-10 bg-neutral-200 dark:bg-neutral-700 rounded'></div>
        <div className='h-10 bg-neutral-200 dark:bg-neutral-700 rounded'></div>
      </div>
    </div>
  </div>
)

export default function HomePage() {
  const handleSubmit = (data: LoginFormValues) => {
    console.log('Form submitted:', data)
  }

  return (
    <Suspense fallback={<LoginFormSkeleton />}>
      <LoginForm onSubmit={handleSubmit} />
    </Suspense>
  )
}
