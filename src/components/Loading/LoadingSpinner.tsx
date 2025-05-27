'use client'

import React from 'react'

import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const spinnerVariants = cva('animate-spin rounded-full border-solid border-current', {
  variants: {
    size: {
      xs: 'h-3 w-3 border-[1.5px]',
      sm: 'h-4 w-4 border-2',
      md: 'h-6 w-6 border-2',
      lg: 'h-8 w-8 border-[3px]',
      xl: 'h-12 w-12 border-4',
      '2xl': 'h-16 w-16 border-4',
    },
    variant: {
      default: 'text-primary-600 dark:text-primary-400',
      secondary: 'text-neutral-600 dark:text-neutral-400',
      white: 'text-white',
      accent: 'text-accent-600 dark:text-accent-400',
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'default',
  },
})

const dotsVariants = cva('flex items-center space-x-1', {
  variants: {
    size: {
      xs: 'space-x-0.5',
      sm: 'space-x-1',
      md: 'space-x-1.5',
      lg: 'space-x-2',
      xl: 'space-x-2.5',
      '2xl': 'space-x-3',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

const dotVariants = cva('rounded-full animate-pulse', {
  variants: {
    size: {
      xs: 'h-1 w-1',
      sm: 'h-1.5 w-1.5',
      md: 'h-2 w-2',
      lg: 'h-2.5 w-2.5',
      xl: 'h-3 w-3',
      '2xl': 'h-4 w-4',
    },
    variant: {
      default: 'bg-primary-600 dark:bg-primary-400',
      secondary: 'bg-neutral-600 dark:bg-neutral-400',
      white: 'bg-white',
      accent: 'bg-accent-600 dark:bg-accent-400',
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
  type?: 'spinner' | 'dots' | 'pulse' | 'bars'
  text?: string
  textPosition?: 'bottom' | 'right'
}

export const LoadingSpinner = React.forwardRef<HTMLDivElement, LoadingSpinnerProps>(
  ({ className, size, variant, type = 'spinner', text, textPosition = 'bottom', ...props }, ref) => {
    const renderSpinner = () => {
      switch (type) {
        case 'dots':
          return (
            <div className={cn(dotsVariants({ size }))}>
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className={cn(dotVariants({ size, variant }))}
                  style={{
                    animationDelay: `${i * 0.2}s`,
                    animationDuration: '1.4s',
                  }}
                />
              ))}
            </div>
          )

        case 'pulse':
          return (
            <div
              className={cn(
                'rounded-full animate-pulse',
                size === 'xs' && 'h-3 w-3',
                size === 'sm' && 'h-4 w-4',
                size === 'md' && 'h-6 w-6',
                size === 'lg' && 'h-8 w-8',
                size === 'xl' && 'h-12 w-12',
                size === '2xl' && 'h-16 w-16',
                variant === 'default' && 'bg-primary-600 dark:bg-primary-400',
                variant === 'secondary' && 'bg-neutral-600 dark:bg-neutral-400',
                variant === 'white' && 'bg-white',
                variant === 'accent' && 'bg-accent-600 dark:bg-accent-400',
              )}
            />
          )

        case 'bars':
          return (
            <div className={cn('flex items-end space-x-1', dotsVariants({ size }))}>
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    'animate-pulse',
                    size === 'xs' && 'w-0.5 h-3',
                    size === 'sm' && 'w-0.5 h-4',
                    size === 'md' && 'w-1 h-6',
                    size === 'lg' && 'w-1 h-8',
                    size === 'xl' && 'w-1.5 h-12',
                    size === '2xl' && 'w-2 h-16',
                    variant === 'default' && 'bg-primary-600 dark:bg-primary-400',
                    variant === 'secondary' && 'bg-neutral-600 dark:bg-neutral-400',
                    variant === 'white' && 'bg-white',
                    variant === 'accent' && 'bg-accent-600 dark:bg-accent-400',
                  )}
                  style={{
                    animationDelay: `${i * 0.15}s`,
                    animationDuration: '1s',
                  }}
                />
              ))}
            </div>
          )

        default:
          return <div className={cn(spinnerVariants({ size, variant }), 'border-t-transparent border-r-transparent')} />
      }
    }

    const textSizeClass = {
      xs: 'text-xs',
      sm: 'text-sm',
      md: 'text-sm',
      lg: 'text-base',
      xl: 'text-lg',
      '2xl': 'text-xl',
    }[size || 'md']

    return (
      <div
        ref={ref}
        className={cn(
          'flex items-center',
          textPosition === 'bottom' ? 'flex-col space-y-2' : 'flex-row space-x-3',
          className,
        )}
        {...props}
      >
        {renderSpinner()}
        {text && (
          <span
            className={cn(
              textSizeClass,
              'font-medium',
              variant === 'default' && 'text-primary-600 dark:text-primary-400',
              variant === 'secondary' && 'text-neutral-600 dark:text-neutral-400',
              variant === 'white' && 'text-white',
              variant === 'accent' && 'text-accent-600 dark:text-accent-400',
            )}
          >
            {text}
          </span>
        )}
      </div>
    )
  },
)

// Alt bileşenler
export const LoadingDots = React.forwardRef<HTMLDivElement, Omit<LoadingSpinnerProps, 'type'>>(({ ...props }, ref) => (
  <LoadingSpinner ref={ref} type='dots' {...props} />
))

export const LoadingPulse = React.forwardRef<HTMLDivElement, Omit<LoadingSpinnerProps, 'type'>>(({ ...props }, ref) => (
  <LoadingSpinner ref={ref} type='pulse' {...props} />
))

export const LoadingBars = React.forwardRef<HTMLDivElement, Omit<LoadingSpinnerProps, 'type'>>(({ ...props }, ref) => (
  <LoadingSpinner ref={ref} type='bars' {...props} />
))

LoadingSpinner.displayName = 'LoadingSpinner'
LoadingDots.displayName = 'LoadingDots'
LoadingPulse.displayName = 'LoadingPulse'
LoadingBars.displayName = 'LoadingBars'
