'use client'

import React, { useState } from 'react'

import { Input } from '@/components/Input/Input'
import { Button } from '@/components/Button/Button'
import { Card, CardContent } from '@/components/Card/Card'
import { ComponentDemo } from '@/components/ComponentDemo/ComponentDemo'

import { Search, Grid, List, Sparkles, BookOpen, Github, Figma } from 'lucide-react'

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
    <div className='min-h-screen bg-gradient-to-br from-neutral-50 via-white to-neutral-100 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950'>
      {/* Hero Section */}
      <section className='relative overflow-hidden'>
        <div className='absolute inset-0 bg-gradient-to-r from-primary-500/10 via-accent-500/5 to-primary-500/10' />
        <div className='relative max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8'>
          <div className='text-center space-y-8'>
            <div className='inline-flex items-center gap-2 px-4 py-2 bg-primary-50 dark:bg-primary-950/50 rounded-full border border-primary-200 dark:border-primary-800'>
              <Sparkles className='h-4 w-4 text-primary-600 dark:text-primary-400' />
              <span className='text-sm font-medium text-primary-700 dark:text-primary-300'>
                {componentDemoData.length}+ UI Bileşeni
              </span>
            </div>

            <div className='space-y-4'>
              <h1 className='text-4xl md:text-6xl font-bold bg-gradient-to-r from-neutral-900 via-primary-600 to-accent-600 dark:from-neutral-100 dark:via-primary-400 dark:to-accent-400 bg-clip-text text-transparent'>
                Sea UI Kit
              </h1>
              <p className='text-xl md:text-2xl text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto'>
                Modern React uygulamaları için tasarlanmış kapsamlı bileşen koleksiyonu
              </p>
              <p className='text-lg text-neutral-500 dark:text-neutral-400 max-w-2xl mx-auto'>
                Radix UI primitifleri üzerine inşa edilmiş, erişilebilir ve özelleştirilebilir bileşenler ile
                projelerinizi hızlandırın
              </p>
            </div>

            <div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
              <Button size='lg' className='flex items-center gap-2'>
                <BookOpen className='h-5 w-5' />
                Dokümantasyon
              </Button>
              <Button variant='outline' size='lg' className='flex items-center gap-2'>
                <Github className='h-5 w-5' />
                GitHub
              </Button>
              <Button variant='ghost' size='lg' className='flex items-center gap-2'>
                <Figma className='h-5 w-5' />
                Figma Design System
              </Button>
            </div>
          </div>
        </div>
      </section>

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
