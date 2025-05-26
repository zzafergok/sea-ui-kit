'use client'

import React from 'react'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { Github, Twitter, Linkedin, Mail, Heart } from 'lucide-react'

export function PublicFooter() {
  const { t } = useTranslation()
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    quickLinks: [
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
      { name: 'Twitter', href: 'https://twitter.com/zzafergok', icon: Twitter },
      { name: 'LinkedIn', href: 'https://linkedin.com/in/zzafergok', icon: Linkedin },
      { name: 'Email', href: 'mailto:contact@seauikit.com', icon: Mail },
    ],
  }

  return (
    <footer className='bg-neutral-50 dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-700'>
      <div className='max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
          {/* Brand Section */}
          <div className='space-y-4'>
            <div>
              <h3 className='text-lg font-bold text-primary-600 dark:text-primary-400'>Sea UI Kit</h3>
              <p className='mt-2 text-sm text-neutral-600 dark:text-neutral-400'>
                Modern React uygulamaları için tasarlanmış kapsamlı component kütüphanesi.
              </p>
            </div>
            <div className='flex space-x-4'>
              {footerLinks.social.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-neutral-400 hover:text-neutral-500 dark:hover:text-neutral-300 transition-colors'
                  >
                    <span className='sr-only'>{item.name}</span>
                    <Icon className='h-5 w-5' />
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className='text-sm font-semibold text-neutral-900 dark:text-neutral-100 uppercase tracking-wider mb-4'>
              {t('navigation.quickLinks')}
            </h3>
            <ul className='space-y-3'>
              {footerLinks.quickLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className='text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors'
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className='text-sm font-semibold text-neutral-900 dark:text-neutral-100 uppercase tracking-wider mb-4'>
              {t('navigation.legal')}
            </h3>
            <ul className='space-y-3'>
              {footerLinks.legal.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className='text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors'
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className='text-sm font-semibold text-neutral-900 dark:text-neutral-100 uppercase tracking-wider mb-4'>
              Newsletter
            </h3>
            <p className='text-sm text-neutral-600 dark:text-neutral-400 mb-4'>
              Yeni bileşenler ve güncellemelerden haberdar olun.
            </p>
            <div className='flex space-x-2'>
              <input
                type='email'
                placeholder='E-posta adresiniz'
                className='flex-1 min-w-0 px-3 py-2 text-sm border border-neutral-300 dark:border-neutral-600 rounded-md bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-primary-500'
              />
              <button
                type='submit'
                className='inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-primary-600 border border-transparent rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors'
              >
                Abone Ol
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className='mt-8 pt-8 border-t border-neutral-200 dark:border-neutral-700'>
          <div className='flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0'>
            <div className='text-sm text-neutral-500 dark:text-neutral-400'>
              © {currentYear} Sea UI Kit. Tüm hakları saklıdır.
            </div>
            <div className='flex items-center text-sm text-neutral-500 dark:text-neutral-400'>
              <span>{t('navigation.madeWith')}</span>
              <Heart className='h-4 w-4 mx-1 text-red-500' fill='currentColor' />
              <span>Türkiye&apos;de</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
