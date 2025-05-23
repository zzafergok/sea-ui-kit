import type { Metadata, Viewport } from 'next'
import React from 'react'
import './globals.css'

export const metadata: Metadata = {
  title: 'Sea UI Kit - Modern React Component Library',
  description:
    'Enterprise seviyede React component kütüphanesi. Radix UI tabanlı, erişilebilir ve özelleştirilebilir komponentler.',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  manifest: '/site.webmanifest',
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'),
  openGraph: {
    title: 'Sea UI Kit',
    description: 'Enterprise seviyede React component kütüphanesi',
    url: '/',
    siteName: 'Sea UI Kit',
    // images: [
    //   {
    //     url: '/og-image.png',
    //     width: 1200,
    //     height: 630,
    //     alt: 'Sea UI Kit',
    //   },
    // ],
    locale: 'tr_TR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sea UI Kit',
    description: 'Enterprise seviyede React component kütüphanesi',
    // images: ['/og-image.png'],
  },
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

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
  width: 'device-width',
  initialScale: 1.0,
  maximumScale: 5.0,
  minimumScale: 1.0,
  colorScheme: 'light dark',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='tr' suppressHydrationWarning>
      <head>
        <meta name='msapplication-TileColor' content='#0ea5e9' />
        <meta name='msapplication-config' content='/browserconfig.xml' />
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='' />
      </head>
      <body suppressHydrationWarning className='min-h-screen bg-background text-foreground antialiased'>
        {children}
      </body>
    </html>
  )
}
