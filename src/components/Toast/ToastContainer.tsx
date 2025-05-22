import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react'

import { useAppSelector, useAppDispatch } from '@/store'
import { selectToasts, removeToast } from '@/store/slices/toastSlice'
import { cn } from '@/lib/utils'

export type ToastType = 'success' | 'error' | 'warning' | 'info'

export interface Toast {
  id: string
  type: ToastType
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
 * Global toast notification sistemi
 */
export function ToastContainer({ position = 'top-right', maxToasts = 5, className }: ToastContainerProps) {
  const [mounted, setMounted] = useState(false)
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

  // Animation variants
  const toastVariants = {
    initial: {
      opacity: 0,
      x: position.includes('right') ? 100 : position.includes('left') ? -100 : 0,
      y: position.includes('top') ? -20 : position.includes('bottom') ? 20 : 0,
      scale: 0.95,
    },
    animate: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
      },
    },
    exit: {
      opacity: 0,
      x: position.includes('right') ? 100 : position.includes('left') ? -100 : 0,
      scale: 0.95,
      transition: {
        duration: 0.2,
      },
    },
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
        return cn(baseStyles, 'border-l-neutral-500 bg-neutral-50 dark:bg-neutral-900/20')
    }
  }

  // Handle toast removal
  const handleRemoveToast = (toastId: string) => {
    dispatch(removeToast(toastId))
  }

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
  }, [toasts])

  if (!mounted) {
    return null
  }

  // Limit toasts
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
      <AnimatePresence mode='popLayout'>
        {visibleToasts.map((toast: Toast) => (
          <motion.div
            key={toast.id}
            variants={toastVariants}
            initial='initial'
            animate='animate'
            exit='exit'
            layout
            className={cn(
              'pointer-events-auto relative w-full rounded-lg shadow-lg border border-neutral-200 dark:border-neutral-700 p-4',
              getToastStyles(toast.type),
            )}
            role='alert'
            aria-describedby={`toast-message-${toast.id}`}
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
                  <button
                    onClick={toast.action.onClick}
                    className='mt-2 text-xs font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 underline'
                  >
                    {toast.action.label}
                  </button>
                )}
              </div>

              {/* Close Button */}
              <button
                onClick={() => handleRemoveToast(toast.id)}
                className='flex-shrink-0 p-1 rounded-md text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 transition-colors'
                aria-label='Bildirimi kapat'
              >
                <X className='h-4 w-4' />
              </button>
            </div>

            {/* Progress Bar for timed toasts */}
            {!toast.persistent && toast.duration && (
              <div className='absolute bottom-0 left-0 right-0 h-1 bg-neutral-200 dark:bg-neutral-700 rounded-b-lg overflow-hidden'>
                <motion.div
                  className='h-full bg-current opacity-30'
                  initial={{ width: '100%' }}
                  animate={{ width: '0%' }}
                  transition={{ duration: toast.duration / 1000, ease: 'linear' }}
                />
              </div>
            )}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Toast limit indicator */}
      {toasts.length > maxToasts && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className='pointer-events-auto text-center py-2 px-4 bg-neutral-100 dark:bg-neutral-800 rounded-lg text-xs text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700'
        >
          +{toasts.length - maxToasts} daha fazla bildirim
        </motion.div>
      )}
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

  const showToast = (toast: {
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
  }

  const showSuccess = (message: string, title?: string, options?: Partial<Parameters<typeof showToast>[0]>) => {
    const { title: optionsTitleValue, ...restOptions } = options || {}
    // Determine the effective title: options.title takes precedence if 'title' property exists in options,
    // otherwise use the title parameter.
    const resolvedTitle = options && Object.prototype.hasOwnProperty.call(options, 'title') ? optionsTitleValue : title

    showToast({
      type: 'success',
      message,
      ...restOptions, // Pass other options, excluding title from options
      // Conditionally add the title property only if resolvedTitle is not undefined
      ...(resolvedTitle !== undefined && { title: resolvedTitle }),
    })
  }

  const showError = (message: string, title?: string, options?: Partial<Parameters<typeof showToast>[0]>) => {
    showToast({
      type: 'error',
      title: title || 'Hata',
      message,
      ...options,
    })
  }

  const showWarning = (message: string, title?: string, options?: Partial<Parameters<typeof showToast>[0]>) => {
    showToast({
      type: 'warning',
      title: title || 'Uyarı',
      message,
      ...options,
    })
  }

  const showInfo = (message: string, title?: string, options?: Partial<Parameters<typeof showToast>[0]>) => {
    showToast({
      type: 'info',
      title: title || 'Bilgi',
      message,
      ...options,
    })
  }

  const removeToast = (id: string) => {
    dispatch({ type: 'toast/removeToast', payload: id })
  }

  const clearAllToasts = () => {
    dispatch({ type: 'toast/clearAllToasts' })
  }

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
