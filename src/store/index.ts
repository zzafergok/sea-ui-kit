// Düzeltilmiş versiyon
import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import themeReducer from './slices/themeSlice'
import langReducer from './slices/langSlice'
import userReducer from './slices/userSlice'
import toastReducer from './slices/toastSlice'
import { apiSlice } from '../services/api/apiSlice'

import { isDevelopment } from '../utils/environment'

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    lang: langReducer,
    user: userReducer,
    toast: toastReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['toast/showToast'],
        ignoredPaths: ['toast.toasts'],
        ignoredActionsPaths: ['payload.action.onClick'],
      },
    }).concat(apiSlice.middleware),
  devTools: isDevelopment,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
