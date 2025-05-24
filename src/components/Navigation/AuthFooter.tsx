'use client'

import React, { useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/navigation'
import {
  HelpCircle,
  MessageSquare,
  Shield,
  Heart,
  ExternalLink,
  Clock,
  Users,
  Zap,
  ChevronUp,
  BookOpen,
  FileText,
  Bug,
  Coffee,
} from 'lucide-react'

import { Button } from '../Button/Button'
import { cn } from '@/lib/utils'

interface AuthFooterProps {
  className?: string
}

interface FooterLink {
  name: string
  href: string
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>
  external?: boolean
  description?: string
}

interface QuickStat {
  label: string
  value: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  color: string
}

export function AuthFooter({ className }: AuthFooterProps) {
  const { t } = useTranslation()
  const router = useRouter()
  const [isExpanded, setIsExpanded] = useState(false)

  // Footer links configuration
  const supportLinks: FooterLink[] = [
    {
      name: 'Yardım Merkezi',
      href: '/help',
      icon: HelpCircle,
      description: 'SSS ve rehberler',
    },
    {
      name: 'Canlı Destek',
      href: '/support',
      icon: MessageSquare,
      description: 'Anında yardım alın',
    },
    {
      name: 'Dokümantasyon',
      href: '/docs',
      icon: BookOpen,
      description: 'API ve kullanım kılavuzu',
    },
    {
      name: 'Durum Sayfası',
      href: 'https://status.seauikit.com',
      icon: Zap,
      external: true,
      description: 'Sistem durumu',
    },
  ]

  const legalLinks: FooterLink[] = [
    {
      name: t('navigation.privacy'),
      href: '/privacy',
      icon: Shield,
      description: 'Gizlilik politikası',
    },
    {
      name: t('navigation.terms'),
      href: '/terms',
      icon: FileText,
      description: 'Kullanım şartları',
    },
    {
      name: 'Bug Raporu',
      href: '/report-bug',
      icon: Bug,
      description: 'Hata bildir',
    },
  ]

  // Quick stats for admin panel
  const quickStats: QuickStat[] = [
    {
      label: 'Uptime',
      value: '99.9%',
      icon: Zap,
      color: 'text-green-500',
    },
    {
      label: 'Aktif Kullanıcı',
      value: '1,247',
      icon: Users,
      color: 'text-blue-500',
    },
    {
      label: 'Son Güncelleme',
      value: '2 saat önce',
      icon: Clock,
      color: 'text-purple-500',
    },
  ]

  // Navigation handler
  const handleNavigate = useCallback(
    (href: string, external?: boolean) => {
      if (external || href.startsWith('http') || href.startsWith('mailto:')) {
        window.open(href, '_blank', 'noopener,noreferrer')
      } else {
        router.push(href)
      }
    },
    [router],
  )

  // Scroll to top handler
  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return (
    <footer
      className={cn('bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800', className)}
    >
      {/* Expandable Stats Section */}
      <div className='border-b border-neutral-200 dark:border-neutral-800'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='py-4'>
            {/* Always Visible Quick Stats */}
            <div className='flex items-center justify-between'>
              <div className='flex items-center space-x-6'>
                {quickStats.map((stat) => (
                  <div key={stat.label} className='flex items-center space-x-2'>
                    <stat.icon className={cn('h-4 w-4', stat.color)} />
                    <div className='text-sm'>
                      <span className='font-medium text-neutral-900 dark:text-neutral-100'>{stat.value}</span>
                      <span className='text-neutral-500 dark:text-neutral-400 ml-1'>{stat.label}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Expand Button */}
              <Button
                variant='ghost'
                size='sm'
                onClick={() => setIsExpanded(!isExpanded)}
                className='text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200'
              >
                <span className='text-xs mr-2'>{isExpanded ? 'Daralt' : 'Genişlet'}</span>
                <ChevronUp
                  className={cn('h-4 w-4 transition-transform duration-200', isExpanded ? '' : 'rotate-180')}
                />
              </Button>
            </div>

            {/* Expandable Content */}
            {isExpanded && (
              <div className='mt-6 pt-6 border-t border-neutral-200 dark:border-neutral-800 animate-fade-in'>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                  {/* Support Links */}
                  <div>
                    <h3 className='text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-4'>
                      Destek & Yardım
                    </h3>
                    <div className='space-y-3'>
                      {supportLinks.map((link) => (
                        <button
                          key={link.name}
                          onClick={() => handleNavigate(link.href, link.external)}
                          className='group flex items-center space-x-3 text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors duration-200'
                        >
                          {link.icon && (
                            <link.icon className='h-4 w-4 group-hover:text-primary-500 transition-colors duration-200' />
                          )}
                          <div className='flex-1 text-left'>
                            <div className='flex items-center space-x-1'>
                              <span>{link.name}</span>
                              {link.external && (
                                <ExternalLink className='h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200' />
                              )}
                            </div>
                            {link.description && (
                              <p className='text-xs text-neutral-500 dark:text-neutral-400 mt-1'>{link.description}</p>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Legal Links */}
                  <div>
                    <h3 className='text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-4'>
                      Yasal & Güvenlik
                    </h3>
                    <div className='space-y-3'>
                      {legalLinks.map((link) => (
                        <button
                          key={link.name}
                          onClick={() => handleNavigate(link.href, link.external)}
                          className='group flex items-center space-x-3 text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors duration-200'
                        >
                          {link.icon && (
                            <link.icon className='h-4 w-4 group-hover:text-primary-500 transition-colors duration-200' />
                          )}
                          <div className='flex-1 text-left'>
                            <span>{link.name}</span>
                            {link.description && (
                              <p className='text-xs text-neutral-500 dark:text-neutral-400 mt-1'>{link.description}</p>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* System Info */}
                  <div>
                    <h3 className='text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-4'>
                      Sistem Bilgileri
                    </h3>
                    <div className='space-y-3 text-sm'>
                      <div className='flex justify-between items-center'>
                        <span className='text-neutral-600 dark:text-neutral-400'>Sürüm</span>
                        <span className='font-mono text-neutral-900 dark:text-neutral-100'>v2.1.0</span>
                      </div>
                      <div className='flex justify-between items-center'>
                        <span className='text-neutral-600 dark:text-neutral-400'>Build</span>
                        <span className='font-mono text-neutral-900 dark:text-neutral-100'>#4521</span>
                      </div>
                      <div className='flex justify-between items-center'>
                        <span className='text-neutral-600 dark:text-neutral-400'>Son Deploy</span>
                        <span className='text-neutral-900 dark:text-neutral-100'>2 saat önce</span>
                      </div>
                      <div className='flex justify-between items-center'>
                        <span className='text-neutral-600 dark:text-neutral-400'>Sunucu</span>
                        <div className='flex items-center space-x-2'>
                          <div className='w-2 h-2 bg-green-400 rounded-full animate-pulse'></div>
                          <span className='text-neutral-900 dark:text-neutral-100'>Aktif</span>
                        </div>
                      </div>
                      <div className='flex justify-between items-center'>
                        <span className='text-neutral-600 dark:text-neutral-400'>Ortam</span>
                        <span className='px-2 py-1 text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 rounded-full'>
                          Production
                        </span>
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div className='mt-6 pt-4 border-t border-neutral-200 dark:border-neutral-800'>
                      <div className='grid grid-cols-2 gap-2'>
                        <Button
                          onClick={() => handleNavigate('/system/logs')}
                          variant='outline'
                          size='sm'
                          className='text-xs'
                        >
                          <FileText className='h-3 w-3 mr-1' />
                          Loglar
                        </Button>
                        <Button
                          onClick={() => handleNavigate('/system/health')}
                          variant='outline'
                          size='sm'
                          className='text-xs'
                        >
                          <Zap className='h-3 w-3 mr-1' />
                          Durum
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='py-6'>
          <div className='flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0'>
            {/* Left Side - Copyright & Company Info */}
            <div className='flex flex-col lg:flex-row items-center space-y-2 lg:space-y-0 lg:space-x-6'>
              <div className='flex items-center space-x-2 text-sm text-neutral-600 dark:text-neutral-400'>
                <span>© 2024 Sea UI Kit.</span>
                <span>Tüm hakları saklıdır.</span>
              </div>

              <div className='hidden lg:block text-neutral-300 dark:text-neutral-700'>•</div>

              <div className='flex items-center space-x-2 text-sm text-neutral-500 dark:text-neutral-400'>
                <span>Admin Panel</span>
                <div className='w-1 h-1 bg-neutral-400 rounded-full'></div>
                <span>Türkiye&apos;de</span>
                <Heart className='h-4 w-4 text-red-500 animate-pulse' />
                <span>ile yapıldı</span>
              </div>
            </div>

            {/* Center - Quick Support Links (Mobile Hidden) */}
            <div className='hidden md:flex items-center space-x-1'>
              {supportLinks.slice(0, 2).map((link) => (
                <Button
                  key={link.name}
                  onClick={() => handleNavigate(link.href, link.external)}
                  variant='ghost'
                  size='sm'
                  className='text-xs text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200'
                >
                  {link.icon && <link.icon className='h-3 w-3 mr-1' />}
                  {link.name}
                </Button>
              ))}
            </div>

            {/* Right Side - Actions & Status */}
            <div className='flex items-center space-x-4'>
              {/* Performance Indicator */}
              <div className='hidden sm:flex items-center space-x-2 text-xs'>
                <div className='flex items-center space-x-1'>
                  <div className='w-2 h-2 bg-green-400 rounded-full animate-pulse'></div>
                  <span className='text-neutral-500 dark:text-neutral-400'>Tüm sistemler çalışıyor</span>
                </div>
              </div>

              {/* Quick Actions */}
              <div className='flex items-center space-x-2'>
                {/* Coffee Break Button (Fun Element) */}
                <Button
                  onClick={() => {
                    // Fun easter egg or actual break timer
                    window.alert('☕ Mola zamanı! 5 dakika dinlenin.')
                  }}
                  variant='ghost'
                  size='sm'
                  className='text-neutral-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors duration-200'
                  title='Kahve molası'
                >
                  <Coffee className='h-4 w-4' />
                </Button>

                {/* Scroll to Top */}
                <Button
                  onClick={scrollToTop}
                  variant='ghost'
                  size='sm'
                  className='text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 transition-colors duration-200'
                  aria-label='Sayfa başına git'
                >
                  <ChevronUp className='h-4 w-4' />
                </Button>
              </div>
            </div>
          </div>

          {/* Mobile Support Links */}
          <div className='md:hidden mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-800'>
            <div className='flex flex-wrap justify-center gap-2'>
              {[...supportLinks, ...legalLinks].map((link) => (
                <Button
                  key={link.name}
                  onClick={() => handleNavigate(link.href, link.external)}
                  variant='ghost'
                  size='sm'
                  className='text-xs text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200'
                >
                  {link.icon && <link.icon className='h-3 w-3 mr-1' />}
                  {link.name}
                  {link.external && <ExternalLink className='h-3 w-3 ml-1' />}
                </Button>
              ))}
            </div>
          </div>

          {/* Development Mode Indicator */}
          {process.env.NODE_ENV === 'development' && (
            <div className='mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-800'>
              <div className='flex items-center justify-center space-x-2 text-xs'>
                <div className='w-2 h-2 bg-yellow-400 rounded-full animate-pulse'></div>
                <span className='text-yellow-600 dark:text-yellow-400 font-medium'>
                  Development Mode - Debug bilgileri aktif
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </footer>
  )
}
