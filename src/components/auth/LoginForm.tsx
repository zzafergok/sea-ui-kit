'use client'

import React, { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { Eye, EyeOff, LogIn, Github, Mail, Lock, User, ArrowRight } from 'lucide-react'

import { Button } from '@/components/Button/Button'
import { Input } from '@/components/Input/Input'
import { Checkbox } from '@/components/Checkbox/Checkbox'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/Card/Card'
import { Form, FormField, FormItem, FormLabel, FormMessage } from '@/components/Form/Form'
import { LoadingSpinner } from '@/components/Loading/LoadingSpinner'

import { useForm } from '@/hooks/useForm'
import { useAuth } from '@/hooks/useAuth'
import { loginSchema, type LoginFormValues } from '@/lib/validations/auth'
import { cn } from '@/lib/utils'

export interface LoginFormProps {
  onSubmit?: (data: LoginFormValues) => void | Promise<void>
  redirectOnSuccess?: string
  variant?: 'default' | 'minimal' | 'card'
  showRememberMe?: boolean
  showForgotPassword?: boolean
  showRegisterLink?: boolean
  showSocialLogin?: boolean
  className?: string
}

export function LoginForm({
  onSubmit: onSubmitProp,
  redirectOnSuccess = '/dashboard',
  variant = 'card',
  showRememberMe = true,
  showForgotPassword = true,
  showRegisterLink = true,
  showSocialLogin = false,
  className,
}: LoginFormProps) {
  const router = useRouter()
  const { t } = useTranslation()
  const { login, isLoading } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm(loginSchema, {
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  })

  const onSubmit = useCallback(
    async (data: LoginFormValues) => {
      setIsSubmitting(true)

      try {
        console.log('[LoginForm] Form submitted with data:', data)

        if (onSubmitProp) {
          await onSubmitProp(data)
        } else {
          await login(data)
          console.log('[LoginForm] Login successful, redirecting to:', redirectOnSuccess)
          router.push(redirectOnSuccess)
        }
      } catch (error) {
        console.error('[LoginForm] Submit error:', error)
        // Error handling is done in useAuth hook
      } finally {
        setIsSubmitting(false)
      }
    },
    [onSubmitProp, login, router, redirectOnSuccess],
  )

  const handleForgotPassword = useCallback(() => {
    router.push('/auth/forgot-password')
  }, [router])

  const handleRegister = useCallback(() => {
    router.push('/auth/register')
  }, [router])

  const handleSocialLogin = useCallback((provider: string) => {
    console.log(`Social login with ${provider}`)
    // Implement social login logic
  }, [])

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword((prev) => !prev)
  }, [])

  const formContent = (
    <Form form={form} onSubmit={onSubmit} className='space-y-6'>
      {/* Email Field */}
      <FormField
        control={form.control}
        name='email'
        render={({ field }) => (
          <FormItem>
            <FormLabel required>{t('auth.email')}</FormLabel>
            <div className='relative'>
              <Mail className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400' />
              <Input
                {...field}
                type='email'
                placeholder='ornek@email.com'
                autoComplete='email'
                className='pl-10'
                disabled={isSubmitting || isLoading}
              />
            </div>
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
            <div className='relative'>
              <Lock className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400' />
              <Input
                {...field}
                type={showPassword ? 'text' : 'password'}
                placeholder='••••••••'
                autoComplete='current-password'
                className='pl-10 pr-10'
                disabled={isSubmitting || isLoading}
              />
              <Button
                type='button'
                variant='ghost'
                size='sm'
                onClick={togglePasswordVisibility}
                className='absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-transparent'
                disabled={isSubmitting || isLoading}
              >
                {showPassword ? (
                  <EyeOff className='h-4 w-4 text-neutral-400' />
                ) : (
                  <Eye className='h-4 w-4 text-neutral-400' />
                )}
              </Button>
            </div>
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
              <FormItem className='flex items-center space-x-2 space-y-0'>
                <Checkbox
                  id='rememberMe'
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled={isSubmitting || isLoading}
                />
                <FormLabel className='text-sm font-normal cursor-pointer'>{t('auth.rememberMe')}</FormLabel>
              </FormItem>
            )}
          />
        )}

        {showForgotPassword && (
          <Button
            type='button'
            variant='ghost'
            size='sm'
            onClick={handleForgotPassword}
            className='text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 p-0 h-auto'
            disabled={isSubmitting || isLoading}
          >
            {t('auth.forgotPassword')}
          </Button>
        )}
      </div>

      {/* Submit Button */}
      <Button
        type='submit'
        className='w-full flex items-center justify-center gap-2'
        disabled={isSubmitting || isLoading}
      >
        {isSubmitting || isLoading ? (
          <>
            <LoadingSpinner size='sm' variant='white' />
            <span>Giriş yapılıyor...</span>
          </>
        ) : (
          <>
            <LogIn className='h-4 w-4' />
            <span>{t('auth.login')}</span>
          </>
        )}
      </Button>

      {/* Social Login */}
      {showSocialLogin && (
        <>
          <div className='relative'>
            <div className='absolute inset-0 flex items-center'>
              <span className='w-full border-t border-neutral-200 dark:border-neutral-800' />
            </div>
            <div className='relative flex justify-center text-xs uppercase'>
              <span className='bg-white dark:bg-neutral-900 px-2 text-neutral-500 dark:text-neutral-400'>Ya da</span>
            </div>
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <Button
              type='button'
              variant='outline'
              onClick={() => handleSocialLogin('github')}
              disabled={isSubmitting || isLoading}
              className='flex items-center gap-2'
            >
              <Github className='h-4 w-4' />
              GitHub
            </Button>

            <Button
              type='button'
              variant='outline'
              onClick={() => handleSocialLogin('google')}
              disabled={isSubmitting || isLoading}
              className='flex items-center gap-2'
            >
              <Mail className='h-4 w-4' />
              Google
            </Button>
          </div>
        </>
      )}

      {/* Register Link */}
      {showRegisterLink && (
        <div className='text-center'>
          <span className='text-sm text-neutral-600 dark:text-neutral-400'>{t('auth.dontHaveAccount')} </span>
          <Button
            type='button'
            variant='ghost'
            size='sm'
            onClick={handleRegister}
            className='text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 p-0 h-auto'
            disabled={isSubmitting || isLoading}
          >
            {t('auth.signUpHere')}
            <ArrowRight className='h-3 w-3 ml-1' />
          </Button>
        </div>
      )}
    </Form>
  )

  if (variant === 'minimal') {
    return <div className={cn('w-full max-w-sm', className)}>{formContent}</div>
  }

  if (variant === 'card') {
    return (
      <div className={cn('min-h-screen flex items-center justify-center p-4', className)}>
        <Card className='w-full max-w-md'>
          <CardHeader className='text-center space-y-4'>
            <div className='mx-auto w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center'>
              <User className='h-6 w-6 text-primary-600 dark:text-primary-400' />
            </div>
            <div>
              <CardTitle className='text-2xl font-bold'>{t('auth.welcomeBack')}</CardTitle>
              <CardDescription className='mt-2'>{t('auth.pleaseLogin')}</CardDescription>
            </div>
          </CardHeader>
          <CardContent>{formContent}</CardContent>
        </Card>
      </div>
    )
  }

  // Default variant
  return (
    <div className={cn('w-full max-w-md mx-auto', className)}>
      <div className='text-center mb-8'>
        <h2 className='text-3xl font-bold text-neutral-900 dark:text-neutral-100'>{t('auth.welcomeBack')}</h2>
        <p className='text-neutral-600 dark:text-neutral-400 mt-2'>{t('auth.pleaseLogin')}</p>
      </div>
      {formContent}
    </div>
  )
}

