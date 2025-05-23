import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,

  // CSS ve Tailwind optimizasyonları
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
    optimizeCss: true,
    turbo: {
      rules: {
        '*.css': {
          loaders: ['postcss-loader'],
          as: '*.css',
        },
      },
    },
  },

  // Webpack CSS yapılandırması
  webpack: (config, { isServer, dev }) => {
    // Bundle analyzer
    if (process.env.ANALYZE === 'true') {
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'server',
          analyzerPort: isServer ? 8888 : 8889,
          openAnalyzer: true,
        }),
      )
    }

    // CSS handling improvements
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      }
    }

    // Ensure CSS is processed correctly
    config.module.rules.forEach((rule) => {
      if (rule.oneOf) {
        rule.oneOf.forEach((oneOfRule) => {
          if (oneOfRule.test && oneOfRule.test.toString().includes('css')) {
            oneOfRule.use?.forEach((useItem) => {
              if (typeof useItem === 'object' && useItem.loader && useItem.loader.includes('postcss-loader')) {
                useItem.options = {
                  ...useItem.options,
                  postcssOptions: {
                    plugins: [
                      'postcss-import',
                      ['tailwindcss/nesting', 'postcss-nesting'],
                      'tailwindcss',
                      'autoprefixer',
                    ],
                  },
                }
              }
            })
          }
        })
      }
    })

    return config
  },

  // Headers
  async headers() {
    return [
      {
        source: '/_next/static/css/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
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
    ]
  },

  // Environment variables
  env: {
    CUSTOM_BUILD_ID: process.env.BUILD_ID || 'development',
  },
}

export default nextConfig
