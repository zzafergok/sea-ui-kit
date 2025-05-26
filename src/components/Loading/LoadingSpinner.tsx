// src/components/Loading/LoadingSpinner.tsx

import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const spinnerVariants = cva('animate-spin rounded-full border-2 border-current border-t-transparent', {
  variants: {
    size: {
      sm: 'h-4 w-4',
      md: 'h-6 w-6',
      lg: 'h-8 w-8',
      xl: 'h-12 w-12',
    },
    variant: {
      default: 'text-primary-600 dark:text-primary-400',
      secondary: 'text-neutral-600 dark:text-neutral-400',
      white: 'text-white',
      black: 'text-black',
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'default',
  },
})

export interface LoadingSpinnerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof spinnerVariants> {
  label?: string
}

export function LoadingSpinner({ className, size, variant, label = 'Loading...', ...props }: LoadingSpinnerProps) {
  return (
    <div role='status' aria-label={label} className={cn('inline-block', className)} {...props}>
      <div className={cn(spinnerVariants({ size, variant }))} />
      <span className='sr-only'>{label}</span>
    </div>
  )
}

// Dots Loading Animation
export interface LoadingDotsProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'secondary' | 'white' | 'black'
}

export function LoadingDots({ className, size = 'md', variant = 'default', ...props }: LoadingDotsProps) {
  const sizeClasses = {
    sm: 'w-1 h-1',
    md: 'w-2 h-2',
    lg: 'w-3 h-3',
  }

  const variantClasses = {
    default: 'bg-primary-600 dark:bg-primary-400',
    secondary: 'bg-neutral-600 dark:bg-neutral-400',
    white: 'bg-white',
    black: 'bg-black',
  }

  return (
    <div className={cn('flex items-center space-x-1', className)} {...props}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={cn('rounded-full animate-pulse', sizeClasses[size], variantClasses[variant])}
          style={{
            animationDelay: `${i * 0.2}s`,
            animationDuration: '1.4s',
          }}
        />
      ))}
    </div>
  )
}

// Pulse Loading Animation
export interface LoadingPulseProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'secondary' | 'white' | 'black'
}

export function LoadingPulse({ className, size = 'md', variant = 'default', ...props }: LoadingPulseProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
  }

  const variantClasses = {
    default: 'bg-primary-600 dark:bg-primary-400',
    secondary: 'bg-neutral-600 dark:bg-neutral-400',
    white: 'bg-white',
    black: 'bg-black',
  }

  return (
    <div
      className={cn('rounded-full animate-pulse', sizeClasses[size], variantClasses[variant], className)}
      {...props}
    />
  )
}
