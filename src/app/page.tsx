'use client'

import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { type LoginFormValues } from '@/lib/validations/auth'

// SSR devre dışı bırakılmış dinamik import
const LoginForm = dynamic(() => import('@/components/auth/LoginForm').then((mod) => ({ default: mod.LoginForm })), {
  ssr: false,
})

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // İstemci tarafında olduğumuzu doğrula
    setIsLoading(false)
  }, [])

  const handleSubmit = (data: LoginFormValues) => {
    console.log(data)
  }

  if (isLoading) {
    return <div className='min-h-screen flex items-center justify-center'>Yükleniyor...</div>
  }

  return <LoginForm onSubmit={handleSubmit} />
}
