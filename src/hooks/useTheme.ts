import { useEffect } from 'react'

import { useAppDispatch, useAppSelector } from '@/store'
import { setTheme, selectEffectiveTheme, updateSystemPreference } from '@/store/slices/themeSlice'

/**
 * Hook for managing theme state and system preferences
 */
export function useTheme() {
  const dispatch = useAppDispatch()
  const effectiveTheme = useAppSelector(selectEffectiveTheme)

  // Effect to watch for system preference changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Get stored theme from localStorage or use system default
      const storedTheme = localStorage.getItem('theme') || 'system'
      dispatch(setTheme(storedTheme as 'light' | 'dark' | 'system'))

      // Set up listener for system preference changes
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

      // Initialize system preference
      dispatch(updateSystemPreference(mediaQuery.matches ? 'dark' : 'light'))

      // Update when system preference changes
      const handleChange = (e: MediaQueryListEvent) => {
        dispatch(updateSystemPreference(e.matches ? 'dark' : 'light'))
      }

      mediaQuery.addEventListener('change', handleChange)

      return () => {
        mediaQuery.removeEventListener('change', handleChange)
      }
    }
  }, [dispatch])

  // Effect to apply theme to document
  useEffect(() => {
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      const root = document.documentElement

      if (effectiveTheme === 'dark') {
        root.classList.add('dark')
      } else {
        root.classList.remove('dark')
      }
    }
  }, [effectiveTheme])

  return {
    theme: effectiveTheme,
    setTheme: (theme: 'light' | 'dark' | 'system') => dispatch(setTheme(theme)),
  }
}
