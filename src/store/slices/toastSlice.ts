import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../index'

interface Toast {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message: string
  duration?: number
  action?: {
    label: string
    onClick: () => void
  }
}

interface ToastState {
  toasts: Toast[]
}

const initialState: ToastState = {
  toasts: []
}

export const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    showToast: (state, action: PayloadAction<Omit<Toast, 'id'>>) => {
      const toast: Toast = {
        ...action.payload,
        id: `toast_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      }
      
      // Maksimum 5 toast göster
      if (state.toasts.length >= 5) {
        state.toasts.shift()
      }
      
      state.toasts.push(toast)
    },
    
    removeToast: (state, action: PayloadAction<string>) => {
      state.toasts = state.toasts.filter(toast => toast.id !== action.payload)
    },
    
    clearAllToasts: (state) => {
      state.toasts = []
    },
    
    updateToast: (state, action: PayloadAction<{ id: string; updates: Partial<Toast> }>) => {
      const { id, updates } = action.payload
      const toastIndex = state.toasts.findIndex(toast => toast.id === id)
      
      if (toastIndex !== -1) {
        state.toasts[toastIndex] = { ...state.toasts[toastIndex], ...updates }
      }
    }
  }
})

// Actions
export const { showToast, removeToast, clearAllToasts, updateToast } = toastSlice.actions

// Selectors
export const selectToasts = (state: RootState) => state.toast.toasts
export const selectToastById = (state: RootState, id: string) => 
  state.toast.toasts.find(toast => toast.id === id)
export const selectToastsByType = (state: RootState, type: Toast['type']) =>
  state.toast.toasts.filter(toast => toast.type === type)

// Async actions
export const showTemporaryToast = (toast: Omit<Toast, 'id'>) => (dispatch: any) => {
  const toastAction = showToast(toast)
  dispatch(toastAction)
  
  const duration = toast.duration || 5000
  
  setTimeout(() => {
    dispatch(removeToast(toastAction.payload.id))
  }, duration)
}

export default toastSlice.reducer
export type { Toast, ToastState }
