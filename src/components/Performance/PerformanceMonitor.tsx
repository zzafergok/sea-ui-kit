'use client'

import React, { memo, useEffect, useState } from 'react'
import { useOptimizedRender } from '@/hooks/useOptimizedRender'

interface PerformanceMonitorProps {
  children: React.ReactNode
  componentName?: string
  enableMetrics?: boolean
  threshold?: number
}

const PerformanceMonitorComponent = function PerformanceMonitor({
  children,
  componentName = 'Unknown',
  enableMetrics = process.env.NODE_ENV === 'development',
  threshold = 16,
}: PerformanceMonitorProps) {
  const { metrics, resetMetrics } = useOptimizedRender(componentName, threshold)
  const [showMetrics, setShowMetrics] = useState(false)

  useEffect(() => {
    if (enableMetrics && metrics.renderCount > 0) {
      const handleKeyPress = (e: KeyboardEvent) => {
        if (e.ctrlKey && e.shiftKey && e.key === 'P') {
          setShowMetrics((prev) => !prev)
        }
      }

      window.addEventListener('keydown', handleKeyPress)
      return () => window.removeEventListener('keydown', handleKeyPress)
    }
  }, [enableMetrics, metrics.renderCount])

  if (!enableMetrics) {
    return <>{children}</>
  }

  return (
    <>
      {children}
      {showMetrics && (
        <div className='fixed bottom-4 right-4 bg-black text-white p-4 rounded-lg text-xs font-mono z-50 max-w-xs'>
          <div className='flex justify-between items-center mb-2'>
            <h4 className='font-bold'>{componentName}</h4>
            <button onClick={() => setShowMetrics(false)} className='text-gray-400 hover:text-white'>
              ×
            </button>
          </div>
          <div className='space-y-1'>
            <div>Renders: {metrics.renderCount}</div>
            <div>Avg Time: {metrics.averageRenderTime}ms</div>
            <div>Last: {metrics.lastRenderTime}ms</div>
            <div>Slow: {metrics.slowRenders}</div>
          </div>
          <button onClick={resetMetrics} className='mt-2 text-xs bg-gray-700 px-2 py-1 rounded'>
            Reset
          </button>
        </div>
      )}
    </>
  )
}

export const PerformanceMonitor = memo(PerformanceMonitorComponent)
