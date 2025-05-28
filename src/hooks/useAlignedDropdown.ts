'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

interface DropdownPosition {
  top: number
  left: number
  right: number | string
  width: number
  maxHeight: number
}

interface UseAlignedDropdownOptions {
  align?: 'left' | 'right' | 'center'
  onOpenChange?: (open: boolean) => void
  offset?: number
  matchTriggerWidth?: boolean
  maxHeight?: number
}

export function useAlignedDropdown(options: UseAlignedDropdownOptions = {}) {
  const { align = 'left', onOpenChange, offset = 4, matchTriggerWidth = true, maxHeight = 300 } = options

  const [isOpen, setIsOpen] = useState(false)
  const [position, setPosition] = useState<DropdownPosition | null>(null)

  const triggerRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLElement>(null)

  const calculatePosition = useCallback(() => {
    if (!triggerRef.current || !isOpen) return null

    const triggerRect = triggerRef.current.getBoundingClientRect()
    const viewport = {
      width: window.innerWidth,
      height: window.innerHeight,
      scrollX: window.scrollX,
      scrollY: window.scrollY,
    }

    let left = 0
    const right = 'auto'
    const top = triggerRect.bottom + viewport.scrollY + offset
    const width = matchTriggerWidth ? triggerRect.width : 'auto'

    // Hizalama hesaplaması
    switch (align) {
      case 'left':
        left = triggerRect.left + viewport.scrollX
        // Sağ kenara taşma kontrolü
        if (left + triggerRect.width > viewport.width) {
          left = viewport.width - triggerRect.width - 8
        }
        break

      case 'right':
        left = triggerRect.right + viewport.scrollX - (matchTriggerWidth ? triggerRect.width : 200)
        // Sol kenara taşma kontrolü
        if (left < 8) {
          left = 8
        }
        break

      case 'center':
        left =
          triggerRect.left +
          viewport.scrollX +
          triggerRect.width / 2 -
          (matchTriggerWidth ? triggerRect.width / 2 : 100)
        break
    }

    // Alt kenara taşma kontrolü
    const availableHeight = viewport.height - (triggerRect.bottom + offset) - 16
    const calculatedMaxHeight = Math.min(maxHeight, availableHeight)

    return {
      top,
      left: Math.max(8, left), // Minimum 8px margin
      right,
      width: typeof width === 'number' ? width : triggerRect.width,
      maxHeight: Math.max(100, calculatedMaxHeight), // Minimum 100px height
    }
  }, [isOpen, align, offset, matchTriggerWidth, maxHeight])

  const handleOpenChange = useCallback(
    (open: boolean) => {
      setIsOpen(open)
      onOpenChange?.(open)

      if (open) {
        // Position hesaplamasını bir sonraki frame'e ertele
        requestAnimationFrame(() => {
          const newPosition = calculatePosition()
          setPosition(newPosition)
        })
      } else {
        setPosition(null)
      }
    },
    [onOpenChange, calculatePosition],
  )

  // Resize ve scroll event handlers
  useEffect(() => {
    if (!isOpen) return

    const updatePosition = () => {
      const newPosition = calculatePosition()
      setPosition(newPosition)
    }

    const handleResize = () => updatePosition()
    const handleScroll = () => updatePosition()

    window.addEventListener('resize', handleResize)
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [isOpen, calculatePosition])

  // Click outside handler
  useEffect(() => {
    if (!isOpen) return

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node

      if (
        contentRef.current &&
        triggerRef.current &&
        !contentRef.current.contains(target) &&
        !triggerRef.current.contains(target)
      ) {
        handleOpenChange(false)
      }
    }

    const timeoutId = setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside, { capture: true })
    }, 0)

    return () => {
      clearTimeout(timeoutId)
      document.removeEventListener('mousedown', handleClickOutside, { capture: true })
    }
  }, [isOpen, handleOpenChange])

  // Escape key handler
  useEffect(() => {
    if (!isOpen) return

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleOpenChange(false)
        triggerRef.current?.focus()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, handleOpenChange])

  return {
    isOpen,
    position,
    setIsOpen: handleOpenChange,
    triggerRef,
    contentRef,
  }
}
