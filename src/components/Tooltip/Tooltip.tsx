'use client'

import React, { useState, useRef, useEffect, ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

export interface TooltipProps {
  content: ReactNode
  children: ReactNode
  position?: 'top' | 'right' | 'bottom' | 'left'
  delay?: number
  className?: string
  contentClassName?: string
  arrow?: boolean
  maxWidth?: number
  disabled?: boolean
  triggerOnClick?: boolean
  openOnMount?: boolean
  closeOnEsc?: boolean
  closeOnPointerDown?: boolean
  offset?: number
  interactive?: boolean
}

export function Tooltip({
  content,
  children,
  position = 'top',
  delay = 300,
  className,
  contentClassName,
  arrow = true,
  maxWidth = 250,
  disabled = false,
  triggerOnClick = false,
  openOnMount = false,
  closeOnEsc = true,
  closeOnPointerDown = true,
  offset = 8,
  interactive = false,
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(openOnMount)
  const [isMounted, setIsMounted] = useState(false)
  const [coords, setCoords] = useState({ x: 0, y: 0 })
  const triggerRef = useRef<HTMLDivElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Tooltip'i göster
  const show = () => {
    if (disabled) return

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }

    if (!triggerOnClick) {
      timeoutRef.current = setTimeout(() => {
        setIsVisible(true)
      }, delay)
    } else {
      setIsVisible(true)
    }
  }

  // Tooltip'i gizle
  const hide = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }

    if (!interactive) {
      setIsVisible(false)
    }
  }

  // Click ile kapanma
  const handleClickAway = (e: MouseEvent) => {
    if (
      isVisible &&
      tooltipRef.current &&
      triggerRef.current &&
      !tooltipRef.current.contains(e.target as Node) &&
      !triggerRef.current.contains(e.target as Node) &&
      closeOnPointerDown
    ) {
      setIsVisible(false)
    }
  }

  // Esc ile kapanma
  const handleKeyDown = (e: KeyboardEvent) => {
    if (isVisible && e.key === 'Escape' && closeOnEsc) {
      setIsVisible(false)
    }
  }

  // Mouse enter/leave
  const handleMouseEnter = () => !triggerOnClick && show()
  const handleMouseLeave = () => !triggerOnClick && !interactive && hide()

  // Click handling
  const handleClick = () => triggerOnClick && setIsVisible((prev) => !prev)

  // Interactive tooltip handling
  const handleTooltipMouseEnter = () => {
    if (interactive && timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }

  const handleTooltipMouseLeave = () => {
    if (interactive) {
      hide()
    }
  }

  // Calculate tooltip position
  const updatePosition = () => {
    if (!triggerRef.current) return

    const rect = triggerRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    setCoords({ x: centerX, y: centerY })
  }

  // Cleanup
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  // Window events
  useEffect(() => {
    setIsMounted(true)

    if (isVisible) {
      updatePosition()
      window.addEventListener('resize', updatePosition)
      window.addEventListener('scroll', updatePosition, true)
      document.addEventListener('mousedown', handleClickAway)
      document.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      window.removeEventListener('resize', updatePosition)
      window.removeEventListener('scroll', updatePosition, true)
      document.removeEventListener('mousedown', handleClickAway)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isVisible])

  // Tooltip positioning classes
  const positionClasses = {
    top: `bottom-[calc(100%+${offset}px)]`,
    bottom: `top-[calc(100%+${offset}px)]`,
    left: `right-[calc(100%+${offset}px)]`,
    right: `left-[calc(100%+${offset}px)]`,
  }

  // Arrow positioning
  const arrowClasses = {
    top: 'bottom-[-5px] left-[calc(50%-5px)] border-l-transparent border-r-transparent border-b-transparent',
    bottom: 'top-[-5px] left-[calc(50%-5px)] border-l-transparent border-r-transparent border-t-transparent',
    left: 'right-[-5px] top-[calc(50%-5px)] border-t-transparent border-b-transparent border-r-transparent',
    right: 'left-[-5px] top-[calc(50%-5px)] border-t-transparent border-b-transparent border-l-transparent',
  }

  // Animation variants
  const variants = {
    top: {
      hidden: { opacity: 0, y: -4 },
      visible: { opacity: 1, y: 0 },
    },
    bottom: {
      hidden: { opacity: 0, y: 4 },
      visible: { opacity: 1, y: 0 },
    },
    left: {
      hidden: { opacity: 0, x: -4 },
      visible: { opacity: 1, x: 0 },
    },
    right: {
      hidden: { opacity: 0, x: 4 },
      visible: { opacity: 1, x: 0 },
    },
  }

  if (!isMounted) return <div ref={triggerRef}>{children}</div>

  return (
    <>
      <div
        ref={triggerRef}
        className={cn('inline-flex', className)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >
        {children}
      </div>

      {isVisible &&
        createPortal(
          <AnimatePresence>
            <div
              className={cn(
                'fixed z-50',
                position === 'top' && 'transform -translate-x-1/2',
                position === 'bottom' && 'transform -translate-x-1/2',
                position === 'left' && 'transform -translate-y-1/2',
                position === 'right' && 'transform -translate-y-1/2',
              )}
              style={{
                left:
                  position === 'top' || position === 'bottom'
                    ? coords.x
                    : position === 'right'
                      ? coords.x + offset
                      : coords.x - offset,
                top:
                  position === 'left' || position === 'right'
                    ? coords.y
                    : position === 'bottom'
                      ? coords.y + offset
                      : coords.y - offset,
                maxWidth,
              }}
              ref={tooltipRef}
              onMouseEnter={handleTooltipMouseEnter}
              onMouseLeave={handleTooltipMouseLeave}
            >
              <motion.div
                initial='hidden'
                animate='visible'
                exit='hidden'
                variants={variants[position]}
                transition={{ duration: 0.2 }}
                className={cn(
                  'relative p-2 rounded-lg shadow-lg bg-neutral-800 dark:bg-neutral-900 text-white text-sm',
                  positionClasses[position],
                  contentClassName,
                )}
              >
                {content}
                {arrow && (
                  <div
                    className={cn(
                      'absolute w-0 h-0 border-solid border-4 border-neutral-800 dark:border-neutral-900',
                      arrowClasses[position],
                    )}
                  />
                )}
              </motion.div>
            </div>
          </AnimatePresence>,
          document.body,
        )}
    </>
  )
}

// Kullanım örneği
export function TooltipExample() {
  return (
    <div className='p-8 flex flex-col items-center space-y-4'>
      <Tooltip content='Basit tooltip içeriği'>
        <button className='px-4 py-2 bg-primary-500 text-white rounded-md'>Hover Me</button>
      </Tooltip>

      <Tooltip
        content={
          <div className='p-2'>
            <h3 className='font-bold mb-1'>İnteraktif Tooltip</h3>
            <p>Tooltip içeriğinde daha fazla içerik ve hatta butonlar olabilir.</p>
            <button className='mt-2 px-3 py-1 bg-white text-neutral-800 rounded text-xs'>İşlem Yap</button>
          </div>
        }
        position='bottom'
        interactive={true}
        maxWidth={300}
      >
        <button className='px-4 py-2 bg-accent-500 text-white rounded-md'>İnteraktif Tooltip</button>
      </Tooltip>

      <Tooltip content='Click ile açılan tooltip' triggerOnClick={true} position='right'>
        <button className='px-4 py-2 bg-neutral-200 dark:bg-neutral-700 rounded-md'>Click Me</button>
      </Tooltip>
    </div>
  )
}
