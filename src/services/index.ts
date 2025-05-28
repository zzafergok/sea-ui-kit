// Authentication services
export * from './authService'

// API services
export * from './apiService'

// Utilities
export * from './utils'

// Backward compatibility exports
export { tokenManagerService as TokenManager } from './authService'
export { tokenManagerService } from './authService'
export { apiService } from './apiService'
export { apiInstance } from './apiService'

// Legacy import compatibility
export const TokenManagerInstance = {
  getInstance: () => tokenManagerService,
}
