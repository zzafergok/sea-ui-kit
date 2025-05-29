'use client'

import { useRouter } from 'next/navigation'

import React, { useState, useCallback } from 'react'

import { useTranslation } from 'react-i18next'
import { Eye, EyeOff, Mail, Lock, ArrowRight, UserCheck } from 'lucide-react'

import { Input } from '@/components/core/Input/Input'
import { Button } from '@/components/core/Button/Button'
import { Checkbox } from '@/components/core/Checkbox/Checkbox'
import { ThemeToggle } from '@/components/ui/ThemeToggle/ThemeToggle'
import { LoadingSpinner } from '@/components/core/Loading/LoadingSpinner'
import { LanguageToggle } from '@/components/ui/LanguageToggle/LanguageToggle'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/core/Card/Card'

import { useFormValidation } from '@/hooks/useFormValidation'

import { cn } from '@/lib/utils'
import { loginSchema, type LoginFormValues } from '@/lib/validations/auth'

interface LoginFormProps {
  onSubmit: (data: LoginFormValues) => Promise<void>
  redirectOnSuccess?: string
  variant?: 'default' | 'modal'
  showRememberMe?: boolean
  showForgotPassword?: boolean
  showRegisterLink?: boolean
  className?: string
}

const DEMO_ACCOUNTS = [
  {
    type: 'Admin Kullanıcı',
    email: 'admin@example.com',
    password: 'Admin123!',
    description: 'Tam yetki',
  },
  {
    type: 'Standart Kullanıcı',
    email: 'user@example.com',
    password: 'User123!',
    description: 'Sınırlı yetki',
  },
  {
    type: 'Demo Kullanıcı',
    email: 'demo@example.com',
    password: 'Demo123!',
    description: 'Test hesabı',
  },
]

