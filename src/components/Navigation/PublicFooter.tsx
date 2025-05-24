'use client'

import React, { useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/navigation'
import {
  Github,
  Twitter,
  Linkedin,
  Mail,
  Heart,
  ArrowUp,
  ExternalLink,
  MapPin,
  Phone,
  Clock,
  Send,
  CheckCircle,
  Zap,
  Shield,
  Users,
  Award,
} from 'lucide-react'

import { Button } from '../Button/Button'
import { Input } from '../Input/Input'
import { cn } from '@/lib/utils'

interface PublicFooterProps {
  className?: string
}

interface FooterLink {
  name: string
  href: string
  external?: boolean
  description?: string
}

interface FooterSection {
  title: string
  links: FooterLink[]
}

interface SocialLink {
  name: string
  href: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  color: string
  hoverColor: string
}

interface StatsItem {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  value: string
  label: string
}

export function PublicFooter({ className }: PublicFooterProps) {
  const { t } = useTranslation()
  const router = useRouter()

  // Newsletter state
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isSubscribing, setIsSubscribing] = useState(false)

  // Footer sections configuration
  const footerSections: FooterSection[] = [
    {
      title: 'Ürün',
      links: [
        { name: 'Komponentler', href: '/components', description: 'UI komponent koleksiyonu' },
        { name: 'Dokümantasyon', href: '/docs', description: 'Detaylı kullanım kılavuzu' },
        { name: 'Örnekler', href: '/examples', description: 'Canlı kod örnekleri' },
        { name: 'Şablonlar', href: '/templates', description: 'Hazır proje şablonları' },
        { name: 'Figma Kit', href: '/figma', description: 'Tasarım sistem dosyaları', external: true },
      ],
    },
    {
      title: 'Geliştirici',
      links: [
        { name: 'API Referansı', href: '/api', description: 'Teknik dokümantasyon' },
        { name: 'GitHub', href: 'https://github.com/zzafergok/sea-ui-kit', external: true },
        { name: 'Changelog', href: '/changelog', description: 'Sürüm notları' },
        { name: 'Katkıda Bulun', href: '/contributing', description: 'Açık kaynak katkı' },
        { name: 'Bug Raporu', href: '/issues', description: 'Hata bildirimi' },
      ],
    },
    {
      title: 'Şirket',
      links: [
        { name: t('navigation.about'), href: '/about', description: 'Hakkımızda' },
        { name: 'Blog', href: '/blog', description: 'Teknoloji yazıları' },
        { name: 'Kariyer', href: '/careers', description: 'Açık pozisyonlar' },
        { name: 'Basın Kiti', href: '/press', description: 'Medya kaynakları' },
        { name: t('navigation.contact'), href: '/contact', description: 'İletişim' },
      ],
    },
    {
      title: 'Destek',
      links: [
        { name: 'Yardım Merkezi', href: '/help', description: 'SSS ve rehberler' },
        { name: 'Topluluk', href: '/community', description: 'Discord sunucusu', external: true },
        { name: 'Status', href: 'https://status.seauikit.com', description: 'Sistem durumu', external: true },
        { name: t('navigation.privacy'), href: '/privacy', description: 'Gizlilik politikası' },
        { name: t('navigation.terms'), href: '/terms', description: 'Kullanım şartları' },
      ],
    },
  ]

  // Social media links
  const socialLinks: SocialLink[] = [
    {
      name: 'GitHub',
      href: 'https://github.com/zzafergok/sea-ui-kit',
      icon: Github,
      color: 'text-neutral-600',
      hoverColor: 'hover:text-neutral-900 dark:hover:text-white',
    },
    {
      name: 'Twitter',
      href: 'https://twitter.com/seauikit',
      icon: Twitter,
      color: 'text-blue-500',
      hoverColor: 'hover:text-blue-600',
    },
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com/company/seauikit',
      icon: Linkedin,
      color: 'text-blue-600',
      hoverColor: 'hover:text-blue-700',
    },
    {
      name: 'Email',
      href: 'mailto:hello@seauikit.com',
      icon: Mail,
      color: 'text-red-500',
      hoverColor: 'hover:text-red-600',
    },
  ]

  // Company stats
  const stats: StatsItem[] = [
    { icon: Users, value: '10K+', label: 'Geliştiriciler' },
    { icon: Zap, value: '50+', label: 'Komponentler' },
    { icon: Shield, value: '99.9%', label: 'Uptime' },
    { icon: Award, value: '5★', label: 'Ortalama Puan' },
  ]

  // Contact information
  const contactInfo = [
    {
      icon: MapPin,
      text: 'İstanbul, Türkiye',
    },
    {
      icon: Mail,
      text: 'hello@seauikit.com',
    },
    {
      icon: Phone,
      text: '+90 (212) 555-0123',
    },
    {
      icon: Clock,
      text: 'Pzt-Cum, 09:00-18:00',
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

  // Newsletter subscription handler
  const handleNewsletterSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()

      if (!email || isSubscribing) return

      setIsSubscribing(true)

      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000))
        setIsSubscribed(true)
        setEmail('')
      } catch (error) {
        console.error('Newsletter subscription failed:', error)
      } finally {
        setIsSubscribing(false)
      }
    },
    [email, isSubscribing],
  )

  // Scroll to top handler
  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return (
    <footer className={cn('bg-neutral-900 dark:bg-neutral-950 text-white relative overflow-hidden', className)}>
      {/* Background Pattern */}
      <div className='absolute inset-0 opacity-5'>
        <div className='absolute inset-0 bg-gradient-to-br from-primary-500/20 via-transparent to-accent-500/20' />
        <div className='absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent)] animate-pulse' />
      </div>

      {/* Main Footer Content */}
      <div className='relative z-10'>
        {/* Stats Section */}
        <div className='border-b border-neutral-800'>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
            <div className='text-center mb-12'>
              <h2 className='text-2xl sm:text-3xl font-bold text-white mb-4'>
                Binlerce geliştirici tarafından güveniliyor
              </h2>
              <p className='text-lg text-neutral-300 max-w-2xl mx-auto'>
                Sea UI Kit ile daha hızlı, daha güvenilir ve daha güzel uygulamalar geliştirin
              </p>
            </div>

            <div className='grid grid-cols-2 lg:grid-cols-4 gap-8'>
              {stats.map((stat, index) => (
                <div key={stat.label} className='text-center group' style={{ animationDelay: `${index * 100}ms` }}>
                  <div className='inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300'>
                    <stat.icon className='h-8 w-8 text-white' />
                  </div>
                  <div className='text-3xl font-bold text-white mb-2'>{stat.value}</div>
                  <div className='text-sm text-neutral-400'>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className='border-b border-neutral-800'>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
            <div className='lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center'>
              {/* Newsletter Content */}
              <div className='mb-8 lg:mb-0'>
                <h3 className='text-2xl font-bold text-white mb-4'>Güncellemelerden haberdar olun</h3>
                <p className='text-lg text-neutral-300 mb-6'>
                  Yeni komponentler, güncellemeler ve özel içerikler için e-posta listemize katılın. Spam göndermiyoruz,
                  sadece değerli içerik paylaşıyoruz.
                </p>

                <div className='flex flex-wrap gap-3 text-sm text-neutral-400'>
                  <div className='flex items-center space-x-2'>
                    <CheckCircle className='h-4 w-4 text-green-400' />
                    <span>Haftalık güncellemeler</span>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <CheckCircle className='h-4 w-4 text-green-400' />
                    <span>Özel içerik</span>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <CheckCircle className='h-4 w-4 text-green-400' />
                    <span>İstediğin zaman ayrıl</span>
                  </div>
                </div>
              </div>

              {/* Newsletter Form */}
              <div>
                {isSubscribed ? (
                  <div className='bg-green-900/20 border border-green-800 rounded-xl p-6 text-center'>
                    <CheckCircle className='h-12 w-12 text-green-400 mx-auto mb-4' />
                    <h4 className='text-lg font-semibold text-white mb-2'>Teşekkürler!</h4>
                    <p className='text-green-300'>
                      E-posta listemize başarıyla kaydoldunuz. İlk bültenimizi yakında alacaksınız.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleNewsletterSubmit} className='space-y-4'>
                    <div className='flex flex-col sm:flex-row gap-3'>
                      <Input
                        type='email'
                        placeholder='E-posta adresinizi girin'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={isSubscribing}
                        className='flex-1 bg-neutral-800 border-neutral-700 text-white placeholder-neutral-400 focus:border-primary-500 focus:ring-primary-500'
                      />
                      <Button
                        type='submit'
                        disabled={!email || isSubscribing}
                        className='bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 text-white border-0 shadow-lg px-8'
                      >
                        {isSubscribing ? (
                          <div className='flex items-center space-x-2'>
                            <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin' />
                            <span>Gönderiliyor...</span>
                          </div>
                        ) : (
                          <div className='flex items-center space-x-2'>
                            <Send className='h-4 w-4' />
                            <span>Abone Ol</span>
                          </div>
                        )}
                      </Button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Main Links Section */}
        <div className='border-b border-neutral-800'>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
            <div className='lg:grid lg:grid-cols-5 lg:gap-8'>
              {/* Company Info */}
              <div className='lg:col-span-2 mb-12 lg:mb-0'>
                <div className='flex items-center space-x-3 mb-6'>
                  <div className='relative'>
                    <div className='w-12 h-12 bg-gradient-to-br from-primary-500 via-primary-600 to-accent-500 rounded-xl flex items-center justify-center shadow-lg'>
                      <span className='text-white font-bold text-xl'>S</span>
                    </div>
                    <div className='absolute -top-1 -right-1 w-3 h-3 bg-accent-400 rounded-full animate-pulse' />
                  </div>
                  <div>
                    <span className='text-2xl font-bold bg-gradient-to-r from-white to-neutral-300 bg-clip-text text-transparent'>
                      Sea UI Kit
                    </span>
                    <p className='text-xs text-neutral-400 -mt-1'>v2.0.0</p>
                  </div>
                </div>

                <p className='text-neutral-300 mb-8 leading-relaxed'>
                  Modern React uygulamaları için tasarlanmış, enterprise seviyede komponent kütüphanesi. Hızlı,
                  güvenilir ve güzel arayüzler oluşturmak için ihtiyacınız olan her şey.
                </p>

                {/* Contact Info */}
                <div className='space-y-3 mb-8'>
                  {contactInfo.map((item, index) => (
                    <div key={index} className='flex items-center space-x-3 text-sm text-neutral-400'>
                      <item.icon className='h-4 w-4 text-primary-400 flex-shrink-0' />
                      <span>{item.text}</span>
                    </div>
                  ))}
                </div>

                {/* Social Links */}
                <div className='flex space-x-4'>
                  {socialLinks.map((social) => (
                    <button
                      key={social.name}
                      onClick={() => handleNavigate(social.href, true)}
                      className={cn(
                        'w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200',
                        'bg-neutral-800 hover:bg-neutral-700',
                        social.color,
                        social.hoverColor,
                        'hover:scale-110 hover:shadow-lg',
                      )}
                      aria-label={social.name}
                    >
                      <social.icon className='h-5 w-5' />
                    </button>
                  ))}
                </div>
              </div>

              {/* Footer Links */}
              <div className='lg:col-span-3'>
                <div className='grid grid-cols-1 sm:grid-cols-3 gap-8'>
                  {footerSections.map((section) => (
                    <div key={section.title}>
                      <h3 className='text-sm font-semibold text-white uppercase tracking-wider mb-4'>
                        {section.title}
                      </h3>
                      <ul className='space-y-3'>
                        {section.links.map((link) => (
                          <li key={link.name}>
                            <button
                              onClick={() => handleNavigate(link.href, link.external)}
                              className='group flex items-start space-x-2 text-sm text-neutral-400 hover:text-white transition-colors duration-200'
                            >
                              <span className='group-hover:text-primary-400 transition-colors duration-200'>
                                {link.name}
                              </span>
                              {link.external && (
                                <ExternalLink className='h-3 w-3 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200' />
                              )}
                            </button>
                            {link.description && (
                              <p className='text-xs text-neutral-500 mt-1 ml-0'>{link.description}</p>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className='relative'>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
            <div className='flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0'>
              {/* Copyright */}
              <div className='flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 text-sm text-neutral-400'>
                <p>© 2024 Sea UI Kit. Tüm hakları saklıdır.</p>
                <div className='hidden sm:block text-neutral-600'>•</div>
                <div className='flex items-center space-x-1'>
                  <span>Türkiye&apos;de</span>
                  <Heart className='h-4 w-4 text-red-500 animate-pulse' />
                  <span>ile yapıldı</span>
                </div>
              </div>

              {/* Quick Actions */}
              <div className='flex items-center space-x-4'>
                <div className='flex items-center space-x-2 text-xs text-neutral-500'>
                  <div className='w-2 h-2 bg-green-400 rounded-full animate-pulse' />
                  <span>Tüm sistemler çalışıyor</span>
                </div>

                <Button
                  onClick={scrollToTop}
                  variant='ghost'
                  size='sm'
                  className='text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors duration-200'
                  aria-label='Sayfa başına git'
                >
                  <ArrowUp className='h-4 w-4' />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
