/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  experimental: {
    optimizePackageImports: ['@radix-ui/react-icons'],
  },
  webpack: (config, { dev, isServer }) => {
    // Chunk loading sorunlarını önlemek için
    if (dev && !isServer) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            default: {
              minChunks: 2,
              priority: -20,
              reuseExistingChunk: true,
            },
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              priority: -10,
              chunks: 'all',
            },
          },
        },
      }
    }

    // ES modules desteği
    config.resolve.extensionAlias = {
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.jsx': ['.tsx', '.jsx'],
    }

    return config
  },
  // Hydration sorunlarını önlemek için
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
  // CSS optimizasyonu
  optimizeFonts: true,
  // Kaynak harita desteği
  productionBrowserSourceMaps: false,
  // Statik optimizasyon
  generateEtags: false,
  // Hızlı yenileme ayarları
  fastRefresh: true,
}

module.exports = nextConfig
