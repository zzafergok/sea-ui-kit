import { useCallback, useEffect, useRef, useState, useMemo } from 'react'

/**
 * Component lifecycle hook
 * Class component lifecycle'ını function component'te simüle eder
 */
export function useComponentLifecycle({
  onMount,
  onUnmount,
  onUpdate,
}: {
  onMount?: () => void | (() => void)
  onUnmount?: () => void
  onUpdate?: (prevProps?: any, prevState?: any) => void
} = {}) {
  const mountedRef = useRef(false)
  const cleanupRef = useRef<(() => void) | null>(null)

  // Component did mount
  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true
      const cleanup = onMount?.()
      if (typeof cleanup === 'function') {
        cleanupRef.current = cleanup
      }
    }
  }, [onMount])

  // Component will unmount
  useEffect(() => {
    return () => {
      cleanupRef.current?.()
      onUnmount?.()
    }
  }, [onUnmount])

  // Component did update
  useEffect(() => {
    if (mountedRef.current) {
      onUpdate?.()
    }
  })

  return { isMounted: mountedRef.current }
}

/**
 * Instance methods simulation
 * Class component instance method'larını hook olarak kullanım
 */
export function useInstanceMethods<T extends Record<string, (...args: any[]) => any>>(methods: T): T {
  const methodsRef = useRef<T>(methods)

  // Update methods reference
  useEffect(() => {
    methodsRef.current = methods
  })

  // Create stable method references
  const stableMethods = useMemo(() => {
    const stable = {} as T

    Object.keys(methods).forEach((key) => {
      stable[key as keyof T] = ((...args: any[]) => {
        const method = methodsRef.current[key]
        if (typeof method === 'function') {
          return method(...args)
        }
        throw new Error(`Method ${key} is not a function`)
      }) as T[keyof T]
    })

    return stable
  }, []) // Empty deps to create once

  return stableMethods
}

/**
 * State with callback hook
 * Class component setState callback özelliğini hook olarak
 */
export function useStateWithCallback<T>(
  initialState: T | (() => T),
): [T, (newState: T | ((prev: T) => T), callback?: (newState: T) => void) => void] {
  const [state, setState] = useState(initialState)
  const callbackRef = useRef<((newState: T) => void) | null>(null)

  const setStateWithCallback = useCallback((newState: T | ((prev: T) => T), callback?: (newState: T) => void) => {
    callbackRef.current = callback || null
    setState(newState)
  }, [])

  useEffect(() => {
    if (callbackRef.current) {
      callbackRef.current(state)
      callbackRef.current = null
    }
  }, [state])

  return [state, setStateWithCallback]
}

/**
 * Force update hook
 * Class component forceUpdate özelliğini hook olarak
 */
export function useForceUpdate() {
  const [, setTick] = useState(0)

  const forceUpdate = useCallback(() => {
    setTick((tick) => tick + 1)
  }, [])

  return forceUpdate
}

/**
 * Component ref with forwarding
 * Class component ref handling için
 */
export function useComponentRef<T = HTMLElement>() {
  const ref = useRef<T | null>(null)

  const getRef = useCallback(() => ref.current, [])

  const setRef = useCallback((element: T | null) => {
    ref.current = element
  }, [])

  return { ref, getRef, setRef }
}

/**
 * Default props hook
 * Class component defaultProps özelliğini hook olarak
 */
export function useDefaultProps<T extends Record<string, any>>(props: T, defaultProps: Partial<T>): T {
  return useMemo(() => {
    return { ...defaultProps, ...props } as T
  }, [props, defaultProps])
}

/**
 * Component display name hook
 * Development ortamında component isimlerini takip etmek için
 */
export function useComponentDisplayName(displayName: string) {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.debug(`Component ${displayName} mounted`)

      return () => {
        console.debug(`Component ${displayName} unmounted`)
      }
    }
  }, [displayName])

  return displayName
}

