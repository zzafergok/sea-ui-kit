'use client'

import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const spinnerVariants = cva('animate-spin', {
  variants: {
    size: {
      sm: 'h-4 w-4',
      md: 'h-6 w-6',
      lg: 'h-8 w-8',
      xl: 'h-12 w-12',
    },
    color: {
      default: 'text-primary-600 dark:text-primary-400',
      neutral: 'text-neutral-600 dark:text-neutral-400',
      white: 'text-white',
      current: 'text-current',
    },
  },
  defaultVariants: {
    size: 'md',
    color: 'default',
  },
})

const dotsVariants = cva('inline-flex items-center gap-1', {
  variants: {
    size: {
      sm: 'gap-1',
      md: 'gap-1.5',
      lg: 'gap-2',
      xl: 'gap-3',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

const dotVariants = cva('rounded-full animate-bounce bg-current', {
  variants: {
    size: {
      sm: 'h-1 w-1',
      md: 'h-1.5 w-1.5',
      lg: 'h-2 w-2',
      xl: 'h-3 w-3',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

const pulseVariants = cva('rounded-full animate-pulse bg-current', {
  variants: {
    size: {
      sm: 'h-4 w-4',
      md: 'h-6 w-6',
      lg: 'h-8 w-8',
      xl: 'h-12 w-12',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

export interface LoadingSpinnerProps extends VariantProps<typeof spinnerVariants> {
  className?: string
  label?: string
}

export interface LoadingDotsProps extends VariantProps<typeof dotsVariants> {
  className?: string
  color?: 'default' | 'neutral' | 'white' | 'current'
  label?: string
}

export interface LoadingPulseProps extends VariantProps<typeof pulseVariants> {
  className?: string
  color?: 'default' | 'neutral' | 'white' | 'current'
  label?: string
}

// Spinner Component
export function LoadingSpinner({ size, color, className, label, ...props }: LoadingSpinnerProps) {
  return (
    <div className='inline-flex flex-col items-center gap-2' {...props}>
      <svg
        className={cn(spinnerVariants({ size, color }), className)}
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        aria-hidden={!label}
        role={label ? 'status' : undefined}
      >
        <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' />
        <path
          className='opacity-75'
          fill='currentColor'
          d='m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
        />
      </svg>
      {label && <span className='text-sm text-neutral-600 dark:text-neutral-400 sr-only'>{label}</span>}
    </div>
  )
}

// Dots Component
export function LoadingDots({ size, className, color = 'default', label, ...props }: LoadingDotsProps) {
  const colorClasses = {
    default: 'text-primary-600 dark:text-primary-400',
    neutral: 'text-neutral-600 dark:text-neutral-400',
    white: 'text-white',
    current: 'text-current',
  }

  return (
    <div className='inline-flex flex-col items-center gap-2' {...props}>
      <div
        className={cn(dotsVariants({ size }), colorClasses[color], className)}
        role={label ? 'status' : undefined}
        aria-hidden={!label}
      >
        <div className={cn(dotVariants({ size }))} style={{ animationDelay: '0ms' }} />
        <div className={cn(dotVariants({ size }))} style={{ animationDelay: '150ms' }} />
        <div className={cn(dotVariants({ size }))} style={{ animationDelay: '300ms' }} />
      </div>
      {label && <span className='text-sm text-neutral-600 dark:text-neutral-400 sr-only'>{label}</span>}
    </div>
  )
}

// Pulse Component
export function LoadingPulse({ size, className, color = 'default', label, ...props }: LoadingPulseProps) {
  const colorClasses = {
    default: 'text-primary-600 dark:text-primary-400',
    neutral: 'text-neutral-600 dark:text-neutral-400',
    white: 'text-white',
    current: 'text-current',
  }

  return (
    <div className='inline-flex flex-col items-center gap-2' {...props}>
      <div
        className={cn(pulseVariants({ size }), colorClasses[color], className)}
        role={label ? 'status' : undefined}
        aria-hidden={!label}
      />
      {label && <span className='text-sm text-neutral-600 dark:text-neutral-400 sr-only'>{label}</span>}
    </div>
  )
}

// Progress Circle Component
export interface LoadingProgressProps {
  progress: number
  size?: 'sm' | 'md' | 'lg' | 'xl'
  color?: 'default' | 'neutral' | 'white' | 'current'
  className?: string
  showPercentage?: boolean
  label?: string
}

export function LoadingProgress({
  progress,
  size = 'md',
  color = 'default',
  className,
  showPercentage = false,
  label,
  ...props
}: LoadingProgressProps) {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-12 w-12',
    lg: 'h-16 w-16',
    xl: 'h-24 w-24',
  }

  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
    xl: 'text-lg',
  }

  const colorClasses = {
    default: 'text-primary-600 dark:text-primary-400',
    neutral: 'text-neutral-600 dark:text-neutral-400',
    white: 'text-white',
    current: 'text-current',
  }

  const radius = 45
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (progress / 100) * circumference

  return (
    <div className='inline-flex flex-col items-center gap-2' {...props}>
      <div className={cn('relative', sizeClasses[size])}>
        <svg
          className={cn('transform -rotate-90', sizeClasses[size], className)}
          viewBox='0 0 100 100'
          role={label ? 'status' : undefined}
          aria-hidden={!label}
        >
          {/* Background circle */}
          <circle
            cx='50'
            cy='50'
            r={radius}
            stroke='currentColor'
            strokeWidth='8'
            fill='transparent'
            className='opacity-20'
          />
          {/* Progress circle */}
          <circle
            cx='50'
            cy='50'
            r={radius}
            stroke='currentColor'
            strokeWidth='8'
            fill='transparent'
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap='round'
            className={cn('transition-all duration-300 ease-in-out', colorClasses[color])}
          />
        </svg>

        {showPercentage && (
          <div className='absolute inset-0 flex items-center justify-center'>
            <span className={cn('font-medium', textSizeClasses[size], colorClasses[color])}>
              {Math.round(progress)}%
            </span>
          </div>
        )}
      </div>

      {label && <span className='text-sm text-neutral-600 dark:text-neutral-400'>{label}</span>}
    </div>
  )
}

// Skeleton Loader Component
export interface LoadingSkeletonProps {
  className?: string
  width?: string | number
  height?: string | number
  variant?: 'rectangular' | 'circular' | 'text'
  animation?: 'pulse' | 'wave' | 'none'
}

export function LoadingSkeleton({
  className,
  width,
  height,
  variant = 'rectangular',
  animation = 'pulse',
  ...props
}: LoadingSkeletonProps) {
  const variantClasses = {
    rectangular: 'rounded',
    circular: 'rounded-full',
    text: 'rounded h-4',
  }

  const animationClasses = {
    pulse: 'animate-pulse',
    wave: 'animate-pulse', // Could be enhanced with wave animation
    none: '',
  }

  const style: React.CSSProperties = {}
  if (width) style.width = typeof width === 'number' ? `${width}px` : width
  if (height) style.height = typeof height === 'number' ? `${height}px` : height

  return (
    <div
      className={cn(
        'bg-neutral-200 dark:bg-neutral-700',
        variantClasses[variant],
        animationClasses[animation],
        className,
      )}
      style={style}
      role='status'
      aria-hidden='true'
      {...props}
    />
  )
}

// Export all components
export { LoadingSpinner as default }
