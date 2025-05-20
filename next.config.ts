/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,

  // Webpack önbelleğini devre dışı bırak (geliştirme sırasında)
  webpack: (config: { cache?: boolean }, { dev }: { dev: boolean }) => {
    if (dev) {
      config.cache = false
    }
    return config
  },

  // Optimize edilmiş görüntü işlemeyi devre dışı bırak (deneme amaçlı)
  images: {
    disableStaticImages: true,
  },

  // Geçici olarak bazı optimizasyonları devre dışı bırak
  swcMinify: false,

  // SCSS seçenekleri yerine doğrudan CSS modüllerini kullan
  // sassOptions kısmını kaldırıyoruz
}

module.exports = nextConfig
