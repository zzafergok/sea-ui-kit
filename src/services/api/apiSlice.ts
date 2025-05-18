import { createApi } from '@reduxjs/toolkit/query/react'
import { axiosBaseQuery } from './axiosBaseQuery'

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
  tagTypes: ['User', 'Posts', 'Settings'],
  endpoints: (_builder) => ({}),
})
