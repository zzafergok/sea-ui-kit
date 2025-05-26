'use client'

import React, { useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { X, CheckCircle, AlertCircle, AlertTriangle, Info, ExternalLink } from 'lucide-react'

import { useAppSelector, useAppDispatch } from '@/store'
import { selectToasts, removeToast, cleanupExpiredHashes, showToast } from '@/store/slices/toastSlice'
import { Button } from '@/components/Button/Button'
import { cn } from '@/lib/utils'

export interface ToastContainerProps {
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center'
  className?: string
  maxToasts?: number
}

const positionClasses = {
  'top-right': 'top-4 right-4',
  'top-left': 'top-4 left-4',
  'bottom-right': 'bottom-4 right-4',
  'bottom-left': 'bottom-4 left-4',
  'top-center': 'top-4 left-1/2 transform -translate-x-1/2',
  'bottom-center': 'bottom-4 left-1/2 transform -translate-x-1/2',
}

const toastIcons = {
  success: CheckCircle,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
}

const toastStyles = {
  success: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-800 dark:text-green-200',
  error: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200',
  warning:
    'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800 text-yellow-800 dark:text-yellow-200',
  info: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200',
}

const iconStyles = {
  success: 'text-green-500 dark:text-green-400',
  error: 'text-red-500 dark:text-red-400',
  warning: 'text-yellow-500 dark:text-yellow-400',
  info: 'text-blue-500 dark:text-blue-400',
}

export function ToastContainer({ position = 'top-right', className, maxToasts = 5 }: ToastContainerProps) {
  const dispatch = useAppDispatch()
  const toasts = useAppSelector(selectToasts)
  const [mounted, setMounted] = React.useState(false)

  // Client-side rendering için mount kontrolü
  useEffect(() => {
    setMounted(true)
  }, [])

  // Cleanup expired hashes periodically
  useEffect(() => {
    const cleanup = setInterval(() => {
      dispatch(cleanupExpiredHashes())
    }, 30000) // Her 30 saniyede bir temizle

    return () => clearInterval(cleanup)
  }, [dispatch])

  const handleRemoveToast = useCallback(
    (id: string) => {
      dispatch(removeToast(id))
    },
    [dispatch],
  )

  // Auto-remove toasts with duration
  useEffect(() => {
    const timers: Record<string, NodeJS.Timeout> = {}

    toasts.forEach((toast) => {
      if (toast.duration && toast.duration > 0 && !toast.persistent && !timers[toast.id]) {
        timers[toast.id] = setTimeout(() => {
          handleRemoveToast(toast.id)
        }, toast.duration)
      }
    })

    return () => {
      Object.values(timers).forEach(clearTimeout)
    }
  }, [toasts, handleRemoveToast])

  // Limit number of toasts
  const displayedToasts = toasts.slice(-maxToasts)

  const getAnimationVariants = (position: string) => {
    const isRight = position.includes('right')
    const isLeft = position.includes('left')
    const isTop = position.includes('top')

    return {
      initial: {
        opacity: 0,
        scale: 0.8,
        x: isRight ? 100 : isLeft ? -100 : 0,
        y: isTop ? -20 : 20,
      },
      animate: {
        opacity: 1,
        scale: 1,
        x: 0,
        y: 0,
      },
      exit: {
        opacity: 0,
        scale: 0.8,
        x: isRight ? 100 : isLeft ? -100 : 0,
        transition: {
          duration: 0.2,
        },
      },
    }
  }

  if (!mounted || typeof window === 'undefined') {
    return null
  }

  if (displayedToasts.length === 0) {
    return null
  }

  const variants = getAnimationVariants(position)

  return createPortal(
    <div
      className={cn('fixed z-toast pointer-events-none', positionClasses[position], className)}
      style={{ zIndex: 9999 }}
    >
      <AnimatePresence mode='popLayout'>
        {displayedToasts.map((toast) => {
          const Icon = toastIcons[toast.type]

          return (
            <motion.div
              key={toast.id}
              layout
              variants={variants}
              initial='initial'
              animate='animate'
              exit='exit'
              transition={{
                type: 'spring',
                stiffness: 500,
                damping: 30,
                mass: 1,
              }}
              className={cn(
                'mb-3 pointer-events-auto w-full max-w-sm',
                'transform-gpu', // GPU acceleration için
              )}
            >
              <div
                className={cn(
                  'relative rounded-lg border p-4 shadow-lg backdrop-blur-sm',
                  'transition-all duration-200 hover:shadow-xl',
                  toastStyles[toast.type],
                )}
              >
                {/* Progress bar */}
                {toast.duration && toast.duration > 0 && !toast.persistent && (
                  <div
                    className='absolute bottom-0 left-0 h-1 bg-current opacity-30 rounded-b-lg'
                    style={{
                      animation: `toast-progress-shrink ${toast.duration}ms linear`,
                    }}
                  />
                )}

                <div className='flex items-start space-x-3'>
                  {/* Icon */}
                  <div className='flex-shrink-0'>
                    <Icon className={cn('h-5 w-5', iconStyles[toast.type])} />
                  </div>

                  {/* Content */}
                  <div className='flex-1 min-w-0'>
                    {toast.title && <h4 className='text-sm font-semibold mb-1 text-current'>{toast.title}</h4>}

                    <p className='text-sm text-current opacity-90'>{toast.message}</p>

                    {/* Action button */}
                    {toast.action && (
                      <div className='mt-3 flex'>
                        <Button
                          variant='ghost'
                          size='sm'
                          onClick={toast.action.onClick}
                          className='text-current hover:bg-current hover:bg-opacity-10 p-2 h-auto'
                        >
                          <ExternalLink className='h-3 w-3 mr-1' />
                          {toast.action.label}
                        </Button>
                      </div>
                    )}
                  </div>

                  {/* Close button */}
                  {toast.dismissible !== false && (
                    <div className='flex-shrink-0'>
                      <Button
                        variant='ghost'
                        size='sm'
                        onClick={() => handleRemoveToast(toast.id)}
                        className='text-current hover:bg-current hover:bg-opacity-10 p-1 h-auto opacity-70 hover:opacity-100'
                        aria-label='Close notification'
                      >
                        <X className='h-4 w-4' />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>,
    document.body,
  )
}

// Toast progress animation CSS (globals.css'te zaten tanımlı)
const _toastProgressCSS = `
@keyframes toast-progress-shrink {
  from { width: 100%; }
  to { width: 0%; }
}
`

// Programmatic toast functions
export const toast = {
  success: (message: string, options?: Partial<any>) => {
    return { type: 'success' as const, message, ...options }
  },

  error: (message: string, options?: Partial<any>) => {
    return { type: 'error' as const, message, ...options }
  },

  warning: (message: string, options?: Partial<any>) => {
    return { type: 'warning' as const, message, ...options }
  },

  info: (message: string, options?: Partial<any>) => {
    return { type: 'info' as const, message, ...options }
  },
}

// Hook for easy toast usage
export function useToast() {
  const dispatch = useAppDispatch()

  const addToast = useCallback(
    (toast: any) => {
      dispatch(showToast(toast))
    },
    [dispatch],
  )

  return {
    toast: addToast,
    success: (message: string, options?: any) => addToast(toast.success(message, options)),
    error: (message: string, options?: any) => addToast(toast.error(message, options)),
    warning: (message: string, options?: any) => addToast(toast.warning(message, options)),
    info: (message: string, options?: any) => addToast(toast.info(message, options)),
  }
}
