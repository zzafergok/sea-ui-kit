import type { Metadata, Viewport } from 'next'
import React from 'react'

import { Providers } from '@/providers/Providers'

import './globals.css'

export const metadata: Metadata = {
  title: {
    template: '%s | Sea UI Kit',
    default: 'Sea UI Kit - Modern React Component Library',
  },
  description:
    'Enterprise seviyede React component kütüphanesi. Radix UI tabanlı, erişilebilir ve özelleştirilebilir komponentler.',
  keywords: ['React', 'Next.js', 'UI Kit', 'Component Library', 'TypeScript', 'Radix UI', 'Sea Blue'],
  authors: [{ name: 'Sea UI Kit Team' }],
  creator: 'Sea UI Kit',
  publisher: 'Sea UI Kit',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://localhost:3000'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en',
      'tr-TR': '/tr',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: '/',
    siteName: 'Sea UI Kit',
    title: 'Sea UI Kit - Modern React Component Library',
    description:
      'Enterprise seviyede React component kütüphanesi. Radix UI tabanlı, erişilebilir ve özelleştirilebilir komponentler.',
    // images: [
    //   {
    //     url: '/images/og-default.jpg',
    //     width: 1200,
    //     height: 630,
    //     alt: 'Sea UI Kit',
    //   },
    // ],
  },
  robots: {
    index: true,
    follow: true,
    noarchive: true,
    nosnippet: false,
    noimageindex: false,
    notranslate: false,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  // verification: {
  //   google: 'your-google-verification-code',
  //   yandex: 'your-yandex-verification-code',
  //   other: {
  //     'msvalidate.01': 'your-bing-verification-code',
  //   },
  // },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  minimumScale: 1,
  userScalable: true,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#0ea5e9' },
    { media: '(prefers-color-scheme: dark)', color: '#0284c7' },
  ],
}

interface RootLayoutProps {
  children: React.ReactNode
}

/**
 * Root Layout Component
 * - Global error boundary
 * - Loading states
 * - Toast notifications
 * - SEO optimization
 * - Performance monitoring
 */
export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang='tr' suppressHydrationWarning>
      <head>
        {/* DNS prefetch for external resources */}
        <link rel='dns-prefetch' href='//fonts.googleapis.com' />
        <link rel='dns-prefetch' href='//fonts.gstatic.com' />

        {/* Preconnect to critical origins */}
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='' />

        {/* Basic favicon */}
        <link rel='icon' href='/favicon.ico' />

        {/* Theme and color scheme */}
        <meta name='color-scheme' content='light dark' />
        <meta name='theme-color' content='#0ea5e9' />

        {/* Security headers */}
        <meta httpEquiv='X-Content-Type-Options' content='nosniff' />
        <meta httpEquiv='Referrer-Policy' content='strict-origin-when-cross-origin' />
        <meta httpEquiv='Permissions-Policy' content='camera=(), microphone=(), geolocation=()' />

        {/* Performance hints */}
        <meta httpEquiv='X-UA-Compatible' content='IE=edge' />

        {/* JSON-LD Structured Data */}
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'Sea UI Kit',
              description: 'Enterprise seviyede React component kütüphanesi',
              url: 'https://localhost:3000',
              publisher: {
                '@type': 'Organization',
                name: 'Sea UI Kit Team',
                logo: {
                  '@type': 'ImageObject',
                  url: '/images/logo.png',
                },
              },
              potentialAction: {
                '@type': 'SearchAction',
                target: {
                  '@type': 'EntryPoint',
                  urlTemplate: '/search?q={search_term_string}',
                },
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />
      </head>
      <body suppressHydrationWarning>
        {/* Client-side providers wrap all interactive components */}
        <Providers>
          {/* Main Content */}
          <main id='main-content' role='main'>
            {children}
          </main>

          {/* Skip to content link for accessibility */}
          <a
            href='#main-content'
            className='sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary-500 focus:text-white focus:rounded-md focus:text-sm focus:font-medium'
          >
            İçeriğe geç
          </a>
        </Providers>

        {/* Performance monitoring script */}
        {process.env.NODE_ENV === 'production' && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                // Performance monitoring
                if ('performance' in window) {
                  window.addEventListener('load', function() {
                    setTimeout(function() {
                      const navigation = performance.getEntriesByType('navigation')[0];
                      const loadTime = navigation.loadEventEnd - navigation.loadEventStart;
                      
                      // Log slow page loads
                      if (loadTime > 3000) {
                        console.warn('Slow page load detected:', loadTime + 'ms');
                      }
                      
                      // Send to analytics
                      if (window.gtag) {
                        window.gtag('event', 'page_load_time', {
                          value: Math.round(loadTime),
                          custom_parameter: window.location.pathname
                        });
                      }
                    }, 0);
                  });
                }
                
                // Error monitoring
                window.addEventListener('error', function(e) {
                  if (window.gtag) {
                    window.gtag('event', 'javascript_error', {
                      error_message: e.message,
                      error_filename: e.filename,
                      error_line: e.lineno,
                      error_column: e.colno
                    });
                  }
                });
                
                // Unhandled promise rejection monitoring
                window.addEventListener('unhandledrejection', function(e) {
                  if (window.gtag) {
                    window.gtag('event', 'unhandled_promise_rejection', {
                      error_message: e.reason?.message || 'Unknown promise rejection'
                    });
                  }
                });
              `,
            }}
          />
        )}

        {/* Development tools */}
        {process.env.NODE_ENV === 'development' && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                // Development helpers
                console.log('🌊 Sea UI Kit - Development Mode');
                console.log('🔧 Development tools available on window.__DEV__');
                
                window.__DEV__ = {
                  performance: {
                    getMetrics: () => {
                      if (!performance) return null;
                      const navigation = performance.getEntriesByType('navigation')[0];
                      return {
                        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
                        loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
                        totalTime: navigation.loadEventEnd - navigation.fetchStart,
                        networkTime: navigation.responseEnd - navigation.fetchStart,
                        renderTime: navigation.loadEventEnd - navigation.domContentLoadedEventEnd
                      };
                    }
                  },
                  theme: {
                    toggle: () => {
                      document.documentElement.classList.toggle('dark');
                    }
                  }
                };
              `,
            }}
          />
        )}

        {/* Service Worker Registration */}
        {process.env.NODE_ENV === 'production' && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                if ('serviceWorker' in navigator) {
                  window.addEventListener('load', function() {
                    navigator.serviceWorker.register('/sw.js')
                      .then(function(registration) {
                        console.log('SW registered: ', registration);
                      })
                      .catch(function(registrationError) {
                        console.log('SW registration failed: ', registrationError);
                      });
                  });
                }
              `,
            }}
          />
        )}
      </body>
    </html>
  )
}

/**
 * Error sayfası için özel layout
 */
export function ErrorLayout({ children, error }: { children: React.ReactNode; error?: Error }) {
  return (
    <html lang='tr'>
      <head>
        <title>Hata Oluştu | Sea UI Kit</title>
        <meta name='robots' content='noindex,nofollow' />
        <link rel='icon' href='/favicon.ico' />
      </head>
      <body>
        <div className='min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-900'>
          {children}
        </div>

        {/* Error reporting */}
        {error && process.env.NODE_ENV === 'production' && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                if (window.gtag) {
                  window.gtag('event', 'error_page_view', {
                    error_message: '${error.message?.replace(/'/g, "\\'")}',
                    error_page: window.location.pathname
                  });
                }
              `,
            }}
          />
        )}
      </body>
    </html>
  )
}
