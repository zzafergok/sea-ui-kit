import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: [
          'bg-primary-500 text-white shadow hover:bg-primary-600 active:bg-primary-700',
          'dark:bg-primary-600 dark:text-white dark:hover:bg-primary-500 dark:active:bg-primary-400',
          'focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400',
        ].join(' '),
        destructive: [
          'bg-red-500 text-white shadow-sm hover:bg-red-600 active:bg-red-700',
          'dark:bg-red-600 dark:text-white dark:hover:bg-red-500 dark:active:bg-red-400',
          'focus-visible:ring-red-500 dark:focus-visible:ring-red-400',
        ].join(' '),
        outline: [
          'border border-neutral-200 bg-white text-neutral-900 shadow-sm hover:bg-neutral-50 hover:text-neutral-900',
          'dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100 dark:hover:bg-neutral-800 dark:hover:text-neutral-100',
          'focus-visible:ring-neutral-500 dark:focus-visible:ring-neutral-400',
        ].join(' '),
        secondary: [
          'bg-neutral-100 text-neutral-900 shadow-sm hover:bg-neutral-200',
          'dark:bg-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-700',
          'focus-visible:ring-neutral-500 dark:focus-visible:ring-neutral-400',
        ].join(' '),
        ghost: [
          'text-neutral-900 hover:bg-neutral-100 hover:text-neutral-900',
          'dark:text-neutral-100 dark:hover:bg-neutral-800 dark:hover:text-neutral-100',
          'focus-visible:ring-neutral-500 dark:focus-visible:ring-neutral-400',
        ].join(' '),
        link: [
          'text-primary-500 underline-offset-4 hover:underline',
          'dark:text-primary-400 dark:hover:text-primary-300',
          'focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400',
        ].join(' '),
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-12 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading = false, disabled, children, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <>
            <svg
              className='mr-2 h-4 w-4 animate-spin'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
            >
              <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' />
              <path
                className='opacity-75'
                fill='currentColor'
                d='m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
              />
            </svg>
            Yükleniyor...
          </>
        ) : (
          children
        )}
      </Comp>
    )
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
