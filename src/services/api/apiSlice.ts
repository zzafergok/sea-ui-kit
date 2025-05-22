import { createApi } from '@reduxjs/toolkit/query/react'
import { axiosBaseQuery } from './axiosBaseQuery'
import { API_ENDPOINTS } from './constants'
import { LoginFormValues } from '@/lib/validations/auth'

// API slice tipini export et
export interface ApiSliceState {
  queries: Record<string, any>
  mutations: Record<string, any>
  provided: Record<string, any>
  subscriptions: Record<string, any>
  config: Record<string, any>
}

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: axiosBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
  }),
  tagTypes: ['User', 'Posts', 'Settings', 'Auth', 'Files'],
  endpoints: (builder) => ({
    // Authentication endpoints
    login: builder.mutation<
      { user: any; token: string; refreshToken: string },
      LoginFormValues
    >({
      query: (credentials) => ({
        url: API_ENDPOINTS.AUTH.LOGIN,
        method: 'POST',
        data: credentials,
        skipAuth: true // Login işlemi için auth gerekmiyor
      }),
      invalidatesTags: ['Auth', 'User']
    }),

    refreshToken: builder.mutation<
      { token: string; refreshToken: string; expiresIn: number },
      { refreshToken: string }
    >({
      query: ({ refreshToken }) => ({
        url: API_ENDPOINTS.AUTH.REFRESH,
        method: 'POST',
        data: { refreshToken },
        skipAuth: true,
        skipErrorHandling: true // Kendi error handling'ini yapacak
      })
    }),

    logout: builder.mutation<void, void>({
      query: () => ({
        url: API_ENDPOINTS.AUTH.LOGOUT,
        method: 'POST'
      }),
      invalidatesTags: ['Auth', 'User']
    }),

    register: builder.mutation<
      { user: any; token: string; refreshToken: string },
      { name: string; email: string; password: string; confirmPassword: string }
    >({
      query: (userData) => ({
        url: API_ENDPOINTS.AUTH.REGISTER,
        method: 'POST',
        data: userData,
        skipAuth: true
      }),
      invalidatesTags: ['Auth']
    }),

    // User endpoints
    getCurrentUser: builder.query<any, void>({
      query: () => ({
        url: API_ENDPOINTS.USER.PROFILE,
        method: 'GET'
      }),
      providesTags: ['User']
    }),

    updateUserProfile: builder.mutation<any, Partial<any>>({
      query: (userData) => ({
        url: API_ENDPOINTS.USER.UPDATE,
        method: 'PUT',
        data: userData,
        showErrorToast: true // Hata durumunda toast göster
      }),
      invalidatesTags: ['User']
    }),

    deleteUser: builder.mutation<void, void>({
      query: () => ({
        url: API_ENDPOINTS.USER.DELETE,
        method: 'DELETE'
      }),
      invalidatesTags: ['User', 'Auth']
    }),

    // Posts endpoints
    getPosts: builder.query<any[], { page?: number; limit?: number; search?: string }>({
      query: ({ page = 1, limit = 10, search }) => ({
        url: API_ENDPOINTS.POSTS.LIST,
        method: 'GET',
        params: { page, limit, search }
      }),
      providesTags: ['Posts']
    }),

    getPost: builder.query<any, string | number>({
      query: (id) => ({
        url: `${API_ENDPOINTS.POSTS.LIST}/${id}`,
        method: 'GET'
      }),
      providesTags: (result, error, id) => [{ type: 'Posts', id }]
    }),

    createPost: builder.mutation<any, { title: string; content: string; tags?: string[] }>({
      query: (postData) => ({
        url: API_ENDPOINTS.POSTS.CREATE,
        method: 'POST',
        data: postData
      }),
      invalidatesTags: ['Posts']
    }),

    updatePost: builder.mutation<any, { id: string | number; data: Partial<any> }>({
      query: ({ id, data }) => ({
        url: `${API_ENDPOINTS.POSTS.UPDATE}/${id}`,
        method: 'PUT',
        data
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Posts', id }, 'Posts']
    }),

    deletePost: builder.mutation<void, string | number>({
      query: (id) => ({
        url: `${API_ENDPOINTS.POSTS.DELETE}/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Posts']
    }),

    // File operations
    uploadFile: builder.mutation<any, { file: File; onProgress?: (progress: number) => void }>({
      queryFn: async ({ file, onProgress }) => {
        try {
          const { apiService } = await import('./apiService')
          const result = await apiService.uploadFile(
            API_ENDPOINTS.FILES.UPLOAD,
            file,
            onProgress ? (progressEvent) => {
              const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
              onProgress(progress)
            } : undefined
          )
          return { data: result.data }
        } catch (error) {
          return { error }
        }
      },
      invalidatesTags: ['Files']
    }),

    uploadAvatar: builder.mutation<any, { file: File; onProgress?: (progress: number) => void }>({
      queryFn: async ({ file, onProgress }) => {
        try {
          const { apiService } = await import('./apiService')
          const result = await apiService.uploadFile(
            API_ENDPOINTS.USER.UPLOAD_AVATAR,
            file,
            onProgress ? (progressEvent) => {
              const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
              onProgress(progress)
            } : undefined
          )
          return { data: result.data }
        } catch (error) {
          return { error }
        }
      },
      invalidatesTags: ['User', 'Files']
    }),

    downloadFile: builder.mutation<Blob, { url: string; filename?: string }>({
      queryFn: async ({ url, filename }) => {
        try {
          const { apiService } = await import('./apiService')
          const blob = await apiService.downloadFile(url, filename)
          return { data: blob }
        } catch (error) {
          return { error }
        }
      }
    }),

    // Health check endpoint
    healthCheck: builder.query<{ status: string; timestamp: string }, void>({
      query: () => ({
        url: '/health',
        method: 'GET',
        skipAuth: true,
        timeout: 5000
      })
    }),

    // API info endpoint
    getApiInfo: builder.query<{ version: string; environment: string }, void>({
      query: () => ({
        url: '/info',
        method: 'GET',
        skipAuth: true
      })
    })
  })
})

// Export hooks for components
export const {
  // Auth hooks
  useLoginMutation,
  useRefreshTokenMutation,
  useLogoutMutation,
  useRegisterMutation,

  // User hooks
  useGetCurrentUserQuery,
  useUpdateUserProfileMutation,
  useDeleteUserMutation,

  // Posts hooks
  useGetPostsQuery,
  useGetPostQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,

  // File hooks
  useUploadFileMutation,
  useUploadAvatarMutation,
  useDownloadFileMutation,

  // System hooks
  useHealthCheckQuery,
  useGetApiInfoQuery,

  // Advanced hooks
  useLazyGetPostsQuery,
  useLazyGetCurrentUserQuery,
  usePrefetch
} = apiSlice

export default apiSlice
