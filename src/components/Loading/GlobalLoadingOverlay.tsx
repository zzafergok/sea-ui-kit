'use client'

import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Loader2, Clock, AlertCircle } from 'lucide-react'
import { useAppSelector, useAppDispatch } from '@/store'
import {
  selectGlobalLoading,
  selectLoadingItems,
  startLoading,
  updateLoading,
  stopLoading,
} from '@/store/slices/loadingSlice'
import { cn } from '@/lib/utils'

interface LoadingItemData {
  type: 'global' | 'component' | 'page' | 'api'
  message?: string
  progress?: number
}

interface GlobalLoadingOverlayProps {
  className?: string
  showProgress?: boolean
  showMessage?: boolean
  showTimer?: boolean
  timeout?: number // milliseconds
  onTimeout?: () => void
}

/**
 * Global Loading Overlay Component
 * Uygulama genelinde loading durumlarını gösterir
 */
export function GlobalLoadingOverlay({
  className,
  showProgress = true,
  showMessage = true,
  showTimer = true,
  timeout = 30000, // 30 saniye
  onTimeout,
}: GlobalLoadingOverlayProps) {
  const [mounted, setMounted] = useState(false)
  const [elapsedTime, setElapsedTime] = useState(0)
  const [isTimeout, setIsTimeout] = useState(false)

  const isGlobalLoading = useAppSelector(selectGlobalLoading)
  const loadingItems = useAppSelector(selectLoadingItems)

  // Mount kontrolü
  useEffect(() => {
    setMounted(true)
  }, [])

  // Timer effect
  useEffect(() => {
    if (!isGlobalLoading) {
      setElapsedTime(0)
      setIsTimeout(false)
      return
    }

    const startTime = Date.now()
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime
      setElapsedTime(elapsed)

      if (elapsed >= timeout) {
        setIsTimeout(true)
        onTimeout?.()
        clearInterval(interval)
      }
    }, 100)

    return () => clearInterval(interval)
  }, [isGlobalLoading, timeout, onTimeout])

  // Global loading items
  const globalItems = Object.values(loadingItems).filter((item: unknown): item is LoadingItemData => {
    if (item && typeof item === 'object' && 'type' in item) {
      return (item as LoadingItemData).type === 'global'
    }
    return false
  })
  const currentItem = globalItems[0] // En son eklenen global loading item
  const hasProgress = currentItem?.progress !== undefined
  const progressValue = currentItem?.progress || 0

  // Format elapsed time
  const formatElapsedTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000)
    const minutes = Math.floor(seconds / 60)

    if (minutes > 0) {
      return `${minutes}:${(seconds % 60).toString().padStart(2, '0')}`
    }
    return `${seconds}s`
  }

  if (!mounted || !isGlobalLoading) {
    return null
  }

  const overlayContent = (
    <div
      className={cn(
        'fixed inset-0 z-50 flex items-center justify-center',
        'bg-black/50 backdrop-blur-sm',
        'transition-all duration-300',
        className,
      )}
      role='dialog'
      aria-modal='true'
      aria-labelledby='loading-title'
      aria-describedby='loading-description'
    >
      <div className='bg-white dark:bg-neutral-800 rounded-lg p-8 shadow-2xl border border-neutral-200 dark:border-neutral-700 min-w-[320px] max-w-md mx-4'>
        {/* Loading Icon */}
        <div className='flex flex-col items-center space-y-4'>
          <div className='relative'>
            {isTimeout ? (
              <AlertCircle className='h-12 w-12 text-red-500' />
            ) : (
              <Loader2 className='h-12 w-12 text-primary-500 animate-spin' />
            )}
          </div>

          {/* Title */}
          <h2 id='loading-title' className='text-lg font-semibold text-neutral-900 dark:text-neutral-100 text-center'>
            {isTimeout ? 'İşlem Zaman Aşımına Uğradı' : 'Yükleniyor...'}
          </h2>

          {/* Message */}
          {showMessage && (
            <p id='loading-description' className='text-sm text-neutral-600 dark:text-neutral-400 text-center'>
              {isTimeout
                ? 'İşlem beklenenden uzun sürdü. Lütfen sayfayı yenileyin veya daha sonra tekrar deneyin.'
                : currentItem?.message || 'Lütfen bekleyin...'}
            </p>
          )}

          {/* Progress Bar */}
          {showProgress && hasProgress && !isTimeout && (
            <div className='w-full space-y-2'>
              <div className='flex justify-between text-xs text-neutral-500'>
                <span>İlerleme</span>
                <span>{Math.round(progressValue)}%</span>
              </div>
              <div className='w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2'>
                <div
                  className='bg-primary-500 h-2 rounded-full transition-all duration-300 ease-out'
                  style={{ width: `${progressValue}%` }}
                />
              </div>
            </div>
          )}

          {/* Indeterminate Progress */}
          {showProgress && !hasProgress && !isTimeout && (
            <div className='w-full'>
              <div className='w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2 overflow-hidden'>
                <div className='h-full bg-primary-500 rounded-full animate-pulse-width' />
              </div>
            </div>
          )}

          {/* Timer */}
          {showTimer && !isTimeout && (
            <div className='flex items-center space-x-2 text-xs text-neutral-500'>
              <Clock className='h-4 w-4' />
              <span>{formatElapsedTime(elapsedTime)}</span>
            </div>
          )}

          {/* Timeout Actions */}
          {isTimeout && (
            <div className='flex space-x-2 mt-4'>
              <button
                onClick={() => window.location.reload()}
                className='px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors text-sm font-medium'
              >
                Sayfayı Yenile
              </button>
              <button
                onClick={() => setIsTimeout(false)}
                className='px-4 py-2 bg-neutral-200 text-neutral-700 dark:bg-neutral-700 dark:text-neutral-300 rounded-md hover:bg-neutral-300 dark:hover:bg-neutral-600 transition-colors text-sm font-medium'
              >
                Bekle
              </button>
            </div>
          )}

          {/* Multiple Loading Items Info */}
          {globalItems.length > 1 && !isTimeout && (
            <div className='text-xs text-neutral-500 text-center'>{globalItems.length} işlem devam ediyor</div>
          )}
        </div>
      </div>
    </div>
  )

  // Portal ile body'ye render et
  return createPortal(overlayContent, document.body)
}

