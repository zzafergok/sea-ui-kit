'use client'

import React, { useEffect, useState, useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Input } from '../Input/Input'
import { Button } from '../Button/Button'
import { useForm } from '@/hooks/useForm'
import { Checkbox } from '../Checkbox/Checkbox'
import { Form, FormItem, FormField, FormLabel, FormMessage } from '../Form/Form'
import { loginSchema, type LoginFormValues } from '@/lib/validations/auth'
import { useAuth } from '@/hooks/useAuth'
import { LoadingSpinner } from '../Loading/LoadingSpinner'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'

interface LoginFormProps {
  onSubmit?: (data: LoginFormValues) => void | Promise<void>
  isLoading?: boolean
  redirectOnSuccess?: string
  showRememberMe?: boolean
  showForgotPassword?: boolean
  showRegisterLink?: boolean
  className?: string
  variant?: 'default' | 'modal' | 'minimal'
}

// Mock kullanıcı verileri
const MOCK_USERS = [
  {
    email: 'admin@example.com',
    password: 'Admin123!',
    role: 'admin',
    name: 'Admin Kullanıcı',
  },
  {
    email: 'user@example.com',
    password: 'User123!',
    role: 'user',
    name: 'Standart Kullanıcı',
  },
  {
    email: 'demo@example.com',
    password: 'Demo123!',
    role: 'demo',
    name: 'Demo Kullanıcı',
  },
] as const

