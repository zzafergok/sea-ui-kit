'use client'

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { LoginForm } from '@/components/auth/LoginForm'
import { useAuth } from '@/hooks/useAuth'
import { LoginFormValues } from '@/lib/validations/auth'

export default function LoginPage() {
  const router = useRouter()
  const { isAuthenticated, login } = useAuth()

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard')
    }
  }, [isAuthenticated, router])

  const handleLogin = async (data: LoginFormValues) => {
    try {
      await login(data)
      router.push('/dashboard')
    } catch (error) {
      console.error('Login failed:', error)
    }
  }

  if (isAuthenticated) {
    return null
  }

  return <LoginForm onSubmit={handleLogin} redirectOnSuccess='/dashboard' />
}
