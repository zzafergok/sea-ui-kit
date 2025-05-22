import { AxiosInstance } from 'axios'
import { RefreshTokenResponse } from './types'
import { API_ENDPOINTS } from './constants'
import apiConfig from '@/config/api'

/**
 * Token yönetimi için singleton sınıf
 * Access token ve refresh token işlemlerini merkezi olarak yönetir
 */
class TokenManager {
  private static instance: TokenManager
  private refreshPromise: Promise<RefreshTokenResponse> | null = null

  static getInstance(): TokenManager {
    if (!TokenManager.instance) {
      TokenManager.instance = new TokenManager()
    }
    return TokenManager.instance
  }

  /**
   * LocalStorage'dan access token'ı alır
   */
  getAccessToken(): string | null {
    if (typeof window === 'undefined') return null
    return localStorage.getItem('accessToken')
  }

  /**
   * LocalStorage'dan refresh token'ı alır
   */
  getRefreshToken(): string | null {
    if (typeof window === 'undefined') return null
    return localStorage.getItem('refreshToken')
  }

  /**
   * Access ve refresh token'ları localStorage'a kaydeder
   */
  setTokens(accessToken: string, refreshToken: string, expiresIn?: number): void {
    if (typeof window === 'undefined') return
    
    localStorage.setItem('accessToken', accessToken)
    localStorage.setItem('refreshToken', refreshToken)
    
    // Token süresini hesapla ve kaydet
    const expiryTime = Date.now() + (expiresIn ? expiresIn * 1000 : apiConfig.tokenRefreshBuffer)
    localStorage.setItem('tokenExpiry', expiryTime.toString())
    
    // User session bilgisini güncelle
    localStorage.setItem('lastActivity', Date.now().toString())
  }

  /**
   * Tüm token'ları localStorage'dan temizler
   */
  removeTokens(): void {
    if (typeof window === 'undefined') return
    
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('tokenExpiry')
    localStorage.removeItem('lastActivity')
  }

  /**
   * Token'ın süresi dolmuş mu kontrol eder
   */
  isTokenExpired(): boolean {
    if (typeof window === 'undefined') return true
    
    const expiry = localStorage.getItem('tokenExpiry')
    if (!expiry) return true
    
    // Buffer süresi ekleyerek erken yenileme yapar
    const bufferTime = 60000 // 1 dakika buffer
    return Date.now() > (parseInt(expiry) - bufferTime)
  }

  /**
   * Token yenileme işlemini gerçekleştirir
   * Aynı anda birden fazla refresh isteğini önler
   */
  async refreshAccessToken(axiosInstance: AxiosInstance): Promise<RefreshTokenResponse | null> {
    // Aynı anda birden fazla refresh isteği yapılmasını önle
    if (this.refreshPromise) {
      return this.refreshPromise
    }

    const refreshToken = this.getRefreshToken()
    if (!refreshToken) {
      this.removeTokens()
      return null
    }

    this.refreshPromise = this.performTokenRefresh(axiosInstance, refreshToken)

    try {
      const result = await this.refreshPromise
      return result
    } catch (error) {
      this.removeTokens()
      throw error
    } finally {
      this.refreshPromise = null
    }
  }

  /**
   * Kullanıcı aktivitesini günceller
   */
  updateLastActivity(): void {
    if (typeof window === 'undefined') return
    localStorage.setItem('lastActivity', Date.now().toString())
  }

  /**
   * Session timeout kontrolü yapar
   */
  isSessionExpired(timeoutMinutes: number = 30): boolean {
    if (typeof window === 'undefined') return true
    
    const lastActivity = localStorage.getItem('lastActivity')
    if (!lastActivity) return true
    
    const sessionTimeout = timeoutMinutes * 60 * 1000 // milliseconds
    return Date.now() - parseInt(lastActivity) > sessionTimeout
  }

  /**
   * Token refresh işlemini gerçekleştirir
   */
  private async performTokenRefresh(
    axiosInstance: AxiosInstance, 
    refreshToken: string
  ): Promise<RefreshTokenResponse> {
    try {
      const response = await axiosInstance.post(
        API_ENDPOINTS.AUTH.REFRESH,
        { refreshToken },
        { 
          skipAuth: true, 
          skipErrorHandling: true,
          timeout: 10000
        }
      )

      if (response.data?.success && response.data?.data) {
        const tokenData = response.data.data
        this.setTokens(tokenData.token, tokenData.refreshToken, tokenData.expiresIn)
        return tokenData
      }

      throw new Error('Token yenileme yanıtı geçersiz')
    } catch (error) {
      console.error('Token yenileme hatası:', error)
      throw new Error('Token yenileme başarısız')
    }
  }

  /**
   * Token bilgilerini debug için döndürür
   */
  getTokenInfo() {
    return {
      hasAccessToken: !!this.getAccessToken(),
      hasRefreshToken: !!this.getRefreshToken(),
      isExpired: this.isTokenExpired(),
      isSessionExpired: this.isSessionExpired(),
      lastActivity: localStorage.getItem('lastActivity'),
      tokenExpiry: localStorage.getItem('tokenExpiry')
    }
  }
}

export { TokenManager }
export default TokenManager.getInstance()
