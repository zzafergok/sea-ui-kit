'use client'

import React, { Component, ErrorInfo, ReactNode } from 'react'

import { AlertTriangle, RefreshCw, Home, Bug } from 'lucide-react'

import { Button } from '@/components/core/Button/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/core/Card/Card'

interface Props {
  children: ReactNode
  fallback?: ReactNode
  onError?: (error: Error, errorInfo: ErrorInfo) => void
  enableReporting?: boolean
  enableAutoRecovery?: boolean
  recoveryTimeout?: number
}

interface State {
  hasError: boolean
  error: Error | null
  errorInfo: ErrorInfo | null
  errorId: string | null
  retryCount: number
  isAutoRecovering: boolean
}

export class GlobalErrorBoundary extends Component<Props, State> {
  private autoRecoveryTimer: NodeJS.Timeout | null = null
  private maxRetries = 3

  constructor(props: Props) {
    super(props)

    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: null,
      retryCount: 0,
      isAutoRecovering: false,
    }
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    const errorId = `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    return {
      hasError: true,
      error,
      errorId,
    }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ errorInfo })

    // Error reporting
    if (this.props.onError) {
      this.props.onError(error, errorInfo)
    }

    // Auto-recovery mechanism
    if (this.props.enableAutoRecovery && this.state.retryCount < this.maxRetries) {
      this.startAutoRecovery()
    }

    // Development logging
    if (process.env.NODE_ENV === 'development') {
      console.group('🚨 Global Error Boundary - Error Caught')
      console.error('Error:', error)
      console.error('Error Info:', errorInfo)
      console.error('Component Stack:', errorInfo.componentStack)
      console.groupEnd()
    }

    // Production error reporting
    if (process.env.NODE_ENV === 'production' && this.props.enableReporting) {
      this.reportError(error, errorInfo)
    }
  }

  componentWillUnmount() {
    if (this.autoRecoveryTimer) {
      clearTimeout(this.autoRecoveryTimer)
    }
  }

  private startAutoRecovery = () => {
    if (this.autoRecoveryTimer) {
      clearTimeout(this.autoRecoveryTimer)
    }

    this.setState({ isAutoRecovering: true })

    this.autoRecoveryTimer = setTimeout(() => {
      this.setState((prevState) => ({
        hasError: false,
        error: null,
        errorInfo: null,
        errorId: null,
        retryCount: prevState.retryCount + 1,
        isAutoRecovering: false,
      }))
    }, this.props.recoveryTimeout || 3000)
  }

  private reportError = async (error: Error, errorInfo: ErrorInfo) => {
    try {
      // Gerçek projede burada error tracking servisi kullanılır
      // Örnek: Sentry, LogRocket, Bugsnag, vb.
      const errorReport = {
        message: error.message,
        stack: error.stack,
        componentStack: errorInfo.componentStack,
        errorId: this.state.errorId,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        url: window.location.href,
        userId: localStorage.getItem('userId') || 'anonymous',
      }

      // Mock error reporting
      console.log('Error reported:', errorReport)

      // Gerçek kullanımda:
      // await fetch('/api/errors', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(errorReport)
      // })
    } catch (reportingError) {
      console.error('Failed to report error:', reportingError)
    }
  }

  private handleRetry = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: null,
      retryCount: 0,
      isAutoRecovering: false,
    })
  }

  private handleGoHome = () => {
    window.location.href = '/'
  }

  private handleReportIssue = () => {
    const errorDetails = {
      message: this.state.error?.message || 'Unknown error',
      stack: this.state.error?.stack || '',
      errorId: this.state.errorId,
      timestamp: new Date().toISOString(),
    }

    const githubUrl = `https://github.com/zzafergok/sea-ui-kit/issues/new?title=Error Report: ${encodeURIComponent(errorDetails.message)}&body=${encodeURIComponent(`**Error ID:** ${errorDetails.errorId}\n**Timestamp:** ${errorDetails.timestamp}\n**Message:** ${errorDetails.message}\n\n**Steps to reproduce:**\n1. \n2. \n3. \n\n**Additional context:**\n`)}`

