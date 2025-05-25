'use client'

import React from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/Button/Button'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'

export default function HomePage() {
  const { t } = useTranslation()
  const router = useRouter()
  const { isAuthenticated } = useAuth()

  return (
    <div className='flex flex-col min-h-screen'>
      <section className='flex-1 bg-gradient-to-br from-primary-50 to-accent-50 dark:from-primary-900 dark:to-accent-900 flex items-center'>
        <div className='max-w-7xl mx-auto px-4 py-12 sm:px-6 sm:py-24 lg:px-8 w-full'>
          <div className='text-center'>
            <h1 className='text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-6'>
              {t('pages.home.title')}
            </h1>
            <p className='text-lg sm:text-xl text-neutral-600 dark:text-neutral-400 mb-8 max-w-2xl mx-auto'>
              {t('pages.home.subtitle')}
            </p>

            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              {isAuthenticated ? (
                <Button onClick={() => router.push('/dashboard')} size='lg'>
                  {t('pages.home.goToDashboard')}
                </Button>
              ) : (
                <>
                  <Button onClick={() => router.push('/auth/login')} size='lg'>
                    {t('pages.home.getStarted')}
                  </Button>
                  <Button variant='outline' onClick={() => router.push('/about')} size='lg'>
                    {t('pages.home.learnMore')}
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className='flex-1 bg-white dark:bg-neutral-800 flex items-center'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full'>
          <div className='text-center mb-12'>
            <h2 className='text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-4'>
              {t('pages.home.features.title')}
            </h2>
            <p className='text-lg text-neutral-600 dark:text-neutral-400'>{t('pages.home.features.subtitle')}</p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            <div className='text-center'>
              <div className='bg-primary-100 dark:bg-primary-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4'>
                <span className='text-2xl'>🎨</span>
              </div>
              <h3 className='text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2'>
                {t('pages.home.features.modern.title')}
              </h3>
              <p className='text-neutral-600 dark:text-neutral-400'>{t('pages.home.features.modern.description')}</p>
            </div>

            <div className='text-center'>
              <div className='bg-primary-100 dark:bg-primary-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4'>
                <span className='text-2xl'>⚡</span>
              </div>
              <h3 className='text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2'>
                {t('pages.home.features.performance.title')}
              </h3>
              <p className='text-neutral-600 dark:text-neutral-400'>
                {t('pages.home.features.performance.description')}
              </p>
            </div>

            <div className='text-center'>
              <div className='bg-primary-100 dark:bg-primary-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4'>
                <span className='text-2xl'>🔧</span>
              </div>
              <h3 className='text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2'>
                {t('pages.home.features.customizable.title')}
              </h3>
              <p className='text-neutral-600 dark:text-neutral-400'>
                {t('pages.home.features.customizable.description')}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
