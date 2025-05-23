import type { Metadata, Viewport } from 'next'
import React from 'react'
import { ClientRootProvider } from './client-root'
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
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var savedTheme = localStorage.getItem('theme');
                  var systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  var effectiveTheme = savedTheme === 'system' ? systemPreference : (savedTheme || systemPreference);
                  
                  document.documentElement.classList.add(effectiveTheme);
                  document.documentElement.style.overflow = 'hidden auto';
                } catch (e) {
                  console.warn('Theme initialization failed:', e);
                }
              })();
            `,
          }}
        />
      </head>
      <body suppressHydrationWarning className='w-full overflow-x-hidden bg-background text-foreground'>
        <ClientRootProvider>{children}</ClientRootProvider>
      </body>
    </html>
  )
}
