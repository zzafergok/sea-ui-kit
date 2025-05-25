'use client'

import React, { forwardRef } from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '../Button/Button'

// Temel Dialog bileşenlerini dışa aktarıyoruz
const Dialog = DialogPrimitive.Root
const DialogTrigger = DialogPrimitive.Trigger
const DialogPortal = DialogPrimitive.Portal
const DialogClose = DialogPrimitive.Close

// Dialog Overlay bileşeni
const DialogOverlay = forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      'fixed inset-0 z-50 bg-black/50 backdrop-blur-sm',
      'data-[state=open]:animate-in data-[state=closed]:animate-out',
      'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      className,
    )}
    {...props}
  />
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

// Dialog Content bileşeni
const DialogContent = forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
    showCloseButton?: boolean
    hideOverlay?: boolean
  }
>(({ className, children, size = 'md', showCloseButton = true, hideOverlay = false, ...props }, ref) => {
  // Boyut sınıfları
  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    full: 'max-w-[calc(100vw-2rem)] mx-4 sm:max-w-[calc(100vw-4rem)]',
  }

  return (
    <DialogPortal>
      {!hideOverlay && <DialogOverlay />}
      <DialogPrimitive.Content
        ref={ref}
        className={cn(
          'fixed z-50 left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]',
          'w-full',
          sizeClasses[size],
          'bg-white dark:bg-neutral-800 rounded-lg shadow-lg border border-neutral-200 dark:border-neutral-700',
          'focus:outline-none',
          'data-[state=open]:animate-in data-[state=closed]:animate-out',
          'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
          'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
          'data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]',
          'data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]',
          'duration-200',
          className,
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <DialogClose className='absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-neutral-100 data-[state=open]:text-neutral-500 dark:ring-offset-neutral-950 dark:focus:ring-primary-600 dark:data-[state=open]:bg-neutral-800 dark:data-[state=open]:text-neutral-400'>
            <X className='h-4 w-4' />
            <span className='sr-only'>Kapat</span>
          </DialogClose>
        )}
      </DialogPrimitive.Content>
    </DialogPortal>
  )
})
DialogContent.displayName = DialogPrimitive.Content.displayName

// Dialog Header bileşeni
const DialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex flex-col space-y-1.5 px-6 pt-6', className)} {...props} />
)
DialogHeader.displayName = 'DialogHeader'

// Dialog Footer bileşeni
const DialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 px-6 py-4 border-t border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-850 rounded-b-lg',
      className,
    )}
    {...props}
  />
)
DialogFooter.displayName = 'DialogFooter'

// Dialog Title bileşeni
const DialogTitle = forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      'text-lg font-semibold leading-none tracking-tight text-neutral-900 dark:text-neutral-100',
      className,
    )}
    {...props}
  />
))
DialogTitle.displayName = DialogPrimitive.Title.displayName

// Dialog Description bileşeni
const DialogDescription = forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn('text-sm text-neutral-500 dark:text-neutral-400 mt-1', className)}
    {...props}
  />
))
DialogDescription.displayName = DialogPrimitive.Description.displayName

// Dialog Body bileşeni
const DialogBody = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('px-6 py-4', className)} {...props} />
)
DialogBody.displayName = 'DialogBody'

// Dışa aktarılan bileşenler
export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogBody,
  DialogClose,
}

// Örnek kullanım
export function ModalExample() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Modal Aç</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Örnek Modal</DialogTitle>
          <DialogDescription>Bu bir modal örneğidir. Radix UI ve Tailwind CSS ile oluşturulmuştur.</DialogDescription>
        </DialogHeader>
        <DialogBody>
          <p className='text-neutral-600 dark:text-neutral-400'>
            Modal içeriği burada yer alır. Formlar, bilgiler veya diğer içerikler bu alanda gösterilebilir.
          </p>
        </DialogBody>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant='outline'>İptal</Button>
          </DialogClose>
          <Button onClick={() => console.log('Onaylandı')}>Tamam</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
