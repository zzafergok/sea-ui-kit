'use client'

import React from 'react'
import { LoginForm } from '@/components/auth/LoginForm'
import { type LoginFormValues } from '@/lib/validations/auth'

export default function Home() {
  const handleSubmit = (data: LoginFormValues) => {
    // Handle form submission
    console.log(data)
  }
  return <LoginForm onSubmit={handleSubmit} />
}
