import type { Metadata } from 'next'

import React from 'react'

import { Providers } from '@/providers/Providers'

import '../styles/global.scss'

export const metadata: Metadata = {
  title: 'Sea UI Kit Demo',
  description: 'Örnek uygulama',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='tr'>
      <body className='antialiased'>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
