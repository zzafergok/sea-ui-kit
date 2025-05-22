import { useCallback, useRef, useEffect, useState } from 'react'

/**
 * Performance Monitor Hook
 * Component render sürelerini ölçer
 */
export function usePerformanceMonitor(componentName: string) {
  const renderStartTime = useRef<number>()
  const renderCount = useRef(0)

  useEffect(() => {
    renderStartTime.current = performance.now()
    renderCount.current++
  })

  useEffect(() => {
    if (renderStartTime.current) {
      const renderTime = performance.now() - renderStartTime.current

      if (process.env.NODE_ENV === 'development') {
        console.log(`[Performance] ${componentName} render #${renderCount.current}: ${renderTime.toFixed(2)}ms`)

        if (renderTime > 16) {
          // 60fps threshold
          console.warn(`[Performance] Slow render detected in ${componentName}: ${renderTime.toFixed(2)}ms`)
        }
      }
    }
  })

  return {
    renderCount: renderCount.current,
  }
}

/**
 * Debounced Hook
 * Değer değişikliklerini debounce eder
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

/**
 * Throttled Hook
 * Fonksiyon çağrılarını throttle eder
 */
export function useThrottle<T extends (...args: any[]) => any>(callback: T, delay: number): T {
  const lastRun = useRef(Date.now())

  return useCallback(
    ((...args) => {
      if (Date.now() - lastRun.current >= delay) {
        callback(...args)
        lastRun.current = Date.now()
      }
    }) as T,
    [callback, delay],
  )
}

/**
 * Memoized Callback Hook
 * Stable callback referansı sağlar
 */
export function useStableCallback<T extends (...args: any[]) => any>(callback: T): T {
  const callbackRef = useRef(callback)

  useEffect(() => {
    callbackRef.current = callback
  })

  return useCallback(((...args) => callbackRef.current(...args)) as T, [])
}

/**
 * Previous Value Hook
 * Önceki render'daki değeri tutar
 */
export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>()

  useEffect(() => {
    ref.current = value
  })

  return ref.current
}

/**
 * Force Update Hook
 * Component'i force update eder
 */
export function useForceUpdate() {
  const [, setTick] = useState(0)

  return useCallback(() => {
    setTick((tick) => tick + 1)
  }, [])
}

/**
 * Intersection Observer Hook
 * Element görünürlüğünü izler
 */
export function useIntersectionObserver(ref: React.RefObject<Element>, options: IntersectionObserverInit = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null)

  useEffect(() => {
    if (!ref.current) return

    const observer = new IntersectionObserver(([entry]) => {
      if (entry) {
        setIsIntersecting(entry.isIntersecting)
        setEntry(entry)
      }
    }, options)

    observer.observe(ref.current)

    return () => observer.disconnect()
  }, [ref, options])

  return { isIntersecting, entry }
}

/**
 * Media Query Hook
 * CSS media query'leri izler
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia(query)
    setMatches(mediaQuery.matches)

    const handler = (event: MediaQueryListEvent) => {
      setMatches(event.matches)
    }

    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [query])

  return matches
}

/**
 * Window Size Hook
 * Pencere boyutunu izler
 */
export function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  })

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return windowSize
}

/**
 * Optimized State Hook
 * State güncellemelerini optimize eder
 */
export function useOptimizedState<T>(initialValue: T, compareFn?: (prev: T, next: T) => boolean) {
  const [state, setState] = useState(initialValue)

  const setOptimizedState = useCallback(
    (newValue: T | ((prev: T) => T)) => {
      setState((prevState) => {
        const nextState = typeof newValue === 'function' ? (newValue as (prev: T) => T)(prevState) : newValue

        // Custom compare function varsa kullan
        if (compareFn) {
          return compareFn(prevState, nextState) ? prevState : nextState
        }

        // Shallow comparison
        if (typeof nextState === 'object' && nextState !== null) {
          return JSON.stringify(prevState) === JSON.stringify(nextState) ? prevState : nextState
        }

        return prevState === nextState ? prevState : nextState
      })
    },
    [compareFn],
  )

  return [state, setOptimizedState] as const
}
