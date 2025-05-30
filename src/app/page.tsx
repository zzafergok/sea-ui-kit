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
      <div className='min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-background'>
        <div className='text-center space-y-4'>
          <LoadingSpinner size='lg' />
          <p className='text-sm text-neutral-600 dark:text-neutral-400'>{t('common.pageLoading')}</p>
        </div>
      </div>
    )
  }

  return (
    <div className='flex flex-col min-h-screen'>
      {/* Hero Section - Geliştirilmiş dark tema */}
      <section className='flex-1 bg-gradient-to-br from-primary-50 via-accent-50/30 to-neutral-50 dark:gradient-bg-dark flex items-center relative overflow-hidden'>
        {/* Background Pattern */}
        <div className='absolute inset-0 bg-grid-neutral-200/20 dark:bg-grid-neutral-800/10 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:[mask-image:linear-gradient(0deg,rgba(0,0,0,0.8),rgba(0,0,0,0.2))]' />

        {/* Gradient overlay for dark theme */}
        <div className='absolute inset-0 dark:hero-pattern-dark' />

        {/* Floating elements */}
        <div className='absolute top-20 left-10 w-72 h-72 bg-primary-300/20 dark:bg-primary-500/10 rounded-full blur-3xl animate-pulse' />
        <div className='absolute bottom-20 right-10 w-96 h-96 bg-accent-300/20 dark:bg-accent-500/10 rounded-full blur-3xl animate-pulse' />

        <div className='max-w-7xl mx-auto px-4 py-12 sm:px-6 sm:py-24 lg:px-8 w-full relative z-10'>
          <div className='text-center'>
            <h1 className='text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-foreground mb-6 leading-tight'>
              {t('pages.home.title')}
            </h1>
            <p className='text-lg sm:text-xl text-neutral-600 dark:text-neutral-300 mb-8 max-w-3xl mx-auto leading-relaxed'>
              {t('pages.home.subtitle')}
            </p>

            <div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
              <Button
                onClick={handleGetStarted}
                size='lg'
                className='w-full sm:w-auto shadow-lg hover:shadow-xl transition-all duration-300 bg-primary-500 hover:bg-primary-600 dark:bg-primary-500 dark:hover:bg-primary-400 dark:text-white'
              >
                {isAuthenticated ? t('pages.home.goToDashboard') : t('pages.home.getStarted')}
              </Button>
              <Button
                variant='outline'
                onClick={handleLearnMore}
                size='lg'
                className='w-full sm:w-auto border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800/50 transition-all duration-300'
              >
                {t('pages.home.learnMore')}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Geliştirilmiş dark tema */}
      <section className='flex-1 bg-white dark:bg-card border-t border-neutral-200 dark:border-border'>
        <div className='max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8'>
          <div className='text-center mb-12'>
            <h2 className='text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-foreground mb-4'>
              {t('pages.home.features.title')}
            </h2>
            <p className='text-lg text-neutral-600 dark:text-muted-foreground max-w-2xl mx-auto'>
              {t('pages.home.features.subtitle')}
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {/* Modern Design Feature */}
            <div className='text-center group cursor-pointer'>
              <div className='relative'>
                <div className='absolute inset-0 bg-primary-400/20 dark:bg-primary-500/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500' />
                <div className='relative bg-gradient-to-br from-primary-100 to-primary-200/50 dark:from-primary-900/20 dark:to-primary-800/10 border border-primary-200/50 dark:border-primary-700/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-300'>
                  <span className='text-2xl' role='img' aria-label='Design'>
                    🎨
                  </span>
                </div>
              </div>
              <h3 className='text-xl font-semibold text-neutral-900 dark:text-foreground mb-3'>
                {t('pages.home.features.modern.title')}
              </h3>
              <p className='text-neutral-600 dark:text-muted-foreground leading-relaxed'>
                {t('pages.home.features.modern.description')}
              </p>
            </div>

            {/* Performance Feature */}
            <div className='text-center group cursor-pointer'>
              <div className='relative'>
                <div className='absolute inset-0 bg-accent-400/20 dark:bg-accent-500/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500' />
                <div className='relative bg-gradient-to-br from-accent-100 to-accent-200/50 dark:from-accent-900/20 dark:to-accent-800/10 border border-accent-200/50 dark:border-accent-700/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-300'>
                  <span className='text-2xl' role='img' aria-label='Performance'>
                    ⚡
                  </span>
                </div>
              </div>
              <h3 className='text-xl font-semibold text-neutral-900 dark:text-foreground mb-3'>
                {t('pages.home.features.performance.title')}
              </h3>
              <p className='text-neutral-600 dark:text-muted-foreground leading-relaxed'>
                {t('pages.home.features.performance.description')}
              </p>
            </div>

            {/* Customizable Feature */}
            <div className='text-center group cursor-pointer'>
              <div className='relative'>
                <div className='absolute inset-0 bg-primary-400/20 dark:bg-primary-500/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500' />
                <div className='relative bg-gradient-to-br from-primary-100 to-accent-100/50 dark:from-primary-900/20 dark:to-accent-900/10 border border-primary-200/50 dark:border-primary-700/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-300'>
                  <span className='text-2xl' role='img' aria-label='Customizable'>
                    🔧
                  </span>
                </div>
              </div>
              <h3 className='text-xl font-semibold text-neutral-900 dark:text-foreground mb-3'>
                {t('pages.home.features.customizable.title')}
              </h3>
              <p className='text-neutral-600 dark:text-muted-foreground leading-relaxed'>
                {t('pages.home.features.customizable.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section - Geliştirilmiş dark tema */}
      <section className='bg-neutral-50 dark:bg-muted border-t border-neutral-200 dark:border-border'>
        <div className='max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8'>
          <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4'>
            <div className='text-center group'>
              <div className='text-3xl font-bold text-primary-600 dark:text-primary-500 mb-2 group-hover:scale-110 transition-transform duration-300'>
                50+
              </div>
              <div className='text-sm font-medium text-neutral-600 dark:text-muted-foreground'>Bileşen</div>
            </div>
            <div className='text-center group'>
              <div className='text-3xl font-bold text-primary-600 dark:text-primary-500 mb-2 group-hover:scale-110 transition-transform duration-300'>
                100%
              </div>
              <div className='text-sm font-medium text-neutral-600 dark:text-muted-foreground'>TypeScript</div>
            </div>
            <div className='text-center group'>
              <div className='text-3xl font-bold text-primary-600 dark:text-primary-500 mb-2 group-hover:scale-110 transition-transform duration-300'>
                A11Y
              </div>
              <div className='text-sm font-medium text-neutral-600 dark:text-muted-foreground'>Erişilebilir</div>
            </div>
            <div className='text-center group'>
              <div className='text-3xl font-bold text-primary-600 dark:text-primary-500 mb-2 group-hover:scale-110 transition-transform duration-300'>
                MIT
              </div>
              <div className='text-sm font-medium text-neutral-600 dark:text-muted-foreground'>Açık Kaynak</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Geliştirilmiş dark tema */}
      <section className='bg-gradient-to-r from-primary-500 to-accent-500 dark:from-primary-600/90 dark:to-accent-600/90 relative overflow-hidden'>
        {/* Background pattern */}
        <div className='absolute inset-0 bg-grid-white/10 dark:bg-grid-white/5 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]' />

        {/* Overlay for better contrast */}
        <div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent dark:from-black/40' />

        <div className='max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 relative z-10'>
          <div className='text-center'>
            <h2 className='text-2xl sm:text-3xl font-bold text-white mb-4 drop-shadow-md'>Hemen Başlayın</h2>
            <p className='text-lg text-white/95 mb-8 max-w-2xl mx-auto drop-shadow'>
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
                className='w-full sm:w-auto border-white/80 text-white hover:bg-white/10 dark:border-white/60 dark:hover:bg-white/20 backdrop-blur-sm transition-all duration-300'
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
