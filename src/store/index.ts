import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import themeReducer from './slices/themeSlice'
import langReducer from './slices/langSlice'
import userReducer from './slices/userSlice'
import { apiSlice } from '../services/api/apiSlice'

import { isDevelopment } from '../utils/environment'

// Tipler için ayrı bir dosya oluşturalım
import type { ThemeState } from './slices/themeSlice'
import type { LangState } from './slices/langSlice'
import type { UserState } from './slices/userSlice'

// Store tipi tanımlaması
export interface AppStore {
  theme: ThemeState
  lang: LangState
  user: UserState
  api: ReturnType<typeof apiSlice.reducer>
}

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    lang: langReducer,
    user: userReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: isDevelopment,
})

// Infer the RootState and AppDispatch types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// Use throughout your app instead of plain useDispatch and useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
