'use client'

import React, { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { type LoginFormValues } from '@/lib/validations/auth'

// LoginForm'u dinamik olarak yükle ve SSR'ı devre dışı bırak
const LoginForm = dynamic(() => import('@/components/auth/LoginForm').then((mod) => ({ default: mod.LoginForm })), {
  ssr: false,
})

export default function Home() {
  const handleSubmit = (data: LoginFormValues) => {
    console.log(data)
  }

  return (
    <Suspense fallback={<div className='flex min-h-screen items-center justify-center'>Yükleniyor...</div>}>
      <LoginForm onSubmit={handleSubmit} />
    </Suspense>
  )
}
