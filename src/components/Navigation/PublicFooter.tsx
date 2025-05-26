'use client'

import React from 'react'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { Waves, Heart, Github, Twitter, Linkedin, Mail, ExternalLink } from 'lucide-react'

export function PublicFooter() {
  const { t } = useTranslation()
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { name: 'GitHub', href: 'https://github.com/zzafergok/sea-ui-kit', icon: Github },
    { name: 'Twitter', href: 'https://twitter.com/sea-ui-kit', icon: Twitter },
    { name: 'LinkedIn', href: 'https://linkedin.com/in/sea-ui-kit', icon: Linkedin },
  ]

  const quickLinks = [
    { name: t('navigation.home'), href: '/' },
    { name: t('navigation.about'), href: '/about' },
    { name: t('navigation.pricing'), href: '/pricing' },
    { name: t('navigation.contact'), href: '/contact' },
  ]

  const resourceLinks = [
    { name: 'Dokümantasyon', href: '/docs', external: true },
    { name: 'GitHub Repository', href: 'https://github.com/zzafergok/sea-ui-kit', external: true },
    { name: 'Figma Design System', href: '/figma', external: true },
    { name: 'Storybook', href: '/storybook', external: true },
  ]

  const legalLinks = [
    { name: t('navigation.privacy'), href: '/privacy' },
    { name: t('navigation.terms'), href: '/terms' },
    { name: t('navigation.cookies'), href: '/cookies' },
    { name: 'Lisans (MIT)', href: '/license' },
  ]

  return (
    <footer className='bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 text-white'>
      <div className='max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
          {/* Logo and Description */}
          <div className='lg:col-span-2'>
            <div className='flex items-center space-x-2 mb-6'>
              <div className='flex items-center justify-center w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg shadow-lg'>
                <Waves className='h-6 w-6 text-white' />
              </div>
              <span className='text-2xl font-bold bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent'>
                Sea UI Kit
              </span>
            </div>
            <p className='text-neutral-300 mb-6 max-w-md text-lg leading-relaxed'>
              Modern React uygulamaları için tasarlanmış kapsamlı bileşen kütüphanesi. Radix UI tabanlı, erişilebilir ve
              özelleştirilebilir komponentler ile projelerinizi hızlandırın.
            </p>

            {/* Newsletter Signup */}
            <div className='mb-6'>
              <h4 className='text-sm font-semibold uppercase tracking-wider mb-3 text-neutral-200'>
                Güncellemelerden Haberdar Olun
              </h4>
              <div className='flex gap-2'>
                <input
                  type='email'
                  placeholder='E-posta adresiniz'
                  className='flex-1 px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent'
                />
                <button className='px-4 py-2 bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700 rounded-lg font-medium transition-all duration-200 flex items-center'>
                  <Mail className='h-4 w-4' />
                </button>
              </div>
              <p className='text-xs text-neutral-400 mt-2'>Yeni özellikler ve güncellemeler hakkında bilgi alın.</p>
            </div>

            {/* Social Links */}
            <div className='flex space-x-4'>
              {socialLinks.map((link) => {
                const Icon = link.icon
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='flex items-center justify-center w-10 h-10 bg-neutral-800 hover:bg-neutral-700 rounded-lg transition-colors duration-200 group'
                  >
                    <Icon className='h-5 w-5 text-neutral-400 group-hover:text-white' />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className='text-sm font-semibold uppercase tracking-wider mb-4 text-neutral-200'>
              {t('navigation.quickLinks')}
            </h3>
            <ul className='space-y-3'>
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className='text-neutral-300 hover:text-white transition-colors duration-200 flex items-center group'
                  >
                    <span className='group-hover:translate-x-1 transition-transform duration-200'>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className='text-sm font-semibold uppercase tracking-wider mb-4 text-neutral-200'>Kaynaklar</h3>
            <ul className='space-y-3'>
              {resourceLinks.map((link) => (
                <li key={link.name}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-neutral-300 hover:text-white transition-colors duration-200 flex items-center group'
                    >
                      <span className='group-hover:translate-x-1 transition-transform duration-200'>{link.name}</span>
                      <ExternalLink className='h-3 w-3 ml-1 opacity-60 group-hover:opacity-100' />
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className='text-neutral-300 hover:text-white transition-colors duration-200 flex items-center group'
                    >
                      <span className='group-hover:translate-x-1 transition-transform duration-200'>{link.name}</span>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Stats Section */}
        <div className='mt-12 pt-8 border-t border-neutral-800'>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-8 text-center'>
            <div>
              <div className='text-2xl font-bold text-primary-400 mb-1'>25+</div>
              <div className='text-sm text-neutral-400'>UI Bileşenleri</div>
            </div>
            <div>
              <div className='text-2xl font-bold text-accent-400 mb-1'>100%</div>
              <div className='text-sm text-neutral-400'>TypeScript</div>
            </div>
            <div>
              <div className='text-2xl font-bold text-green-400 mb-1'>A11Y</div>
              <div className='text-sm text-neutral-400'>Erişilebilir</div>
            </div>
            <div>
              <div className='text-2xl font-bold text-purple-400 mb-1'>MIT</div>
              <div className='text-sm text-neutral-400'>Açık Kaynak</div>
            </div>
          </div>
        </div>

        {/* Legal Links */}
        <div className='mt-8 pt-8 border-t border-neutral-800'>
          <div className='flex flex-wrap justify-center gap-4 mb-4'>
            {legalLinks.map((link, index) => (
              <React.Fragment key={link.name}>
                <Link
                  href={link.href}
                  className='text-sm text-neutral-400 hover:text-neutral-200 transition-colors duration-200'
                >
                  {link.name}
                </Link>
                {index < legalLinks.length - 1 && <span className='text-neutral-600'>•</span>}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className='mt-8 pt-8 border-t border-neutral-800'>
          <div className='flex flex-col sm:flex-row justify-between items-center'>
            <p className='text-sm text-neutral-400 flex items-center'>
              © {currentYear} Sea UI Kit. Tüm hakları saklıdır.
            </p>
            <p className='text-sm text-neutral-400 flex items-center mt-2 sm:mt-0'>
              {t('navigation.madeWith')}
              <Heart className='h-4 w-4 text-red-500 mx-1 animate-pulse' />
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
