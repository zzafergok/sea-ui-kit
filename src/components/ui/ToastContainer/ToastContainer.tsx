'use client'

import React, { useEffect } from 'react'

import { Toast } from '@/store/slices/toastSlice'
import { useAppSelector, useAppDispatch } from '@/store'
import { selectToasts, removeToast, cleanupExpiredHashes } from '@/store/slices/toastSlice'

import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react'

interface ToastContainerProps {
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center'
}

interface ToastItemProps {
  toast: Toast
  onRemove: (id: string) => void
}

const ToastItem: React.FC<ToastItemProps> = ({ toast, onRemove }) => {
  const [isVisible, setIsVisible] = React.useState(false)
  const [isRemoving, setIsRemoving] = React.useState(false)

  const progressRef = React.useRef<HTMLDivElement>(null)
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null)

  // Toast görünür hale getir
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 50)
    return () => clearTimeout(timer)
  }, [])

  // Auto-dismiss logic
  useEffect(() => {
    if (!toast.persistent && toast.duration && toast.duration > 0) {
      timeoutRef.current = setTimeout(() => {
        handleRemove()
      }, toast.duration)

      // Progress bar animation
      if (progressRef.current) {
        progressRef.current.style.animation = `shrink ${toast.duration}ms linear`
      }
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [toast.duration, toast.persistent])

  const handleRemove = () => {
    setIsRemoving(true)
    setTimeout(() => {
      onRemove(toast.id)
    }, 150)
  }

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return <CheckCircle className='h-5 w-5 text-green-500 dark:text-green-400' />
      case 'error':
        return <AlertCircle className='h-5 w-5 text-red-500 dark:text-red-400' />
      case 'warning':
        return <AlertTriangle className='h-5 w-5 text-yellow-500 dark:text-yellow-400' />
      case 'info':
        return <Info className='h-5 w-5 text-blue-500 dark:text-blue-400' />
      default:
        return null
    }
  }

  const getBackgroundColor = () => {
    switch (toast.type) {
      case 'success':
        return 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800'
      case 'error':
        return 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800'
      case 'warning':
        return 'bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800'
      case 'info':
        return 'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800'
      default:
        return 'bg-white border-neutral-200 dark:bg-neutral-800 dark:border-neutral-700'
    }
  }

  const getProgressColor = () => {
    switch (toast.type) {
      case 'success':
        return 'bg-green-500 dark:bg-green-400'
      case 'error':
        return 'bg-red-500 dark:bg-red-400'
      case 'warning':
        return 'bg-yellow-500 dark:bg-yellow-400'
      case 'info':
        return 'bg-blue-500 dark:bg-blue-400'
      default:
        return 'bg-neutral-500 dark:bg-neutral-400'
    }
  }

  return (
    <div
      className={`
        relative max-w-sm w-full bg-white dark:bg-neutral-800 shadow-lg rounded-lg border pointer-events-auto transition-all duration-150 ease-in-out transform
        ${isVisible && !isRemoving ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
        ${getBackgroundColor()}
      `}
    >
      <div className='p-4'>
        <div className='flex items-start'>
          <div className='flex-shrink-0'>{getIcon()}</div>
          <div className='ml-3 w-0 flex-1'>
            {toast.title && <p className='text-sm font-medium text-neutral-900 dark:text-neutral-100'>{toast.title}</p>}
            <p className={`text-sm text-neutral-700 dark:text-neutral-300 ${toast.title ? 'mt-1' : ''}`}>
              {toast.message}
            </p>
            {toast.action && (
              <div className='mt-3'>
                <button
                  onClick={toast.action.onClick}
                  className='text-sm font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300'
                >
                  {toast.action.label}
                </button>
              </div>
            )}
          </div>
          {toast.dismissible !== false && (
            <div className='ml-4 flex-shrink-0 flex'>
              <button
                onClick={handleRemove}
                className='inline-flex text-neutral-400 hover:text-neutral-600 dark:text-neutral-500 dark:hover:text-neutral-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-primary-400 rounded-md'
              >
                <span className='sr-only'>Kapat</span>
                <X className='h-5 w-5' />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      {!toast.persistent && toast.duration && toast.duration > 0 && (
        <div className='absolute bottom-0 left-0 right-0 h-1 bg-neutral-200 dark:bg-neutral-700 rounded-b-lg overflow-hidden'>
          <div ref={progressRef} className={`h-full ${getProgressColor()}`} style={{ width: '100%' }} />
        </div>
      )}
    </div>
  )
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ position = 'top-right' }) => {
  const dispatch = useAppDispatch()
  const toasts = useAppSelector(selectToasts)

  // Cleanup expired hashes periodically
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(cleanupExpiredHashes())
    }, 30000) // 30 saniyede bir temizle

    return () => clearInterval(interval)
  }, [dispatch])

  const handleRemoveToast = (id: string) => {
    dispatch(removeToast(id))
  }

  const getPositionClasses = () => {
    switch (position) {
      case 'top-right':
        return 'top-0 right-0 items-end'
      case 'top-left':
        return 'top-0 left-0 items-start'
      case 'bottom-right':
        return 'bottom-0 right-0 items-end'
      case 'bottom-left':
        return 'bottom-0 left-0 items-start'
      case 'top-center':
        return 'top-0 left-1/2 transform -translate-x-1/2 items-center'
      case 'bottom-center':
        return 'bottom-0 left-1/2 transform -translate-x-1/2 items-center'
      default:
        return 'top-0 right-0 items-end'
    }
  }

  if (toasts.length === 0) {
    return null
  }

  return (
    <div
      className={`
        toast-container fixed z-50 pointer-events-none p-6 w-full max-w-sm
        ${getPositionClasses()}
      `}
    >
      <div className='flex flex-col space-y-4'>
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onRemove={handleRemoveToast} />
        ))}
      </div>
    </div>
  )
}
