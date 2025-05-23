import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,

  // CSS optimizasyonları
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
    optimizeCss: true,
  },

  // Statik dosya optimizasyonları
  images: {
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 31536000,
  },

  // Headers for security and favicon
  async headers() {
    return [
      {
        source: '/favicon.ico',
        headers: [
          {
            key: 'Content-Type',
            value: 'image/x-icon',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
      {
        source: '/api/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, max-age=0',
          },
        ],
      },
    ]
  },

  // Webpack configuration for bundle analyzer and CSS optimization
  webpack: (config, { isServer, dev }) => {
    // Bundle analyzer - sadece analiz modunda
    if (process.env.ANALYZE === 'true') {
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'server',
          analyzerPort: isServer ? 8888 : 8889,
          openAnalyzer: true,
        }),
      )
    }

    // CSS optimizasyonları
    if (!dev && !isServer) {
      config.optimization.splitChunks.cacheGroups = {
        ...config.optimization.splitChunks.cacheGroups,
        styles: {
          name: 'styles',
          test: /\.(css|scss|sass)$/,
          chunks: 'all',
          enforce: true,
        },
      }
    }

    return config
  },

  // Environment variables
  env: {
    CUSTOM_BUILD_ID: process.env.BUILD_ID || 'development',
  },

  // Redirect yapılandırması
  async redirects() {
    return []
  },

  // Rewrites yapılandırması
  async rewrites() {
    return []
  },

  // TypeScript strict mode
  typescript: {
    ignoreBuildErrors: false,
  },

  // ESLint yapılandırması
  eslint: {
    ignoreDuringBuilds: false,
  },
}

export default nextConfig
