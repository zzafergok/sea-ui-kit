interface ApiConfig {
  baseURL: string
  timeout: number
  retryAttempts: number
  retryDelay: number
  enableLogging: boolean
  enablePerformanceMonitoring: boolean
  enableErrorReporting: boolean
  tokenRefreshBuffer: number
  maxConcurrentRequests: number
  enableCache: boolean
  defaultCacheTime: number
}

const developmentConfig: ApiConfig = {
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
  timeout: 10000,
  retryAttempts: 2,
  retryDelay: 1000,
  enableLogging: true,
  enablePerformanceMonitoring: true,
  enableErrorReporting: false,
  tokenRefreshBuffer: 300000, // 5 dakika
  maxConcurrentRequests: 10,
  enableCache: true,
  defaultCacheTime: 300000 // 5 dakika
}

const productionConfig: ApiConfig = {
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://api.example.com',
  timeout: 15000,
  retryAttempts: 3,
  retryDelay: 2000,
  enableLogging: false,
  enablePerformanceMonitoring: true,
  enableErrorReporting: true,
  tokenRefreshBuffer: 300000, // 5 dakika
  maxConcurrentRequests: 20,
  enableCache: true,
  defaultCacheTime: 600000 // 10 dakika
}

const testConfig: ApiConfig = {
  baseURL: 'http://localhost:3001/api',
  timeout: 5000,
  retryAttempts: 1,
  retryDelay: 500,
  enableLogging: false,
  enablePerformanceMonitoring: false,
  enableErrorReporting: false,
  tokenRefreshBuffer: 60000, // 1 dakika
  maxConcurrentRequests: 5,
  enableCache: false,
  defaultCacheTime: 0
}

export const apiConfig: ApiConfig = 
  process.env.NODE_ENV === 'production' 
    ? productionConfig 
    : process.env.NODE_ENV === 'test'
    ? testConfig
    : developmentConfig

export default apiConfig
