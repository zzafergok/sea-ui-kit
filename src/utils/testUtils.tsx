import React from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore, EnhancedStore } from '@reduxjs/toolkit'
import { I18nextProvider } from 'react-i18next'
import i18n from 'i18next'

import { RootState } from '@/store'
import themeReducer from '@/store/slices/themeSlice'
import langReducer from '@/store/slices/langSlice'
import userReducer from '@/store/slices/userSlice'
import toastReducer from '@/store/slices/toastSlice'
import loadingReducer from '@/store/slices/loadingSlice'

// Test için minimal i18n configuration
i18n.init({
  lng: 'tr',
  resources: {
    tr: {
      translation: {
        'auth.login': 'Giriş Yap',
        'auth.email': 'E-posta',
        'auth.password': 'Şifre',
        'common.loading': 'Yükleniyor...',
        'common.error': 'Hata',
        'common.success': 'Başarılı',
      },
    },
  },
  interpolation: {
    escapeValue: false,
  },
})

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: Partial<RootState>
  store?: EnhancedStore
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
    store = configureStore({
      reducer: {
        theme: themeReducer,
        lang: langReducer,
        user: userReducer,
        toast: toastReducer,
        loading: loadingReducer,
      },
      preloadedState,
    } as any),
    ...renderOptions
  }: ExtendedRenderOptions = {},
) {
  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
      </Provider>
    )
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}

export * from '@testing-library/react'
export { renderWithProviders as render }

// Mock utilities
export const mockUser = {
  id: '1',
  username: 'testuser',
  email: 'test@example.com',
  name: 'Test User',
  role: 'user',
}

export const mockAuthState = {
  user: mockUser,
  isAuthenticated: true,
  isLoading: false,
  error: null,
}

export const createMockStore = (initialState: Partial<RootState> = {}) => {
  return configureStore({
    reducer: {
      theme: themeReducer,
      lang: langReducer,
      user: userReducer,
      toast: toastReducer,
      loading: loadingReducer,
    },
    preloadedState: initialState,
  } as any)
}

// Component test helpers
export const waitForLoadingToFinish = () => {
  return new Promise((resolve) => setTimeout(resolve, 0))
}

export const mockApiResponse = <T,>(data: T, delay: number = 100) => {
  return new Promise<T>((resolve) => {
    setTimeout(() => resolve(data), delay)
  })
}

export const mockApiError = (message: string, delay: number = 100) => {
  return new Promise((_, reject) => {
    setTimeout(() => reject(new Error(message)), delay)
  })
}
