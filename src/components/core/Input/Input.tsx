'use client'

import * as React from 'react'

import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const inputVariants = cva(
  'flex w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:bg-neutral-950 dark:ring-offset-neutral-950 dark:placeholder:text-neutral-400 dark:focus-visible:ring-primary-600',
  {
    variants: {
      variant: {
        default: '',
        error: 'border-red-500 focus-visible:ring-red-500 dark:border-red-500 dark:focus-visible:ring-red-500',
        success:
          'border-green-500 focus-visible:ring-green-500 dark:border-green-500 dark:focus-visible:ring-green-500',
      },
      inputSize: {
        default: 'h-9',
        sm: 'h-8 px-2 text-xs',
        lg: 'h-11 px-4',
      },
    },
    defaultVariants: {
      variant: 'default',
      inputSize: 'default',
    },
  },
)

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>, VariantProps<typeof inputVariants> {
  error?: string
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, inputSize, type, error, startIcon, endIcon, ...props }, ref) => {
    const hasError = !!error
    const finalVariant = hasError ? 'error' : variant

    if (startIcon || endIcon) {
      return (
        <div className='relative'>
          {startIcon && (
            <div className='absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400'>{startIcon}</div>
          )}
          <input
            type={type}
            className={cn(
              inputVariants({ variant: finalVariant, inputSize }),
              startIcon && 'pl-10',
              endIcon && 'pr-10',
              className,
            )}
            ref={ref}
            {...props}
          />
          {endIcon && (
            <div className='absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400'>{endIcon}</div>
          )}
        </div>
      )
    }

    return (
      <input
        type={type}
        className={cn(inputVariants({ variant: finalVariant, inputSize }), className)}
        ref={ref}
        {...props}
      />
    )
  },
)
Input.displayName = 'Input'

export { Input, inputVariants }
