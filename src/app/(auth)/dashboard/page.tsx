'use client'

import { useRouter } from 'next/navigation'

import React from 'react'
import { useTranslation } from 'react-i18next'
import { Zap, Eye, User, Users, Clock, Shield, Settings, Sparkles, BarChart3, TrendingUp } from 'lucide-react'

import { useAuth } from '@/hooks/useAuth'

import { Button } from '@/components/core/Button/Button'
import { LoadingSpinner } from '@/components/core/Loading/LoadingSpinner'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/core/Card/Card'

export default function DashboardPage() {
  const router = useRouter()
  const { t } = useTranslation()
  const { user, logout, isLoading } = useAuth()

  const handleLogout = async () => {
    try {
      await logout()
      router.push('/')
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  if (isLoading) {
    return (
      <div className='flex items-center justify-center min-h-96'>
        <div className='text-center space-y-4'>
          <LoadingSpinner size='lg' />
          <p className='text-sm text-neutral-600 dark:text-neutral-400'>{t('common.loading')}</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className='flex items-center justify-center min-h-96'>
        <div className='text-center'>
          <p className='text-neutral-600 dark:text-neutral-400'>{t('pages.dashboard.userInfoNotLoaded')}</p>
          <Button onClick={() => router.push('/auth/login')} className='mt-4'>
            {t('auth.login')}
          </Button>
        </div>
      </div>
    )
  }

  const quickActions = [
    {
      title: 'Profili Görüntüle',
      description: 'Profil bilgilerinizi inceleyin ve düzenleyin',
      icon: User,
      href: '/profile',
      gradient: 'from-primary-500 to-primary-600',
      bgGradient: 'from-primary-100/50 to-primary-200/30',
      darkBgGradient: 'from-primary-900/20 to-primary-800/10',
    },
    {
      title: 'Ayarlar',
      description: 'Hesap ayarlarınızı yapılandırın',
      icon: Settings,
      href: '/settings',
      gradient: 'from-neutral-500 to-neutral-600',
      bgGradient: 'from-neutral-100/50 to-neutral-200/30',
      darkBgGradient: 'from-neutral-800/20 to-neutral-700/10',
    },
    {
      title: 'Kullanıcılar',
      description: 'Sistem kullanıcılarını yönetin',
      icon: Users,
      href: '/users',
      gradient: 'from-blue-500 to-blue-600',
      bgGradient: 'from-blue-100/50 to-blue-200/30',
      darkBgGradient: 'from-blue-900/20 to-blue-800/10',
    },
    {
      title: 'Bileşenler',
      description: 'UI bileşenlerini keşfedin',
      icon: BarChart3,
      href: '/components',
      gradient: 'from-accent-500 to-accent-600',
      bgGradient: 'from-accent-100/50 to-accent-200/30',
      darkBgGradient: 'from-accent-900/20 to-accent-800/10',
    },
  ]

  return (
    <div className='space-y-8'>
      {/* Enhanced Welcome Section */}
      <Card className='card-modern bg-gradient-to-r from-primary-50 to-blue-50/50 dark:from-primary-900/10 dark:to-blue-900/5 border-primary-200/50 dark:border-primary-700/30'>
        <CardContent className='p-8'>
          <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6'>
            <div className='space-y-2'>
              <div className='flex items-center gap-3 mb-2'>
                <div className='w-12 h-12 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl flex items-center justify-center'>
                  <Sparkles className='h-6 w-6 text-white' />
                </div>
                <div>
                  <h1 className='text-2xl lg:text-3xl font-bold text-neutral-900 dark:text-neutral-100'>
                    {t('pages.dashboard.welcome', {
                      name: user.username || user.username || user.email?.split('@')[0],
                    })}
                  </h1>
                  <p className='text-neutral-600 dark:text-neutral-300 text-sm'>
                    {new Date().toLocaleDateString('tr-TR', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
              </div>
              <p className='text-neutral-600 dark:text-neutral-300 max-w-2xl'>{t('pages.dashboard.description')}</p>
            </div>

            <div className='flex flex-col sm:flex-row gap-3'>
              <Button
                onClick={() => router.push('/profile')}
                variant='outline'
                className='border-primary-300 dark:border-primary-600 text-primary-700 dark:text-primary-300 hover:bg-primary-50 dark:hover:bg-primary-900/20'
              >
                <User className='h-4 w-4 mr-2' />
                {t('pages.dashboard.viewProfile')}
              </Button>
              <Button
                onClick={handleLogout}
                variant='ghost'
                className='text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200'
              >
                {t('pages.dashboard.logout')}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Quick Actions */}
      <div>
        <div className='flex items-center gap-3 mb-6'>
          <div className='w-8 h-8 bg-gradient-to-r from-accent-500 to-accent-600 rounded-lg flex items-center justify-center'>
            <Zap className='h-4 w-4 text-white' />
          </div>
          <h2 className='text-xl font-semibold text-neutral-900 dark:text-neutral-100'>Hızlı İşlemler</h2>
        </div>

        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
          {quickActions.map((action, index) => {
            const Icon = action.icon
            return (
              <Card
                key={index}
                className='card-modern group cursor-pointer hover:-translate-y-1 transition-all duration-300'
                onClick={() => router.push(action.href)}
              >
                <CardContent className='p-6'>
                  <div className='flex items-start space-x-4'>
                    <div
                      className={`p-3 rounded-xl bg-gradient-to-br ${action.bgGradient} dark:${action.darkBgGradient} group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className={`h-5 w-5 bg-gradient-to-r ${action.gradient} text-transparent bg-clip-text`} />
                    </div>
                    <div className='flex-1 min-w-0'>
                      <h3 className='text-sm font-medium text-neutral-900 dark:text-neutral-100 mb-1'>
                        {action.title}
                      </h3>
                      <p className='text-xs text-neutral-600 dark:text-neutral-400 line-clamp-2'>
                        {action.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Enhanced Recent Activity */}
      <Card className='card-modern'>
        <CardHeader className='pb-4'>
          <div className='flex items-center gap-3'>
            <div className='w-8 h-8 bg-gradient-to-r from-teal-500 to-teal-600 rounded-lg flex items-center justify-center'>
              <Clock className='h-4 w-4 text-white' />
            </div>
            <div>
              <CardTitle className='text-neutral-900 dark:text-neutral-100'>Son Aktiviteler</CardTitle>
              <CardDescription className='text-neutral-600 dark:text-neutral-400'>
                Hesabınızdaki son aktivitelerin özeti
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className='space-y-4'>
            {[
              {
                action: 'Profil güncellendi',
                time: '2 saat önce',
                icon: User,
                gradient: 'from-primary-500 to-primary-600',
                bgGradient: 'from-primary-100/50 to-primary-200/30',
                darkBgGradient: 'from-primary-900/20 to-primary-800/10',
              },
              {
                action: 'Yeni bileşen görüntülendi',
                time: '5 saat önce',
                icon: Eye,
                gradient: 'from-blue-500 to-blue-600',
                bgGradient: 'from-blue-100/50 to-blue-200/30',
                darkBgGradient: 'from-blue-900/20 to-blue-800/10',
              },
              {
                action: 'Ayarlar değiştirildi',
                time: '1 gün önce',
                icon: Settings,
                gradient: 'from-accent-500 to-accent-600',
                bgGradient: 'from-accent-100/50 to-accent-200/30',
                darkBgGradient: 'from-accent-900/20 to-accent-800/10',
              },
              {
                action: 'Güvenlik kontrolü tamamlandı',
                time: '2 gün önce',
                icon: Shield,
                gradient: 'from-teal-500 to-teal-600',
                bgGradient: 'from-teal-100/50 to-teal-200/30',
                darkBgGradient: 'from-teal-900/20 to-teal-800/10',
              },
            ].map((activity, index) => {
              const Icon = activity.icon
              return (
                <div
                  key={index}
                  className='flex items-center space-x-4 p-3 rounded-xl hover:bg-neutral-50 dark:hover:bg-neutral-800/30 transition-colors duration-200 group'
                >
                  <div
                    className={`p-2 rounded-lg bg-gradient-to-br ${activity.bgGradient} dark:${activity.darkBgGradient} group-hover:scale-110 transition-transform duration-200`}
                  >
                    <Icon className={`h-4 w-4 bg-gradient-to-r ${activity.gradient} text-transparent bg-clip-text`} />
                  </div>
                  <div className='flex-1'>
                    <p className='text-sm font-medium text-neutral-900 dark:text-neutral-100'>{activity.action}</p>
                    <p className='text-xs text-neutral-500 dark:text-neutral-400'>{activity.time}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Performance Overview */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        <Card className='card-modern'>
          <CardHeader>
            <div className='flex items-center gap-3'>
              <div className='w-8 h-8 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg flex items-center justify-center'>
                <BarChart3 className='h-4 w-4 text-white' />
              </div>
              <CardTitle className='text-neutral-900 dark:text-neutral-100'>Performans Özeti</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              <div className='flex items-center justify-between'>
                <span className='text-sm text-neutral-600 dark:text-neutral-400'>Sayfa Yükleme Hızı</span>
                <div className='flex items-center gap-2'>
                  <div className='w-24 h-2 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden'>
                    <div className='w-4/5 h-full bg-gradient-to-r from-green-500 to-green-600'></div>
                  </div>
                  <span className='text-sm font-medium text-green-600 dark:text-green-400'>95%</span>
                </div>
              </div>
              <div className='flex items-center justify-between'>
                <span className='text-sm text-neutral-600 dark:text-neutral-400'>API Yanıt Süresi</span>
                <div className='flex items-center gap-2'>
                  <div className='w-24 h-2 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden'>
                    <div className='w-3/4 h-full bg-gradient-to-r from-blue-500 to-blue-600'></div>
                  </div>
                  <span className='text-sm font-medium text-blue-600 dark:text-blue-400'>87%</span>
                </div>
              </div>
              <div className='flex items-center justify-between'>
                <span className='text-sm text-neutral-600 dark:text-neutral-400'>Kullanıcı Memnuniyeti</span>
                <div className='flex items-center gap-2'>
                  <div className='w-24 h-2 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden'>
                    <div className='w-full h-full bg-gradient-to-r from-primary-500 to-primary-600'></div>
                  </div>
                  <span className='text-sm font-medium text-primary-600 dark:text-primary-400'>98%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className='card-modern'>
          <CardHeader>
            <div className='flex items-center gap-3'>
              <div className='w-8 h-8 bg-gradient-to-r from-accent-500 to-accent-600 rounded-lg flex items-center justify-center'>
                <TrendingUp className='h-4 w-4 text-white' />
              </div>
              <CardTitle className='text-neutral-900 dark:text-neutral-100'>Bu Hafta</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              <div className='flex items-center justify-between p-3 bg-gradient-to-r from-primary-50 to-blue-50/50 dark:from-primary-900/10 dark:to-blue-900/5 rounded-lg'>
                <div>
                  <p className='text-sm font-medium text-neutral-900 dark:text-neutral-100'>Toplam Ziyaretçi</p>
                  <p className='text-xs text-neutral-600 dark:text-neutral-400'>Son 7 gün</p>
                </div>
                <div className='text-right'>
                  <p className='text-lg font-bold text-primary-600 dark:text-primary-400'>1,847</p>
                  <p className='text-xs text-green-600 dark:text-green-400'>+15.3%</p>
                </div>
              </div>

              <div className='flex items-center justify-between p-3 bg-gradient-to-r from-accent-50 to-teal-50/50 dark:from-accent-900/10 dark:to-teal-900/5 rounded-lg'>
                <div>
                  <p className='text-sm font-medium text-neutral-900 dark:text-neutral-100'>Yeni Kullanıcılar</p>
                  <p className='text-xs text-neutral-600 dark:text-neutral-400'>Son 7 gün</p>
                </div>
                <div className='text-right'>
                  <p className='text-lg font-bold text-accent-600 dark:text-accent-400'>234</p>
                  <p className='text-xs text-green-600 dark:text-green-400'>+8.7%</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
