'use client'

import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useForm } from '@/hooks/useForm'
import { Form, FormItem, FormField, FormLabel, FormMessage } from '../Form/Form'
import { Input } from '../Input/Input'
import { Button } from '../Button/Button'
import { Checkbox } from '../Checkbox/Checkbox'
import { loginSchema, type LoginFormValues } from '@/lib/validations/auth'

interface LoginFormProps {
  onSubmit: (data: LoginFormValues) => void
  isLoading?: boolean
}

export function LoginForm({ onSubmit, isLoading = false }: LoginFormProps) {
  const { t } = useTranslation()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const form = useForm(loginSchema, {
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  })

  if (!isMounted) {
    return <div className='space-y-6'>Loading...</div>
  }

  return (
    // Dış kapsayıcı - yükseklik ve genişlik tam sayfa, merkezde hizalama
    <div className='min-h-screen w-full flex items-center justify-center p-4 bg-neutral-50 dark:bg-neutral-900'>
      {/* Form kapsayıcısı - responsive genişlik ve kart görünümü */}
      <div className='w-full max-w-md p-6 bg-white dark:bg-neutral-800 rounded-lg shadow-md'>
        {/* İsteğe bağlı: Form başlığı */}
        <h2 className='text-2xl font-semibold text-center mb-6 text-primary-700 dark:text-primary-500'>
          {t('auth.login')}
        </h2>

        <Form form={form} onSubmit={onSubmit} className='space-y-6'>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel required>{t('auth.email')}</FormLabel>
                <Input type='email' placeholder='email@example.com' disabled={isLoading} {...field} />
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
                <Input type='password' disabled={isLoading} {...field} />
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
                    disabled={isLoading}
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

            <Button variant='ghost' className='px-0 text-sm' disabled={isLoading} type='button'>
              {t('auth.forgotPassword')}
            </Button>
          </div>

          <Button type='submit' fullWidth disabled={isLoading} className='mt-6'>
            {isLoading ? t('components.button.loadingText') : t('auth.login')}
          </Button>
        </Form>
      </div>
    </div>
  )
}