export function LoginForm({
  onSubmit,
  redirectOnSuccess = '/dashboard',
  showRememberMe = true,
  showForgotPassword = true,
  showRegisterLink = true,
  className,
}: LoginFormProps) {
  const router = useRouter()
  const { t } = useTranslation()
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { register, handleSubmit, formState, setValue, getFieldError, hasFieldError } = useFormValidation(loginSchema, {
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  })

  const handleFormSubmit = useCallback(
    async (data: LoginFormValues) => {
      if (isSubmitting) return

      setIsSubmitting(true)
      try {
        console.log('Form submission started with data:', {
          email: data.email,
          rememberMe: data.rememberMe,
          hasPassword: !!data.password,
        })

        await onSubmit(data)

        console.log('Form submission successful, redirecting to:', redirectOnSuccess)
        router.push(redirectOnSuccess)
      } catch (error) {
        console.error('Form submission failed:', error)
      } finally {
        setIsSubmitting(false)
      }
    },
    [onSubmit, redirectOnSuccess, router, isSubmitting],
  )

  const fillDemoAccount = useCallback(
    (account: (typeof DEMO_ACCOUNTS)[0]) => {
      console.log('Filling demo account:', account.email)

      // setValue kullanarak değerleri set et ve validasyonu tetikle
      setValue('email', account.email, {
        shouldValidate: true,
        shouldTouch: true,
        shouldDirty: true,
      })
      setValue('password', account.password, {
        shouldValidate: true,
        shouldTouch: true,
        shouldDirty: true,
      })
    },
    [setValue],
  )

  const emailError = getFieldError('email')
  const passwordError = getFieldError('password')

  return (
    <div className={cn('min-h-screen flex items-center justify-center p-4', className)}>
      <div className='w-full space-x-6 flex items-center justify-center max-md:flex-col max-md:gap-4 max-md:items-end max-md:mt-12'>
        {/* Demo Hesaplar */}
        <Card className='bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800 w-full md:p-8'>
          <CardHeader className='pb-3'>
            <CardTitle className='text-lg text-blue-800 dark:text-blue-200'>Demo Hesapları (Development)</CardTitle>
            <CardDescription className='text-blue-600 dark:text-blue-300'>
              Devam etmek için lütfen giriş yapın
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-3'>
            {DEMO_ACCOUNTS.map((account) => (
              <div
                key={account.email}
                className={cn(
                  'p-3 rounded-lg border cursor-pointer transition-all duration-200',
                  'hover:bg-blue-100 dark:hover:bg-blue-900/30',
                  'border-blue-200 dark:border-blue-700',
                  'bg-blue-25 dark:bg-blue-950/10',
                )}
                onClick={() => fillDemoAccount(account)}
              >
                <div className='flex justify-between items-start'>
                  <div>
                    <p className='font-medium text-blue-900 dark:text-blue-100'>{account.type}</p>
                    <p className='text-sm text-blue-700 dark:text-blue-300'>{account.email}</p>
                    <p className='text-xs text-blue-600 dark:text-blue-400 mt-1'>Şifre: {account.password}</p>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className='flex flex-col space-y-6 w-full'>
          {/* Ana Giriş Formu */}
          <Card className='shadow-lg'>
            <CardHeader className='space-y-1 text-center'>
              <div className='flex justify-between items-center'>
                <div className='flex-1'>
                  <CardTitle className='text-2xl font-bold text-neutral-900 dark:text-neutral-100'>
                    {t('auth.login')}
                  </CardTitle>
                  <CardDescription className='text-neutral-600 dark:text-neutral-400'>
                    {t('auth.welcomeBack')}
                  </CardDescription>
                </div>
                <div className='flex items-center gap-2'>
                  <ThemeToggle />
                  <LanguageToggle />
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit(handleFormSubmit)} className='space-y-4'>
                {/* Email Field */}
                <div className='space-y-2'>
                  <label htmlFor='email' className='text-sm font-medium text-neutral-700 dark:text-neutral-300'>
                    {t('auth.email')} <span className='text-red-500'>*</span>
                  </label>
                  <div className='relative'>
                    <Mail className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400' />
                    <Input
                      {...register('email')}
                      id='email'
                      type='email'
                      placeholder='user@example.com'
                      className={cn(
                        'pl-10',
                        hasFieldError('email') && 'border-red-500 focus:border-red-500 focus:ring-red-500',
                      )}
                      disabled={isSubmitting}
                      autoComplete='email'
                    />
                  </div>
                  {emailError && <p className='text-sm text-red-600 dark:text-red-400'>{emailError.message}</p>}
                </div>

                {/* Password Field */}
                <div className='space-y-2'>
                  <label htmlFor='password' className='text-sm font-medium text-neutral-700 dark:text-neutral-300'>
                    {t('auth.password')} <span className='text-red-500'>*</span>
                  </label>
                  <div className='relative'>
                    <Lock className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400' />
                    <Input
                      {...register('password')}
                      id='password'
                      type={showPassword ? 'text' : 'password'}
                      placeholder='••••••••'
                      className={cn(
                        'pl-10 pr-10',
                        hasFieldError('password') && 'border-red-500 focus:border-red-500 focus:ring-red-500',
                      )}
                      disabled={isSubmitting}
                      autoComplete='current-password'
                    />
                    <button
                      type='button'
                      onClick={() => setShowPassword(!showPassword)}
                      className='absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300'
                      disabled={isSubmitting}
                    >
                      {showPassword ? <EyeOff className='h-4 w-4' /> : <Eye className='h-4 w-4' />}
                    </button>
                  </div>
                  {passwordError && <p className='text-sm text-red-600 dark:text-red-400'>{passwordError.message}</p>}
                </div>

                {/* Remember Me & Forgot Password */}
                <div className='flex items-center justify-between'>
                  {showRememberMe && (
                    <div className='flex items-center space-x-2'>
                      <Checkbox {...register('rememberMe')} id='rememberMe' disabled={isSubmitting} />
                      <label
                        htmlFor='rememberMe'
                        className='text-sm text-neutral-600 dark:text-neutral-400 cursor-pointer'
                      >
                        {t('auth.rememberMe')}
                      </label>
                    </div>
                  )}

                  {showForgotPassword && (
                    <button
                      type='button'
                      onClick={() => router.push('/auth/forgot-password')}
                      className='text-sm text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300'
                      disabled={isSubmitting}
                    >
                      {t('auth.forgotPassword')}
                    </button>
                  )}
                </div>

                {/* Submit Button */}
                <Button type='submit' className='w-full' disabled={isSubmitting || !formState.isValid} size='lg'>
                  {isSubmitting ? (
                    <div className='flex items-center gap-2'>
                      <LoadingSpinner size='sm' />
                      <span>Giriş yapılıyor...</span>
                    </div>
                  ) : (
                    <div className='flex items-center gap-2'>
                      <UserCheck className='h-4 w-4' />
                      <span>{t('auth.login')}</span>
                      <ArrowRight className='h-4 w-4' />
                    </div>
                  )}
                </Button>

                {/* Register Link */}
                {showRegisterLink && (
                  <div className='text-center pt-4 border-t border-neutral-200 dark:border-neutral-700'>
                    <p className='text-sm text-neutral-600 dark:text-neutral-400'>
                      {t('auth.dontHaveAccount')}{' '}
                      <button
                        type='button'
                        onClick={() => router.push('/auth/register')}
                        className='text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300 font-medium'
                        disabled={isSubmitting}
                      >
                        {t('auth.signUpHere')}
                      </button>
                    </p>
                  </div>
                )}
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
