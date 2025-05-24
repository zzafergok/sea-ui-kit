'use client'

import React from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/Button/Button'
import { useRouter } from 'next/navigation'

export default function NotFound() {
  const { t } = useTranslation()
  const router = useRouter()

  return (
    <div className='min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-900'>
      <div className='text-center'>
        <h1 className='text-6xl font-bold text-primary-500 mb-4'>{t('pages.notFound.title')}</h1>
        <h2 className='text-2xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4'>
          {t('pages.notFound.heading')}
        </h2>
        <p className='text-neutral-600 dark:text-neutral-400 mb-8'>{t('pages.notFound.description')}</p>
        <div className='space-x-4'>
          <Button onClick={() => router.push('/')}>{t('pages.notFound.goHome')}</Button>
          <Button variant='outline' onClick={() => router.back()}>
            {t('pages.notFound.goBack')}
          </Button>
        </div>
      </div>
    </div>
  )
}
