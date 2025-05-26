// src/components/ToastContainer/ToastContainer.tsx

'use client'

import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { useAppSelector, useAppDispatch } from '@/store'
import { selectToasts, removeToast } from '@/store/slices/toastSlice'
import { Toast } from '@/components/Toast/Toast'
import { cn } from '@/lib/utils'

export interface ToastContainerProps {
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center'
  className?: string
}

const positionStyles = {
  'top-right': 'top-20 right-4', // navbar'dan sonra başlaması için top-4 yerine top-20
  'top-left': 'top-20 left-4', // navbar'dan sonra başlaması için top-4 yerine top-20
  'bottom-right': 'bottom-4 right-4',
  'bottom-left': 'bottom-4 left-4',
  'top-center': 'top-20 left-1/2 transform -translate-x-1/2', // navbar'dan sonra
  'bottom-center': 'bottom-4 left-1/2 transform -translate-x-1/2',
}

export function ToastContainer({ position = 'top-right', className }: ToastContainerProps) {
  const dispatch = useAppDispatch()
  const toasts = useAppSelector(selectToasts)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleRemoveToast = (id: string) => {
    dispatch(removeToast(id))
  }

  if (!mounted || toasts.length === 0) {
    return null
  }

  const content = (
    <div
      className={cn(
        'fixed z-[9999] flex flex-col space-y-2 pointer-events-none', // z-index'i 9999'a yükselttik
        positionStyles[position],
        className,
      )}
      aria-live='polite'
      aria-label='Notifications'
      style={{ zIndex: 9999 }} // Inline style ile de garantiye aldık
    >
      {toasts.map((toast) => (
        <div key={toast.id} className='pointer-events-auto'>
          <Toast
            id={toast.id}
            type={toast.type}
            title={toast.title}
            message={toast.message}
            duration={toast.duration}
            position={position}
            onRemove={handleRemoveToast}
          />
        </div>
      ))}
    </div>
  )

  return createPortal(content, document.body)
}
