'use client'

import { useRouter } from 'next/navigation'

import React from 'react'

import { useTranslation } from 'react-i18next'
import { User, Settings, Users, BarChart3, Activity, TrendingUp, Eye, Download } from 'lucide-react'

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

  const stats = [
    {
      title: 'Toplam Görüntüleme',
      value: '2,543',
      change: '+12%',
      icon: Eye,
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-100 dark:bg-blue-900/30',
      borderColor: 'border-blue-200 dark:border-blue-800/50',
    },
    {
      title: 'Aktif Kullanıcılar',
      value: '1,234',
      change: '+8%',
      icon: Users,
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-100 dark:bg-green-900/30',
      borderColor: 'border-green-200 dark:border-green-800/50',
    },
    {
      title: 'İndirmeler',
      value: '456',
      change: '+23%',
      icon: Download,
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-100 dark:bg-purple-900/30',
      borderColor: 'border-purple-200 dark:border-purple-800/50',
    },
    {
      title: 'Performans',
      value: '98.5%',
      change: '+2%',
      icon: Activity,
      color: 'text-orange-600 dark:text-orange-400',
      bgColor: 'bg-orange-100 dark:bg-orange-900/30',
      borderColor: 'border-orange-200 dark:border-orange-800/50',
    },
  ]

  const quickActions = [
    {
      title: 'Profili Görüntüle',
      description: 'Profil bilgilerinizi inceleyin ve düzenleyin',
      icon: User,
      href: '/profile',
      color: 'text-primary-600 dark:text-primary-400',
      bgColor: 'bg-primary-100 dark:bg-primary-900/30',
    },
    {
      title: 'Ayarlar',
      description: 'Hesap ayarlarınızı yapılandırın',
      icon: Settings,
      href: '/settings',
      color: 'text-neutral-600 dark:text-neutral-400',
      bgColor: 'bg-neutral-100 dark:bg-neutral-800/50',
    },
    {
      title: 'Kullanıcılar',
      description: 'Sistem kullanıcılarını yönetin',
      icon: Users,
      href: '/users',
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-100 dark:bg-green-900/30',
    },
    {
      title: 'Bileşenler',
      description: 'UI bileşenlerini keşfedin',
      icon: BarChart3,
      href: '/components',
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-100 dark:bg-blue-900/30',
    },
  ]

  return (
    <div className='space-y-8'>
      {/* Welcome Section - Dark tema iyileştirmeleri */}
      <div className='bg-gradient-to-r from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20 rounded-lg p-6 border border-primary-100 dark:border-primary-800/50 backdrop-blur-sm'>
        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between'>
          <div>
            <h1 className='text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-2'>
              {t('pages.dashboard.welcome', { name: user.username || user.username || user.email?.split('@')[0] })}
            </h1>
            <p className='text-neutral-600 dark:text-neutral-300'>{t('pages.dashboard.description')}</p>
          </div>
          <div className='mt-4 sm:mt-0 flex space-x-3'>
            <Button
              onClick={() => router.push('/profile')}
              variant='outline'
              className='border-primary-300 dark:border-primary-700 text-primary-700 dark:text-primary-300 hover:bg-primary-50 dark:hover:bg-primary-900/30'
            >
              {t('pages.dashboard.viewProfile')}
            </Button>
            <Button
              onClick={handleLogout}
              variant='outline'
              className='border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800/50'
            >
              {t('pages.dashboard.logout')}
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Grid - Dark tema iyileştirmeleri */}
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card
              key={index}
              className='hover:shadow-lg dark:hover:shadow-xl transition-all duration-300 border-neutral-200 dark:border-neutral-700 dark:bg-neutral-800/50'
            >
              <CardContent className='p-6'>
                <div className='flex items-center justify-between'>
                  <div>
                    <p className='text-sm font-medium text-neutral-600 dark:text-neutral-400'>{stat.title}</p>
                    <p className='text-2xl font-bold text-neutral-900 dark:text-neutral-100'>{stat.value}</p>
                    <div className='flex items-center text-sm'>
                      <TrendingUp className='h-3 w-3 text-green-600 dark:text-green-400 mr-1' />
                      <span className='text-green-600 dark:text-green-400 font-medium'>{stat.change}</span>
                      <span className='text-neutral-500 dark:text-neutral-400 ml-1'>son ay</span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-full ${stat.bgColor} border ${stat.borderColor}`}>
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Quick Actions - Dark tema iyileştirmeleri */}
      <div>
        <h2 className='text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4'>Hızlı İşlemler</h2>
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
          {quickActions.map((action, index) => {
            const Icon = action.icon
            return (
              <Card
                key={index}
                className='hover:shadow-lg dark:hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group border-neutral-200 dark:border-neutral-700 dark:bg-neutral-800/50'
                onClick={() => router.push(action.href)}
              >
                <CardContent className='p-6'>
                  <div className='flex items-start space-x-4'>
                    <div
                      className={`p-2 rounded-lg ${action.bgColor} group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className={`h-5 w-5 ${action.color}`} />
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

      {/* Recent Activity - Dark tema iyileştirmeleri */}
      <Card className='border-neutral-200 dark:border-neutral-700 dark:bg-neutral-800/50'>
        <CardHeader>
          <CardTitle className='text-neutral-900 dark:text-neutral-100'>Son Aktiviteler</CardTitle>
          <CardDescription className='text-neutral-600 dark:text-neutral-400'>
            Hesabınızdaki son aktivitelerin özeti
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='space-y-4'>
            {[
              {
                action: 'Profil güncellendi',
                time: '2 saat önce',
                icon: User,
              },
              {
                action: 'Yeni bileşen görüntülendi',
                time: '5 saat önce',
                icon: Eye,
              },
              {
                action: 'Ayarlar değiştirildi',
                time: '1 gün önce',
                icon: Settings,
              },
            ].map((activity, index) => {
              const Icon = activity.icon
              return (
                <div key={index} className='flex items-center space-x-3 py-2'>
                  <div className='p-1.5 rounded-full bg-neutral-100 dark:bg-neutral-700/50'>
                    <Icon className='h-4 w-4 text-neutral-600 dark:text-neutral-300' />
                  </div>
                  <div className='flex-1'>
                    <p className='text-sm text-neutral-900 dark:text-neutral-100'>{activity.action}</p>
                    <p className='text-xs text-neutral-500 dark:text-neutral-400'>{activity.time}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
