'use client'

import React from 'react'
import { useTranslation } from 'react-i18next'

export default function ForgotPassword() {
  const { t } = useTranslation()

  return (
    <div className='min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-900'>
      <div className='max-w-md w-full space-y-8'>
        <div className='text-center'>
          <h2 className='mt-6 text-3xl font-extrabold text-neutral-900 dark:text-neutral-100'>
            {t('pages.forgotPassword.title')}
          </h2>
          <p className='mt-2 text-sm text-neutral-600 dark:text-neutral-400'>{t('pages.forgotPassword.content')}</p>
        </div>
      </div>
    </div>
  )
}
