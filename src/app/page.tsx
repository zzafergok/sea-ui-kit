'use client'

import { useRouter } from 'next/navigation'

import React, { useEffect, useState } from 'react'

import { useTranslation } from 'react-i18next'

import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/core/Button/Button'
import { LoadingSpinner } from '@/components/core/Loading/LoadingSpinner'

export default function HomePage() {
  const router = useRouter()
  const { t } = useTranslation()
  const { isAuthenticated, isLoading } = useAuth()

  const [mounted, setMounted] = useState(false)

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

  if (!mounted || isLoading) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-900'>
        <div className='text-center space-y-4'>
          <LoadingSpinner size='lg' />
          <p className='text-sm text-neutral-600 dark:text-neutral-400'>{t('common.pageLoading')}</p>
        </div>
      </div>
    )
  }

  return (
    <div className='flex flex-col min-h-screen'>
      {/* Hero Section - Dark tema iyileştirmeleri */}
      <section className='flex-1 bg-gradient-to-br from-primary-50 to-accent-50 dark:from-neutral-900 dark:via-neutral-800 dark:to-primary-950 flex items-center relative overflow-hidden'>
        {/* Background Pattern - Dark tema için geliştirilmiş */}
        <div className='absolute inset-0 bg-grid-neutral-100/30 dark:bg-grid-neutral-700/20 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:[mask-image:linear-gradient(0deg,rgba(0,0,0,0.9),rgba(0,0,0,0.3))]' />

        {/* Gradient overlay for dark theme */}
        <div className='absolute inset-0 dark:hero-pattern-dark' />

        <div className='max-w-7xl mx-auto px-4 py-12 sm:px-6 sm:py-24 lg:px-8 w-full relative z-10'>
          <div className='text-center'>
            <h1 className='text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-neutral-100 mb-6 leading-tight'>
              {t('pages.home.title')}
            </h1>
            <p className='text-lg sm:text-xl text-neutral-600 dark:text-neutral-300 mb-8 max-w-3xl mx-auto leading-relaxed'>
              {t('pages.home.subtitle')}
            </p>

            <div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
              <Button
                onClick={handleGetStarted}
                size='lg'
                className='w-full sm:w-auto shadow-lg hover:shadow-xl transition-all duration-300'
              >
                {isAuthenticated ? t('pages.home.goToDashboard') : t('pages.home.getStarted')}
              </Button>
              <Button
                variant='outline'
                onClick={handleLearnMore}
                size='lg'
                className='w-full sm:w-auto border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all duration-300'
              >
                {t('pages.home.learnMore')}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Dark tema iyileştirmeleri */}
      <section className='flex-1 bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-700'>
        <div className='max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8'>
          <div className='text-center mb-12'>
            <h2 className='text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-4'>
              {t('pages.home.features.title')}
            </h2>
            <p className='text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto'>
              {t('pages.home.features.subtitle')}
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {/* Modern Design Feature */}
            <div className='text-center group'>
              <div className='bg-primary-100 dark:bg-primary-900/30 border border-primary-200/50 dark:border-primary-800/50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300'>
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
              <div className='bg-primary-100 dark:bg-primary-900/30 border border-primary-200/50 dark:border-primary-800/50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300'>
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
              <div className='bg-primary-100 dark:bg-primary-900/30 border border-primary-200/50 dark:border-primary-800/50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300'>
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

      {/* Statistics Section - Dark tema iyileştirmeleri */}
      <section className='bg-neutral-50 dark:bg-neutral-800/50 border-t border-neutral-200 dark:border-neutral-700'>
        <div className='max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8'>
          <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4'>
            <div className='text-center'>
              <div className='text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2'>50+</div>
              <div className='text-sm font-medium text-neutral-600 dark:text-neutral-300'>Bileşen</div>
            </div>
            <div className='text-center'>
              <div className='text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2'>100%</div>
              <div className='text-sm font-medium text-neutral-600 dark:text-neutral-300'>TypeScript</div>
            </div>
            <div className='text-center'>
              <div className='text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2'>A11Y</div>
              <div className='text-sm font-medium text-neutral-600 dark:text-neutral-300'>Erişilebilir</div>
            </div>
            <div className='text-center'>
              <div className='text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2'>MIT</div>
              <div className='text-sm font-medium text-neutral-600 dark:text-neutral-300'>Açık Kaynak</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Dark tema iyileştirmeleri */}
      <section className='bg-gradient-to-r from-primary-500 to-accent-500 dark:from-primary-600 dark:to-accent-600 relative overflow-hidden'>
        {/* Dark overlay for better text contrast */}
        <div className='absolute inset-0 bg-black/10 dark:bg-black/20' />

        <div className='max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 relative z-10'>
          <div className='text-center'>
            <h2 className='text-2xl sm:text-3xl font-bold text-white mb-4'>Hemen Başlayın</h2>
            <p className='text-lg text-white/90 dark:text-white/95 mb-8 max-w-2xl mx-auto'>
              Modern React uygulamanızı oluşturmaya bugün başlayın. Sea UI Kit ile hızlı ve güvenilir geliştirme
              deneyimi yaşayın.
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
              <Button
                onClick={handleGetStarted}
                size='lg'
                variant='secondary'
                className='w-full sm:w-auto bg-white text-primary-600 hover:bg-neutral-100 dark:bg-neutral-100 dark:text-primary-700 dark:hover:bg-white shadow-lg hover:shadow-xl transition-all duration-300'
              >
                {isAuthenticated ? t('pages.home.goToDashboard') : t('pages.home.getStarted')}
              </Button>
              <Button
                variant='outline'
                onClick={() => window.open('https://github.com/zzafergok/sea-ui-kit', '_blank')}
                size='lg'
                className='w-full sm:w-auto border-white/80 text-white hover:bg-white/10 dark:border-white/70 dark:text-white dark:hover:bg-white/15 backdrop-blur-sm transition-all duration-300'
              >
                GitHub&apos;da İncele
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
