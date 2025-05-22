import { AxiosError } from 'axios'
import { ApiError } from './types'
import { HTTP_STATUS, ERROR_CODES } from './constants'
import { store } from '@/store'
import { logoutUser } from '@/store/slices/userSlice'
import { showToast } from '@/store/slices/toastSlice'
import { TokenManager } from './tokenManager'

/**
 * API hatalarını merkezi olarak yöneten sınıf
 * Hata türlerine göre uygun mesajları ve aksiyonları belirler
 */
class ErrorHandler {
  /**
   * Axios hatalarını ApiError formatına dönüştürür
   */
  static handleError(error: AxiosError): ApiError {
    const status = error.response?.status || 0
    const responseData = error.response?.data as any

    let message = 'Beklenmeyen bir hata oluştu'

    let code: (typeof ERROR_CODES)[keyof typeof ERROR_CODES] = ERROR_CODES.SERVER_ERROR

    // HTTP status kodlarına göre hata mesajları
    switch (status) {
      case HTTP_STATUS.BAD_REQUEST:
        message = responseData?.message || 'Geçersiz istek parametreleri'
        code = ERROR_CODES.VALIDATION_ERROR
        break

      case HTTP_STATUS.UNAUTHORIZED:
        message = 'Oturum süreniz dolmuş, lütfen tekrar giriş yapın'
        code = ERROR_CODES.TOKEN_EXPIRED
        break

      case HTTP_STATUS.FORBIDDEN:
        message = 'Bu işlemi yapmaya yetkiniz bulunmuyor'
        code = ERROR_CODES.PERMISSION_DENIED
        break

      case HTTP_STATUS.NOT_FOUND:
        message = 'İstenen kaynak bulunamadı'
        code = ERROR_CODES.RESOURCE_NOT_FOUND
        break

      case HTTP_STATUS.CONFLICT:
        message = responseData?.message || 'Veri çakışması oluştu'
        code = ERROR_CODES.VALIDATION_ERROR
        break

      case HTTP_STATUS.UNPROCESSABLE_ENTITY:
        message = responseData?.message || 'Gönderilen veriler işlenemedi'
        code = ERROR_CODES.VALIDATION_ERROR
        break

      case HTTP_STATUS.TOO_MANY_REQUESTS:
        message = 'Çok fazla istek gönderildi, lütfen bekleyiniz'
        code = ERROR_CODES.RATE_LIMIT_EXCEEDED
        break

      case HTTP_STATUS.INTERNAL_SERVER_ERROR:
        message = 'Sunucu hatası oluştu, lütfen daha sonra tekrar deneyiniz'
        code = ERROR_CODES.SERVER_ERROR
        break

      case HTTP_STATUS.BAD_GATEWAY:
        message = 'Sunucu geçici olarak erişilemez durumda'
        code = ERROR_CODES.SERVER_ERROR
        break

      case HTTP_STATUS.SERVICE_UNAVAILABLE:
        message = 'Servis şu anda kullanılamıyor, lütfen daha sonra tekrar deneyiniz'
        code = ERROR_CODES.SERVER_ERROR
        break

      case HTTP_STATUS.GATEWAY_TIMEOUT:
        message = 'İstek zaman aşımına uğradı'
        code = ERROR_CODES.SERVER_ERROR
        break

      default:
        if (!error.response) {
          // Network hatası
          message = 'İnternet bağlantınızı kontrol ediniz'
          code = ERROR_CODES.NETWORK_ERROR
        } else if (status >= 500) {
          message = 'Sunucu hatası oluştu'
          code = ERROR_CODES.SERVER_ERROR
        }
    }

    // Development ortamında detaylı hata bilgisi logla
    if (process.env.NODE_ENV === 'development') {
      console.error('API Error Details:', {
        status,
        message,
        code,
        url: error.config?.url,
        method: error.config?.method,
        responseData,
        requestData: error.config?.data,
      })
    }

    return {
      message,
      status,
      code,
      details: responseData,
    }
  }

  /**
   * Kullanıcıya toast mesajı gösterir
   */
  static showErrorToast(error: ApiError): void {
    try {
      store.dispatch(
        showToast({
          type: 'error',
          title: 'Hata',
          message: error.message,
          duration: 5000,
        }),
      )
    } catch (toastError) {
      // Toast slice mevcut değilse console'a logla
      console.error('error.message: ', error.message, 'Toast error:', toastError)
    }
  }

