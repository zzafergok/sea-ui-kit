import { BaseQueryFn } from '@reduxjs/toolkit/query'
import { AxiosRequestConfig } from 'axios'
import { apiInstance } from './axiosInstance'
import { ApiError, RequestConfig } from './types'

export interface BaseQueryArgs {
  baseUrl?: string
}

/**
 * RTK Query için Axios base query
 * Redux Toolkit Query ile Axios entegrasyonu sağlar
 */
export const axiosBaseQuery = (
  { baseUrl }: BaseQueryArgs = {}
): BaseQueryFn<
  {
    url: string
    method?: AxiosRequestConfig['method']
    data?: AxiosRequestConfig['data']
    params?: AxiosRequestConfig['params']
    headers?: AxiosRequestConfig['headers']
  } & RequestConfig,
  unknown,
  ApiError
> => {
  return async ({ url, method = 'GET', data, params, headers, ...config }) => {
    try {
      const result = await apiInstance({
        url: baseUrl ? `${baseUrl}${url}` : url,
        method,
        data,
        params,
        headers,
        ...config
      })

      return { data: result.data }
    } catch (axiosError) {
      const error = axiosError as ApiError
      
      return {
        error: {
          status: error.status,
          data: error.message,
          message: error.message,
          code: error.code
        }
      }
    }
  }
}

export default axiosBaseQuery
