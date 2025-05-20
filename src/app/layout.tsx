import type { Metadata } from 'next'
import { Bai_Jamjuree } from 'next/font/google'

import React from 'react'

import { Providers } from '@/providers/Providers'

import '../styles/global.scss'

const baiJamjuree = Bai_Jamjuree({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-bai-jamjuree',
})

export const metadata: Metadata = {
  title: 'Sea UI Kit Demo',
  description: 'Örnek uygulama',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='tr'>
      <body className={`${baiJamjuree.variable} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
