'use client'

import React, { useState } from 'react'

import { Button } from '@/components/Button/Button'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/Tabs/Tabs'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/Dialog/Dialog'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/Card/Card'

import { Copy, Code2, Play, ExternalLink, CheckCircle2 } from 'lucide-react'

import { useAppDispatch } from '@/store'
import { showToast } from '@/store/slices/toastSlice'

import { cn } from '@/lib/utils'

interface ComponentDemoProps {
  title: string
  description: string
  category: string
  status: 'stable' | 'beta' | 'alpha' | 'deprecated'
  demoComponent: React.ReactNode
  code: string
  usageExamples?: Array<{
    title: string
    description: string
    code: string
    component: React.ReactNode
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
  status,
  demoComponent,
  code,
  usageExamples = [],
  props = [],
}: ComponentDemoProps) {
  const dispatch = useAppDispatch()
  const [copied, setCopied] = useState(false)
  const [activeExample, setActiveExample] = useState(0)

  const statusColors = {
    stable: 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-100 dark:border-green-800',
    beta: 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900 dark:text-yellow-100 dark:border-yellow-800',
    alpha: 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900 dark:text-red-100 dark:border-red-800',
    deprecated: 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-800',
  }

  const handleCopyCode = async (codeToCopy: string) => {
    try {
      await navigator.clipboard.writeText(codeToCopy)
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
  }

  return (
    <Card className='group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary-200 dark:hover:border-primary-800'>
      <CardHeader>
        <div className='flex items-start justify-between'>
          <div className='space-y-2'>
            <div className='flex items-center gap-3'>
              <CardTitle className='text-xl font-semibold'>{title}</CardTitle>
              <span className={cn('px-2 py-1 text-xs font-medium rounded-full border', statusColors[status])}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </span>
            </div>
            <CardDescription className='text-base'>{description}</CardDescription>
            <div className='text-sm text-neutral-500 dark:text-neutral-400'>
              Kategori: <span className='font-medium text-primary-600 dark:text-primary-400'>{category}</span>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className='space-y-6'>
        {/* Live Demo */}
        <div className='space-y-3'>
          <h4 className='text-sm font-medium text-neutral-700 dark:text-neutral-300 flex items-center gap-2'>
            <Play className='h-4 w-4 text-primary-500' />
            Canlı Önizleme
          </h4>
          <div className='p-6 bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800 rounded-lg border-2 border-dashed border-neutral-200 dark:border-neutral-700 min-h-[120px] flex items-center justify-center'>
            {demoComponent}
          </div>
        </div>

        {/* Usage Examples */}
        {usageExamples.length > 0 && (
          <div className='space-y-3'>
            <h4 className='text-sm font-medium text-neutral-700 dark:text-neutral-300'>Kullanım Örnekleri</h4>
            <div className='flex flex-wrap gap-2'>
              {usageExamples.map((example, index) => (
                <Button
                  key={index}
                  variant={activeExample === index ? 'default' : 'outline'}
                  size='sm'
                  onClick={() => setActiveExample(index)}
                >
                  {example.title}
                </Button>
              ))}
            </div>
            {usageExamples[activeExample] && (
              <div className='p-4 bg-white dark:bg-neutral-800 rounded-lg border'>
                <div className='flex items-center justify-between mb-3'>
                  <span className='text-sm font-medium'>{usageExamples[activeExample].title}</span>
                  <Button
                    variant='ghost'
                    size='sm'
                    onClick={() => handleCopyCode(usageExamples[activeExample].code)}
                    className='h-8 w-8 p-0'
                  >
                    {copied ? <CheckCircle2 className='h-4 w-4 text-green-500' /> : <Copy className='h-4 w-4' />}
                  </Button>
                </div>
                <p className='text-xs text-neutral-500 dark:text-neutral-400 mb-3'>
                  {usageExamples[activeExample].description}
                </p>
                <div className='p-3 bg-neutral-50 dark:bg-neutral-900 rounded border'>
                  {usageExamples[activeExample].component}
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>

      <CardFooter className='flex justify-between border-t bg-neutral-50 dark:bg-neutral-900'>
        <Button variant='ghost' size='sm' onClick={() => handleCopyCode(code)}>
          <Copy className='h-4 w-4 mr-2' />
          Kodu Kopyala
        </Button>

        <Dialog>
          <DialogTrigger asChild>
            <Button size='sm' className='flex items-center gap-2'>
              <Code2 className='h-4 w-4' />
              Kodu Görüntüle
            </Button>
          </DialogTrigger>
          <DialogContent className='max-w-[95vw] max-h-[95vh] w-full h-full flex flex-col overflow-hidden sm:max-w-[90vw] sm:max-h-[90vh] lg:max-w-[85vw] lg:max-h-[85vh] xl:max-w-[80vw] xl:max-h-[80vh]'>
            <DialogHeader className='flex-shrink-0 pb-4 border-b border-neutral-200 dark:border-neutral-700'>
              <DialogTitle className='flex items-center gap-2'>
                <Code2 className='h-5 w-5 text-primary-500' />
                {title} - Kod Görüntüleyici
              </DialogTitle>
            </DialogHeader>

            <div className='flex-1 overflow-hidden mt-4'>
              <Tabs defaultValue='code' className='h-full flex flex-col'>
                <TabsList className='grid w-full grid-cols-2 flex-shrink-0'>
                  <TabsTrigger value='code' className='flex items-center gap-2'>
                    <Code2 className='h-4 w-4' />
                    Kod
                  </TabsTrigger>
                  {props.length > 0 && (
                    <TabsTrigger value='props' className='flex items-center gap-2'>
                      <ExternalLink className='h-4 w-4' />
                      Props
                    </TabsTrigger>
                  )}
                </TabsList>

                <TabsContent value='code' className='flex-1 overflow-hidden mt-4'>
                  <div className='relative h-full'>
                    <Button
                      variant='ghost'
                      size='sm'
                      onClick={() => handleCopyCode(code)}
                      className='absolute top-3 right-3 z-10 bg-neutral-900/80 hover:bg-neutral-900 text-white backdrop-blur-sm'
                    >
                      {copied ? <CheckCircle2 className='h-4 w-4' /> : <Copy className='h-4 w-4' />}
                    </Button>
                    <div className='h-full overflow-auto bg-neutral-900 rounded-lg'>
                      <pre className='p-4 text-neutral-100 text-sm leading-relaxed whitespace-pre-wrap break-words'>
                        <code>{code}</code>
                      </pre>
                    </div>
                  </div>
                </TabsContent>

                {props.length > 0 && (
                  <TabsContent value='props' className='flex-1 overflow-hidden mt-4'>
                    <div className='h-full overflow-auto bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-lg'>
                      <div className='overflow-x-auto'>
                        <table className='w-full text-sm'>
                          <thead className='border-b border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 sticky top-0'>
                            <tr>
                              <th className='text-left p-4 font-medium min-w-[120px]'>Prop</th>
                              <th className='text-left p-4 font-medium min-w-[150px]'>Tip</th>
                              <th className='text-left p-4 font-medium min-w-[100px]'>Varsayılan</th>
                              <th className='text-left p-4 font-medium'>Açıklama</th>
                            </tr>
                          </thead>
                          <tbody>
                            {props.map((prop, index) => (
                              <tr
                                key={index}
                                className='border-b border-neutral-100 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800/50'
                              >
                                <td className='p-4 align-top'>
                                  <code className='text-xs bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded whitespace-nowrap'>
                                    {prop.name}
                                    {prop.required && <span className='text-red-500 ml-1'>*</span>}
                                  </code>
                                </td>
                                <td className='p-4 align-top'>
                                  <code className='text-xs text-neutral-600 dark:text-neutral-400 break-words'>
                                    {prop.type}
                                  </code>
                                </td>
                                <td className='p-4 align-top'>
                                  {prop.default ? (
                                    <code className='text-xs bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded whitespace-nowrap'>
                                      {prop.default}
                                    </code>
                                  ) : (
                                    <span className='text-neutral-400'>-</span>
                                  )}
                                </td>
                                <td className='p-4 align-top text-neutral-600 dark:text-neutral-400 leading-relaxed'>
                                  {prop.description}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </TabsContent>
                )}
              </Tabs>
            </div>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  )
}
