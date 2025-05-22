import { InternalAxiosRequestConfig } from 'axios'

/**
 * Token refresh sırasında bekleyen istekler için queue yapısı
 */
interface QueuedRequest {
  resolve: (value: any) => void
  reject: (error: any) => void
  config: InternalAxiosRequestConfig
}

/**
 * Token refresh sırasında gelen istekleri sıraya alan sınıf
 * Aynı anda birden fazla token refresh işlemini önler
 */
class RequestQueue {
  private static instance: RequestQueue
  private isRefreshing = false
  private failedQueue: QueuedRequest[] = []

  static getInstance(): RequestQueue {
    if (!RequestQueue.instance) {
      RequestQueue.instance = new RequestQueue()
    }
    return RequestQueue.instance
  }

  /**
   * İsteği kuyruğa ekler ve Promise döndürür
   */
  addToQueue(config: InternalAxiosRequestConfig): Promise<any> {
    return new Promise((resolve, reject) => {
      this.failedQueue.push({ resolve, reject, config })
    })
  }

  /**
   * Kuyruktaki tüm istekleri işler
   * @param error - Hata varsa tüm istekleri reject eder
   * @param token - Yeni token varsa tüm istekleri yeni token ile resolve eder
   */
  processQueue(error: any = null, token: string | null = null): void {
    this.failedQueue.forEach(({ resolve, reject, config }) => {
      if (error) {
        reject(error)
      } else if (token) {
        // Yeni token'ı config'e ekle
        config.headers = config.headers || {}
        config.headers.Authorization = `Bearer ${token}`
        resolve(config)
      } else {
        reject(new Error('Token yenileme başarısız'))
      }
    })

    // Kuyruğu temizle
    this.failedQueue = []
  }

  /**
   * Token refresh durumunu ayarlar
   */
  setRefreshing(status: boolean): void {
    this.isRefreshing = status
  }

  /**
   * Token refresh işlemi devam ediyor mu kontrol eder
   */
  isRefreshingToken(): boolean {
    return this.isRefreshing
  }

  /**
   * Kuyruktaki istek sayısını döndürür
   */
  getQueueSize(): number {
    return this.failedQueue.length
  }

  /**
   * Kuyruğu temizler - emergency durumlar için
   */
  clearQueue(): void {
    this.failedQueue.forEach(({ reject }) => {
      reject(new Error('Request queue cleared'))
    })
    this.failedQueue = []
    this.isRefreshing = false
  }

  /**
   * Kuyruk durumu hakkında bilgi verir
   */
  getQueueStatus() {
    return {
      isRefreshing: this.isRefreshing,
      queueSize: this.failedQueue.length,
      timestamp: new Date().toISOString(),
    }
  }
}

export { RequestQueue }
export default RequestQueue.getInstance()
