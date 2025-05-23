'use client'

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/Button/Button'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'

export default function HomePage() {
  const router = useRouter()
  const { isAuthenticated, isLoading } = useAuth()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-900'>
        <div className='animate-spin h-8 w-8 border-2 border-primary-500 border-t-transparent rounded-full'></div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-900'>
        <div className='animate-spin h-8 w-8 border-2 border-primary-500 border-t-transparent rounded-full'></div>
      </div>
    )
  }

  return (
    <div className='min-h-screen w-full overflow-x-hidden'>
      {/* Header */}
      <header className='w-full bg-white dark:bg-neutral-800 shadow-sm border-b border-neutral-200 dark:border-neutral-700'>
        <div className='w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between items-center h-16'>
            <div className='flex-shrink-0'>
              <h1 className='text-xl font-semibold text-primary-700 dark:text-primary-500'>Sea UI Kit</h1>
            </div>
            <nav className='flex items-center space-x-2 sm:space-x-4'>
              {isAuthenticated ? (
                <>
                  <Button variant='ghost' onClick={() => router.push('/dashboard')} size='sm' className='text-sm px-3'>
                    Dashboard
                  </Button>
                  <Button variant='outline' onClick={() => router.push('/profile')} size='sm' className='text-sm px-3'>
                    Profil
                  </Button>
                </>
              ) : (
                <>
                  <Button variant='ghost' onClick={() => router.push('/auth/login')} size='sm' className='text-sm px-3'>
                    Giriş Yap
                  </Button>
                  <Button onClick={() => router.push('/auth/register')} size='sm' className='text-sm px-3'>
                    Kayıt Ol
                  </Button>
                </>
              )}
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className='w-full bg-gradient-to-br from-primary-50 to-accent-50 dark:from-primary-900 dark:to-accent-900'>
        <div className='w-full max-w-7xl mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:px-8'>
          <div className='text-center'>
            <h1 className='text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-6 leading-tight'>
              Sea UI Kit'e Hoş Geldiniz
            </h1>
            <p className='text-lg sm:text-xl text-neutral-600 dark:text-neutral-400 mb-8 max-w-2xl mx-auto leading-relaxed'>
              Modern React uygulamaları için tasarlanmış kapsamlı component kütüphanesi. Radix UI tabanlı, erişilebilir
              ve özelleştirilebilir komponentler.
            </p>

            <div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
              {isAuthenticated ? (
                <Button onClick={() => router.push('/dashboard')} size='lg' className='w-full sm:w-auto'>
                  Dashboard'a Git
                </Button>
              ) : (
                <>
                  <Button onClick={() => router.push('/auth/login')} size='lg' className='w-full sm:w-auto'>
                    Başlayın
                  </Button>
                  <Button
                    variant='outline'
                    onClick={() => router.push('/about')}
                    size='lg'
                    className='w-full sm:w-auto'
                  >
                    Daha Fazla Bilgi
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className='w-full bg-white dark:bg-neutral-800 py-16'>
        <div className='w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-12'>
            <h2 className='text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-4'>Özellikler</h2>
            <p className='text-lg text-neutral-600 dark:text-neutral-400'>
              Sea UI Kit ile modern uygulamalar geliştirin
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            <div className='text-center'>
              <div className='bg-primary-100 dark:bg-primary-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 flex-shrink-0'>
                <span className='text-2xl'>🎨</span>
              </div>
              <h3 className='text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2'>Modern Tasarım</h3>
              <p className='text-neutral-600 dark:text-neutral-400 leading-relaxed'>
                Sea blue teması ile modern ve şık arayüzler oluşturun
              </p>
            </div>

            <div className='text-center'>
              <div className='bg-primary-100 dark:bg-primary-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 flex-shrink-0'>
                <span className='text-2xl'>⚡</span>
              </div>
              <h3 className='text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2'>Performans</h3>
              <p className='text-neutral-600 dark:text-neutral-400 leading-relaxed'>
                Optimize edilmiş komponentler ile hızlı uygulamalar geliştirin
              </p>
            </div>

            <div className='text-center'>
              <div className='bg-primary-100 dark:bg-primary-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 flex-shrink-0'>
                <span className='text-2xl'>🔧</span>
              </div>
              <h3 className='text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2'>Özelleştirilebilir</h3>
              <p className='text-neutral-600 dark:text-neutral-400 leading-relaxed'>
                Tüm komponentler ihtiyaçlarınıza göre özelleştirilebilir
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className='w-full bg-neutral-900 dark:bg-neutral-950 text-white py-8'>
        <div className='w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center'>
            <p className='text-sm sm:text-base'>&copy; 2024 Sea UI Kit. Tüm hakları saklıdır.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
