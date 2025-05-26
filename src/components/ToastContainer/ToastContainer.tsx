'use client'

import React, { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useAppSelector, useAppDispatch } from '@/store'
import { selectToasts, removeToast } from '@/store/slices/toastSlice'
import { AnimatePresence, motion } from 'framer-motion'
import { X, CheckCircle, AlertCircle, Info, XCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

type ToastPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center'

interface ToastContainerProps {
  position?: ToastPosition
  className?: string
}

interface ToastItemProps {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title?: string
  message: string
  duration?: number
  dismissible?: boolean
  onRemove: (id: string) => void
}

const ToastItem: React.FC<ToastItemProps> = ({
  id,
  type,
  title,
  message,
  duration = 5000,
  dismissible = true,
  onRemove,
}) => {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onRemove(id)
      }, duration)

      return () => clearTimeout(timer)
    }
  }, [id, duration, onRemove])

  const icons = {
    success: CheckCircle,
    error: XCircle,
    warning: AlertCircle,
    info: Info,
  }

  const Icon = icons[type]

  const typeClasses = {
    success: {
      container: 'bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800',
      icon: 'text-green-600 dark:text-green-400',
      title: 'text-green-900 dark:text-green-100',
      message: 'text-green-700 dark:text-green-300',
      progress: 'bg-green-600 dark:bg-green-400',
    },
    error: {
      container: 'bg-red-50 border-red-200 dark:bg-red-950 dark:border-red-800',
      icon: 'text-red-600 dark:text-red-400',
      title: 'text-red-900 dark:text-red-100',
      message: 'text-red-700 dark:text-red-300',
      progress: 'bg-red-600 dark:bg-red-400',
    },
    warning: {
      container: 'bg-yellow-50 border-yellow-200 dark:bg-yellow-950 dark:border-yellow-800',
      icon: 'text-yellow-600 dark:text-yellow-400',
      title: 'text-yellow-900 dark:text-yellow-100',
      message: 'text-yellow-700 dark:text-yellow-300',
      progress: 'bg-yellow-600 dark:bg-yellow-400',
    },
    info: {
      container: 'bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-800',
      icon: 'text-blue-600 dark:text-blue-400',
      title: 'text-blue-900 dark:text-blue-100',
      message: 'text-blue-700 dark:text-blue-300',
      progress: 'bg-blue-600 dark:bg-blue-400',
    },
  }

  const classes = typeClasses[type]

  return (
    <motion.div
      initial={{ opacity: 0, y: -50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.9 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className={cn(
        'relative flex items-start gap-3 p-4 rounded-lg border shadow-lg backdrop-blur-sm max-w-sm w-full',
        classes.container,
      )}
    >
      {/* Icon */}
      <div className='flex-shrink-0'>
        <Icon className={cn('h-5 w-5', classes.icon)} />
      </div>

      {/* Content */}
      <div className='flex-1 min-w-0'>
        {title && <h4 className={cn('text-sm font-medium mb-1', classes.title)}>{title}</h4>}
        <p className={cn('text-sm', classes.message)}>{message}</p>
      </div>

      {/* Close Button */}
      {dismissible && (
        <button
          onClick={() => onRemove(id)}
          className={cn(
            'flex-shrink-0 p-1 rounded-md transition-colors',
            'hover:bg-black/5 dark:hover:bg-white/5',
            'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-current',
          )}
        >
          <X className='h-4 w-4 opacity-70' />
        </button>
      )}

      {/* Progress Bar */}
      {duration > 0 && (
        <div className='absolute bottom-0 left-0 right-0 h-1 bg-black/10 dark:bg-white/10 rounded-b-lg overflow-hidden'>
          <motion.div
            initial={{ width: '100%' }}
            animate={{ width: '0%' }}
            transition={{ duration: duration / 1000, ease: 'linear' }}
            className={cn('h-full', classes.progress)}
          />
        </div>
      )}
    </motion.div>
  )
}

export function ToastContainer({ position = 'top-right', className }: ToastContainerProps) {
  const toasts = useAppSelector(selectToasts)
  const dispatch = useAppDispatch()

  const handleRemoveToast = (id: string) => {
    dispatch(removeToast(id))
  }

  const positionClasses = {
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'top-center': 'top-4 left-1/2 transform -translate-x-1/2',
    'bottom-center': 'bottom-4 left-1/2 transform -translate-x-1/2',
  }

  if (typeof window === 'undefined') {
    return null
  }

  return createPortal(
    <div className={cn('fixed z-toast pointer-events-none', positionClasses[position], className)}>
      <div className='flex flex-col gap-3 pointer-events-auto'>
        <AnimatePresence mode='popLayout'>
          {toasts.map((toast) => (
            <ToastItem
              key={toast.id}
              id={toast.id}
              type={toast.type}
              title={toast.title}
              message={toast.message}
              duration={toast.duration}
              dismissible={toast.dismissible}
              onRemove={handleRemoveToast}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>,
    document.body,
  )
}
