import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../index'
import { apiService } from '@/services/api/apiService'

interface UserPreferences {
  theme: 'light' | 'dark' | 'system'
  language: 'en' | 'tr'
  notifications: {
    email: boolean
    push: boolean
    desktop: boolean
  }
  privacy: {
    profileVisible: boolean
    activityTracking: boolean
  }
}

interface EnhancedUser {
  id: string
  username: string
  email: string
  name: string
  avatar?: string
  role: string
  permissions: string[]
  preferences: UserPreferences
  lastLoginAt: string
  createdAt: string
  isEmailVerified: boolean
  isTwoFactorEnabled: boolean
}

interface EnhancedUserState {
  user: EnhancedUser | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  sessionTimeout: number
  lastActivity: number
}

const initialState: EnhancedUserState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  sessionTimeout: 30 * 60 * 1000, // 30 dakika
  lastActivity: Date.now(),
}

export const fetchUserProfile = createAsyncThunk('enhancedUser/fetchProfile', async (_, { rejectWithValue }) => {
  try {
    const response = await apiService.get<EnhancedUser>('/user/profile')
    return response.data
  } catch (error: any) {
    return rejectWithValue(error.message || 'Profil yüklenemedi')
  }
})

export const updateUserPreferences = createAsyncThunk(
  'enhancedUser/updatePreferences',
  async (preferences: Partial<UserPreferences>, { rejectWithValue }) => {
    try {
      const response = await apiService.put<EnhancedUser>('/user/preferences', preferences)
      return response.data
    } catch (error: any) {
      return rejectWithValue(error.message || 'Tercihler güncellenemedi')
    }
  },
)

export const enhancedUserSlice = createSlice({
  name: 'enhancedUser',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<EnhancedUser>) => {
      state.user = action.payload
      state.isAuthenticated = true
      state.error = null
    },
    logoutUser: (state) => {
      state.user = null
      state.isAuthenticated = false
      state.error = null
    },
    updateLastActivity: (state) => {
      state.lastActivity = Date.now()
    },
    setSessionTimeout: (state, action: PayloadAction<number>) => {
      state.sessionTimeout = action.payload
    },
    updateUserField: (state, action: PayloadAction<Partial<EnhancedUser>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload
        state.isAuthenticated = true
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
      .addCase(updateUserPreferences.fulfilled, (state, action) => {
        if (state.user) {
          state.user = action.payload
        }
      })
  },
})

export const { setUser, logoutUser, updateLastActivity, setSessionTimeout, updateUserField } = enhancedUserSlice.actions

// Enhanced Selectors
export const selectEnhancedUser = (state: RootState) => state.enhancedUser.user
export const selectIsAuthenticated = (state: RootState) => state.enhancedUser.isAuthenticated
export const selectUserPermissions = (state: RootState) => state.enhancedUser.user?.permissions || []
export const selectUserPreferences = (state: RootState) => state.enhancedUser.user?.preferences
export const selectIsSessionActive = (state: RootState) => {
  const { lastActivity, sessionTimeout } = state.enhancedUser
  return Date.now() - lastActivity < sessionTimeout
}

export const selectHasPermission = (permission: string) => (state: RootState) => {
  const permissions = selectUserPermissions(state)
  return permissions.includes(permission) || permissions.includes('admin')
}

export default enhancedUserSlice.reducer
