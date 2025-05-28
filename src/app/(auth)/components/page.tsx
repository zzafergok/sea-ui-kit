'use client'

import React, { useState } from 'react'

import { Input } from '@/components/core/Input/Input'
import { Button } from '@/components/core/Button/Button'
import { Card, CardContent } from '@/components/core/Card/Card'
import { ComponentDemo } from '@/components/ui/ComponentDemo/ComponentDemo'

import { Search, Grid, List } from 'lucide-react'

import { componentDemoData } from '@/data/componentDemoData'

import { cn } from '@/lib/utils'

export default function ComponentsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const filteredComponents = componentDemoData.filter((component) => {
    const matchesSearch =
      component.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      component.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = selectedCategory === 'all' || component.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  const categories = ['all', ...Array.from(new Set(componentDemoData.map((c) => c.category)))]

  return (
    <div className='min-h-screen'>
      {/* Search and Filter Section */}
      <section className='max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8'>
        <Card className='bg-white/80 dark:bg-neutral-900/80 backdrop-blur-sm'>
          <CardContent className='p-6'>
            <div className='flex flex-col lg:flex-row gap-4 items-center'>
              <div className='flex-1 w-full relative'>
                <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400' />
                <Input
                  placeholder='Bileşen ara... (Button, Input, Card...)'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className='pl-10 pr-4 py-3 text-base'
                />
              </div>

              <div className='flex items-center gap-2'>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className='appearance-none bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-md px-3 py-2 text-sm pr-8 focus:outline-none focus:ring-2 focus:ring-primary-500'
                >
                  <option value='all'>Tüm Kategoriler</option>
                  {categories.slice(1).map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>

                <div className='flex items-center gap-1 p-1 bg-neutral-100 dark:bg-neutral-800 rounded-lg'>
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size='sm'
                    onClick={() => setViewMode('grid')}
                    className='p-2'
                  >
                    <Grid className='h-4 w-4' />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size='sm'
                    onClick={() => setViewMode('list')}
                    className='p-2'
                  >
                    <List className='h-4 w-4' />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Components Showcase */}
      <section className='max-w-7xl mx-auto px-4 pb-16 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between mb-8'>
          <h2 className='text-3xl font-bold text-neutral-900 dark:text-neutral-100'>
            Bileşenler ({filteredComponents.length})
          </h2>
        </div>

        <div className={cn('grid gap-8', viewMode === 'grid' ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1')}>
          {filteredComponents.map((component) => (
            <ComponentDemo
              key={component.id}
              title={component.title}
              description={component.description}
              category={component.category}
              status={component.status as 'stable' | 'beta' | 'alpha' | 'deprecated'}
              demoComponent={component.demoComponent}
              code={component.code}
              usageExamples={component.usageExamples}
              props={component.props?.map((prop) => ({
                ...prop,
                description: prop.description || '',
                required: false,
              }))}
            />
          ))}
        </div>

        {filteredComponents.length === 0 && (
          <div className='text-center py-16'>
            <div className='text-neutral-400 mb-4'>
              <Search className='h-16 w-16 mx-auto' />
            </div>
            <h3 className='text-xl font-medium text-neutral-600 dark:text-neutral-400 mb-2'>Hiç bileşen bulunamadı</h3>
            <p className='text-neutral-500 dark:text-neutral-500 mb-4'>
              Arama kriterlerinizi değiştirip tekrar deneyin
            </p>
            <Button
              variant='outline'
              onClick={() => {
                setSearchQuery('')
                setSelectedCategory('all')
              }}
            >
              Filtreleri Temizle
            </Button>
          </div>
        )}
      </section>
    </div>
  )
}
