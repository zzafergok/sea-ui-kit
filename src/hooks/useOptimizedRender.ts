'use client'

import { useCallback, useRef, useMemo, useState, useEffect } from 'react'

interface RenderMetrics {
  renderCount: number
  averageRenderTime: number
  lastRenderTime: number
  slowRenders: number
}

export function useOptimizedRender(componentName: string, threshold: number = 16) {
  const renderCountRef = useRef(0)
  const renderTimesRef = useRef<number[]>([])
  const startTimeRef = useRef<number>()
  const [metrics, setMetrics] = useState<RenderMetrics>({
    renderCount: 0,
    averageRenderTime: 0,
    lastRenderTime: 0,
    slowRenders: 0,
  })

  // Render başlangıcını kaydet
  startTimeRef.current = performance.now()

  useEffect(() => {
    if (startTimeRef.current) {
      const renderTime = performance.now() - startTimeRef.current
      renderCountRef.current++
      renderTimesRef.current.push(renderTime)

      // Son 100 render'ı tut
      if (renderTimesRef.current.length > 100) {
        renderTimesRef.current.shift()
      }

      const averageTime = renderTimesRef.current.reduce((a, b) => a + b, 0) / renderTimesRef.current.length
      const slowRenderCount = renderTimesRef.current.filter((time) => time > threshold).length

      setMetrics({
        renderCount: renderCountRef.current,
        averageRenderTime: Number(averageTime.toFixed(2)),
        lastRenderTime: Number(renderTime.toFixed(2)),
        slowRenders: slowRenderCount,
      })

      if (process.env.NODE_ENV === 'development' && renderTime > threshold) {
        console.warn(`🐌 ${componentName} slow render: ${renderTime.toFixed(2)}ms`)
      }
    }
  })

  const resetMetrics = useCallback(() => {
    renderCountRef.current = 0
    renderTimesRef.current = []
    setMetrics({
      renderCount: 0,
      averageRenderTime: 0,
      lastRenderTime: 0,
      slowRenders: 0,
    })
  }, [])

  return { metrics, resetMetrics }
}

export function useStableMemo<T>(value: T, deps: React.DependencyList): T {
  const stableRef = useRef<T>(value)
  const stableDeps = useRef<React.DependencyList>(deps)

  const hasChanged = useMemo(() => {
    return deps.some((dep, index) => !Object.is(dep, stableDeps.current[index]))
  }, deps)

  if (hasChanged) {
    stableRef.current = value
    stableDeps.current = deps
  }

  return stableRef.current
}
