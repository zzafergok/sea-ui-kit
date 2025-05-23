/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,

  // Performance optimizations
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
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
        ],
      },
    ]
  },

  // Webpack configuration - sync version
  webpack: (config, { isServer }) => {
    // Bundle analyzer - sadece analiz modunda
    if (process.env.ANALYZE === 'true') {
      const { BundleAnalyzerPlugin } = eval('require')('webpack-bundle-analyzer')
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'server',
          analyzerPort: isServer ? 8888 : 8889,
          openAnalyzer: true,
        }),
      )
    }

    return config
  },

  // Environment variables
  env: {
    CUSTOM_BUILD_ID: process.env.BUILD_ID || 'development',
  },
}

export default nextConfig
