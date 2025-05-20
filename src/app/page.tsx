'use client'

import dynamic from 'next/dynamic'

import React from 'react'

import { type LoginFormValues } from '@/lib/validations/auth'

// SSR devre dışı bırakılmış dinamik import
const LoginForm = dynamic(() => import('@/components/auth/LoginForm').then((mod) => ({ default: mod.LoginForm })), {
  ssr: false,
})

export default function Home() {
  const handleSubmit = (data: LoginFormValues) => {
    console.log(data)
  }

  return <LoginForm onSubmit={handleSubmit} />
}