/**
 * Component error catcher
 * Try-catch wrapper for component operations
 */
export function useComponentErrorCatcher() {
  const [error, setError] = useState<Error | null>(null)

  const catchError = useCallback(
    <T extends (...args: any[]) => any>(fn: T, fallback?: (...args: Parameters<T>) => ReturnType<T>) => {
      return ((...args: Parameters<T>) => {
        try {
          const result = fn(...args)

          // Handle promises
          if (result instanceof Promise) {
            return result.catch((err) => {
              setError(err)
              return fallback?.(...args)
            })
          }

          return result
        } catch (err) {
          setError(err as Error)
          return fallback?.(...args)
        }
      }) as T
    },
    [],
  )

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  return { error, catchError, clearError }
}

/**
 * Component performance tracker
 * Component render performance'ını takip etmek için
 */
export function useComponentPerformance(componentName: string) {
  const renderCount = useRef(0)
  const lastRenderTime = useRef(0)
  const mountTime = useRef(0)

  useEffect(() => {
    mountTime.current = performance.now()
  }, [])

  useEffect(() => {
    renderCount.current++
    const now = performance.now()

    if (process.env.NODE_ENV === 'development') {
      const renderTime = now - lastRenderTime.current

      if (renderCount.current > 1 && renderTime > 16) {
        console.warn(
          `[Performance] ${componentName} slow render: ${renderTime.toFixed(2)}ms (render #${renderCount.current})`,
        )
      }
    }

    lastRenderTime.current = now
  })

  const getPerformanceStats = useCallback(() => {
    return {
      renderCount: renderCount.current,
      mountTime: mountTime.current,
      lastRenderTime: lastRenderTime.current,
      totalLifetime: performance.now() - mountTime.current,
    }
  }, [])

  return { getPerformanceStats, renderCount: renderCount.current }
}

/**
 * Class-to-Function component converter utility
 * Mevcut class component'leri function component'e dönüştürmek için yardımcı
 */
export function convertClassToFunction<P extends object>(ClassComponent: React.ComponentClass<P>) {
  const FunctionComponent = (props: P) => {
    const instanceRef = useRef<React.Component<P> | null>(null)
    const [, forceUpdate] = useState({})

    // Create class instance
    useEffect(() => {
      const instance = new ClassComponent(props, {})

      // Override setState to trigger re-render
      const originalSetState = instance.setState.bind(instance)
      instance.setState = (updater, callback) => {
        originalSetState(updater, () => {
          forceUpdate({})
          callback?.()
        })
      }

      instanceRef.current = instance

      // Call lifecycle methods
      instance.componentDidMount?.()

      return () => {
        instance.componentWillUnmount?.()
      }
    }, [])

    // Update props
    useEffect(() => {
      if (instanceRef.current) {
        const prevProps = instanceRef.current.props
        const prevState = instanceRef.current.state

        // Create new instance with updated props
        const newInstance = new ClassComponent(props, {})
        newInstance.state = prevState

        // Override setState to trigger re-render
        const originalSetState = newInstance.setState.bind(newInstance)
        newInstance.setState = (updater, callback) => {
          originalSetState(updater, () => {
            forceUpdate({})
            callback?.()
          })
        }

        instanceRef.current = newInstance
        instanceRef.current.componentDidUpdate?.(prevProps, prevState)
      }
    }, [props])

    // Render
    if (!instanceRef.current) {
      return null
    }

    return instanceRef.current.render()
  }

  FunctionComponent.displayName = `Converted(${ClassComponent.displayName || ClassComponent.name})`

  return FunctionComponent
}

export default {
  useComponentLifecycle,
  useInstanceMethods,
  useStateWithCallback,
  useForceUpdate,
  useComponentRef,
  useDefaultProps,
  useComponentDisplayName,
  useComponentErrorCatcher,
  useComponentPerformance,
  convertClassToFunction,
}
