'use client'

import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Input } from '../Input/Input'
import { Button } from '../Button/Button'
import { useForm } from '@/hooks/useForm'
import { Checkbox } from '../Checkbox/Checkbox'
import { Form, FormItem, FormField, FormLabel, FormMessage } from '../Form/Form'
import { loginSchema, type LoginFormValues } from '@/lib/validations/auth'
import { useAuth } from '@/hooks/useAuth'

interface LoginFormProps {
  onSubmit?: (data: LoginFormValues) => void
  isLoading?: boolean
  redirectOnSuccess?: string
}

export function LoginForm({ onSubmit, isLoading = false, redirectOnSuccess = '/dashboard' }: LoginFormProps) {
  const { t } = useTranslation()
  const [mounted, setMounted] = useState(false)
  const { login, isLoading: isLoginLoading, isAuthenticated, user } = useAuth()

  useEffect(() => {
    setMounted(true)
  }, [])

  const form = useForm(loginSchema, {
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  })

  // Login success handling
  useEffect(() => {
    if (isAuthenticated && user && mounted) {
      console.log('User successfully logged in:', user)
      if (redirectOnSuccess && typeof window !== 'undefined') {
        // Redirect after successful login
        setTimeout(() => {
          window.location.href = redirectOnSuccess
        }, 1000)
      }
    }
  }, [isAuthenticated, user, mounted, redirectOnSuccess])

  if (!mounted) {
    return (
      <div className='min-h-screen w-full flex items-center justify-center p-4 bg-neutral-50 dark:bg-neutral-900'>
        <div className='w-full max-w-md p-6 bg-white dark:bg-neutral-800 rounded-lg shadow-md'>
          <div className='animate-pulse'>
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

  // Show success message if already logged in
  if (isAuthenticated && user) {
    return (
      <div className='min-h-screen w-full flex items-center justify-center p-4 bg-neutral-50 dark:bg-neutral-900'>
        <div className='w-full max-w-md p-6 bg-white dark:bg-neutral-800 rounded-lg shadow-md text-center'>
          <div className='mb-4'>
            <div className='w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4'>
              <svg className='w-8 h-8 text-green-500' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
              </svg>
            </div>
            <h2 className='text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2'>
              {t('auth.welcomeBack')}
            </h2>
            <p className='text-neutral-600 dark:text-neutral-400 mb-4'>
              {t('auth.alreadyLoggedIn', { name: user.name })}
            </p>
            <Button onClick={() => (window.location.href = redirectOnSuccess)} className='w-full'>
              {t('common.continue')}
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const handleFormSubmit = async (data: LoginFormValues) => {
    try {
      await login(data)
      onSubmit?.(data)
    } catch (error) {
      console.error('Login failed:', error)
    }
  }

  const isFormLoading = isLoading || isLoginLoading

  return (
    <div className='min-h-screen w-full flex items-center justify-center p-4 bg-neutral-50 dark:bg-neutral-900'>
      <div className='w-full max-w-md p-6 bg-white dark:bg-neutral-800 rounded-lg shadow-md'>
        <h2 className='text-2xl font-semibold text-center mb-6 text-primary-700 dark:text-primary-500'>
          {t('auth.login')}
        </h2>

        <Form form={form} onSubmit={handleFormSubmit} className='space-y-6'>
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
                  {...field}
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel required>{t('auth.password')}</FormLabel>
                <Input type='password' disabled={isFormLoading} autoComplete='current-password' {...field} />
                <FormMessage />
              </FormItem>
            )}
          />

          <div className='flex items-center justify-between'>
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
                    className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                  >
                    {t('auth.rememberMe')}
                  </label>
                </div>
              )}
            />

            <Button variant='ghost' className='px-0 text-sm' disabled={isFormLoading} type='button'>
              {t('auth.forgotPassword')}
            </Button>
          </div>

          <Button type='submit' fullWidth disabled={isFormLoading || !form.formState.isValid} className='mt-6'>
            {isFormLoading ? t('components.button.loadingText') : t('auth.login')}
          </Button>
        </Form>

        <div className='mt-6 text-center'>
          <p className='text-sm text-neutral-600 dark:text-neutral-400'>
            {t('auth.dontHaveAccount')}{' '}
            <Button
              variant='ghost'
              className='p-0 h-auto font-normal text-sm text-primary-700 dark:text-primary-500 hover:underline'
            >
              {t('auth.signUpHere')}
            </Button>
          </p>
        </div>
      </div>
    </div>
  )
}
