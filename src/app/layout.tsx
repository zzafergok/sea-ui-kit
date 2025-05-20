import type { Metadata } from 'next'

import React from 'react'

import { Providers } from '@/providers/Providers'

import './globals.css' // veya global.css dosyasını src/app klasörüne taşıyın

export const metadata: Metadata = {
  title: 'Sea UI Kit Demo',
  description: 'Örnek uygulama',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='tr'>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
