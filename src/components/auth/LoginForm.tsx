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
  const { login, isLoginLoading } = useAuth()

  // Hydration mismatch'i önlemek için
  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  const form = useForm(loginSchema, {
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  })

  // Form mount olana kadar loading göster
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

  const handleFormSubmit = async (data: LoginFormValues) => {
    try {
      // useAuth hook'unu kullan
      await login(data)
      
      // Custom onSubmit varsa çağır
      if (onSubmit) {
        onSubmit(data)
      }

      // Başarılı login sonrası yönlendirme
      if (typeof window !== 'undefined' && redirectOnSuccess) {
        window.location.href = redirectOnSuccess
      }
    } catch (error) {
      console.error('Login failed:', error)
      // Hata zaten interceptor tarafından handle edildi
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
                <Input 
                  type='password' 
                  disabled={isFormLoading} 
                  autoComplete='current-password' 
                  {...field} 
                />
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

          <Button 
            type='submit' 
            fullWidth 
            disabled={isFormLoading || !form.formState.isValid} 
            className='mt-6'
          >
            {isFormLoading ? t('components.button.loadingText') : t('auth.login')}
          </Button>
        </Form>

        <div className='mt-6 text-center'>
          <p className='text-sm text-neutral-600 dark:text-neutral-400'>
            Hesabınız yok mu?{' '}
            <Button variant='link' className='p-0 h-auto font-normal text-sm'>
              Kayıt olun
            </Button>
          </p>
        </div>
      </div>
    </div>
  )
}