export function LoginForm({
  onSubmit,
  isLoading: externalLoading = false,
  redirectOnSuccess = '/dashboard',
  showRememberMe = true,
  showForgotPassword = true,
  showRegisterLink = true,
  className,
  variant = 'default',
}: LoginFormProps) {
  const { t } = useTranslation()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [selectedMockUser, setSelectedMockUser] = useState<(typeof MOCK_USERS)[number] | null>(null)
  const [loginSuccess, setLoginSuccess] = useState(false) // Login başarısını takip et

  const { login, isLoading: authLoading, isAuthenticated, user } = useAuth()

  // Hydration kontrolü
  useEffect(() => {
    setMounted(true)
  }, [])

  // Form konfigürasyonu
  const form = useForm(loginSchema, {
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    mode: 'onBlur',
    reValidateMode: 'onChange',
  })

  // Loading durumu
  const isFormLoading = useMemo(() => externalLoading || authLoading, [externalLoading, authLoading])

  // Form alanlarını izle
  const emailValue = form.watch('email')
  const passwordValue = form.watch('password')

  // Button disable koşulu
  const isButtonDisabled = useMemo(() => {
    const hasRequiredFields = emailValue.trim().length > 0 && passwordValue.length > 0
    return isFormLoading || !hasRequiredFields
  }, [isFormLoading, emailValue, passwordValue])

  // Variant'a göre stil sınıfları
  const containerClasses = useMemo(() => {
    const baseClasses = 'bg-white dark:bg-neutral-800 rounded-lg shadow-md'

    switch (variant) {
      case 'modal':
        return cn(baseClasses, 'p-6 w-full max-w-sm')
      case 'minimal':
        return cn('bg-transparent shadow-none', 'p-4')
      default:
        return cn(baseClasses, 'p-6 w-full max-w-md')
    }
  }, [variant])

  // Mock kullanıcı seçimi
  const handleMockUserSelect = useCallback(
    (mockUser: (typeof MOCK_USERS)[number]) => {
      setSelectedMockUser(mockUser)
      form.setValue('email', mockUser.email)
      form.setValue('password', mockUser.password)
    },
    [form],
  )

  // Form submit işlemi
  const handleFormSubmit = useCallback(
    async (data: LoginFormValues) => {
      try {
        if (onSubmit) {
          await onSubmit(data)
        } else {
          const user = await login(data)
          if (user) {
            console.log('Login successful, setting success state')
            setLoginSuccess(true)
          }
        }
      } catch (error) {
        console.error('Login failed:', error)
        setLoginSuccess(false)
        if (error instanceof Error && error.message.includes('Invalid credentials')) {
          form.setError('password', {
            type: 'manual',
            message: t('auth.invalidCredentials'),
          })
        }
      }
    },
    [onSubmit, login, form, t],
  )

  // Login başarısı sonrası yönlendirme - SADECE login başarılı olduğunda
  useEffect(() => {
    if (loginSuccess && isAuthenticated && user && mounted) {
      console.log('Login success detected, redirecting after delay...')
      const timer = setTimeout(() => {
        if (redirectOnSuccess && typeof window !== 'undefined') {
          console.log('Redirecting to:', redirectOnSuccess)
          router.push(redirectOnSuccess)
        }
      }, 1500) // Biraz daha uzun delay

      return () => clearTimeout(timer)
    }
  }, [loginSuccess, isAuthenticated, user, mounted, redirectOnSuccess, router])

  // SSR hydration kontrolü
  if (!mounted) {
    return (
      <div
        className={cn(
          'min-h-screen w-full flex items-center justify-center p-4 bg-neutral-50 dark:bg-neutral-900',
          className,
        )}
      >
        <div className={containerClasses}>
          <div className='animate-pulse space-y-4'>
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
  }

  // Login başarılı ve authenticated durumunda göster
  if (loginSuccess && isAuthenticated && user) {
    return (
      <div
        className={cn(
          'min-h-screen w-full flex items-center justify-center p-4 bg-neutral-50 dark:bg-neutral-900',
          className,
        )}
      >
        <div className={containerClasses}>
          <div className='text-center'>
            <div className='w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4'>
              <svg className='w-8 h-8 text-green-500' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
              </svg>
            </div>
            <h2 className='text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2'>
              {t('auth.welcomeBack')}
            </h2>
            <p className='text-neutral-600 dark:text-neutral-400 mb-4'>
              Hoş geldiniz, {user.username}! Yönlendiriliyorsunuz...
            </p>
            <LoadingSpinner size='sm' />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className={cn(
        'min-h-screen w-full flex items-center justify-center p-4 bg-neutral-50 dark:bg-neutral-900',
        className,
      )}
    >
      <div className={containerClasses}>
        {/* Header */}
        <div className='text-center mb-6'>
          <h2 className='text-2xl font-semibold text-primary-700 dark:text-primary-500'>{t('auth.login')}</h2>
          {variant !== 'minimal' && (
            <p className='mt-2 text-sm text-neutral-600 dark:text-neutral-400'>{t('auth.pleaseLogin')}</p>
          )}
        </div>

        {/* Mock Kullanıcı Seçimi - Sadece development ortamında */}
        {process.env.NODE_ENV === 'development' && (
          <div className='mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800'>
            <h3 className='text-sm font-medium text-blue-800 dark:text-blue-200 mb-3'>Demo Hesapları (Development)</h3>
            <div className='grid gap-2'>
              {MOCK_USERS.map((mockUser) => (
                <button
                  key={mockUser.email}
                  type='button'
                  onClick={() => handleMockUserSelect(mockUser)}
                  className={cn(
                    'text-left p-2 rounded text-xs transition-colors',
                    selectedMockUser?.email === mockUser.email
                      ? 'bg-blue-200 dark:bg-blue-800 text-blue-900 dark:text-blue-100'
                      : 'bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 hover:bg-blue-150 dark:hover:bg-blue-800/70',
                  )}
                  disabled={isFormLoading}
                >
                  <div className='font-medium'>{mockUser.name}</div>
                  <div className='text-blue-600 dark:text-blue-300'>{mockUser.email}</div>
                  <div className='text-blue-500 dark:text-blue-400'>Şifre: {mockUser.password}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Login Form */}
        <Form form={form} onSubmit={handleFormSubmit} className='space-y-6'>
          {/* Email Field */}
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel required>{t('auth.email')}</FormLabel>
                <Input
                  type='email'
                  placeholder='email@example.com'
                  disabled={isFormLoading}
                  autoComplete='email'
                  autoFocus
                  {...field}
                />
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password Field */}
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel required>{t('auth.password')}</FormLabel>
                <Input
                  type='password'
                  placeholder='••••••••'
                  disabled={isFormLoading}
                  autoComplete='current-password'
                  {...field}
                />
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Remember Me & Forgot Password */}
          <div className='flex items-center justify-between'>
            {showRememberMe && (
              <FormField
                control={form.control}
                name='rememberMe'
                render={({ field }) => (
                  <div className='flex items-center space-x-2'>
                    <Checkbox
                      id='rememberMe'
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={isFormLoading}
                    />
                    <label
                      htmlFor='rememberMe'
                      className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer'
                    >
                      {t('auth.rememberMe')}
                    </label>
                  </div>
                )}
              />
            )}

            {showForgotPassword && (
              <Button
                variant='ghost'
                className='px-0 text-sm h-auto font-normal'
                disabled={isFormLoading}
                type='button'
                onClick={() => router.push('/auth/forgot-password')}
              >
                {t('auth.forgotPassword')}
              </Button>
            )}
          </div>

          {/* Submit Button */}
          <Button type='submit' fullWidth disabled={isButtonDisabled} className='mt-6'>
            {isFormLoading ? (
              <div className='flex items-center space-x-2'>
                <LoadingSpinner size='sm' />
                <span>{t('components.button.loadingText')}</span>
              </div>
            ) : (
              t('auth.login')
            )}
          </Button>
        </Form>

        {/* Register Link */}
        {showRegisterLink && (
          <div className='mt-6 text-center'>
            <p className='text-sm text-neutral-600 dark:text-neutral-400'>
              {t('auth.dontHaveAccount')}{' '}
              <Button
                variant='ghost'
                className='p-0 h-auto font-normal text-sm text-primary-700 dark:text-primary-500 hover:underline'
                onClick={() => router.push('/auth/register')}
                disabled={isFormLoading}
              >
                {t('auth.signUpHere')}
              </Button>
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
