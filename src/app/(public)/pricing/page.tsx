'use client'

import React from 'react'

import { useTranslation } from 'react-i18next'

export default function Pricing() {
  const { t } = useTranslation()

  return (
    <div className='min-h-screen bg-background py-16'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center'>
          <h1 className='text-4xl font-bold text-foreground mb-8'>{t('pages.pricing.title')}</h1>
          <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>{t('pages.pricing.content')}</p>
        </div>
      </div>
    </div>
  )
}
