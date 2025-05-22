import { useState, useCallback } from 'react'
import { ApiResponse, ApiError } from '@/services/api/types'

/**
 * API çağrıları için state yönetimi sağlayan hook
 */
interface UseApiState<T> {
  data: T | null
  loading: boolean
  error: ApiError | null
}

export function useApi<T>() {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: false,
    error: null,
  })

  const execute = useCallback(async (apiCall: () => Promise<ApiResponse<T>>) => {
    setState((prev) => ({ ...prev, loading: true, error: null }))

    try {
      const response = await apiCall()
      setState({
        data: response.data,
        loading: false,
        error: null,
      })
      return response
    } catch (error) {
      const apiError = error as ApiError
      setState({
        data: null,
        loading: false,
        error: apiError,
      })
      throw apiError
    }
  }, [])

  const reset = useCallback(() => {
    setState({
      data: null,
      loading: false,
      error: null,
    })
  }, [])

  return {
    ...state,
    execute,
    reset,
    setState,
  }
}

/**
 * Gelişmiş API hook - cache ve progress desteği ile
 */
export function useEnhancedApi<T>() {
  const baseHook = useApi<T>()
  const [progress, setProgress] = useState(0)

  const uploadWithProgress = useCallback(
    async (uploadFn: (onProgress: (progress: number) => void) => Promise<ApiResponse<T>>) => {
      setProgress(0)
      return baseHook.execute(() => uploadFn((progress) => setProgress(progress)))
    },
    [baseHook],
  )

  const getCached = useCallback(
    async (
      apiCall: () => Promise<ApiResponse<T>>,
      cacheKey: string,
      cacheTime: number = 300000, // 5 dakika
    ) => {
      // Simple cache implementation
      const cached = sessionStorage.getItem(cacheKey)
      if (cached) {
        const { data, timestamp } = JSON.parse(cached)
        if (Date.now() - timestamp < cacheTime) {
          baseHook.setState({ data, loading: false, error: null })
          return { data, success: true } as ApiResponse<T>
        }
      }

      const result = await baseHook.execute(apiCall)

      // Cache the result
      sessionStorage.setItem(
        cacheKey,
        JSON.stringify({
          data: result.data,
          timestamp: Date.now(),
        }),
      )

      return result
    },
    [baseHook],
  )

  return {
    ...baseHook,
    progress,
    uploadWithProgress,
    getCached,
  }
}

export default useApi
