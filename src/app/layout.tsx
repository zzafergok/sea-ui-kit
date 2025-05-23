/* eslint-disable react/react-in-jsx-scope */

import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Sea UI Kit - Modern React Component Library',
  description: 'Enterprise seviyede React component kütüphanesi',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='tr' suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  )
}