/**
 * Page Loading Overlay
 * Sayfa geçişleri için daha hafif loading overlay
 */
interface PageLoadingOverlayProps {
  className?: string
  message?: string
}

export function PageLoadingOverlay({ className, message = 'Sayfa yükleniyor...' }: PageLoadingOverlayProps) {
  const [mounted, setMounted] = useState(false)
  const isPageLoading = useAppSelector((state) => state.loading.pageLoading)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted || !isPageLoading) {
    return null
  }

  const overlayContent = (
    <div
      className={cn(
        'fixed inset-0 z-40 flex items-center justify-center',
        'bg-white/80 dark:bg-neutral-900/80 backdrop-blur-sm',
        'transition-all duration-200',
        className,
      )}
    >
      <div className='flex flex-col items-center space-y-3'>
        <Loader2 className='h-8 w-8 text-primary-500 animate-spin' />
        <p className='text-sm font-medium text-neutral-600 dark:text-neutral-400'>{message}</p>
      </div>
    </div>
  )

  return createPortal(overlayContent, document.body)
}

/**
 * Loading Progress Bar
 * Sayfa üstünde ince progress bar
 */
interface LoadingProgressBarProps {
  className?: string
  height?: number
}

export function LoadingProgressBar({ className, height = 3 }: LoadingProgressBarProps) {
  const [mounted, setMounted] = useState(false)
  const [progress, setProgress] = useState(0)
  const isGlobalLoading = useAppSelector(selectGlobalLoading)
  const loadingItems = useAppSelector(selectLoadingItems)

  useEffect(() => {
    setMounted(true)

    let progressInterval: NodeJS.Timeout | undefined

    if (isGlobalLoading) {
      // When loading starts, if progress was 100 (from a previous completion), reset it.
      // This allows the bar to animate again if loading restarts.
      if (progress === 100) {
        setProgress(0)
      }

      // Filter for global items that have a defined progress property.
      const globalItemsWithProgress = Object.values(loadingItems).filter(
        (item: any): item is LoadingItemData & { type: 'global'; progress: number } =>
          item &&
          typeof item === 'object' &&
          item.type === 'global' &&
          typeof item.progress === 'number' &&
          item.progress >= 0 &&
          item.progress <= 100,
      )

      if (globalItemsWithProgress.length > 0) {
        // Calculate average progress from items that have it.
        const totalProgress = globalItemsWithProgress.reduce((sum, item) => sum + item.progress, 0)
        const avgProgress = totalProgress / globalItemsWithProgress.length
        setProgress(Math.max(0, Math.min(100, avgProgress))) // Clamp progress between 0 and 100.
      } else {
        // No items with real progress, or no global items; simulate progress.
        // Start simulation only if progress is at 0 or already at the simulation cap,
        // to avoid restarting an ongoing simulation unnecessarily on re-renders.
        if (progress === 0 || progress >= 90) {
          setProgress(20) // Initial simulated progress.
        }
        progressInterval = setInterval(() => {
          setProgress((prev) => {
            if (prev >= 90) {
              return 90 // Cap simulated progress.
            }
            // Simulate a small, somewhat random increment.
            return Math.min(90, prev + Math.floor(Math.random() * 8) + 2) // e.g., adds 2 to 9.
          })
        }, 600) // Interval for simulation updates.
      }
    } else {
      // Not global loading: handle progress bar completion or reset.
      if (progress > 0 && progress < 100) {
        // If loading finished and progress was shown (not 0 or 100), complete it to 100%.
        // The bar will then fade out due to opacity change based on isGlobalLoading in CSS.
        setProgress(100)
      } else if (progress !== 0 && progress !== 100) {
        // If progress was stuck (e.g., at 90 from simulation) or in an unexpected state, reset to 0.
        // This handles cases where loading stops abruptly before completion or simulation cap.
        setProgress(0)
      }
      // If progress is already 0 or 100, no state change is needed here;
      // opacity CSS will handle visibility correctly.
    }

    // Cleanup function: clear interval if it was set.
    return () => {
      if (progressInterval) {
        clearInterval(progressInterval)
      }
    }
  }, [isGlobalLoading, loadingItems, progress]) // `progress` is included as its value affects the logic for starting/stopping simulation and completing/resetting.

  if (!mounted) {
    return null
  }

  return (
    <div
      className={cn(
        'fixed top-0 left-0 right-0 z-50 overflow-hidden',
        'transition-opacity duration-300',
        isGlobalLoading ? 'opacity-100' : 'opacity-0',
        className,
      )}
      style={{ height: `${height}px` }}
    >
      <div
        className='h-full bg-primary-500 transition-all duration-300 ease-out'
        style={{
          width: `${progress}%`,
          transform: isGlobalLoading ? 'translateX(0)' : 'translateX(-100%)',
        }}
      />
    </div>
  )
}

