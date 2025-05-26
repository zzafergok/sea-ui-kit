'use client'

import React, { useState, useEffect, useCallback, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useRouter, usePathname } from 'next/navigation'
import { ChevronDown, User, Settings, HelpCircle, ArrowRight, Zap, Shield, Sparkles } from 'lucide-react'

import { Button } from '../Button/Button'
import { ThemeToggle } from '../ThemeToggle/ThemeToggle'
import { LanguageToggle } from '../LanguageToggle/LanguageToggle'
import { useAuth } from '@/hooks/useAuth'
import { cn } from '@/lib/utils'

interface PublicNavbarProps {
  className?: string
}

interface NavigationItem {
  name: string
  href: string
  description?: string
  icon?: React.ReactNode
  featured?: boolean
}

interface DropdownSection {
  title: string
  items: NavigationItem[]
}

export function PublicNavbar({ className }: PublicNavbarProps) {
  const { t } = useTranslation()
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  // State management
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [isMounted, setIsMounted] = useState(false)

  // Refs
  const navRef = useRef<HTMLElement>(null)
  const dropdownTimeoutRef = useRef<NodeJS.Timeout>()

  // Navigation structure
  const navigation: NavigationItem[] = [
    {
      name: t('navigation.home'),
      href: '/',
      description: 'Ana sayfa ve ürün tanıtımı',
    },
    {
      name: t('navigation.about'),
      href: '/about',
      description: 'Hakkımızda ve vizyonumuz',
    },
    {
      name: t('navigation.contact'),
      href: '/contact',
      description: 'İletişim bilgileri',
    },
    {
      name: t('navigation.pricing'),
      href: '/pricing',
      description: 'Fiyatlandırma planları',
    },
  ]

  // Features dropdown for enhanced navigation
  const featuresDropdown: DropdownSection[] = [
    {
      title: 'Ürün Özellikleri',
      items: [
        {
          name: 'Komponentler',
          href: '/components',
          description: '50+ özelleştirilebilir UI komponenti',
          icon: <Sparkles className='h-4 w-4' />,
          featured: true,
        },
        {
          name: 'Performans',
          href: '/performance',
          description: 'Optimize edilmiş ve hızlı',
          icon: <Zap className='h-4 w-4' />,
        },
        {
          name: 'Güvenlik',
          href: '/security',
          description: 'Enterprise seviye güvenlik',
          icon: <Shield className='h-4 w-4' />,
        },
      ],
    },
  ]

  // Mount check
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Scroll listener for navbar style changes
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setIsScrolled(scrollPosition > 20)
    }

    const throttledScroll = throttle(handleScroll, 16) // 60fps
    window.addEventListener('scroll', throttledScroll, { passive: true })

    return () => window.removeEventListener('scroll', throttledScroll)
  }, [])

  // Mobile menu body scroll lock
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
      document.body.style.paddingRight = getScrollbarWidth() + 'px'
    } else {
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
    }

    return () => {
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
    }
  }, [isMenuOpen])

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveDropdown(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Utility functions
  const throttle = <T extends unknown[]>(func: (...args: T) => void, limit: number) => {
    let inThrottle: boolean
    return function (this: unknown, ...args: T) {
      if (!inThrottle) {
        func.apply(this, args)
        inThrottle = true
        setTimeout(() => (inThrottle = false), limit)
      }
    }
  }

  const getScrollbarWidth = () => {
    return window.innerWidth - document.documentElement.clientWidth
  }

  // Logo click handler - authentication'a göre yönlendirme
  const handleLogoClick = useCallback(() => {
    if (isAuthenticated) {
      router.push('/dashboard')
    } else {
      router.push('/')
    }
    setIsMenuOpen(false)
    setActiveDropdown(null)
  }, [isAuthenticated, router])

  // Navigation handlers
  const handleNavigate = useCallback(
    (href: string) => {
      if (href.startsWith('http')) {
        window.open(href, '_blank', 'noopener,noreferrer')
      } else {
        router.push(href)
      }
      setIsMenuOpen(false)
      setActiveDropdown(null)
    },
    [router],
  )

  const handleDropdownToggle = useCallback(
    (dropdownId: string) => {
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current)
      }

      setActiveDropdown(activeDropdown === dropdownId ? null : dropdownId)
    },
    [activeDropdown],
  )

  const handleDropdownHover = useCallback((dropdownId: string | null) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current)
    }

    if (dropdownId) {
      setActiveDropdown(dropdownId)
    } else {
      dropdownTimeoutRef.current = setTimeout(() => {
        setActiveDropdown(null)
      }, 150)
    }
  }, [])

  const isActivePage = useCallback(
    (href: string) => {
      if (href === '/') {
        return pathname === '/'
      }
      return pathname.startsWith(href)
    },
    [pathname],
  )

  // Early return for SSR
  if (!isMounted) {
    return (
      <nav className='fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-neutral-200'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between items-center h-16 lg:h-20'>
            <div className='w-32 h-8 bg-neutral-200 rounded animate-pulse' />
            <div className='hidden lg:flex space-x-8'>
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className='w-16 h-4 bg-neutral-200 rounded animate-pulse' />
              ))}
            </div>
            <div className='flex space-x-2'>
              <div className='w-8 h-8 bg-neutral-200 rounded animate-pulse' />
              <div className='w-8 h-8 bg-neutral-200 rounded animate-pulse' />
            </div>
          </div>
        </div>
      </nav>
    )
  }

  return (
    <nav
      ref={navRef}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md shadow-lg border-b border-neutral-200 dark:border-neutral-800'
          : 'bg-transparent',
        className,
      )}
      role='navigation'
      aria-label='Ana navigasyon'
    >
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-16 lg:h-20'>
          {/* Logo - Authentication durumuna göre yönlendirme */}
          <div
            className='flex-shrink-0 cursor-pointer group'
            onClick={handleLogoClick}
            role='button'
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && handleLogoClick()}
          >
            <div className='flex items-center space-x-3'>
              <div className='relative'>
                <div className='w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-primary-500 via-primary-600 to-accent-500 rounded-xl shadow-lg transform group-hover:scale-105 transition-transform duration-200'>
                  <span className='text-white font-bold text-lg lg:text-xl flex h-full items-center justify-center'>
                    S
                  </span>
                </div>
                <div className='absolute -top-1 -right-1 w-3 h-3 bg-accent-400 rounded-full animate-pulse' />
              </div>
              <div className='hidden sm:block'>
                <span className='text-xl lg:text-2xl font-bold bg-gradient-to-r from-primary-700 to-accent-600 bg-clip-text text-transparent dark:from-primary-400 dark:to-accent-400'>
                  Sea UI Kit
                </span>
                <p className='text-xs text-neutral-500 dark:text-neutral-400 -mt-1'>v2.0.0</p>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className='hidden lg:flex lg:items-center lg:space-x-1'>
            {navigation.map((item) => (
              <Button
                key={item.name}
                variant='ghost'
                onClick={() => handleNavigate(item.href)}
                className={cn(
                  'relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200',
                  'hover:bg-neutral-100 dark:hover:bg-neutral-800',
                  'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
                  isActivePage(item.href)
                    ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20'
                    : 'text-neutral-700 dark:text-neutral-300',
                )}
              >
                {item.name}
                {isActivePage(item.href) && (
                  <div className='absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary-500 rounded-full' />
                )}
              </Button>
            ))}

            {/* Features Dropdown */}
            <div
              className='relative'
              onMouseEnter={() => handleDropdownHover('features')}
              onMouseLeave={() => handleDropdownHover(null)}
            >
              <Button
                variant='ghost'
                onClick={() => handleDropdownToggle('features')}
                className={cn(
                  'px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200',
                  'hover:bg-neutral-100 dark:hover:bg-neutral-800',
                  'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
                  'text-neutral-700 dark:text-neutral-300',
                  'flex items-center space-x-1',
                )}
              >
                <span>Özellikler</span>
                <ChevronDown
                  className={cn(
                    'h-4 w-4 transition-transform duration-200',
                    activeDropdown === 'features' ? 'rotate-180' : '',
                  )}
                />
              </Button>

              {/* Dropdown Menu */}
              {activeDropdown === 'features' && (
                <div className='absolute top-full left-0 mt-2 w-80 bg-white dark:bg-neutral-900 rounded-xl shadow-xl border border-neutral-200 dark:border-neutral-800 overflow-hidden'>
                  <div className='p-6'>
                    {featuresDropdown.map((section) => (
                      <div key={section.title} className='mb-6 last:mb-0'>
                        <h3 className='text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-3'>
                          {section.title}
                        </h3>
                        <div className='space-y-2'>
                          {section.items.map((item) => (
                            <button
                              key={item.name}
                              onClick={() => handleNavigate(item.href)}
                              className={cn(
                                'w-full flex items-start space-x-3 p-3 rounded-lg transition-colors duration-200',
                                'hover:bg-neutral-50 dark:hover:bg-neutral-800',
                                'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
                                item.featured
                                  ? 'border border-primary-200 dark:border-primary-800 bg-primary-50/50 dark:bg-primary-900/10'
                                  : '',
                              )}
                            >
                              <div
                                className={cn(
                                  'flex-shrink-0 p-2 rounded-lg',
                                  item.featured
                                    ? 'bg-primary-500 text-white'
                                    : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400',
                                )}
                              >
                                {item.icon}
                              </div>
                              <div className='flex-1 text-left'>
                                <div className='flex items-center space-x-2'>
                                  <span className='text-sm font-medium text-neutral-900 dark:text-neutral-100'>
                                    {item.name}
                                  </span>
                                  {item.featured && (
                                    <span className='px-2 py-1 text-xs font-medium bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300 rounded-full'>
                                      Yeni
                                    </span>
                                  )}
                                </div>
                                <p className='text-xs text-neutral-500 dark:text-neutral-400 mt-1'>
                                  {item.description}
                                </p>
                              </div>
                              <ArrowRight className='h-4 w-4 text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200' />
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Side Actions */}
          <div className='flex items-center justify-end space-x-3 w-auto'>
            {/* Theme & Language Toggles */}
            <div className='hidden sm:flex items-center space-x-2'>
              <ThemeToggle />
              <LanguageToggle />
            </div>

            {/* Auth Buttons / User Menu */}
            {!isLoading && (
              <div className='hidden lg:flex items-center space-x-3'>
                {isAuthenticated ? (
                  <div className='flex items-center space-x-3'>
                    <Button
                      onClick={() => handleNavigate('/dashboard')}
                      variant='outline'
                      size='sm'
                      className='text-sm'
                    >
                      <User className='h-4 w-4 mr-2' />
                      Dashboard
                    </Button>
                    <Button onClick={() => handleNavigate('/settings')} variant='ghost' size='sm'>
                      <Settings className='h-4 w-4' />
                    </Button>
                  </div>
                ) : (
                  <div className='flex items-center space-x-3'>
                    <Button
                      onClick={() => handleNavigate('/auth/login')}
                      variant='ghost'
                      size='sm'
                      className='text-sm font-medium'
                    >
                      {t('auth.login')}
                    </Button>
                    <Button
                      onClick={() => handleNavigate('/auth/register')}
                      variant='default'
                      size='sm'
                      className='text-sm font-medium bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 text-white border-0 shadow-lg'
                    >
                      {t('auth.register')}
                      <ArrowRight className='h-4 w-4 ml-1' />
                    </Button>
                  </div>
                )}
              </div>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant='ghost'
              size='icon'
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={cn(
                'lg:hidden relative z-50',
                'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
              )}
              aria-label={isMenuOpen ? 'Menüyü kapat' : 'Menüyü aç'}
              aria-expanded={isMenuOpen}
            >
              <div className='relative w-6 h-6'>
                <span
                  className={cn(
                    'absolute block h-0.5 w-6 bg-current transform transition-all duration-300',
                    isMenuOpen ? 'rotate-45 top-3' : 'top-1',
                  )}
                />
                <span
                  className={cn(
                    'absolute block h-0.5 w-6 bg-current transform transition-all duration-300 top-3',
                    isMenuOpen ? 'opacity-0' : 'opacity-100',
                  )}
                />
                <span
                  className={cn(
                    'absolute block h-0.5 w-6 bg-current transform transition-all duration-300',
                    isMenuOpen ? '-rotate-45 top-3' : 'top-5',
                  )}
                />
              </div>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          className='lg:hidden fixed inset-0 top-16 bg-black/20 backdrop-blur-sm z-40'
          onClick={() => setIsMenuOpen(false)}
          aria-hidden='true'
        />
      )}

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className='lg:hidden fixed inset-x-0 top-16 z-50 bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 shadow-xl'>
          <div className='max-h-[calc(100vh-4rem)] overflow-y-auto'>
            <div className='px-4 py-6 space-y-6'>
              {/* Mobile Theme & Language */}
              <div className='flex items-center justify-center space-x-4 sm:hidden'>
                <ThemeToggle />
                <LanguageToggle />
              </div>

              {/* Mobile Navigation Links */}
              <div className='space-y-3'>
                {navigation.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => handleNavigate(item.href)}
                    className={cn(
                      'w-full flex items-center justify-between p-4 rounded-xl transition-all duration-200',
                      'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
                      isActivePage(item.href)
                        ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                        : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800',
                    )}
                  >
                    <div className='flex-1 text-left'>
                      <div className='font-medium text-base'>{item.name}</div>
                      {item.description && (
                        <div className='text-sm text-neutral-500 dark:text-neutral-400 mt-1'>{item.description}</div>
                      )}
                    </div>
                    <ArrowRight className='h-5 w-5 text-neutral-400' />
                  </button>
                ))}
              </div>

              {/* Mobile Features Section */}
              <div className='border-t border-neutral-200 dark:border-neutral-800 pt-6'>
                <h3 className='text-base font-semibold text-neutral-900 dark:text-neutral-100 mb-4'>Özellikler</h3>
                <div className='space-y-3'>
                  {featuresDropdown[0].items.map((item) => (
                    <button
                      key={item.name}
                      onClick={() => handleNavigate(item.href)}
                      className='w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors duration-200'
                    >
                      <div
                        className={cn(
                          'flex-shrink-0 p-2 rounded-lg',
                          item.featured
                            ? 'bg-primary-500 text-white'
                            : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400',
                        )}
                      >
                        {item.icon}
                      </div>
                      <div className='flex-1 text-left'>
                        <div className='flex items-center space-x-2'>
                          <span className='text-sm font-medium text-neutral-900 dark:text-neutral-100'>
                            {item.name}
                          </span>
                          {item.featured && (
                            <span className='px-2 py-1 text-xs font-medium bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300 rounded-full'>
                              Yeni
                            </span>
                          )}
                        </div>
                        <p className='text-xs text-neutral-500 dark:text-neutral-400 mt-1'>{item.description}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile Auth Section */}
              {!isLoading && (
                <div className='border-t border-neutral-200 dark:border-neutral-800 pt-6'>
                  {isAuthenticated ? (
                    <div className='space-y-3'>
                      <Button
                        onClick={() => handleNavigate('/dashboard')}
                        variant='outline'
                        className='w-full justify-center'
                        size='lg'
                      >
                        <User className='h-5 w-5 mr-2' />
                        Dashboard
                      </Button>
                      <Button
                        onClick={() => handleNavigate('/settings')}
                        variant='ghost'
                        className='w-full justify-center'
                        size='lg'
                      >
                        <Settings className='h-5 w-5 mr-2' />
                        Ayarlar
                      </Button>
                    </div>
                  ) : (
                    <div className='space-y-3'>
                      <Button
                        onClick={() => handleNavigate('/auth/login')}
                        variant='outline'
                        className='w-full justify-center'
                        size='lg'
                      >
                        {t('auth.login')}
                      </Button>
                      <Button
                        onClick={() => handleNavigate('/auth/register')}
                        variant='default'
                        className='w-full justify-center bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 text-white border-0 shadow-lg'
                        size='lg'
                      >
                        {t('auth.register')}
                        <ArrowRight className='h-5 w-5 ml-2' />
                      </Button>
                    </div>
                  )}
                </div>
              )}

              {/* Mobile Help Section */}
              <div className='border-t border-neutral-200 dark:border-neutral-800 pt-6'>
                <Button
                  onClick={() => handleNavigate('/help')}
                  variant='ghost'
                  className='w-full justify-center text-neutral-500 dark:text-neutral-400'
                >
                  <HelpCircle className='h-4 w-4 mr-2' />
                  Yardım & Destek
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
