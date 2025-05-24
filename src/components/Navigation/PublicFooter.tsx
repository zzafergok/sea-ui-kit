'use client'

import React from 'react'
import { useTranslation } from 'react-i18next'
import { Github, Twitter, Linkedin, Mail } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface PublicFooterProps {
  className?: string
}

export function PublicFooter({ className }: PublicFooterProps) {
  const { t } = useTranslation()
  const router = useRouter()

  const navigation = {
    main: [
      { name: t('navigation.home'), href: '/' },
      { name: t('navigation.about'), href: '/about' },
      { name: t('navigation.contact'), href: '/contact' },
      { name: t('navigation.pricing'), href: '/pricing' },
    ],
    legal: [
      { name: t('navigation.privacy'), href: '/privacy' },
      { name: t('navigation.terms'), href: '/terms' },
      { name: t('navigation.cookies'), href: '/cookies' },
    ],
    social: [
      { name: 'GitHub', href: 'https://github.com/zzafergok/sea-ui-kit', icon: Github },
      { name: 'Twitter', href: '#', icon: Twitter },
      { name: 'LinkedIn', href: '#', icon: Linkedin },
      { name: 'Email', href: 'mailto:info@seauikit.com', icon: Mail },
    ],
  }

  const handleNavigate = (href: string) => {
    if (href.startsWith('mailto:') || href.startsWith('http') || href.startsWith('#')) {
      window.open(href, '_blank')
    } else {
      router.push(href)
    }
  }

  return (
    <footer className={`bg-neutral-900 dark:bg-neutral-950 text-white ${className}`}>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='py-12 lg:py-16'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
            <div className='col-span-1 lg:col-span-2'>
              <div className='flex items-center space-x-2 mb-4'>
                <div className='w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center'>
                  <span className='text-white font-bold'>S</span>
                </div>
                <span className='text-2xl font-bold text-white'>Sea UI Kit</span>
              </div>
              <p className='text-neutral-300 mb-6 max-w-md leading-relaxed'>{t('pages.home.subtitle')}</p>
              <div className='flex space-x-4'>
                {navigation.social.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => handleNavigate(item.href)}
                    className='w-10 h-10 bg-neutral-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-colors duration-200'
                    aria-label={item.name}
                  >
                    <item.icon className='h-5 w-5' />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className='text-lg font-semibold text-white mb-4'>{t('navigation.quickLinks')}</h3>
              <ul className='space-y-3'>
                {navigation.main.map((item) => (
                  <li key={item.name}>
                    <button
                      onClick={() => handleNavigate(item.href)}
                      className='text-neutral-300 hover:text-white transition-colors duration-200'
                    >
                      {item.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className='text-lg font-semibold text-white mb-4'>{t('navigation.legal')}</h3>
              <ul className='space-y-3'>
                {navigation.legal.map((item) => (
                  <li key={item.name}>
                    <button
                      onClick={() => handleNavigate(item.href)}
                      className='text-neutral-300 hover:text-white transition-colors duration-200'
                    >
                      {item.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className='border-t border-neutral-800 py-6'>
          <div className='flex flex-col sm:flex-row justify-between items-center'>
            <p className='text-neutral-400 text-sm'>{t('pages.home.footer.copyright')}</p>
            <p className='text-neutral-400 text-sm mt-2 sm:mt-0'>{t('navigation.madeWith')}</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
