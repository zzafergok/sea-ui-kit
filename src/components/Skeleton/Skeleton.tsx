'use client'

import React from 'react'

import { cn } from '@/lib/utils'

interface SkeletonProps {
  className?: string
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded'
  width?: string | number
  height?: string | number
  animation?: 'pulse' | 'wave' | 'none'
  lines?: number
}

/**
 * Base Skeleton Component
 * Loading durumları için skeleton placeholder
 */
export function Skeleton({
  className,
  variant = 'rectangular',
  width,
  height,
  animation = 'pulse',
  lines = 1,
}: SkeletonProps) {
  const baseClasses = cn(
    'bg-neutral-200 dark:bg-neutral-700',
    {
      'animate-pulse': animation === 'pulse',
      'animate-shimmer': animation === 'wave',
      'rounded-full': variant === 'circular',
      'rounded-md': variant === 'rounded',
      'rounded-sm': variant === 'rectangular',
      rounded: variant === 'text',
    },
    className,
  )

  const style = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
  }

  if (variant === 'text' && lines > 1) {
    return (
      <div className='space-y-2'>
        {Array.from({ length: lines }, (_, index) => (
          <div
            key={index}
            className={cn(baseClasses, index === lines - 1 ? 'w-3/4' : 'w-full')}
            style={{
              height: height || '1rem',
              width: index === lines - 1 ? '75%' : width,
            }}
          />
        ))}
      </div>
    )
  }

  return <div className={baseClasses} style={style} />
}

/**
 * Card Skeleton
 */
interface CardSkeletonProps {
  className?: string
  showImage?: boolean
  showTitle?: boolean
  showDescription?: boolean
  showActions?: boolean
  imageHeight?: string | number
}

export function CardSkeleton({
  className,
  showImage = true,
  showTitle = true,
  showDescription = true,
  showActions = true,
  imageHeight = 192,
}: CardSkeletonProps) {
  return (
    <div className={cn('border border-neutral-200 dark:border-neutral-700 rounded-lg p-4 space-y-4', className)}>
      {showImage && <Skeleton variant='rectangular' height={imageHeight} className='w-full' />}

      {showTitle && <Skeleton variant='text' height='1.5rem' width='75%' />}

      {showDescription && (
        <div className='space-y-2'>
          <Skeleton variant='text' height='1rem' width='100%' />
          <Skeleton variant='text' height='1rem' width='90%' />
          <Skeleton variant='text' height='1rem' width='60%' />
        </div>
      )}

      {showActions && (
        <div className='flex space-x-2'>
          <Skeleton variant='rounded' width={80} height={36} />
          <Skeleton variant='rounded' width={100} height={36} />
        </div>
      )}
    </div>
  )
}

/**
 * List Item Skeleton
 */
interface ListItemSkeletonProps {
  className?: string
  showAvatar?: boolean
  showIcon?: boolean
  avatarSize?: number
  lines?: number
}

export function ListItemSkeleton({
  className,
  showAvatar = false,
  showIcon = false,
  avatarSize = 40,
  lines = 2,
}: ListItemSkeletonProps) {
  return (
    <div className={cn('flex items-center space-x-3 p-3', className)}>
      {showAvatar && <Skeleton variant='circular' width={avatarSize} height={avatarSize} />}

      {showIcon && !showAvatar && <Skeleton variant='rounded' width={24} height={24} />}

      <div className='flex-1 space-y-2'>
        <Skeleton variant='text' height='1rem' width='80%' />
        {lines > 1 && <Skeleton variant='text' height='0.875rem' width='60%' />}
        {lines > 2 && <Skeleton variant='text' height='0.875rem' width='40%' />}
      </div>

      <Skeleton variant='rounded' width={20} height={20} />
    </div>
  )
}

/**
 * Table Skeleton
 */
interface TableSkeletonProps {
  className?: string
  columns?: number
  rows?: number
  showHeader?: boolean
}

