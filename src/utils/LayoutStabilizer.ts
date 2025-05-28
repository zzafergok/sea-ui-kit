/**
 * Enhanced Layout stabilization utility with precise scrollbar handling
 * Prevents unwanted padding issues during dropdown operations
 */
export class LayoutStabilizer {
  private static originalBodyStyle: string = ''
  private static isStabilized: boolean = false
  private static activeDropdowns: Set<string> = new Set()
  private static scrollbarWidth: number | null = null

  /**
   * Get scrollbar width with caching
   */
  private static getScrollbarWidth(): number {
    if (this.scrollbarWidth !== null) {
      return this.scrollbarWidth
    }

    if (typeof window === 'undefined') {
      this.scrollbarWidth = 0
      return 0
    }

    // Check if there's actually a scrollbar present
    const hasVerticalScrollbar = document.documentElement.scrollHeight > window.innerHeight
    if (!hasVerticalScrollbar) {
      this.scrollbarWidth = 0
      return 0
    }

    // Create temporary elements to measure scrollbar width
    const outer = document.createElement('div')
    outer.style.cssText = 'visibility:hidden;overflow:scroll;width:100px;height:100px;position:absolute;top:-9999px'
    document.body.appendChild(outer)

    const inner = document.createElement('div')
    inner.style.width = '100%'
    outer.appendChild(inner)

    const scrollbarWidth = outer.offsetWidth - inner.offsetWidth
    document.body.removeChild(outer)

    this.scrollbarWidth = scrollbarWidth
    return scrollbarWidth
  }

  /**
   * Stabilize layout only when necessary
   */
  static stabilizeLayout(dropdownId: string): void {
    this.activeDropdowns.add(dropdownId)

    if (this.isStabilized) return

    if (typeof window === 'undefined' || typeof document === 'undefined') return

    const body = document.body
    const html = document.documentElement

    // Only apply stabilization if there's actual scrollbar and content overflow
    const hasScrollbar = html.scrollHeight > window.innerHeight

    if (!hasScrollbar) {
      this.isStabilized = true
      return
    }

    // Store original styles
    this.originalBodyStyle = body.style.cssText

    const scrollbarWidth = this.getScrollbarWidth()

    // Only apply padding if scrollbar width is significant
    if (scrollbarWidth > 0) {
      // Apply stabilization with more specific targeting
      body.style.overflow = 'hidden'

      // Set CSS custom property for components that need scrollbar compensation
      document.documentElement.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`)

      // Handle fixed positioned elements more selectively
      const fixedElements = document.querySelectorAll('[data-fixed-compensation]')
      fixedElements.forEach((element) => {
        const htmlElement = element as HTMLElement
        const currentRight = parseInt(window.getComputedStyle(htmlElement).right) || 0
        htmlElement.style.right = `${currentRight + scrollbarWidth}px`
        htmlElement.setAttribute('data-original-right', currentRight.toString())
      })
    }

    this.isStabilized = true
  }

  /**
   * Restore layout with proper cleanup
   */
  static restoreLayout(dropdownId: string): void {
    this.activeDropdowns.delete(dropdownId)

    // Only restore if no active dropdowns remain
    if (this.activeDropdowns.size > 0) return

    if (!this.isStabilized) return

    if (typeof window === 'undefined' || typeof document === 'undefined') return

    const body = document.body

    // Restore original body styles
    body.style.cssText = this.originalBodyStyle

    // Remove CSS custom property
    document.documentElement.style.removeProperty('--scrollbar-width')

    // Restore fixed positioned elements
    const fixedElements = document.querySelectorAll('[data-original-right]')
    fixedElements.forEach((element) => {
      const htmlElement = element as HTMLElement
      const originalRight = htmlElement.getAttribute('data-original-right')
      if (originalRight !== null) {
        htmlElement.style.right = originalRight === '0' ? '' : `${originalRight}px`
        htmlElement.removeAttribute('data-original-right')
      }
    })

    this.isStabilized = false
    this.scrollbarWidth = null // Reset cache
  }

  /**
   * Check if stabilization is needed
   */
  static needsStabilization(): boolean {
    if (typeof window === 'undefined') return false
    return document.documentElement.scrollHeight > window.innerHeight
  }

  /**
   * Force layout recalculation without affecting padding
   */
  static forceReflow(): void {
    if (typeof document === 'undefined') return
    // Use a more subtle approach that doesn't trigger layout issues
    requestAnimationFrame(() => {
      void document.body.offsetHeight
    })
  }
}
