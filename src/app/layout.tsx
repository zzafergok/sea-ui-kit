import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import React from 'react'

import { Providers } from '@/providers/Providers'

import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Sea UI Kit Demo',
  description: 'Next.js project with Sea UI Kit components',
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='tr' suppressHydrationWarning>
      <head />
      <body className={inter.className} suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
