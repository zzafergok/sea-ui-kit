// src/components/Card/Card.tsx

import React, { forwardRef } from 'react'
import Image from 'next/image'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const cardVariants = cva(
  'rounded-lg border bg-white text-neutral-950 shadow-sm dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-50',
  {
    variants: {
      variant: {
        default: 'border-neutral-200',
        destructive: 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950',
        success: 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950',
        warning: 'border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950',
        info: 'border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950',
        outline: 'border-neutral-200 bg-transparent dark:border-neutral-800',
        ghost: 'border-transparent bg-transparent shadow-none',
      },
      size: {
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
        xl: 'p-10',
      },
      hover: {
        none: '',
        lift: 'transition-all duration-200 hover:shadow-md hover:-translate-y-1',
        glow: 'transition-all duration-200 hover:shadow-lg hover:ring-2 hover:ring-primary-200 dark:hover:ring-primary-800',
        scale: 'transition-transform duration-200 hover:scale-105',
      },
      interactive: {
        true: 'cursor-pointer',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      hover: 'none',
      interactive: false,
    },
  },
)

export interface CardProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardVariants> {
  asChild?: boolean
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, size, hover, interactive, asChild = false, ...props }, ref) => {
    const Comp = asChild ? React.Fragment : 'div'

    if (asChild) {
      return <>{props.children}</>
    }

    return <Comp className={cn(cardVariants({ variant, size, hover, interactive, className }))} ref={ref} {...props} />
  },
)
Card.displayName = 'Card'

const CardHeader = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('flex flex-col space-y-1.5 pb-6', className)} {...props} />
))
CardHeader.displayName = 'CardHeader'

const CardTitle = forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, children, ...props }, ref) => (
    <h3 ref={ref} className={cn('text-2xl font-semibold leading-none tracking-tight', className)} {...props}>
      {children}
    </h3>
  ),
)
CardTitle.displayName = 'CardTitle'

const CardDescription = forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn('text-sm text-neutral-500 dark:text-neutral-400', className)} {...props} />
  ),
)
CardDescription.displayName = 'CardDescription'

const CardContent = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('pb-6', className)} {...props} />
))
CardContent.displayName = 'CardContent'

const CardFooter = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center pt-6 border-t border-neutral-200 dark:border-neutral-800', className)}
    {...props}
  />
))
CardFooter.displayName = 'CardFooter'

// Media Card Sub-component
interface CardMediaProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src' | 'width' | 'height'> {
  src: string
  aspectRatio?: 'square' | 'video' | 'portrait' | 'landscape'
}
const CardMedia = forwardRef<HTMLImageElement, CardMediaProps>(
  ({ className, aspectRatio = 'landscape', alt, src, ...props }, ref) => {
    const aspectClasses = {
      square: 'aspect-square',
      video: 'aspect-video',
      portrait: 'aspect-[3/4]',
      landscape: 'aspect-[4/3]',
    }
    return (
      <div className={cn('relative overflow-hidden rounded-lg', aspectClasses[aspectRatio])}>
        <Image
          ref={ref}
          src={src}
          className={cn('h-full w-full object-cover transition-transform duration-300 hover:scale-105', className)}
          alt={alt || ''}
          fill
          {...props}
        />
      </div>
    )
  },
)
CardMedia.displayName = 'CardMedia'

// Action Area for interactive cards
interface CardActionAreaProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const CardActionArea = forwardRef<HTMLDivElement, CardActionAreaProps>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'w-full cursor-pointer transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-800/50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-lg',
      className,
    )}
    role='button'
    tabIndex={0}
    {...props}
  >
    {children}
  </div>
))
CardActionArea.displayName = 'CardActionArea'

// Badge for status or category
interface CardBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'secondary' | 'success' | 'warning' | 'destructive'
}

const CardBadge = forwardRef<HTMLSpanElement, CardBadgeProps>(({ className, variant = 'default', ...props }, ref) => {
  const badgeVariants = {
    default: 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-100',
    secondary: 'bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-100',
    success: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100',
    warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100',
    destructive: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100',
  }

  return (
    <span
      ref={ref}
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        badgeVariants[variant],
        className,
      )}
      {...props}
    />
  )
})
CardBadge.displayName = 'CardBadge'

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent, CardMedia, CardActionArea, CardBadge }
