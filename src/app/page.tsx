'use client'

import { useRouter } from 'next/navigation'

import React, { useEffect, useState } from 'react'

import { useTranslation } from 'react-i18next'
import { Sparkles, Zap, Palette, Code, ArrowRight, Github } from 'lucide-react'

import { useAuth } from '@/hooks/useAuth'

import { Button } from '@/components/core/Button/Button'
import { Card, CardContent } from '@/components/core/Card/Card'
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
      {/* Hero Section - Yeni color palette ile */}
      <section className='flex-1 bg-gradient-to-br from-neutral-50 via-primary-50/20 to-blue-50/30 dark:gradient-bg-dark flex items-center relative overflow-hidden'>
        {/* Enhanced Background Pattern */}
        <div className='absolute inset-0 bg-grid-neutral-200/20 dark:bg-grid-neutral-800/10 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:[mask-image:linear-gradient(0deg,rgba(0,0,0,0.8),rgba(0,0,0,0.2))]' />

        {/* Yeni gradient overlays */}
        <div className='absolute inset-0 dark:hero-pattern-dark' />

        {/* Enhanced floating elements with new colors */}
        <div className='absolute top-20 left-10 w-72 h-72 bg-primary-300/20 dark:bg-primary-500/10 rounded-full blur-3xl animate-pulse opacity-70' />
        <div className='absolute bottom-20 right-10 w-96 h-96 bg-blue-300/20 dark:bg-blue-500/10 rounded-full blur-3xl animate-pulse opacity-60' />
        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accent-300/15 dark:bg-accent-500/8 rounded-full blur-3xl animate-pulse opacity-50' />

        <div className='max-w-7xl mx-auto px-4 py-12 sm:px-6 sm:py-24 lg:px-8 w-full relative z-10'>
          <div className='text-center'>
            {/* Enhanced heading with gradient text */}
            <h1 className='text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight'>
              <span className='text-gradient bg-gradient-to-r from-primary-600 via-blue-500 to-accent-600 bg-clip-text text-transparent'>
                {t('pages.home.title')}
              </span>
            </h1>

            <p className='text-lg sm:text-xl text-neutral-600 dark:text-neutral-300 mb-8 max-w-3xl mx-auto leading-relaxed'>
              {t('pages.home.subtitle')}
            </p>

            {/* Enhanced action buttons */}
            <div className='flex flex-col sm:flex-row gap-4 justify-center items-center mb-12'>
              <Button
                onClick={handleGetStarted}
                size='lg'
                className='w-full sm:w-auto bg-gradient-primary text-white shadow-lg hover:shadow-primary-glow transition-all duration-300 transform hover:scale-105 border-0'
              >
                <span className='mr-2'>
                  {isAuthenticated ? t('pages.home.goToDashboard') : t('pages.home.getStarted')}
                </span>
                <ArrowRight className='h-4 w-4' />
              </Button>

              <Button
                variant='outline'
                onClick={handleLearnMore}
                size='lg'
                className='w-full sm:w-auto border-primary-300 dark:border-primary-600 text-primary-700 dark:text-primary-300 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all duration-300'
              >
                {t('pages.home.learnMore')}
              </Button>
            </div>

            {/* New tech showcase */}
            <div className='flex justify-center items-center gap-8 opacity-70'>
              <div className='flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400'>
                <Code className='h-4 w-4' />
                <span>React 18+</span>
              </div>
              <div className='flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400'>
                <Zap className='h-4 w-4' />
                <span>Next.js 14+</span>
              </div>
              <div className='flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400'>
                <Palette className='h-4 w-4' />
                <span>TypeScript</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className='py-20 bg-white dark:bg-card border-t border-neutral-200 dark:border-border'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-foreground mb-4'>
              {t('pages.home.features.title')}
            </h2>
            <p className='text-lg text-neutral-600 dark:text-muted-foreground max-w-2xl mx-auto'>
              {t('pages.home.features.subtitle')}
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {/* Modern Design Feature - Enhanced */}
            <Card className='group cursor-pointer card-modern hover:border-primary-300 dark:hover:border-primary-600 transition-all duration-300'>
              <CardContent className='p-8 text-center'>
                <div className='relative mb-6'>
                  <div className='absolute inset-0 bg-primary-400/20 dark:bg-primary-500/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500' />
                  <div className='relative bg-gradient-to-br from-primary-100 to-primary-200/50 dark:from-primary-900/20 dark:to-primary-800/10 border border-primary-200/50 dark:border-primary-700/30 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-all duration-300'>
                    <Palette className='h-8 w-8 text-primary-600 dark:text-primary-400' />
                  </div>
                </div>
                <h3 className='text-xl font-semibold text-neutral-900 dark:text-foreground mb-3'>
                  {t('pages.home.features.modern.title')}
                </h3>
                <p className='text-neutral-600 dark:text-muted-foreground leading-relaxed'>
                  {t('pages.home.features.modern.description')}
                </p>
              </CardContent>
            </Card>

            {/* Performance Feature - Enhanced */}
            <Card className='group cursor-pointer card-modern hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300'>
              <CardContent className='p-8 text-center'>
                <div className='relative mb-6'>
                  <div className='absolute inset-0 bg-blue-400/20 dark:bg-blue-500/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500' />
                  <div className='relative bg-gradient-to-br from-blue-100 to-blue-200/50 dark:from-blue-900/20 dark:to-blue-800/10 border border-blue-200/50 dark:border-blue-700/30 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-all duration-300'>
                    <Zap className='h-8 w-8 text-blue-600 dark:text-blue-400' />
                  </div>
                </div>
                <h3 className='text-xl font-semibold text-neutral-900 dark:text-foreground mb-3'>
                  {t('pages.home.features.performance.title')}
                </h3>
                <p className='text-neutral-600 dark:text-muted-foreground leading-relaxed'>
                  {t('pages.home.features.performance.description')}
                </p>
              </CardContent>
            </Card>

            {/* Customizable Feature - Enhanced */}
            <Card className='group cursor-pointer card-modern hover:border-accent-300 dark:hover:border-accent-600 transition-all duration-300'>
              <CardContent className='p-8 text-center'>
                <div className='relative mb-6'>
                  <div className='absolute inset-0 bg-accent-400/20 dark:bg-accent-500/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500' />
                  <div className='relative bg-gradient-to-br from-accent-100 to-accent-200/50 dark:from-accent-900/20 dark:to-accent-800/10 border border-accent-200/50 dark:border-accent-700/30 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-all duration-300'>
                    <Sparkles className='h-8 w-8 text-accent-600 dark:text-accent-400' />
                  </div>
                </div>
                <h3 className='text-xl font-semibold text-neutral-900 dark:text-foreground mb-3'>
                  {t('pages.home.features.customizable.title')}
                </h3>
                <p className='text-neutral-600 dark:text-muted-foreground leading-relaxed'>
                  {t('pages.home.features.customizable.description')}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Enhanced Statistics Section */}
      <section className='py-20 bg-gradient-to-r from-neutral-50 to-primary-50/20 dark:bg-gradient-to-r dark:from-muted dark:to-primary-50/5 border-t border-neutral-200 dark:border-border'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid grid-cols-2 gap-8 lg:grid-cols-4'>
            <div className='text-center group'>
              <div className='text-4xl font-bold text-primary-600 dark:text-primary-500 mb-2 group-hover:scale-110 transition-transform duration-300 group-hover:text-primary-500 dark:group-hover:text-primary-400'>
                50+
              </div>
              <div className='text-sm font-medium text-neutral-600 dark:text-muted-foreground'>Bileşen</div>
            </div>
            <div className='text-center group'>
              <div className='text-4xl font-bold text-blue-600 dark:text-blue-500 mb-2 group-hover:scale-110 transition-transform duration-300 group-hover:text-blue-500 dark:group-hover:text-blue-400'>
                100%
              </div>
              <div className='text-sm font-medium text-neutral-600 dark:text-muted-foreground'>TypeScript</div>
            </div>
            <div className='text-center group'>
              <div className='text-4xl font-bold text-accent-600 dark:text-accent-500 mb-2 group-hover:scale-110 transition-transform duration-300 group-hover:text-accent-500 dark:group-hover:text-accent-400'>
                A11Y
              </div>
              <div className='text-sm font-medium text-neutral-600 dark:text-muted-foreground'>Erişilebilir</div>
            </div>
            <div className='text-center group'>
              <div className='text-4xl font-bold text-teal-600 dark:text-teal-500 mb-2 group-hover:scale-110 transition-transform duration-300 group-hover:text-teal-500 dark:group-hover:text-teal-400'>
                MIT
              </div>
              <div className='text-sm font-medium text-neutral-600 dark:text-muted-foreground'>Açık Kaynak</div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className='relative overflow-hidden bg-gradient-to-r from-primary-500 via-blue-500 to-accent-500 dark:from-primary-600/90 dark:via-blue-600/90 dark:to-accent-600/90'>
        {/* Enhanced background pattern */}
        <div className='absolute inset-0 bg-grid-white/10 dark:bg-grid-white/5 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]' />

        {/* Gradient overlay for better contrast */}
        <div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent dark:from-black/40' />

        <div className='max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8 relative z-10'>
          <div className='text-center'>
            <h2 className='text-3xl sm:text-4xl font-bold text-white mb-6 drop-shadow-md'>Hemen Başlayın</h2>
            <p className='text-lg text-white/95 mb-8 max-w-2xl mx-auto drop-shadow leading-relaxed'>
              Modern React uygulamanızı oluşturmaya bugün başlayın. Sea UI Kit ile hızlı ve güvenilir geliştirme
              deneyimi yaşayın.
            </p>

            <div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
              <Button
                onClick={handleGetStarted}
                size='lg'
                className='w-full sm:w-auto bg-white text-primary-600 hover:bg-neutral-100 dark:bg-neutral-100 dark:text-primary-700 dark:hover:bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-0 font-semibold'
              >
                <span className='mr-2'>
                  {isAuthenticated ? t('pages.home.goToDashboard') : t('pages.home.getStarted')}
                </span>
                <ArrowRight className='h-4 w-4' />
              </Button>

              <Button
                variant='outline'
                onClick={() => window.open('https://github.com/zzafergok/sea-ui-kit', '_blank')}
                size='lg'
                className='w-full sm:w-auto border-white/80 text-white hover:bg-white/10 dark:border-white/60 dark:hover:bg-white/20 backdrop-blur-sm transition-all duration-300'
              >
                <Github className='h-4 w-4 mr-2' />
                GitHub&apos;da İncele
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