/**
 * useLoading Hook eksik import sorunu giderme
 */
import { useCallback } from 'react'
export function useLoading(id: string) {
  const dispatch = useAppDispatch()
  const isLoading = useAppSelector((state) => (state.loading?.items?.[id] ? true : false))
  const progress = useAppSelector((state) => state.loading?.items?.[id]?.progress)
  const message = useAppSelector((state) => state.loading?.items?.[id]?.message)

  const startLoadingAction = useCallback(
    (
      options: {
        type?: 'global' | 'component' | 'page' | 'api'
        message?: string
        progress?: number
      } = {},
    ) => {
      dispatch(
        startLoading({
          id,
          type: options.type || 'component',
          message: options.message || '',
          progress: options.progress ?? 0, // Provide a default value for progress
        }),
      )
    },
    [dispatch, id],
  )

  const updateLoadingAction = useCallback(
    (updates: { progress?: number; message?: string }) => {
      dispatch(updateLoading({ id, ...updates }))
    },
    [dispatch, id],
  )

  const stopLoadingAction = useCallback(() => {
    dispatch(stopLoading(id))
  }, [dispatch, id])

  return {
    isLoading,
    progress,
    message,
    startLoading: startLoadingAction,
    updateLoading: updateLoadingAction,
    stopLoading: stopLoadingAction,
  }
}
