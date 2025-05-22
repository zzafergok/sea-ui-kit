// Düzeltilmiş versiyon
export const isServer = typeof window === 'undefined'
export const isDevelopment = process.env.NODE_ENV === 'development'
export const isProduction = process.env.NODE_ENV === 'production'

// Güvenli environment variable erişimi
export const getPublicEnvironmentVariable = (key: string, defaultValue: string = ''): string => {
  // Sadece NEXT_PUBLIC_ ile başlayan değişkenlere izin ver
  if (!key.startsWith('NEXT_PUBLIC_')) {
    console.warn(`Environment variable ${key} should start with NEXT_PUBLIC_ for client-side access`)
    return defaultValue
  }

  if (typeof process !== 'undefined' && process.env && process.env[key]) {
    return process.env[key] as string
  }
  return defaultValue
}

// Server-side environment variables için
export const getServerEnvironmentVariable = (key: string, defaultValue: string = ''): string => {
  if (isServer && typeof process !== 'undefined' && process.env && process.env[key]) {
    return process.env[key] as string
  }
  return defaultValue
}
