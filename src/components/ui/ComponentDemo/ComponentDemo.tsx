'use client'

import React, { useState } from 'react'

import { Copy, Check, Maximize2, X } from 'lucide-react'

import { Badge } from '@/components/core/Badge/Badge'
import { Button } from '@/components/core/Button/Button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/core/Tabs/Tabs'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/core/Dialog/Dialog'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/core/Card/Card'

import { cn } from '@/lib/utils'

interface ComponentDemoProps {
  title: string
  description: string
  category: string
  status?: 'stable' | 'beta' | 'alpha' | 'deprecated'
  demoComponent: React.ReactNode
  code: string
  usageExamples?: Array<{
    title: string
    description: string
    code: string
    component?: React.ReactNode
  }>
  props?: Array<{
    name: string
    type: string
    description: string
    default?: string
    required?: boolean
  }>
}

export function ComponentDemo({
  title,
  description,
  category,
  status = 'stable',
  demoComponent,
  code,
  usageExamples = [],
  props = [],
}: ComponentDemoProps) {
  const [copiedCode, setCopiedCode] = useState<string | null>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedCode(id)
      setTimeout(() => setCopiedCode(null), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'stable':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 border-green-200 dark:border-green-800/50'
      case 'beta':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800/50'
      case 'alpha':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300 border-orange-200 dark:border-orange-800/50'
      case 'deprecated':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 border-red-200 dark:border-red-800/50'
      default:
        return 'bg-neutral-100 text-neutral-800 dark:bg-neutral-800/30 dark:text-neutral-300'
    }
  }

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Form & Input':
        'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200 dark:border-blue-800/50',
      Navigasyon:
        'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300 border-purple-200 dark:border-purple-800/50',
      'Geri Bildirim':
        'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 border-amber-200 dark:border-amber-800/50',
      'Veri Gösterimi':
        'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800/50',
      Layout:
        'bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300 border-teal-200 dark:border-teal-800/50',
    }
    return colors[category] || 'bg-neutral-100 text-neutral-800 dark:bg-neutral-800/30 dark:text-neutral-300'
  }

  return (
    <>
      <Card className='overflow-hidden border-neutral-200 dark:border-border hover:shadow-lg dark:hover:shadow-2xl transition-all duration-300 card-hover-effect'>
        <CardHeader className='pb-4'>
          <div className='flex items-start justify-between'>
            <div className='space-y-2'>
              <div className='flex items-center gap-2'>
                <CardTitle className='text-xl text-neutral-900 dark:text-foreground'>{title}</CardTitle>
                <Badge className={cn('text-xs px-2 py-0.5 border', getStatusColor(status))}>{status}</Badge>
              </div>
              <div className='flex items-center gap-2'>
                <Badge className={cn('text-xs px-2 py-0.5 border', getCategoryColor(category))}>{category}</Badge>
              </div>
            </div>
            <Button
              variant='ghost'
              size='sm'
              onClick={() => setIsFullscreen(true)}
              className='hover:bg-neutral-100 dark:hover:bg-neutral-800/50'
            >
              <Maximize2 className='h-4 w-4' />
            </Button>
          </div>
          <CardDescription className='text-neutral-600 dark:text-muted-foreground mt-2'>{description}</CardDescription>
        </CardHeader>

        <CardContent className='space-y-4'>
          {/* Demo */}
          <div className='relative'>
            <div className='demo-container rounded-lg border border-neutral-200 dark:border-border bg-white dark:bg-card/50 p-6 min-h-[120px] flex items-center justify-center'>
              {demoComponent}
            </div>
          </div>

          {/* Code Preview */}
          <Tabs defaultValue='code' className='w-full'>
            <TabsList className='w-full justify-start bg-neutral-100 dark:bg-neutral-800/50'>
              <TabsTrigger
                value='code'
                className='data-[state=active]:bg-white dark:data-[state=active]:bg-neutral-700 data-[state=active]:text-neutral-900 dark:data-[state=active]:text-foreground'
              >
                Kod
              </TabsTrigger>
              {usageExamples.length > 0 && (
                <TabsTrigger
                  value='examples'
                  className='data-[state=active]:bg-white dark:data-[state=active]:bg-neutral-700 data-[state=active]:text-neutral-900 dark:data-[state=active]:text-foreground'
                >
                  Örnekler
                </TabsTrigger>
              )}
              {props.length > 0 && (
                <TabsTrigger
                  value='props'
                  className='data-[state=active]:bg-white dark:data-[state=active]:bg-neutral-700 data-[state=active]:text-neutral-900 dark:data-[state=active]:text-foreground'
                >
                  Props
                </TabsTrigger>
              )}
            </TabsList>

            <TabsContent value='code' className='mt-4'>
              <div className='relative'>
                <pre className='code-block bg-neutral-900 dark:bg-neutral-950 text-neutral-100 rounded-lg p-4 overflow-x-auto text-sm'>
                  <code className='code-preview'>{code}</code>
                </pre>
                <Button
                  variant='ghost'
                  size='sm'
                  onClick={() => copyToClipboard(code, 'main')}
                  className='absolute top-2 right-2 hover:bg-neutral-800 dark:hover:bg-neutral-700'
                >
                  {copiedCode === 'main' ? (
                    <Check className='h-4 w-4 text-green-400' />
                  ) : (
                    <Copy className='h-4 w-4 text-neutral-400' />
                  )}
                </Button>
              </div>
            </TabsContent>

            {/* Examples Tab */}
            {usageExamples.length > 0 && (
              <TabsContent value='examples' className='mt-4 space-y-4'>
                {usageExamples.map((example, index) => (
                  <div key={index} className='space-y-2'>
                    <h4 className='text-sm font-medium text-neutral-900 dark:text-foreground'>{example.title}</h4>
                    <p className='text-sm text-neutral-600 dark:text-muted-foreground'>{example.description}</p>
                    {example.component && (
                      <div className='rounded-lg border border-neutral-200 dark:border-border bg-white dark:bg-card/50 p-4'>
                        {example.component}
                      </div>
                    )}
                    <div className='relative'>
                      <pre className='code-block bg-neutral-900 dark:bg-neutral-950 text-neutral-100 rounded-lg p-4 overflow-x-auto text-sm'>
                        <code className='code-preview'>{example.code}</code>
                      </pre>
                      <Button
                        variant='ghost'
                        size='sm'
                        onClick={() => copyToClipboard(example.code, `example-${index}`)}
                        className='absolute top-2 right-2 hover:bg-neutral-800 dark:hover:bg-neutral-700'
                      >
                        {copiedCode === `example-${index}` ? (
                          <Check className='h-4 w-4 text-green-400' />
                        ) : (
                          <Copy className='h-4 w-4 text-neutral-400' />
                        )}
                      </Button>
                    </div>
                  </div>
                ))}
              </TabsContent>
            )}

            {/* Props Tab */}
            {props.length > 0 && (
              <TabsContent value='props' className='mt-4'>
                <div className='props-table-container overflow-x-auto'>
                  <table className='w-full text-sm'>
                    <thead>
                      <tr className='border-b border-neutral-200 dark:border-border'>
                        <th className='text-left p-2 font-medium text-neutral-900 dark:text-foreground'>Prop</th>
                        <th className='text-left p-2 font-medium text-neutral-900 dark:text-foreground'>Tip</th>
                        <th className='text-left p-2 font-medium text-neutral-900 dark:text-foreground'>Açıklama</th>
                        <th className='text-left p-2 font-medium text-neutral-900 dark:text-foreground'>Varsayılan</th>
                      </tr>
                    </thead>
                    <tbody>
                      {props.map((prop, index) => (
                        <tr
                          key={index}
                          className='border-b border-neutral-100 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800/30'
                        >
                          <td className='p-2 font-mono text-xs text-primary-600 dark:text-primary-400'>
                            {prop.name}
                            {prop.required && <span className='ml-1 text-red-500 dark:text-red-400'>*</span>}
                          </td>
                          <td className='p-2 font-mono text-xs text-neutral-600 dark:text-neutral-400'>{prop.type}</td>
                          <td className='p-2 text-neutral-700 dark:text-neutral-300'>{prop.description}</td>
                          <td className='p-2 font-mono text-xs text-neutral-500 dark:text-neutral-500'>
                            {prop.default || '-'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabsContent>
            )}
          </Tabs>
        </CardContent>
      </Card>

      {/* Fullscreen Dialog */}
      <Dialog open={isFullscreen} onOpenChange={setIsFullscreen}>
        <DialogContent className='max-w-7xl w-full h-[90vh] component-demo-modal bg-white dark:bg-background'>
          <DialogHeader>
            <div className='flex items-center justify-between'>
              <div className='space-y-1'>
                <DialogTitle className='text-2xl text-neutral-900 dark:text-foreground'>{title}</DialogTitle>
                <div className='flex items-center gap-2'>
                  <Badge className={cn('text-xs px-2 py-0.5 border', getCategoryColor(category))}>{category}</Badge>
                  <Badge className={cn('text-xs px-2 py-0.5 border', getStatusColor(status))}>{status}</Badge>
                </div>
              </div>
              <Button
                variant='ghost'
                size='sm'
                onClick={() => setIsFullscreen(false)}
                className='hover:bg-neutral-100 dark:hover:bg-neutral-800/50'
              >
                <X className='h-5 w-5' />
              </Button>
            </div>
          </DialogHeader>

          <div className='flex-1 overflow-y-auto p-6 space-y-6'>
            {/* Large Demo Area */}
            <div className='rounded-lg border border-neutral-200 dark:border-border bg-white dark:bg-card/50 p-8 min-h-[200px] flex items-center justify-center'>
              {demoComponent}
            </div>

            {/* Code and Documentation */}
            <Tabs defaultValue='code' className='w-full'>
              <TabsList className='w-full justify-start bg-neutral-100 dark:bg-neutral-800/50'>
                <TabsTrigger
                  value='code'
                  className='data-[state=active]:bg-white dark:data-[state=active]:bg-neutral-700'
                >
                  Kod
                </TabsTrigger>
                {usageExamples.length > 0 && (
                  <TabsTrigger
                    value='examples'
                    className='data-[state=active]:bg-white dark:data-[state=active]:bg-neutral-700'
                  >
                    Kullanım Örnekleri
                  </TabsTrigger>
                )}
                {props.length > 0 && (
                  <TabsTrigger
                    value='props'
                    className='data-[state=active]:bg-white dark:data-[state=active]:bg-neutral-700'
                  >
                    API Referansı
                  </TabsTrigger>
                )}
              </TabsList>

              <TabsContent value='code' className='mt-6'>
                <div className='relative'>
                  <pre className='code-block bg-neutral-900 dark:bg-neutral-950 text-neutral-100 rounded-lg p-6 overflow-x-auto text-sm leading-relaxed'>
                    <code className='code-preview'>{code}</code>
                  </pre>
                  <Button
                    variant='ghost'
                    size='sm'
                    onClick={() => copyToClipboard(code, 'fullscreen-main')}
                    className='absolute top-4 right-4 hover:bg-neutral-800 dark:hover:bg-neutral-700'
                  >
                    {copiedCode === 'fullscreen-main' ? (
                      <Check className='h-4 w-4 text-green-400' />
                    ) : (
                      <Copy className='h-4 w-4 text-neutral-400' />
                    )}
                  </Button>
                </div>
              </TabsContent>

              {usageExamples.length > 0 && (
                <TabsContent value='examples' className='mt-6 space-y-6'>
                  {usageExamples.map((example, index) => (
                    <div key={index} className='space-y-3'>
                      <div>
                        <h4 className='text-lg font-medium text-neutral-900 dark:text-foreground'>{example.title}</h4>
                        <p className='text-sm text-neutral-600 dark:text-muted-foreground mt-1'>
                          {example.description}
                        </p>
                      </div>
                      {example.component && (
                        <div className='rounded-lg border border-neutral-200 dark:border-border bg-white dark:bg-card/50 p-6'>
                          {example.component}
                        </div>
                      )}
                      <div className='relative'>
                        <pre className='code-block bg-neutral-900 dark:bg-neutral-950 text-neutral-100 rounded-lg p-4 overflow-x-auto text-sm'>
                          <code className='code-preview'>{example.code}</code>
                        </pre>
                        <Button
                          variant='ghost'
                          size='sm'
                          onClick={() => copyToClipboard(example.code, `fullscreen-example-${index}`)}
                          className='absolute top-2 right-2 hover:bg-neutral-800 dark:hover:bg-neutral-700'
                        >
                          {copiedCode === `fullscreen-example-${index}` ? (
                            <Check className='h-4 w-4 text-green-400' />
                          ) : (
                            <Copy className='h-4 w-4 text-neutral-400' />
                          )}
                        </Button>
                      </div>
                    </div>
                  ))}
                </TabsContent>
              )}

              {props.length > 0 && (
                <TabsContent value='props' className='mt-6'>
                  <div className='rounded-lg border border-neutral-200 dark:border-border overflow-hidden'>
                    <table className='w-full'>
                      <thead className='bg-neutral-50 dark:bg-neutral-800/50'>
                        <tr>
                          <th className='text-left p-4 font-medium text-neutral-900 dark:text-foreground'>Property</th>
                          <th className='text-left p-4 font-medium text-neutral-900 dark:text-foreground'>Type</th>
                          <th className='text-left p-4 font-medium text-neutral-900 dark:text-foreground'>
                            Description
                          </th>
                          <th className='text-left p-4 font-medium text-neutral-900 dark:text-foreground'>Default</th>
                        </tr>
                      </thead>
                      <tbody className='bg-white dark:bg-card'>
                        {props.map((prop, index) => (
                          <tr
                            key={index}
                            className='border-t border-neutral-200 dark:border-border hover:bg-neutral-50 dark:hover:bg-neutral-800/30'
                          >
                            <td className='p-4 font-mono text-sm text-primary-600 dark:text-primary-400'>
                              {prop.name}
                              {prop.required && <span className='ml-1 text-red-500 dark:text-red-400'>*</span>}
                            </td>
                            <td className='p-4 font-mono text-sm text-neutral-600 dark:text-neutral-400'>
                              {prop.type}
                            </td>
                            <td className='p-4 text-sm text-neutral-700 dark:text-neutral-300'>{prop.description}</td>
                            <td className='p-4 font-mono text-sm text-neutral-500 dark:text-neutral-500'>
                              {prop.default || '-'}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </TabsContent>
              )}
            </Tabs>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
