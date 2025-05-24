'use client'

import React from 'react'
import { useTranslation } from 'react-i18next'

export default function Settings() {
  const { t } = useTranslation()

  return (
    <div className='px-4 py-6 sm:px-0'>
      <div className='bg-white dark:bg-neutral-800 shadow rounded-lg p-6'>
        <h1 className='text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4'>{t('pages.settings.title')}</h1>
        <p className='text-neutral-600 dark:text-neutral-400'>{t('pages.settings.content')}</p>
      </div>
    </div>
  )
}
