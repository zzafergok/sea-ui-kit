import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

// Reducers
import langReducer from './slices/langSlice'
import userReducer from './slices/userSlice'
import themeReducer from './slices/themeSlice'
import toastReducer from './slices/toastSlice'
import loadingReducer from './slices/loadingSlice'
import enhancedUserReducer from './slices/enhancedUserSlice'

import { apiSlice } from '../services/api/apiSlice'

const persistConfig = {
  key: 'sea-ui-kit',
  version: 1,
  storage,
  whitelist: ['theme', 'lang', 'user'],
  blacklist: ['toast', 'api', 'loading'],
}

const rootReducer = combineReducers({
  theme: themeReducer,
  lang: langReducer,
  user: userReducer,
  enhancedUser: enhancedUserReducer,
  toast: toastReducer,
  loading: loadingReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        ignoredPaths: ['api'],
      },
      immutableCheck: {
        ignoredPaths: ['api'],
      },
    }).concat(apiSlice.middleware),
  devTools: process.env.NODE_ENV === 'development',
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default store
