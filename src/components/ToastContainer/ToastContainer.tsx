'use client'

import React, { useEffect, useState } from 'react'
import { useAppSelector, useAppDispatch } from '@/store'
import { selectToasts, removeToast, cleanupExpiredHashes } from '@/store/slices/toastSlice'
import {
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
} from '@/components/Toast/Toast'
import { CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react'

interface ToastContainerProps {
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center'
  maxToasts?: number
  className?: string
}

export function ToastContainer({ position = 'top-right', maxToasts = 5, className: _className }: ToastContainerProps) {
  const [mounted, setMounted] = useState(false)
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
    }
  }, [dispatch])

  // Toast icon mapping
  const getToastIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className='h-5 w-5 text-green-500' />
      case 'error':
        return <AlertCircle className='h-5 w-5 text-red-500' />
      case 'warning':
        return <AlertTriangle className='h-5 w-5 text-amber-500' />
      case 'info':
      default:
        return <Info className='h-5 w-5 text-blue-500' />
    }
  }

  // Toast variant mapping
  const getToastVariant = (type: string) => {
    switch (type) {
      case 'success':
        return 'success'
      case 'error':
        return 'error'
      case 'warning':
        return 'warning'
      case 'info':
        return 'info'
      default:
        return 'default'
    }
  }

  // Position classes
  const positionClasses = {
    'top-right': 'top-0 right-0',
    'top-left': 'top-0 left-0',
    'bottom-right': 'bottom-0 right-0',
    'bottom-left': 'bottom-0 left-0',
    'top-center': 'top-0 left-1/2 -translate-x-1/2',
    'bottom-center': 'bottom-0 left-1/2 -translate-x-1/2',
  }

  if (!mounted) {
    return null
  }

  const visibleToasts = toasts.slice(0, maxToasts)

  return (
    <ToastProvider>
      {visibleToasts.map((toast) => (
        <Toast
          key={toast.id}
          variant={getToastVariant(toast.type)}
          duration={toast.duration}
          onOpenChange={(open) => {
            if (!open) dispatch(removeToast(toast.id))
          }}
        >
          <div className='flex'>
            <div className='mr-3 flex-shrink-0 mt-0.5'>{getToastIcon(toast.type)}</div>
            <div className='flex-1'>
              {toast.title && <ToastTitle>{toast.title}</ToastTitle>}
              <ToastDescription>{toast.message}</ToastDescription>
              {toast.action && (
                <ToastAction
                  altText={toast.action.label}
                  onClick={() => {
                    toast.action?.onClick?.()
                    dispatch(removeToast(toast.id))
                  }}
                >
                  {toast.action.label}
                </ToastAction>
              )}
            </div>
          </div>
          <ToastClose />
        </Toast>
      ))}
      <ToastViewport className={positionClasses[position]} />
    </ToastProvider>
  )
}

export default ToastContainer
