'use client'

import React from 'react'
import { useTranslation } from 'react-i18next'

export default function Contact() {
  const { t } = useTranslation()

  return (
    <div className='min-h-screen bg-neutral-50 dark:bg-neutral-900 py-16'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center'>
          <h1 className='text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-8'>{t('pages.contact.title')}</h1>
          <p className='text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto'>
            {t('pages.contact.content')}
          </p>
        </div>
      </div>
    </div>
  )
}