export function TableSkeleton({ className, columns = 4, rows = 5, showHeader = true }: TableSkeletonProps) {
  return (
    <div className={cn('border border-neutral-200 dark:border-neutral-700 rounded-lg overflow-hidden', className)}>
      {showHeader && (
        <div className='bg-neutral-50 dark:bg-neutral-800 p-4 border-b border-neutral-200 dark:border-neutral-700'>
          <div className='grid gap-4' style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
            {Array.from({ length: columns }, (_, index) => (
              <Skeleton key={index} variant='text' height='1rem' width='70%' />
            ))}
          </div>
        </div>
      )}

      <div className='divide-y divide-neutral-200 dark:divide-neutral-700'>
        {Array.from({ length: rows }, (_, rowIndex) => (
          <div key={rowIndex} className='p-4'>
            <div className='grid gap-4' style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
              {Array.from({ length: columns }, (_, colIndex) => (
                <Skeleton key={colIndex} variant='text' height='1rem' width={colIndex === 0 ? '90%' : '60%'} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/**
 * Form Skeleton
 */
interface FormSkeletonProps {
  className?: string
  fields?: number
  showTitle?: boolean
  showDescription?: boolean
  showSubmitButton?: boolean
}

export function FormSkeleton({
  className,
  fields = 3,
  showTitle = true,
  showDescription = false,
  showSubmitButton = true,
}: FormSkeletonProps) {
  return (
    <div className={cn('space-y-6', className)}>
      {showTitle && (
        <div className='space-y-2'>
          <Skeleton variant='text' height='2rem' width='50%' />
          {showDescription && <Skeleton variant='text' height='1rem' width='80%' />}
        </div>
      )}

      <div className='space-y-4'>
        {Array.from({ length: fields }, (_, index) => (
          <div key={index} className='space-y-2'>
            <Skeleton variant='text' height='1rem' width='30%' />
            <Skeleton variant='rectangular' height='2.5rem' width='100%' />
          </div>
        ))}
      </div>

      {showSubmitButton && (
        <div className='flex justify-end space-x-2'>
          <Skeleton variant='rounded' width={80} height={40} />
          <Skeleton variant='rounded' width={100} height={40} />
        </div>
      )}
    </div>
  )
}

/**
 * Page Header Skeleton
 */
interface PageHeaderSkeletonProps {
  className?: string
  showBreadcrumb?: boolean
  showActions?: boolean
  showTabs?: boolean
}

export function PageHeaderSkeleton({
  className,
  showBreadcrumb = true,
  showActions = true,
  showTabs = false,
}: PageHeaderSkeletonProps) {
  return (
    <div className={cn('space-y-4', className)}>
      {showBreadcrumb && (
        <div className='flex items-center space-x-2'>
          <Skeleton variant='text' height='0.875rem' width={80} />
          <span className='text-neutral-400'>/</span>
          <Skeleton variant='text' height='0.875rem' width={100} />
          <span className='text-neutral-400'>/</span>
          <Skeleton variant='text' height='0.875rem' width={120} />
        </div>
      )}

      <div className='flex items-center justify-between'>
        <div className='space-y-2'>
          <Skeleton variant='text' height='2.5rem' width={300} />
          <Skeleton variant='text' height='1rem' width={500} />
        </div>

        {showActions && (
          <div className='flex space-x-2'>
            <Skeleton variant='rounded' width={100} height={40} />
            <Skeleton variant='rounded' width={120} height={40} />
          </div>
        )}
      </div>

      {showTabs && (
        <div className='flex space-x-1 border-b border-neutral-200 dark:border-neutral-700'>
          {Array.from({ length: 4 }, (_, index) => (
            <Skeleton key={index} variant='text' height='2.5rem' width={80} />
          ))}
        </div>
      )}
    </div>
  )
}

/**
 * Profile Skeleton
 */
interface ProfileSkeletonProps {
  className?: string
  layout?: 'horizontal' | 'vertical'
  showBio?: boolean
  showStats?: boolean
}

export function ProfileSkeleton({
  className,
  layout = 'horizontal',
  showBio = true,
  showStats = true,
}: ProfileSkeletonProps) {
  if (layout === 'vertical') {
    return (
      <div className={cn('text-center space-y-4', className)}>
        <Skeleton variant='circular' width={120} height={120} className='mx-auto' />
        <div className='space-y-2'>
          <Skeleton variant='text' height='1.5rem' width={200} className='mx-auto' />
          <Skeleton variant='text' height='1rem' width={150} className='mx-auto' />
        </div>

        {showBio && (
          <div className='space-y-2'>
            <Skeleton variant='text' height='1rem' width='80%' className='mx-auto' />
            <Skeleton variant='text' height='1rem' width='60%' className='mx-auto' />
          </div>
        )}

        {showStats && (
          <div className='flex justify-center space-x-8'>
            {Array.from({ length: 3 }, (_, index) => (
              <div key={index} className='text-center'>
                <Skeleton variant='text' height='1.5rem' width={40} className='mx-auto' />
                <Skeleton variant='text' height='0.875rem' width={60} className='mx-auto' />
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className={cn('flex items-start space-x-4', className)}>
      <Skeleton variant='circular' width={80} height={80} />

      <div className='flex-1 space-y-3'>
        <div className='space-y-1'>
          <Skeleton variant='text' height='1.5rem' width={250} />
          <Skeleton variant='text' height='1rem' width={180} />
        </div>

        {showBio && (
          <div className='space-y-1'>
            <Skeleton variant='text' height='0.875rem' width='90%' />
            <Skeleton variant='text' height='0.875rem' width='75%' />
          </div>
        )}

        {showStats && (
          <div className='flex space-x-6'>
            {Array.from({ length: 3 }, (_, index) => (
              <div key={index} className='flex items-center space-x-1'>
                <Skeleton variant='text' height='1rem' width={30} />
                <Skeleton variant='text' height='0.875rem' width={50} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
