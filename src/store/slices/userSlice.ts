import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../index'

interface User {
  id: string
  username: string
  email: string
  avatar?: string
  role: string
}

interface UserState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

const initialState: UserState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload
      state.isAuthenticated = true
      state.error = null
    },
    logoutUser: (state) => {
      state.user = null
      state.isAuthenticated = false
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
  },
})

// Actions
export const { setUser, logoutUser, setLoading, setError } = userSlice.actions

// Selectors
export const selectUser = (state: RootState) => state.user.user
export const selectIsAuthenticated = (state: RootState) => state.user.isAuthenticated
export const selectIsLoading = (state: RootState) => state.user.isLoading
export const selectError = (state: RootState) => state.user.error

export default userSlice.reducer
