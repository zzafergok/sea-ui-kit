/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  // Webpack yapılandırması
  webpack: (config, { dev }) => {
    if (dev) {
      config.cache = false
    }
    return config
  },
  // Görüntü optimizasyonu ayarları
  images: {
    disableStaticImages: true,
  },
  // SWC minification'ı devre dışı bırak
  swcMinify: false,
  // Derleme sırasında daha detaylı log
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
}

module.exports = nextConfig