    window.open(githubUrl, '_blank')
  }

  private getErrorSeverity = (error: Error): 'low' | 'medium' | 'high' | 'critical' => {
    const message = error.message.toLowerCase()

    if (message.includes('chunk') || message.includes('loading')) return 'low'
    if (message.includes('network') || message.includes('fetch')) return 'medium'
    if (message.includes('syntax') || message.includes('reference')) return 'high'

    return 'critical'
  }

  private getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low':
        return 'text-yellow-600 dark:text-yellow-400'
      case 'medium':
        return 'text-orange-600 dark:text-orange-400'
      case 'high':
        return 'text-red-600 dark:text-red-400'
      case 'critical':
        return 'text-red-700 dark:text-red-300'
      default:
        return 'text-neutral-600 dark:text-neutral-400'
    }
  }

  render() {
    if (this.state.hasError) {
      // Custom fallback UI varsa onu göster
      if (this.props.fallback) {
        return this.props.fallback
      }

      const severity = this.state.error ? this.getErrorSeverity(this.state.error) : 'medium'
      const canRetry = this.state.retryCount < this.maxRetries

      return (
        <div className='min-h-screen bg-neutral-50 dark:bg-neutral-900 flex items-center justify-center p-4'>
          <Card className='w-full max-w-2xl'>
            <CardHeader className='text-center'>
              <div className='flex justify-center mb-4'>
                <div className='p-3 bg-red-100 dark:bg-red-900/20 rounded-full'>
                  <AlertTriangle className='h-8 w-8 text-red-600 dark:text-red-400' />
                </div>
              </div>
              <CardTitle className='text-2xl font-bold text-neutral-900 dark:text-neutral-100'>
                Beklenmeyen Bir Hata Oluştu
              </CardTitle>
              <p className='text-neutral-600 dark:text-neutral-400 mt-2'>
                Uygulama beklenmeyen bir hatayla karşılaştı. Aşağıdaki seçenekleri deneyebilirsiniz.
              </p>
            </CardHeader>

            <CardContent className='space-y-6'>
              {/* Error Details */}
              <div className='bg-neutral-100 dark:bg-neutral-800 rounded-lg p-4'>
                <div className='flex items-center justify-between mb-2'>
                  <h4 className='font-medium text-neutral-900 dark:text-neutral-100'>Hata Detayları</h4>
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded ${this.getSeverityColor(severity)} bg-current bg-opacity-10`}
                  >
                    {severity.toUpperCase()}
                  </span>
                </div>

                {this.state.error && (
                  <div className='space-y-2'>
                    <p className='text-sm text-neutral-700 dark:text-neutral-300 font-mono'>
                      {this.state.error.message}
                    </p>
                    {this.state.errorId && (
                      <p className='text-xs text-neutral-500 dark:text-neutral-400'>Hata ID: {this.state.errorId}</p>
                    )}
                  </div>
                )}
              </div>

              {/* Auto Recovery Info */}
              {this.state.isAutoRecovering && (
                <div className='flex items-center justify-center space-x-2 text-sm text-blue-600 dark:text-blue-400'>
                  <RefreshCw className='h-4 w-4 animate-spin' />
                  <span>Otomatik düzeltme deneniyor...</span>
                </div>
              )}

              {/* Retry Count */}
              {this.state.retryCount > 0 && (
                <p className='text-center text-sm text-neutral-500 dark:text-neutral-400'>
                  Deneme sayısı: {this.state.retryCount}/{this.maxRetries}
                </p>
              )}

              {/* Action Buttons */}
              <div className='flex flex-col sm:flex-row gap-3 justify-center'>
                {canRetry && (
                  <Button
                    onClick={this.handleRetry}
                    className='flex items-center gap-2'
                    disabled={this.state.isAutoRecovering}
                  >
                    <RefreshCw className={`h-4 w-4 ${this.state.isAutoRecovering ? 'animate-spin' : ''}`} />
                    Tekrar Dene
                  </Button>
                )}

                <Button variant='outline' onClick={this.handleGoHome} className='flex items-center gap-2'>
                  <Home className='h-4 w-4' />
                  Ana Sayfaya Dön
                </Button>

                <Button variant='ghost' onClick={this.handleReportIssue} className='flex items-center gap-2'>
                  <Bug className='h-4 w-4' />
                  Sorunu Bildir
                </Button>
              </div>

              {/* Development Info */}
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <details className='mt-6'>
                  <summary className='cursor-pointer text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100'>
                    Geliştirici Bilgileri (Sadece Development)
                  </summary>
                  <div className='mt-3 p-4 bg-neutral-900 dark:bg-neutral-800 rounded-lg text-xs font-mono text-green-400 overflow-auto max-h-64'>
                    <div className='space-y-2'>
                      <div>
                        <strong>Error Stack:</strong>
                        <pre className='mt-1 whitespace-pre-wrap'>{this.state.error.stack}</pre>
                      </div>
                      {this.state.errorInfo?.componentStack && (
                        <div>
                          <strong>Component Stack:</strong>
                          <pre className='mt-1 whitespace-pre-wrap'>{this.state.errorInfo.componentStack}</pre>
                        </div>
                      )}
                    </div>
                  </div>
                </details>
              )}
            </CardContent>
          </Card>
        </div>
      )
    }

    return this.props.children
  }
}

// Hook versiyonu (fonksiyonel bileşenler için)
export function useErrorBoundary() {
  const [error, setError] = React.useState<Error | null>(null)

  const resetError = React.useCallback(() => {
    setError(null)
  }, [])

  const captureError = React.useCallback((error: Error) => {
    setError(error)
  }, [])

  React.useEffect(() => {
    if (error) {
      throw error
    }
  }, [error])

  return { captureError, resetError }
}