  /**
   * Başarı mesajı gösterir
   */
  static showSuccessToast(message: string, title: string = 'Başarılı'): void {
    try {
      store.dispatch(
        showToast({
          type: 'success',
          title,
          message,
          duration: 3000,
        }),
      )
    } catch (toastError) {
      console.log('error:', toastError)
    }
  }

  /**
   * Authentication hatalarını handle eder
   * Token'ları temizler ve kullanıcıyı logout eder
   */
  static handleAuthError(): void {
    const tokenManager = TokenManager.getInstance()
    tokenManager.removeTokens()

    // Store'dan user bilgilerini temizle
    store.dispatch(logoutUser())

    // Toast mesajı göster
    this.showErrorToast({
      message: 'Oturumunuz sonlandırıldı, lütfen tekrar giriş yapın',
      status: 401,
      code: ERROR_CODES.TOKEN_EXPIRED,
    })

    // Kullanıcıyı login sayfasına yönlendir
    if (typeof window !== 'undefined') {
      // Next.js router kullanımı için
      const currentPath = window.location.pathname
      if (currentPath !== '/login' && currentPath !== '/register') {
        window.location.href = '/login'
      }
    }
  }

  /**
   * Rate limiting hatalarını handle eder
   */
  static handleRateLimitError(): void {
    this.showErrorToast({
      message: 'Çok fazla istek gönderildi. Lütfen birkaç dakika bekleyip tekrar deneyiniz.',
      status: 429,
      code: ERROR_CODES.RATE_LIMIT_EXCEEDED,
    })
  }

  /**
   * Network hatalarını handle eder
   */
  static handleNetworkError(): void {
    this.showErrorToast({
      message: 'İnternet bağlantınızı kontrol ediniz ve tekrar deneyiniz.',
      status: 0,
      code: ERROR_CODES.NETWORK_ERROR,
    })
  }

  /**
   * Validation hatalarını handle eder
   */
  static handleValidationError(details: any): void {
    let message = 'Girilen bilgilerde hata bulunmaktadır'

    // Detaylı validation mesajları varsa kullan
    if (details?.errors && Array.isArray(details.errors)) {
      message = details.errors.join(', ')
    } else if (details?.message) {
      message = details.message
    }

    this.showErrorToast({
      message,
      status: 400,
      code: ERROR_CODES.VALIDATION_ERROR,
      details,
    })
  }

  /**
   * Genel hata handler - error tipine göre uygun handler'ı çağırır
   */
  static handleApiError(error: ApiError): void {
    switch (error.code) {
      case ERROR_CODES.TOKEN_EXPIRED:
      case ERROR_CODES.INVALID_TOKEN:
        this.handleAuthError()
        break

      case ERROR_CODES.RATE_LIMIT_EXCEEDED:
        this.handleRateLimitError()
        break

      case ERROR_CODES.NETWORK_ERROR:
        this.handleNetworkError()
        break

      case ERROR_CODES.VALIDATION_ERROR:
        this.handleValidationError(error.details)
        break

      default:
        this.showErrorToast(error)
    }
  }

  /**
   * Error reporting service'e hata gönderir (production)
   */
  static reportError(error: ApiError, context?: any): void {
    if (process.env.NODE_ENV === 'production') {
      // Sentry, LogRocket, Bugsnag gibi servislere hata raporu gönder
      if (typeof window !== 'undefined' && (window as any).gtag) {
        return (window as any).gtag('event', 'api_error', {
          error_code: error.code,
          error_message: error.message,
          error_status: error.status,
          context: JSON.stringify(context),
        })
      }

      // Console'a production hatalarını minimal şekilde logla
      console.error(`API Error [${error.code}]:`, error.message)
    }
  }

  /**
   * Retry edilebilir hata mı kontrol eder
   */
  static isRetryableError(error: ApiError): boolean {
    // Network hataları ve 5xx server hataları retry edilebilir
    return (
      error.code === ERROR_CODES.NETWORK_ERROR ||
      (error.status >= 500 && error.status < 600) ||
      error.status === HTTP_STATUS.TOO_MANY_REQUESTS
    )
  }

  /**
   * Hata istatistiklerini döndürür
   */
  static getErrorStats(): any {
    // Production'da error monitoring için kullanılabilir
    return {
      timestamp: new Date().toISOString(),
      userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : 'unknown',
      url: typeof window !== 'undefined' ? window.location.href : 'unknown',
    }
  }
}

export { ErrorHandler }
export default ErrorHandler
