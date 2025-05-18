/**
 * Ortam değişkenlerine güvenli erişim sağlayan yardımcı fonksiyonlar
 * Browser ve server ortamlarında tutarlı davranış için tasarlanmıştır
 */
export const isServer = typeof window === 'undefined'
export const isDevelopment = process.env.NODE_ENV !== 'production'

/**
 * Ortam değişkenine güvenli erişim sağlar
 * @param key - Ortam değişkeni adı
 * @param defaultValue - Değişken tanımlı değilse kullanılacak varsayılan değer
 */
export const getEnvironmentVariable = (key: string, defaultValue: string = ''): string => {
  if (typeof process !== 'undefined' && process.env && process.env[key]) {
    return process.env[key] as string
  }
  return defaultValue
}
