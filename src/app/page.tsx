'use client'

import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/Button/Button'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { LoadingSpinner } from '@/components/Loading/LoadingSpinner'

export default function HomePage() {
  const { t } = useTranslation()
  const router = useRouter()
  const { isAuthenticated, isLoading } = useAuth()
  const [mounted, setMounted] = useState(false)

  // Hydration mismatch'i önlemek için mount kontrolü
  useEffect(() => {
    setMounted(true)
  }, [])

  const handleGetStarted = () => {
    if (isAuthenticated) {
      router.push('/dashboard')
    } else {
      router.push('/auth/login')
    }
  }

  const handleLearnMore = () => {
    router.push('/about')
  }

  // Loading veya hydration tamamlanmamışsa spinner göster
  if (!mounted || isLoading) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-900'>
        <div className='text-center space-y-4'>
          <LoadingSpinner size='lg' />
          <p className='text-sm text-neutral-600 dark:text-neutral-400'>Sayfa yükleniyor...</p>
        </div>
      </div>
    )
  }

  return (
    <div className='flex flex-col min-h-screen'>
      {/* Hero Section */}
      <section className='flex-1 bg-gradient-to-br from-primary-50 to-accent-50 dark:from-primary-900 dark:to-accent-900 flex items-center'>
        <div className='max-w-7xl mx-auto px-4 py-12 sm:px-6 sm:py-24 lg:px-8 w-full'>
          <div className='text-center'>
            <h1 className='text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-neutral-100 mb-6'>
              {t('pages.home.title')}
            </h1>
            <p className='text-lg sm:text-xl text-neutral-600 dark:text-neutral-400 mb-8 max-w-3xl mx-auto'>
              {t('pages.home.subtitle')}
            </p>

            <div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
              <Button onClick={handleGetStarted} size='lg' className='w-full sm:w-auto'>
                {isAuthenticated ? t('pages.home.goToDashboard') : t('pages.home.getStarted')}
              </Button>
              <Button variant='outline' onClick={handleLearnMore} size='lg' className='w-full sm:w-auto'>
                {t('pages.home.learnMore')}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className='flex-1 bg-white dark:bg-neutral-800'>
        <div className='max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8'>
          <div className='text-center mb-12'>
            <h2 className='text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-4'>
              {t('pages.home.features.title')}
            </h2>
            <p className='text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto'>
              {t('pages.home.features.subtitle')}
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {/* Modern Design Feature */}
            <div className='text-center group'>
              <div className='bg-primary-100 dark:bg-primary-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300'>
                <span className='text-2xl' role='img' aria-label='Design'>
                  🎨
                </span>
              </div>
              <h3 className='text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-3'>
                {t('pages.home.features.modern.title')}
              </h3>
              <p className='text-neutral-600 dark:text-neutral-400 leading-relaxed'>
                {t('pages.home.features.modern.description')}
              </p>
            </div>

            {/* Performance Feature */}
            <div className='text-center group'>
              <div className='bg-primary-100 dark:bg-primary-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300'>
                <span className='text-2xl' role='img' aria-label='Performance'>
                  ⚡
                </span>
              </div>
              <h3 className='text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-3'>
                {t('pages.home.features.performance.title')}
              </h3>
              <p className='text-neutral-600 dark:text-neutral-400 leading-relaxed'>
                {t('pages.home.features.performance.description')}
              </p>
            </div>

            {/* Customizable Feature */}
            <div className='text-center group'>
              <div className='bg-primary-100 dark:bg-primary-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300'>
                <span className='text-2xl' role='img' aria-label='Customizable'>
                  🔧
                </span>
              </div>
              <h3 className='text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-3'>
                {t('pages.home.features.customizable.title')}
              </h3>
              <p className='text-neutral-600 dark:text-neutral-400 leading-relaxed'>
                {t('pages.home.features.customizable.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='bg-gradient-to-r from-primary-500 to-accent-500 dark:from-primary-600 dark:to-accent-600'>
        <div className='max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 text-center'>
          <h2 className='text-2xl sm:text-3xl font-bold text-white mb-4'>
            Hemen başlayın ve projelerinizi hızlandırın
          </h2>
          <p className='text-lg text-white/90 mb-8 max-w-2xl mx-auto'>
            Sea UI Kit ile modern, hızlı ve erişilebilir React uygulamaları geliştirin
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <Button
              size='lg'
              variant='outline'
              className='bg-white text-primary-600 hover:bg-white/90 border-white'
              onClick={handleGetStarted}
            >
              {isAuthenticated ? "Dashboard'a Git" : 'Şimdi Başla'}
            </Button>
            <Button
              size='lg'
              variant='ghost'
              className='text-white border-white/20 hover:bg-white/10'
              onClick={() => router.push('/components')}
            >
              Bileşenleri Görüntüle
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
