'use client'

import { useEffect, useRef } from 'react'

interface UseA11yOptions {
  announceOnMount?: string
  focusOnMount?: boolean
  trapFocus?: boolean
  restoreFocus?: boolean
}

export function useA11y({
  announceOnMount,
  focusOnMount = false,
  trapFocus = false,
  restoreFocus = false,
}: UseA11yOptions = {}) {
  const containerRef = useRef<HTMLElement>(null)
  const previouslyFocusedElement = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (announceOnMount) {
      announceToScreenReader(announceOnMount)
    }

    if (focusOnMount && containerRef.current) {
      containerRef.current.focus()
    }

    if (restoreFocus) {
      previouslyFocusedElement.current = document.activeElement as HTMLElement
    }

    return () => {
      if (restoreFocus && previouslyFocusedElement.current) {
        previouslyFocusedElement.current.focus()
      }
    }
  }, [announceOnMount, focusOnMount, restoreFocus])

  useEffect(() => {
    if (!trapFocus || !containerRef.current) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Tab') {
        trapFocusInContainer(event, containerRef.current!)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [trapFocus])

  return { containerRef }
}

function announceToScreenReader(message: string) {
  const announcement = document.createElement('div')
  announcement.setAttribute('aria-live', 'polite')
  announcement.setAttribute('aria-atomic', 'true')
  announcement.setAttribute('class', 'sr-only')
  announcement.textContent = message

  document.body.appendChild(announcement)

  setTimeout(() => {
    document.body.removeChild(announcement)
  }, 1000)
}

function trapFocusInContainer(event: KeyboardEvent, container: HTMLElement) {
  const focusableElements = container.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
  )

  const firstElement = focusableElements[0] as HTMLElement
  const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

  if (event.shiftKey) {
    if (document.activeElement === firstElement) {
      lastElement.focus()
      event.preventDefault()
    }
  } else {
    if (document.activeElement === lastElement) {
      firstElement.focus()
      event.preventDefault()
    }
  }
}
