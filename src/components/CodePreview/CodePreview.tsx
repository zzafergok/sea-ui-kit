'use client'

import React, { useState, useCallback } from 'react'
import { Button } from '@/components/Button/Button'
import { Card, CardContent } from '@/components/Card/Card'
import { Tabs, TabsList, TabsTrigger } from '@/components/Tabs/Tabs'
import { Copy, Check, Download, Maximize2, Minimize2, Code2, Eye, RefreshCw, ExternalLink } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAppDispatch } from '@/store'
import { showToast } from '@/store/slices/toastSlice'

interface CodePreviewProps {
  code: string
  preview: React.ReactNode
  language?: string
  title?: string
  description?: string
  fileName?: string
  showLineNumbers?: boolean
  maxHeight?: string
  className?: string
  tabs?: Array<{
    id: string
    label: string
    code: string
    language?: string
  }>
}

export function CodePreview({
  code,
  preview,
  language = 'tsx',
  title,
  description,
  fileName,
  showLineNumbers = true,
  maxHeight = '400px',
  className,
  tabs = [],
}: CodePreviewProps) {
  const dispatch = useAppDispatch()
  const [activeTab, setActiveTab] = useState('preview')
  const [activeCodeTab, setActiveCodeTab] = useState(tabs.length > 0 ? tabs[0].id : 'main')
  const [copied, setCopied] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [key, setKey] = useState(0)

  const getCurrentCode = useCallback(() => {
    if (tabs.length > 0) {
      const currentTab = tabs.find((tab) => tab.id === activeCodeTab)
      return currentTab?.code || code
    }
    return code
  }, [code, tabs, activeCodeTab])

  const handleCopyCode = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(getCurrentCode())
      setCopied(true)
      dispatch(
        showToast({
          type: 'success',
          title: 'Başarılı',
          message: 'Kod panoya kopyalandı',
          duration: 2000,
        }),
      )
      setTimeout(() => setCopied(false), 2000)
    } catch {
      dispatch(
        showToast({
          type: 'error',
          title: 'Hata',
          message: 'Kod kopyalanamadı',
          duration: 3000,
        }),
      )
    }
  }, [getCurrentCode, dispatch])

  const handleDownloadCode = useCallback(() => {
    const codeToDownload = getCurrentCode()
    const fileName = `component.${language}`
    const blob = new Blob([codeToDownload], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = fileName
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }, [getCurrentCode, language])

  const handleRefresh = useCallback(() => {
    setKey((prev) => prev + 1)
    dispatch(
      showToast({
        type: 'info',
        title: 'Yenilendi',
        message: 'Önizleme yeniden yüklendi',
        duration: 2000,
      }),
    )
  }, [dispatch])

  const formatCode = useCallback((codeString: string) => {
    return codeString.split('\n').map((line, index) => ({
      number: index + 1,
      content: line,
    }))
  }, [])

  return (
    <Card className={cn('overflow-hidden', className)}>
      {/* Header */}
      {(title || description) && (
        <div className='px-4 py-3 border-b border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/50'>
          {title && <h3 className='font-medium text-neutral-900 dark:text-neutral-100 mb-1'>{title}</h3>}
          {description && <p className='text-sm text-neutral-600 dark:text-neutral-400'>{description}</p>}
        </div>
      )}

      {/* Tabs and Controls */}
      <div className='flex items-center justify-between px-4 py-2 border-b border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900'>
        <Tabs value={activeTab} onValueChange={setActiveTab} className='flex-1'>
          <TabsList className='grid grid-cols-2 w-fit'>
            <TabsTrigger value='preview' className='flex items-center gap-2'>
              <Eye className='h-4 w-4' />
              <span className='hidden sm:inline'>Önizleme</span>
            </TabsTrigger>
            <TabsTrigger value='code' className='flex items-center gap-2'>
              <Code2 className='h-4 w-4' />
              <span className='hidden sm:inline'>Kod</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className='flex items-center gap-2'>
          {activeTab === 'preview' && (
            <Button variant='ghost' size='sm' onClick={handleRefresh} className='p-2'>
              <RefreshCw className='h-4 w-4' />
            </Button>
          )}

          <Button variant='ghost' size='sm' onClick={() => setIsExpanded(!isExpanded)} className='p-2'>
            {isExpanded ? <Minimize2 className='h-4 w-4' /> : <Maximize2 className='h-4 w-4' />}
          </Button>

          <Button variant='ghost' size='sm' onClick={handleCopyCode} className='p-2'>
            {copied ? <Check className='h-4 w-4 text-green-500' /> : <Copy className='h-4 w-4' />}
          </Button>

          <Button variant='ghost' size='sm' onClick={handleDownloadCode} className='p-2'>
            <Download className='h-4 w-4' />
          </Button>
        </div>
      </div>

      {/* Content */}
      <CardContent className='p-0'>
        <div className={cn('transition-all duration-300', isExpanded ? 'min-h-[600px]' : 'min-h-[300px]')}>
          {activeTab === 'preview' && (
            <div
              key={key}
              className='p-6 bg-neutral-50 dark:bg-neutral-900 flex items-center justify-center'
              style={{ minHeight: isExpanded ? '600px' : '300px' }}
            >
              <div className='w-full flex items-center justify-center'>{preview}</div>
            </div>
          )}

          {activeTab === 'code' && (
            <div className='relative'>
              {/* Code Tabs */}
              {tabs.length > 0 && (
                <div className='px-4 py-2 border-b border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800'>
                  <div className='flex gap-2 overflow-x-auto'>
                    <Button
                      variant={activeCodeTab === 'main' ? 'default' : 'ghost'}
                      size='sm'
                      onClick={() => setActiveCodeTab('main')}
                    >
                      {fileName || 'Component.tsx'}
                    </Button>
                    {tabs.map((tab) => (
                      <Button
                        key={tab.id}
                        variant={activeCodeTab === tab.id ? 'default' : 'ghost'}
                        size='sm'
                        onClick={() => setActiveCodeTab(tab.id)}
                      >
                        {tab.label}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Code Content */}
              <div
                className='overflow-auto bg-neutral-900 text-neutral-100'
                style={{
                  maxHeight: isExpanded ? '600px' : maxHeight,
                  minHeight: isExpanded ? '600px' : '300px',
                }}
              >
                <pre className='p-4 text-sm leading-relaxed'>
                  <code>
                    {showLineNumbers ? (
                      <div className='space-y-0'>
                        {formatCode(getCurrentCode()).map((line, index: number) => (
                          <div key={index} className='flex'>
                            <span className='select-none text-neutral-500 mr-4 text-right w-8 flex-shrink-0'>
                              {line.number}
                            </span>
                            <span className='flex-1'>{line.content}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      getCurrentCode()
                    )}
                  </code>
                </pre>

                {/* Code Footer */}
                <div className='px-4 py-2 border-t border-neutral-700 bg-neutral-800 flex items-center justify-between text-xs text-neutral-400'>
                  <div className='flex items-center gap-4'>
                    <span>Language: {language.toUpperCase()}</span>
                    <span>Lines: {getCurrentCode().split('\n').length}</span>
                    <span>Size: {new Blob([getCurrentCode()]).size} bytes</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <Button variant='ghost' size='sm' onClick={handleCopyCode} className='text-xs h-6 px-2'>
                      {copied ? 'Kopyalandı!' : 'Kopyala'}
                    </Button>
                    <Button variant='ghost' size='sm' className='text-xs h-6 px-2'>
                      <ExternalLink className='h-3 w-3 mr-1' />
                      CodeSandbox
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
