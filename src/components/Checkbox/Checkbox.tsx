import React from 'react'

import { Check } from 'lucide-react'
import * as RadixCheckbox from '@radix-ui/react-checkbox'

import { cn } from '@/lib/utils'

const Checkbox = React.forwardRef<
  React.ElementRef<typeof RadixCheckbox.Root>,
  React.ComponentPropsWithoutRef<typeof RadixCheckbox.Root>
>(({ className, ...props }, ref) => (
  <RadixCheckbox.Root
    ref={ref}
    className={cn(
      'peer h-4 w-4 shrink-0 rounded-sm border border-neutral-200 focus:ring-primary-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-700 dark:focus:ring-primary-600 data-[state=checked]:bg-primary-500 data-[state=checked]:text-white dark:data-[state=checked]:bg-primary-600',
      className,
    )}
    {...props}
  >
    <RadixCheckbox.Indicator className='flex items-center justify-center text-current'>
      <Check className='h-3 w-3' />
    </RadixCheckbox.Indicator>
  </RadixCheckbox.Root>
))

Checkbox.displayName = RadixCheckbox.Root.displayName

export { Checkbox }