// Demo credentials component
export function DemoCredentials() {
  const { t: _t } = useTranslation()

  const demoAccounts = [
    { email: 'admin@example.com', password: 'Admin123!', role: 'Admin' },
    { email: 'user@example.com', password: 'User123!', role: 'User' },
    { email: 'demo@example.com', password: 'Demo123!', role: 'Demo' },
  ]

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
    } catch (error) {
      console.error('Copy failed:', error)
    }
  }

  return (
    <Card className='mt-6'>
      <CardHeader>
        <CardTitle className='text-lg'>Demo Hesapları</CardTitle>
        <CardDescription>Test için kullanabileceğiniz demo hesaplar</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='space-y-3'>
          {demoAccounts.map((account, index) => (
            <div key={index} className='p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg'>
              <div className='flex items-center justify-between mb-2'>
                <span className='text-sm font-medium text-neutral-700 dark:text-neutral-300'>{account.role}</span>
              </div>
              <div className='space-y-1 text-xs font-mono'>
                <div className='flex items-center gap-2'>
                  <span className='text-neutral-500 dark:text-neutral-400'>Email:</span>
                  <button
                    onClick={() => copyToClipboard(account.email)}
                    className='text-primary-600 dark:text-primary-400 hover:underline'
                  >
                    {account.email}
                  </button>
                </div>
                <div className='flex items-center gap-2'>
                  <span className='text-neutral-500 dark:text-neutral-400'>Şifre:</span>
                  <button
                    onClick={() => copyToClipboard(account.password)}
                    className='text-primary-600 dark:text-primary-400 hover:underline'
                  >
                    {account.password}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <p className='text-xs text-neutral-500 dark:text-neutral-400 mt-3'>Bilgileri kopyalamak için tıklayın</p>
      </CardContent>
    </Card>
  )
}
