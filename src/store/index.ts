import storage from 'redux-persist/lib/storage'
import { createTransform } from 'redux-persist'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { configureStore, combineReducers, createListenerMiddleware, AnyAction } from '@reduxjs/toolkit'
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'

// Reducers
import langReducer from './slices/langSlice'
import userReducer from './slices/userSlice'
import themeReducer from './slices/themeSlice'
import toastReducer from './slices/toastSlice'
import { apiSlice } from '../services/api/apiSlice'

// Utils
import { isDevelopment } from '../utils/environment'

/**
 * User state için transform - hassas bilgileri persist etmeme
 */
const userTransform = createTransform(
  // Transform before persist
  (inboundState: any) => {
    // Sadece gerekli user bilgilerini persist et
    return {
      user: inboundState.user
        ? {
            id: inboundState.user.id,
            email: inboundState.user.email,
            name: inboundState.user.name,
            role: inboundState.user.role,
          }
        : null,
      isAuthenticated: inboundState.isAuthenticated,
      // isLoading ve error'ları persist etme
    }
  },
  // Transform after rehydrate
  (outboundState: any) => {
    return {
      ...outboundState,
      isLoading: false,
      error: null,
    }
  },
  { whitelist: ['user'] }, // Sadece user slice için
)

/**
 * Theme state için transform
 */
const themeTransform = createTransform(
  (inboundState: any) => inboundState,
  (outboundState: any) => {
    // Rehydrate sonrası sistem temasını kontrol et
    const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    return {
      ...outboundState,
      systemPreference,
    }
  },
  { whitelist: ['theme'] },
)

/**
 * Persist configuration
 */
const persistConfig = {
  key: 'sea-ui-kit',
  version: 1,
  storage,
  whitelist: ['theme', 'lang', 'user'], // Sadece bu slice'ları persist et
  blacklist: ['toast', 'api'], // Bu slice'ları persist etme
  transforms: [userTransform, themeTransform],
  migrate: (state: any) => {
    // Migration logic for version updates
    if (state && state._persist && state._persist.version < 1) {
      // Handle migration from older versions
      return Promise.resolve({
        ...state,
        _persist: { ...state._persist, version: 1 },
      })
    }
    return Promise.resolve(state)
  },
}

/**
 * Root reducer
 */
const rootReducer = combineReducers({
  theme: themeReducer,
  lang: langReducer,
  user: userReducer,
  toast: toastReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
})

/**
 * Persisted reducer
 */
const persistedReducer = persistReducer(persistConfig, rootReducer as any)

/**
 * Listener middleware for side effects
 */
const listenerMiddleware = createListenerMiddleware()

// Theme değişikliklerini dinle ve DOM'a uygula
listenerMiddleware.startListening({
  predicate: (action: AnyAction) => typeof action.type === 'string' && action.type.includes('theme/'),
  effect: (action, listenerApi) => {
    const state = listenerApi.getState() as RootState
    const effectiveTheme = state.theme.mode === 'system' ? state.theme.systemPreference : state.theme.mode

    // DOM'a tema uygula
    if (typeof document !== 'undefined') {
      const root = document.documentElement
      if (effectiveTheme === 'dark') {
        root.classList.add('dark')
      } else {
        root.classList.remove('dark')
      }
    }
  },
})

// Language değişikliklerini dinle
listenerMiddleware.startListening({
  predicate: (action: AnyAction) => typeof action.type === 'string' && action.type.includes('lang/'),
  effect: (action, listenerApi) => {
    const state = listenerApi.getState() as RootState

    // HTML lang attribute güncelle
    if (typeof document !== 'undefined') {
      document.documentElement.lang = state.lang.currentLanguage
    }
  },
})

/**
 * Store configuration
 */
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, 'toast/showToast'],
        ignoredPaths: ['toast.toasts', 'api'],
        ignoredActionsPaths: ['payload.action.onClick', 'meta.arg'],
      },
      immutableCheck: {
        ignoredPaths: ['api'],
      },
    })
      .concat(apiSlice.middleware as any)
      .prepend(listenerMiddleware.middleware),

  devTools: isDevelopment && {
    name: 'Sea UI Kit Store',
    trace: true,
    traceLimit: 25,
    actionSanitizer: (action: any) => {
      // Sensitive data'yı devtools'dan gizle
      if (action.type.includes('login') || action.type.includes('token')) {
        return {
          ...action,
          payload: action.payload ? '[HIDDEN]' : action.payload,
        }
      }
      return action
    },
  },
})

/**
 * Persistor for persistence
 */
export const persistor = persistStore(store)

/**
 * Type definitions
 */
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

/**
 * Typed hooks
 */
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

/**
 * Store utilities
 */
export const getStoreState = () => store.getState()
export const dispatch = store.dispatch

/**
 * Development utilities
 */
if (isDevelopment && typeof window !== 'undefined') {
  // Global store access for debugging - sadece development ortamında
  const devWindow = window as any

  // Store instance'a güvenli erişim
  Object.defineProperty(devWindow, '__STORE__', {
    value: store,
    writable: false,
    enumerable: false,
    configurable: true,
  })

  // Persistor instance'a güvenli erişim
  Object.defineProperty(devWindow, '__PERSISTOR__', {
    value: persistor,
    writable: false,
    enumerable: false,
    configurable: true,
  })

  // Store snapshot utility
  devWindow.__STORE_SNAPSHOT__ = () => {
    const state = store.getState()
    console.log('Store Snapshot:', JSON.stringify(state, null, 2))
    return state
  }

  // Store reset utility
  devWindow.__RESET_STORE__ = () => {
    persistor.purge()
    console.log('Store reset completed')
  }

  // Performance monitoring
  let actionCount = 0
  const originalDispatch = store.dispatch

  store.dispatch = ((...args: any[]) => {
    const start = performance.now()
    actionCount++

    const result = originalDispatch(args[0])
    const end = performance.now()
    const duration = end - start

    if (duration > 5) {
      console.warn(`[Redux Performance] Slow action detected: ${args[0]?.type} took ${duration.toFixed(2)}ms`)
    }

    // Her 100 action'da bir özet log
    if (actionCount % 100 === 0) {
      console.log(`[Redux Stats] ${actionCount} actions dispatched`)
    }

    return result
  }) as AppDispatch

  console.log('🔧 Development store utilities loaded')
}

export default store
