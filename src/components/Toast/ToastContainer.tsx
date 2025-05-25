'use client'

import React, { useEffect, useState, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { X, CheckCircle, AlertCircle, AlertTriangle, Info, Zap } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

import { useAppSelector, useAppDispatch } from '@/store'
import { selectToasts, removeToast, cleanupExpiredHashes } from '@/store/slices/toastSlice'
import { cn } from '@/lib/utils'
import { Button } from '../Button/Button'

interface Toast {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title?: string
  message: string
  duration?: number
  persistent?: boolean
  dismissible?: boolean
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center'
  action?: {
    label: string
    onClick: () => void
  }
  metadata?: {
    source?: string
    timestamp: number
    hash: string
  }
}

interface ToastContainerProps {
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center'
  maxToasts?: number
  className?: string
}

export function ToastContainer({ position = 'top-right', maxToasts = 5, className }: ToastContainerProps) {
  const [mounted, setMounted] = useState(false)
  const [actionCallbacks] = useState(new Map<string, () => void>()) // Action callback'lerini store dışında tutuyoruz
  const dispatch = useAppDispatch()
  const toasts = useAppSelector(selectToasts)

  useEffect(() => {
    setMounted(true)

    // Hash temizleme interval'i
    const cleanupInterval = setInterval(() => {
      dispatch(cleanupExpiredHashes())
    }, 10000)

    return () => {
      clearInterval(cleanupInterval)
      actionCallbacks.clear()
    }
  }, [dispatch, actionCallbacks])

  // Position classes
  const positionClasses = {
    'top-right': 'top-6 right-6',
    'top-left': 'top-6 left-6',
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6',
    'top-center': 'top-6 left-1/2 -translate-x-1/2',
    'bottom-center': 'bottom-6 left-1/2 -translate-x-1/2',
  }

  // Toast icons with improved styling
  const getToastIcon = (type: string) => {
    const iconClasses = 'h-5 w-5 flex-shrink-0'

    switch (type) {
      case 'success':
        return <CheckCircle className={cn(iconClasses, 'text-emerald-500')} />
      case 'error':
        return <AlertCircle className={cn(iconClasses, 'text-red-500')} />
      case 'warning':
        return <AlertTriangle className={cn(iconClasses, 'text-amber-500')} />
      case 'info':
        return <Info className={cn(iconClasses, 'text-blue-500')} />
      default:
        return <Info className={cn(iconClasses, 'text-neutral-500')} />
    }
  }

  // Modern toast styling
  const getToastStyles = (type: string) => {
    const baseStyles = 'border border-opacity-20 backdrop-blur-md shadow-lg'

    switch (type) {
      case 'success':
        return cn(
          baseStyles,
          'bg-gradient-to-r from-emerald-50 to-green-50 border-emerald-200',
          'dark:from-emerald-950/50 dark:to-green-950/50 dark:border-emerald-800/50',
        )
      case 'error':
        return cn(
          baseStyles,
          'bg-gradient-to-r from-red-50 to-rose-50 border-red-200',
          'dark:from-red-950/50 dark:to-rose-950/50 dark:border-red-800/50',
        )
      case 'warning':
        return cn(
          baseStyles,
          'bg-gradient-to-r from-amber-50 to-yellow-50 border-amber-200',
          'dark:from-amber-950/50 dark:to-yellow-950/50 dark:border-amber-800/50',
        )
      case 'info':
        return cn(
          baseStyles,
          'bg-gradient-to-r from-blue-50 to-sky-50 border-blue-200',
          'dark:from-blue-950/50 dark:to-sky-950/50 dark:border-blue-800/50',
        )
      default:
        return cn(
          baseStyles,
          'bg-gradient-to-r from-neutral-50 to-gray-50 border-neutral-200',
          'dark:from-neutral-900/50 dark:to-gray-900/50 dark:border-neutral-700/50',
        )
    }
  }

  // Handle toast removal
  const handleRemoveToast = useCallback(
    (toastId: string) => {
      actionCallbacks.delete(toastId)
      dispatch(removeToast(toastId))
    },
    [dispatch, actionCallbacks],
  )

  // Action callback'ini handle etme
  const handleActionClick = useCallback(
    (toastId: string) => {
      const callback = actionCallbacks.get(toastId)
      if (callback) {
        callback()
        handleRemoveToast(toastId)
      }
    },
    [actionCallbacks, handleRemoveToast],
  )

  // Action callback'lerini kaydet
  useEffect(() => {
    toasts.forEach((toast) => {
      if (toast.action?.onClick && !actionCallbacks.has(toast.id)) {
        actionCallbacks.set(toast.id, toast.action.onClick)
      }
    })
  }, [toasts, actionCallbacks])

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
        'fixed z-[100] flex flex-col space-y-3 pointer-events-none',
        positionClasses[position],
        'max-w-sm w-full',
        className,
      )}
      role='region'
      aria-label='Bildirimler'
      aria-live='polite'
    >
      <AnimatePresence mode='popLayout'>
        {visibleToasts.map((toast: Toast) => (
          <motion.div
            key={toast.id}
            layout
            initial={{
              opacity: 0,
              scale: 0.8,
              x: position.includes('right') ? 100 : position.includes('left') ? -100 : 0,
              y: position.includes('top') ? -50 : position.includes('bottom') ? 50 : 0,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              x: 0,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.8,
              x: position.includes('right') ? 100 : position.includes('left') ? -100 : 0,
              transition: { duration: 0.2 },
            }}
            transition={{
              type: 'spring',
              stiffness: 500,
              damping: 30,
              mass: 0.8,
            }}
            className={cn(
              'pointer-events-auto relative w-full rounded-xl p-4',
              'transform transition-all duration-300 ease-out',
              getToastStyles(toast.type),
              'hover:shadow-xl hover:scale-[1.02]',
              'group cursor-default',
            )}
            role='alert'
            aria-describedby={`toast-message-${toast.id}`}
          >
            {/* Progress bar */}
            {!toast.persistent && toast.duration && (
              <motion.div
                initial={{ width: '100%' }}
                animate={{ width: '0%' }}
                transition={{ duration: toast.duration / 1000, ease: 'linear' }}
                className='absolute top-0 left-0 h-1 bg-current opacity-20 rounded-t-xl'
              />
            )}

            <div className='flex items-start space-x-3'>
              {/* Enhanced Icon with animation */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.1, type: 'spring', stiffness: 500, damping: 15 }}
                className='mt-0.5'
              >
                {toast.type === 'success' && (
                  <div className='relative'>
                    {getToastIcon(toast.type)}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ delay: 0.2, duration: 0.6 }}
                      className='absolute inset-0 bg-emerald-200 rounded-full opacity-20'
                    />
                  </div>
                )}
                {toast.type === 'error' && (
                  <motion.div
                    animate={{
                      x: [0, -2, 2, -2, 2, 0],
                    }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    {getToastIcon(toast.type)}
                  </motion.div>
                )}
                {(toast.type === 'warning' || toast.type === 'info') && getToastIcon(toast.type)}
              </motion.div>

              {/* Content */}
              <div className='flex-1 min-w-0'>
                {toast.title && (
                  <motion.h4
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className='text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-1 leading-tight'
                  >
                    {toast.title}
                  </motion.h4>
                )}
                <motion.p
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 }}
                  id={`toast-message-${toast.id}`}
                  className='text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed'
                >
                  {toast.message}
                </motion.p>

                {/* Action Button */}
                {toast.action && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Button
                      onClick={() => handleActionClick(toast.id)}
                      variant='ghost'
                      size='sm'
                      className='mt-2 h-7 px-2 text-xs font-medium hover:bg-white/20 dark:hover:bg-black/20'
                    >
                      {toast.action.label}
                    </Button>
                  </motion.div>
                )}
              </div>

              {/* Close Button */}
              {toast.dismissible && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <Button
                    onClick={() => handleRemoveToast(toast.id)}
                    variant='ghost'
                    size='sm'
                    className={cn(
                      'flex-shrink-0 h-6 w-6 p-0 rounded-full',
                      'text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200',
                      'hover:bg-white/20 dark:hover:bg-black/20',
                      'opacity-0 group-hover:opacity-100 transition-opacity duration-200',
                      'focus:opacity-100',
                    )}
                    aria-label='Bildirimi kapat'
                  >
                    <X className='h-3 w-3' />
                  </Button>
                </motion.div>
              )}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Toast counter */}
      {toasts.length > maxToasts && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className={cn(
            'pointer-events-auto text-center py-2 px-4 rounded-xl text-xs',
            'bg-neutral-100/80 dark:bg-neutral-800/80 backdrop-blur-md',
            'text-neutral-600 dark:text-neutral-400 border border-neutral-200/50 dark:border-neutral-700/50',
          )}
        >
          <div className='flex items-center justify-center space-x-1'>
            <Zap className='h-3 w-3' />
            <span>+{toasts.length - maxToasts} daha fazla bildirim</span>
          </div>
        </motion.div>
      )}
    </div>
  )

  return createPortal(containerContent, document.body)
}

// Enhanced useToast hook
export function useToast() {
  const dispatch = useAppDispatch()

  const showToast = useCallback(
    (toast: {
      type: 'success' | 'error' | 'warning' | 'info'
      title?: string
      message: string
      duration?: number
      persistent?: boolean
      dismissible?: boolean
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
        title: title || 'Başarılı',
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
