'use client'

import React from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '../Button/Button'

interface AuthFooterProps {
  className?: string
}

export function AuthFooter({ className }: AuthFooterProps) {
  const { t } = useTranslation()

  const footerLinks = [
    { name: t('navigation.help'), href: '/help' },
    { name: t('navigation.support'), href: '/support' },
    { name: t('navigation.privacy'), href: '/privacy' },
  ]

  const handleLinkClick = (href: string) => {
    // Bu linkler genellikle modal veya yeni sekme açabilir
    console.log(`Navigate to: ${href}`)
  }

  return (
    <footer className={`bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800 ${className}`}>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='py-4'>
          <div className='flex flex-col sm:flex-row justify-between items-center text-sm text-neutral-600 dark:text-neutral-400'>
            <p>{t('pages.home.footer.copyright')}</p>
            <div className='flex space-x-6 mt-2 sm:mt-0'>
              {footerLinks.map((link) => (
                <Button
                  key={link.name}
                  variant='outline'
                  onClick={() => handleLinkClick(link.href)}
                  className='hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors'
                >
                  {link.name}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
