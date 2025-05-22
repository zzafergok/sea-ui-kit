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
import loadingReducer from './slices/loadingSlice' // Yeni eklenen
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
    if (typeof window !== 'undefined') {
      const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      return {
        ...outboundState,
        systemPreference,
      }
    }
    return outboundState
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
  whitelist: ['theme', 'lang', 'user'], // Loading ve toast'ları persist etme
  blacklist: ['toast', 'api', 'loading'], // Bu slice'ları persist etme
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
  loading: loadingReducer, // Yeni eklenen
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

// Loading state değişikliklerini dinle
listenerMiddleware.startListening({
  predicate: (action: AnyAction) => typeof action.type === 'string' && action.type.includes('loading/'),
  effect: (action, listenerApi) => {
    const state = listenerApi.getState() as RootState

    // Global loading durumunda body scroll'u kontrol et
    if (typeof document !== 'undefined') {
      if (state.loading.globalLoading) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = ''
      }
    }

    // Performance monitoring
    if (isDevelopment) {
      const loadingItems = Object.values(state.loading.items)
      const longRunningItems = loadingItems.filter(
        (item: unknown) => Date.now() - (item as { startTime: number }).startTime > 5000, // 5 saniyeden uzun
      )

      if (longRunningItems.length > 0) {
        console.warn('Long running loading items:', longRunningItems)
      }
    }
  },
})

// Toast otomatik temizleme

// Define a more specific type for the toast payload
interface ToastPayload {
  id: string
  persistent?: boolean
  duration?: number
  // Add other properties if they exist, e.g., type, title, message
}

listenerMiddleware.startListening({
  predicate: (action: AnyAction): action is AnyAction & { payload: ToastPayload } => action.type === 'toast/showToast',
  effect: async (action, listenerApi) => {
    const toast = action.payload as ToastPayload

    // Eğer toast persistent değilse, duration sonrası otomatik kaldır
    if (!toast.persistent && toast.duration) {
      await listenerApi.delay(toast.duration)
      listenerApi.dispatch({ type: 'toast/removeToast', payload: toast.id })
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
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, 'toast/showToast', 'loading/startLoading'],
        ignoredPaths: ['toast.toasts', 'api', 'loading.items', 'loading.items.*.startTime'],
        ignoredActionsPaths: ['payload.action.onClick', 'meta.arg', 'payload.startTime'],
      },
      immutableCheck: {
        ignoredPaths: ['api', 'loading.items'],
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
    stateSanitizer: (state: any) => {
      // Loading items'da çok veri varsa kısalt
      if (state.loading?.items && Object.keys(state.loading.items).length > 10) {
        return {
          ...state,
          loading: {
            ...state.loading,
            items: `[${Object.keys(state.loading.items).length} items]`,
          },
        }
      }
      return state
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
 * Performance monitoring for store
 */
if (isDevelopment && typeof window !== 'undefined') {
  let actionCount = 0
  const slowActions: string[] = []

  const originalDispatch = store.dispatch

  store.dispatch = ((...args: any[]) => {
    const start = performance.now()
    actionCount++

    const result = originalDispatch(args[0])
    const end = performance.now()
    const duration = end - start

    // Slow action detection
    if (duration > 10) {
      const actionType = args[0]?.type || 'unknown'
      slowActions.push(`${actionType}: ${duration.toFixed(2)}ms`)
      console.warn(`[Redux Performance] Slow action detected: ${actionType} took ${duration.toFixed(2)}ms`)
    }

    // Periodic stats
    if (actionCount % 50 === 0) {
      console.log(`[Redux Stats] ${actionCount} actions dispatched`)
      if (slowActions.length > 0) {
        console.warn(`[Redux Performance] Slow actions summary:`, slowActions.slice(-10))
      }
    }

    return result
  }) as AppDispatch

  // Global store access for debugging
  const devWindow = window as any

  Object.defineProperty(devWindow, '__STORE__', {
    value: store,
    writable: false,
    enumerable: false,
    configurable: true,
  })

  Object.defineProperty(devWindow, '__PERSISTOR__', {
    value: persistor,
    writable: false,
    enumerable: false,
    configurable: true,
  })

  // Development utilities
  devWindow.__STORE_UTILS__ = {
    // Store snapshot
    snapshot: () => {
      const state = store.getState()
      console.log('Store Snapshot:', JSON.stringify(state, null, 2))
      return state
    },

    // Reset store
    reset: () => {
      persistor.purge()
      console.log('Store reset completed')
    },

    // Performance stats
    getPerformanceStats: () => ({
      totalActions: actionCount,
      slowActions: slowActions.slice(-20),
      averageActionTime:
        slowActions.length > 0
          ? slowActions.reduce((sum, action) => {
              const timeString = action.split(': ')[1]
              const time = parseFloat(timeString || '0')
              return sum + time
            }, 0) / slowActions.length
          : 0,
    }),

    // Loading state helpers
    loading: {
      getAll: () => store.getState().loading,
      clear: () => store.dispatch({ type: 'loading/clearAllLoading' }),
      simulate: (id: string, duration = 3000) => {
        store.dispatch({
          type: 'loading/startLoading',
          payload: { id, type: 'global', message: 'Test loading...' },
        })
        setTimeout(() => {
          store.dispatch({ type: 'loading/stopLoading', payload: id })
        }, duration)
      },
    },

    // Toast helpers
    toast: {
      getAll: () => store.getState().toast,
      clear: () => store.dispatch({ type: 'toast/clearAllToasts' }),
      test: (type = 'info') => {
        store.dispatch({
          type: 'toast/showToast',
          payload: {
            type,
            title: `Test ${type} toast`,
            message: 'Bu bir test bildirimidir.',
            duration: 5000,
          },
        })
      },
    },

    // Theme helpers
    theme: {
      toggle: () => {
        const currentTheme = store.getState().theme.mode
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark'
        store.dispatch({ type: 'theme/setTheme', payload: newTheme })
      },
      set: (theme: 'light' | 'dark' | 'system') => {
        store.dispatch({ type: 'theme/setTheme', payload: theme })
      },
    },
  }

  console.log('🔧 Development store utilities loaded')
  console.log('📊 Available utilities:', Object.keys(devWindow.__STORE_UTILS__))
}

export default store
