import { AxiosInstance } from 'axios'
import { ApiResponse, RequestConfig } from './types'
import { apiInstance } from './axiosInstance'
import { REQUEST_TIMEOUT } from './constants'

/**
 * Ana API service sınıfı
 * HTTP isteklerini yönetir ve standart API yanıtları döndürür
 */
class ApiService {
  private axiosInstance: AxiosInstance

  constructor(axiosInstance: AxiosInstance) {
    this.axiosInstance = axiosInstance
  }

  /**
   * GET istekleri
   */
  async get<T>(url: string, config?: RequestConfig): Promise<ApiResponse<T>> {
    const response = await this.axiosInstance.get<ApiResponse<T>>(url, config)
    return response.data
  }

  /**
   * POST istekleri
   */
  async post<T>(url: string, data?: any, config?: RequestConfig): Promise<ApiResponse<T>> {
    const response = await this.axiosInstance.post<ApiResponse<T>>(url, data, config)
    return response.data
  }

  /**
   * PUT istekleri
   */
  async put<T>(url: string, data?: any, config?: RequestConfig): Promise<ApiResponse<T>> {
    const response = await this.axiosInstance.put<ApiResponse<T>>(url, data, config)
    return response.data
  }

  /**
   * DELETE istekleri
   */
  async delete<T>(url: string, config?: RequestConfig): Promise<ApiResponse<T>> {
    const response = await this.axiosInstance.delete<ApiResponse<T>>(url, config)
    return response.data
  }

  /**
   * PATCH istekleri
   */
  async patch<T>(url: string, data?: any, config?: RequestConfig): Promise<ApiResponse<T>> {
    const response = await this.axiosInstance.patch<ApiResponse<T>>(url, data, config)
    return response.data
  }

  /**
   * Dosya upload işlemi
   */
  async uploadFile<T>(
    url: string,
    file: File,
    onUploadProgress?: (progressEvent: any) => void,
    config?: RequestConfig
  ): Promise<ApiResponse<T>> {
    const formData = new FormData()
    formData.append('file', file)

    const response = await this.axiosInstance.post<ApiResponse<T>>(url, formData, {
      ...config,
      headers: {
        'Content-Type': 'multipart/form-data',
        ...config?.headers
      },
      timeout: REQUEST_TIMEOUT.UPLOAD,
      onUploadProgress
    })

    return response.data
  }

  /**
   * Birden fazla dosya upload işlemi
   */
  async uploadFiles<T>(
    url: string,
    files: File[],
    onUploadProgress?: (progressEvent: any) => void,
    config?: RequestConfig
  ): Promise<ApiResponse<T>> {
    const formData = new FormData()
    
    files.forEach((file, index) => {
      formData.append(`files[${index}]`, file)
    })

    const response = await this.axiosInstance.post<ApiResponse<T>>(url, formData, {
      ...config,
      headers: {
        'Content-Type': 'multipart/form-data',
        ...config?.headers
      },
      timeout: REQUEST_TIMEOUT.UPLOAD,
      onUploadProgress
    })

    return response.data
  }

  /**
   * Dosya download işlemi
   */
  async downloadFile(
    url: string,
    filename?: string,
    config?: RequestConfig
  ): Promise<Blob> {
    const response = await this.axiosInstance.get(url, {
      ...config,
      responseType: 'blob',
      timeout: REQUEST_TIMEOUT.DOWNLOAD
    })

    // Otomatik download
    if (filename && typeof window !== 'undefined') {
      const downloadUrl = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = downloadUrl
      link.download = filename
      document.body.appendChild(link)
      link.click()
      link.remove()
      window.URL.revokeObjectURL(downloadUrl)
    }

    return response.data
  }

  /**
   * Streaming data işlemi
   */
  async streamData<T>(
    url: string,
    onChunk: (chunk: T) => void,
    config?: RequestConfig
  ): Promise<void> {
    const response = await this.axiosInstance.get(url, {
      ...config,
      responseType: 'stream',
      timeout: REQUEST_TIMEOUT.LONG_RUNNING
    })

    // Stream handling (Node.js environment)
    if (response.data.on) {
      response.data.on('data', (chunk: any) => {
        try {
          const parsedChunk = JSON.parse(chunk.toString())
          onChunk(parsedChunk)
        } catch (error) {
          console.error('Stream parsing error:', error)
        }
      })
    }
  }

  /**
   * Batch request işlemi
   */
  async batch<T>(requests: Array<() => Promise<ApiResponse<T>>>): Promise<Array<ApiResponse<T> | Error>> {
    const results = await Promise.allSettled(requests.map(req => req()))
    
    return results.map(result => {
      if (result.status === 'fulfilled') {
        return result.value
      } else {
        return result.reason
      }
    })
  }

  /**
   * Health check işlemi
   */
  async healthCheck(): Promise<boolean> {
    try {
      const response = await this.get('/health', {
        timeout: 5000,
        skipAuth: true,
        skipErrorHandling: true
      })
      return response.success
    } catch (error) {
      return false
    }
  }

  /**
   * API versiyonu bilgisi
   */
  async getApiInfo(): Promise<ApiResponse<any>> {
    return this.get('/info', {
      skipAuth: true,
      timeout: 5000
    })
  }

  /**
   * Raw axios instance'a erişim (özel durumlar için)
   */
  getAxiosInstance(): AxiosInstance {
    return this.axiosInstance
  }
}

// Export edilen service instance
export const apiService = new ApiService(apiInstance)

// Service sınıfını da export et (test ve özel kullanımlar için)
export { ApiService }
export default apiService
