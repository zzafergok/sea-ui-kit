import type { Metadata, Viewport } from 'next'
import React from 'react'
import './globals.css'

export const metadata: Metadata = {
  title: 'Sea UI Kit - Modern React Component Library',
  description: 'Enterprise seviyede React component kütüphanesi',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  manifest: '/site.webmanifest',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

// Viewport ayarlarını ayrı bir export olarak tanımlayın
export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
  width: 'device-width',
  initialScale: 1.0,
  maximumScale: 5.0,
  minimumScale: 1.0,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='tr' suppressHydrationWarning>
      <head>
        <meta name='msapplication-TileColor' content='#0ea5e9' />
        <meta name='msapplication-config' content='/browserconfig.xml' />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  )
}
