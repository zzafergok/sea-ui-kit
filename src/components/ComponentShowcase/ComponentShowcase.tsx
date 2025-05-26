'use client'

import React, { useState } from 'react'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardBadge,
} from '@/components/Card/Card'
import { Button } from '@/components/Button/Button'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/Tabs/Tabs'
import { Copy, ExternalLink, Eye, Code2, Smartphone, Tablet, Monitor } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ComponentShowcaseProps {
  title: string
  description: string
  category: string
  status?: 'stable' | 'beta' | 'alpha' | 'deprecated'
  preview: React.ReactNode
  code: string
  props?: Array<{
    name: string
    type: string
    description: string
    default?: string
    required?: boolean
  }>
  examples?: Array<{
    title: string
    description: string
    code: string
    preview: React.ReactNode
  }>
  className?: string
}

export function ComponentShowcase({
  title,
  description,
  category,
  status = 'stable',
  preview,
  code,
  props = [],
  examples = [],
  className,
}: ComponentShowcaseProps) {
  const [currentView, setCurrentView] = useState<'desktop' | 'tablet' | 'mobile'>('desktop')
  const [activeTab, setActiveTab] = useState('preview')

  const statusVariants = {
    stable: { variant: 'success' as const, label: 'Stable' },
    beta: { variant: 'warning' as const, label: 'Beta' },
    alpha: { variant: 'destructive' as const, label: 'Alpha' },
    deprecated: { variant: 'destructive' as const, label: 'Deprecated' },
  }

  const viewportSizes = {
    desktop: 'w-full',
    tablet: 'w-[768px] mx-auto',
    mobile: 'w-[375px] mx-auto',
  }

  const handleCopyCode = async (codeText: string) => {
    try {
      await navigator.clipboard.writeText(codeText)
      // Toast notification burada eklenebilir
    } catch (error) {
      console.error('Kod kopyalanamadı:', error)
    }
  }

  return (
    <Card className={cn('group hover:shadow-lg transition-all duration-300', className)}>
      <CardHeader>
        <div className='flex items-start justify-between'>
          <div className='space-y-1'>
            <CardTitle className='flex items-center gap-2 text-lg'>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
            <div className='flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400'>
              <span className='px-2 py-1 bg-neutral-100 dark:bg-neutral-800 rounded'>{category}</span>
            </div>
          </div>
          <div className='flex items-center gap-2'>
            <CardBadge variant={statusVariants[status].variant}>{statusVariants[status].label}</CardBadge>
          </div>
        </div>
      </CardHeader>

      <CardContent className='space-y-4'>
        <Tabs value={activeTab} onValueChange={setActiveTab} className='w-full'>
          <div className='flex items-center justify-between mb-4'>
            <TabsList className='grid grid-cols-3 w-fit'>
              <TabsTrigger value='preview' className='flex items-center gap-2'>
                <Eye className='h-4 w-4' />
                <span className='hidden sm:inline'>Önizleme</span>
              </TabsTrigger>
              <TabsTrigger value='code' className='flex items-center gap-2'>
                <Code2 className='h-4 w-4' />
                <span className='hidden sm:inline'>Kod</span>
              </TabsTrigger>
              {props.length > 0 && (
                <TabsTrigger value='props' className='flex items-center gap-2'>
                  <span className='hidden sm:inline'>Props</span>
                </TabsTrigger>
              )}
            </TabsList>

            {activeTab === 'preview' && (
              <div className='flex items-center gap-1 p-1 bg-neutral-100 dark:bg-neutral-800 rounded-lg'>
                <Button
                  variant={currentView === 'desktop' ? 'default' : 'ghost'}
                  size='sm'
                  onClick={() => setCurrentView('desktop')}
                  className='p-2'
                >
                  <Monitor className='h-4 w-4' />
                </Button>
                <Button
                  variant={currentView === 'tablet' ? 'default' : 'ghost'}
                  size='sm'
                  onClick={() => setCurrentView('tablet')}
                  className='p-2'
                >
                  <Tablet className='h-4 w-4' />
                </Button>
                <Button
                  variant={currentView === 'mobile' ? 'default' : 'ghost'}
                  size='sm'
                  onClick={() => setCurrentView('mobile')}
                  className='p-2'
                >
                  <Smartphone className='h-4 w-4' />
                </Button>
              </div>
            )}
          </div>

          <TabsContent value='preview' className='space-y-4'>
            <div className='min-h-[200px] border border-neutral-200 dark:border-neutral-700 rounded-lg bg-neutral-50 dark:bg-neutral-900 overflow-hidden'>
              <div
                className={cn(
                  'transition-all duration-300 p-6 h-full flex items-center justify-center',
                  viewportSizes[currentView],
                )}
              >
                {preview}
              </div>
            </div>

            {examples.length > 0 && (
              <div className='space-y-4'>
                <h4 className='text-sm font-medium text-neutral-900 dark:text-neutral-100'>Örnek Kullanımlar</h4>
                <div className='grid gap-4'>
                  {examples.map((example, index) => (
                    <div key={index} className='border border-neutral-200 dark:border-neutral-700 rounded-lg p-4'>
                      <div className='flex items-center justify-between mb-2'>
                        <h5 className='text-sm font-medium'>{example.title}</h5>
                        <Button variant='ghost' size='sm' onClick={() => handleCopyCode(example.code)}>
                          <Copy className='h-4 w-4' />
                        </Button>
                      </div>
                      <p className='text-xs text-neutral-500 dark:text-neutral-400 mb-3'>{example.description}</p>
                      <div className='bg-white dark:bg-neutral-800 p-4 rounded border'>{example.preview}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value='code' className='space-y-4'>
            <div className='relative'>
              <div className='absolute top-2 right-2 z-10'>
                <Button
                  variant='ghost'
                  size='sm'
                  onClick={() => handleCopyCode(code)}
                  className='bg-neutral-900/80 hover:bg-neutral-900 text-white'
                >
                  <Copy className='h-4 w-4' />
                </Button>
              </div>
              <pre className='bg-neutral-900 text-neutral-100 p-4 rounded-lg overflow-x-auto text-sm'>
                <code>{code}</code>
              </pre>
            </div>
          </TabsContent>

          {props.length > 0 && (
            <TabsContent value='props' className='space-y-4'>
              <div className='overflow-x-auto'>
                <table className='w-full text-sm'>
                  <thead>
                    <tr className='border-b border-neutral-200 dark:border-neutral-700'>
                      <th className='text-left p-2 font-medium'>Prop</th>
                      <th className='text-left p-2 font-medium'>Tip</th>
                      <th className='text-left p-2 font-medium'>Varsayılan</th>
                      <th className='text-left p-2 font-medium'>Açıklama</th>
                    </tr>
                  </thead>
                  <tbody>
                    {props.map((prop, index) => (
                      <tr key={index} className='border-b border-neutral-100 dark:border-neutral-800'>
                        <td className='p-2'>
                          <code className='text-xs bg-neutral-100 dark:bg-neutral-800 px-1 py-0.5 rounded'>
                            {prop.name}
                            {prop.required && <span className='text-red-500 ml-1'>*</span>}
                          </code>
                        </td>
                        <td className='p-2'>
                          <code className='text-xs text-neutral-600 dark:text-neutral-400'>{prop.type}</code>
                        </td>
                        <td className='p-2'>
                          {prop.default ? (
                            <code className='text-xs bg-neutral-100 dark:bg-neutral-800 px-1 py-0.5 rounded'>
                              {prop.default}
                            </code>
                          ) : (
                            <span className='text-neutral-400'>-</span>
                          )}
                        </td>
                        <td className='p-2 text-neutral-600 dark:text-neutral-400'>{prop.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
          )}
        </Tabs>
      </CardContent>

      <CardFooter className='flex justify-between'>
        <Button variant='ghost' size='sm' onClick={() => handleCopyCode(code)}>
          <Copy className='h-4 w-4 mr-2' />
          Kodu Kopyala
        </Button>
        <Button variant='outline' size='sm'>
          <ExternalLink className='h-4 w-4 mr-2' />
          Dokümantasyon
        </Button>
      </CardFooter>
    </Card>
  )
}
