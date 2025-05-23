import { useCallback } from 'react'

interface PerformanceMetric {
  name: string
  value: number
  timestamp: number
  url: string
  userAgent: string
}

interface ErrorReport {
  message: string
  stack?: string
  url: string
  timestamp: number
  userAgent: string
  userId?: string
  sessionId: string
}

class MonitoringService {
  private static instance: MonitoringService
  private performanceObserver?: PerformanceObserver
  private sessionId: string

  constructor() {
    this.sessionId = this.generateSessionId()
    this.initializePerformanceMonitoring()
    this.initializeErrorMonitoring()
  }

  static getInstance(): MonitoringService {
    if (!MonitoringService.instance) {
      MonitoringService.instance = new MonitoringService()
    }
    return MonitoringService.instance
  }

  private generateSessionId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  }

  private initializePerformanceMonitoring(): void {
    if (typeof window === 'undefined') return

    // Core Web Vitals monitoring
    this.observeCoreWebVitals()

    // Navigation timing
    this.observeNavigationTiming()

    // Resource timing
    this.observeResourceTiming()
  }

  private observeCoreWebVitals(): void {
    if (!('PerformanceObserver' in window)) return

    // LCP (Largest Contentful Paint)
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      const lastEntry = entries[entries.length - 1] as PerformanceEntry & {
        startTime: number
      }

      this.reportMetric({
        name: 'LCP',
        value: lastEntry.startTime,
        timestamp: Date.now(),
        url: window.location.href,
        userAgent: navigator.userAgent,
      })
    })

    try {
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })
    } catch {
      console.warn('LCP observation not supported')
    }

    // FID (First Input Delay)
    const fidObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      entries.forEach((entry: any) => {
        this.reportMetric({
          name: 'FID',
          value: entry.processingStart - entry.startTime,
          timestamp: Date.now(),
          url: window.location.href,
          userAgent: navigator.userAgent,
        })
      })
    })

    try {
      fidObserver.observe({ entryTypes: ['first-input'] })
    } catch {
      console.warn('FID observation not supported')
    }

    // CLS (Cumulative Layout Shift)
    let clsValue = 0
    const clsObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      entries.forEach((entry: any) => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value
        }
      })

      this.reportMetric({
        name: 'CLS',
        value: clsValue,
        timestamp: Date.now(),
        url: window.location.href,
        userAgent: navigator.userAgent,
      })
    })

    try {
      clsObserver.observe({ entryTypes: ['layout-shift'] })
    } catch {
      console.warn('CLS observation not supported')
    }

    // FCP (First Contentful Paint)
    const fcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      entries.forEach((entry) => {
        this.reportMetric({
          name: 'FCP',
          value: entry.startTime,
          timestamp: Date.now(),
          url: window.location.href,
          userAgent: navigator.userAgent,
        })
      })
    })

    try {
      fcpObserver.observe({ entryTypes: ['paint'] })
    } catch {
      console.warn('FCP observation not supported')
    }
  }

  private observeNavigationTiming(): void {
    if (typeof window === 'undefined') return

    window.addEventListener('load', () => {
      setTimeout(() => {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming

        if (navigation) {
          // Page load time
          const loadTime = navigation.loadEventEnd - navigation.fetchStart
          this.reportMetric({
            name: 'PageLoadTime',
            value: loadTime,
            timestamp: Date.now(),
            url: window.location.href,
            userAgent: navigator.userAgent,
          })

          // DOM Content Loaded
          const domContentLoaded = navigation.domContentLoadedEventEnd - navigation.fetchStart
          this.reportMetric({
            name: 'DOMContentLoaded',
            value: domContentLoaded,
            timestamp: Date.now(),
            url: window.location.href,
            userAgent: navigator.userAgent,
          })

          // DNS Lookup Time
          const dnsTime = navigation.domainLookupEnd - navigation.domainLookupStart
          this.reportMetric({
            name: 'DNSTime',
            value: dnsTime,
            timestamp: Date.now(),
            url: window.location.href,
            userAgent: navigator.userAgent,
          })
        }
      }, 0)
    })
  }

  private observeResourceTiming(): void {
    if (!('PerformanceObserver' in window)) return

    const resourceObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      entries.forEach((entry) => {
        const resourceEntry = entry as PerformanceResourceTiming
        // Sadece uzun süren kaynakları rapor et
        if (resourceEntry.duration > 1000) {
          this.reportMetric({
            name: 'SlowResource',
            value: resourceEntry.duration,
            timestamp: Date.now(),
            url: resourceEntry.name,
            userAgent: navigator.userAgent,
          })
        }
      })
    })

    try {
      resourceObserver.observe({ entryTypes: ['resource'] })
    } catch {
      console.warn('Resource timing observation not supported')
    }
  }

  private initializeErrorMonitoring(): void {
    if (typeof window === 'undefined') return

    // Global error handler
    window.addEventListener('error', (event) => {
      this.reportError({
        message: event.message,
        stack: event.error?.stack,
        url: event.filename || window.location.href,
        timestamp: Date.now(),
        userAgent: navigator.userAgent,
        sessionId: this.sessionId,
      })
    })

    // Unhandled promise rejection handler
    window.addEventListener('unhandledrejection', (event) => {
      this.reportError({
        message: event.reason?.message || 'Unhandled Promise Rejection',
        stack: event.reason?.stack,
        url: window.location.href,
        timestamp: Date.now(),
        userAgent: navigator.userAgent,
        sessionId: this.sessionId,
      })
    })
  }

  private reportMetric(metric: PerformanceMetric): void {
    if (process.env.NODE_ENV === 'development') {
      console.log('Performance Metric:', metric)
    }

    // Production ortamında analytics service'e gönder
    if (process.env.NODE_ENV === 'production') {
      this.sendToAnalytics('performance', metric)
    }
  }

  private reportError(error: ErrorReport): void {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error Report:', error)
    }

    // Production ortamında error reporting service'e gönder
    if (process.env.NODE_ENV === 'production') {
      this.sendToAnalytics('error', error)
    }
  }

  private async sendToAnalytics(type: 'performance' | 'error', data: any): Promise<void> {
    try {
      await fetch('/api/analytics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type,
          data,
          sessionId: this.sessionId,
        }),
      })
    } catch (error) {
      console.warn('Analytics reporting failed:', error)
    }
  }

  // Memory usage monitoring
  public getMemoryUsage(): any {
    if ('memory' in performance) {
      return {
        usedJSHeapSize: (performance as any).memory.usedJSHeapSize,
        totalJSHeapSize: (performance as any).memory.totalJSHeapSize,
        jsHeapSizeLimit: (performance as any).memory.jsHeapSizeLimit,
      }
    }
    return null
  }

  // Network information
  public getNetworkInfo(): any {
    if ('connection' in navigator) {
      const connection = (navigator as any).connection
      return {
        effectiveType: connection.effectiveType,
        downlink: connection.downlink,
        rtt: connection.rtt,
        saveData: connection.saveData,
      }
    }
    return null
  }

  // Custom event tracking
  public trackCustomEvent(eventName: string, data?: any): void {
    this.reportMetric({
      name: `custom:${eventName}`,
      value: data?.value || 1,
      timestamp: Date.now(),
      url: window.location.href,
      userAgent: navigator.userAgent,
    })
  }

  // User interaction tracking
  public trackUserInteraction(element: string, action: string): void {
    this.trackCustomEvent('user_interaction', {
      element,
      action,
      timestamp: Date.now(),
    })
  }
}

export const monitoring = MonitoringService.getInstance()

// React hook for monitoring
export function useMonitoring() {
  const trackEvent = useCallback((eventName: string, data?: any) => {
    monitoring.trackCustomEvent(eventName, data)
  }, [])

  const trackInteraction = useCallback((element: string, action: string) => {
    monitoring.trackUserInteraction(element, action)
  }, [])

  const getPerformanceInfo = useCallback(() => {
    return {
      memory: monitoring.getMemoryUsage(),
      network: monitoring.getNetworkInfo(),
    }
  }, [])

  return {
    trackEvent,
    trackInteraction,
    getPerformanceInfo,
  }
}
