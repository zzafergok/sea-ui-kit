'use client'

import React from 'react'
import dynamic from 'next/dynamic'
import { LoginFormValues } from '@/lib/validations/auth'

const LoginForm = dynamic(() => import('@/components/auth/LoginForm').then((mod) => ({ default: mod.LoginForm })), {
  ssr: false,
  loading: () => (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='w-full max-w-md p-6 bg-white dark:bg-neutral-800 rounded-lg shadow-md animate-pulse'>
        <div className='h-8 bg-neutral-200 dark:bg-neutral-700 rounded mb-6'></div>
        <div className='space-y-4'>
          <div className='h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-1/4'></div>
          <div className='h-10 bg-neutral-200 dark:bg-neutral-700 rounded'></div>
          <div className='h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-1/4'></div>
          <div className='h-10 bg-neutral-200 dark:bg-neutral-700 rounded'></div>
          <div className='h-10 bg-neutral-200 dark:bg-neutral-700 rounded'></div>
        </div>
      </div>
    </div>
  ),
})

export function LoginPageContent() {
  function handleLoginSubmit(data: LoginFormValues) {
    console.log('Login form submitted:', data)
  }

  return (
    <main className='min-h-screen'>
      <LoginForm onSubmit={handleLoginSubmit} />
    </main>
  )
}
