'use client'

import React, { useEffect, useState, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react'

import { useAppSelector, useAppDispatch } from '@/store'
import { selectToasts, removeToast } from '@/store/slices/toastSlice'
import { cn } from '@/lib/utils'
import { Button } from '../Button/Button'

interface Toast {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title?: string
  message: string
  duration?: number
  persistent?: boolean
  action?: {
    label: string
    onClick: () => void
  }
}

interface ToastContainerProps {
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center'
  maxToasts?: number
  className?: string
}

/**
 * Toast Container Component
 * CSS animasyonları ile çalışan toast notification sistemi
 */
export function ToastContainer({ position = 'top-right', maxToasts = 5, className }: ToastContainerProps) {
  const [mounted, setMounted] = useState(false)
  const [removingToasts, setRemovingToasts] = useState<Set<string>>(new Set())
  const dispatch = useAppDispatch()
  const toasts = useAppSelector(selectToasts)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Position classes
  const positionClasses = {
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'top-center': 'top-4 left-1/2 transform -translate-x-1/2',
    'bottom-center': 'bottom-4 left-1/2 transform -translate-x-1/2',
  }

  // Toast icons
  const getToastIcon = (type: string) => {
    const iconClasses = 'h-5 w-5 flex-shrink-0'

    switch (type) {
      case 'success':
        return <CheckCircle className={cn(iconClasses, 'text-green-500')} />
      case 'error':
        return <AlertCircle className={cn(iconClasses, 'text-red-500')} />
      case 'warning':
        return <AlertTriangle className={cn(iconClasses, 'text-yellow-500')} />
      case 'info':
        return <Info className={cn(iconClasses, 'text-blue-500')} />
      default:
        return <Info className={cn(iconClasses, 'text-neutral-500')} />
    }
  }

  // Toast styles
  const getToastStyles = (type: string) => {
    const baseStyles = 'border-l-4'

    switch (type) {
      case 'success':
        return cn(baseStyles, 'border-l-green-500 bg-green-50 dark:bg-green-900/20')
      case 'error':
        return cn(baseStyles, 'border-l-red-500 bg-red-50 dark:bg-red-900/20')
      case 'warning':
        return cn(baseStyles, 'border-l-yellow-500 bg-yellow-50 dark:bg-yellow-900/20')
      case 'info':
        return cn(baseStyles, 'border-l-blue-500 bg-blue-50 dark:bg-blue-900/20')
      default:
        return cn(baseStyles, 'border-l-neutral-500 bg-neutral-50 dark:bg-neutral-800')
    }
  }

  // Handle toast removal with animation
  const handleRemoveToast = useCallback(
    (toastId: string) => {
      setRemovingToasts((prev) => new Set(prev).add(toastId))

      // Wait for animation to complete before removing from store
      setTimeout(() => {
        dispatch(removeToast(toastId))
        setRemovingToasts((prev) => {
          const next = new Set(prev)
          next.delete(toastId)
          return next
        })
      }, 300) // Animation duration
    },
    [dispatch],
  )

  // Auto-remove toasts
  useEffect(() => {
    const timers: NodeJS.Timeout[] = []

    toasts.forEach((toast: Toast) => {
      if (!toast.persistent && toast.duration) {
        const timer = setTimeout(() => {
          handleRemoveToast(toast.id)
        }, toast.duration)
        timers.push(timer)
      }
    })

    return () => {
      timers.forEach(clearTimeout)
    }
  }, [toasts, handleRemoveToast])

  if (!mounted) {
    return null
  }

  const visibleToasts = toasts.slice(0, maxToasts)

  const containerContent = (
    <div
      className={cn(
        'fixed z-50 flex flex-col space-y-2 pointer-events-none',
        positionClasses[position],
        'max-w-sm w-full',
        className,
      )}
      role='region'
      aria-label='Bildirimler'
      aria-live='polite'
    >
      {visibleToasts.map((toast: Toast) => {
        const isRemoving = removingToasts.has(toast.id)
        const animationDirection = position.includes('right')
          ? 'translate-x-full'
          : position.includes('left')
            ? '-translate-x-full'
            : 'translate-y-full'

        return (
          <div
            key={toast.id}
            className={cn(
              'pointer-events-auto relative w-full rounded-lg shadow-lg border border-neutral-200 dark:border-neutral-700 p-4',
              'transform transition-all duration-300 ease-in-out',
              getToastStyles(toast.type),
              isRemoving
                ? `opacity-0 scale-95 ${animationDirection}`
                : 'opacity-100 scale-100 translate-x-0 translate-y-0',
              // Enter animation
              'animate-slide-in',
            )}
            role='alert'
            aria-describedby={`toast-message-${toast.id}`}
            style={{
              animation: isRemoving ? undefined : 'slideIn 0.3s ease-out',
            }}
          >
            <div className='flex items-start space-x-3'>
              {/* Icon */}
              {getToastIcon(toast.type)}

              {/* Content */}
              <div className='flex-1 min-w-0'>
                {toast.title && (
                  <h4 className='text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-1'>{toast.title}</h4>
                )}
                <p id={`toast-message-${toast.id}`} className='text-sm text-neutral-700 dark:text-neutral-300'>
                  {toast.message}
                </p>

                {/* Action Button */}
                {toast.action && (
                  <Button
                    onClick={toast.action.onClick}
                    className='mt-2 text-xs font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 underline'
                  >
                    {toast.action.label}
                  </Button>
                )}
              </div>

              {/* Close Button */}
              <Button
                onClick={() => handleRemoveToast(toast.id)}
                className='flex-shrink-0 p-1 rounded-md text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 transition-colors'
                aria-label='Bildirimi kapat'
              >
                <X className='h-4 w-4' />
              </Button>
            </div>

            {/* Progress Bar for timed toasts */}
            {!toast.persistent && toast.duration && (
              <div className='absolute bottom-0 left-0 right-0 h-1 bg-neutral-200 dark:bg-neutral-700 rounded-b-lg overflow-hidden'>
                <div
                  className='h-full bg-current opacity-30 progress-bar'
                  style={{
                    animation: `shrink ${toast.duration}ms linear`,
                  }}
                />
              </div>
            )}
          </div>
        )
      })}

      {/* Toast limit indicator */}
      {toasts.length > maxToasts && (
        <div className='pointer-events-auto text-center py-2 px-4 bg-neutral-100 dark:bg-neutral-800 rounded-lg text-xs text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700 animate-fade-in'>
          +{toasts.length - maxToasts} daha fazla bildirim
        </div>
      )}

      {/* CSS Animations */}
      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: ${
              position.includes('right')
                ? 'translateX(100%)'
                : position.includes('left')
                  ? 'translateX(-100%)'
                  : 'translateY(-20px)'
            };
          }
          to {
            opacity: 1;
            transform: translate(0);
          }
        }

        @keyframes shrink {
          from {
            width: 100%;
          }
          to {
            width: 0%;
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  )

  return createPortal(containerContent, document.body)
}

/**
 * Toast Hook
 * Programmatic toast management
 */
export function useToast() {
  const dispatch = useAppDispatch()

  const showToast = useCallback(
    (toast: {
      type: 'success' | 'error' | 'warning' | 'info'
      title?: string
      message: string
      duration?: number
      persistent?: boolean
      action?: {
        label: string
        onClick: () => void
      }
    }) => {
      dispatch({
        type: 'toast/showToast',
        payload: {
          ...toast,
          duration: toast.duration ?? (toast.type === 'error' ? 7000 : 5000),
        },
      })
    },
    [dispatch],
  )

  const showSuccess = useCallback(
    (message: string, title?: string, options?: Partial<Parameters<typeof showToast>[0]>) => {
      showToast({
        type: 'success',
        ...(title !== undefined && { title }),
        message,
        ...options,
      })
    },
    [showToast],
  )

  const showError = useCallback(
    (message: string, title?: string, options?: Partial<Parameters<typeof showToast>[0]>) => {
      showToast({
        type: 'error',
        title: title || 'Hata',
        message,
        ...options,
      })
    },
    [showToast],
  )

  const showWarning = useCallback(
    (message: string, title?: string, options?: Partial<Parameters<typeof showToast>[0]>) => {
      showToast({
        type: 'warning',
        title: title || 'Uyarı',
        message,
        ...options,
      })
    },
    [showToast],
  )

  const showInfo = useCallback(
    (message: string, title?: string, options?: Partial<Parameters<typeof showToast>[0]>) => {
      showToast({
        type: 'info',
        title: title || 'Bilgi',
        message,
        ...options,
      })
    },
    [showToast],
  )

  const removeToast = useCallback(
    (id: string) => {
      dispatch({ type: 'toast/removeToast', payload: id })
    },
    [dispatch],
  )

  const clearAllToasts = useCallback(() => {
    dispatch({ type: 'toast/clearAllToasts' })
  }, [dispatch])

  return {
    showToast,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    removeToast,
    clearAllToasts,
  }
}

export default ToastContainer
