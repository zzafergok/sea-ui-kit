/* eslint-disable prefer-const */
'use client'

import React, { useState, useMemo, useCallback } from 'react'
import { Input } from '@/components/Input/Input'
import { Button } from '@/components/Button/Button'
import { Card, CardContent } from '@/components/Card/Card'
import { Search, Filter, X, Grid, List, SortAsc, SortDesc, Tag, Clock, Star } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ComponentItem {
  id: string
  name: string
  description: string
  category: string
  tags: string[]
  status: 'stable' | 'beta' | 'alpha' | 'deprecated'
  lastUpdated: string
  popularity: number
}

interface ComponentSearchProps {
  components: ComponentItem[]
  onFilter: (filteredComponents: ComponentItem[]) => void
  onViewModeChange: (mode: 'grid' | 'list') => void
  className?: string
}

export function ComponentSearch({ components, onFilter, onViewModeChange, className }: ComponentSearchProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedStatus, setSelectedStatus] = useState<string[]>([])
  const [sortBy, setSortBy] = useState<'name' | 'popularity' | 'updated'>('name')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(false)

  // Kategorileri ve durumları otomatik olarak çıkar
  const categories = useMemo(() => {
    const cats = Array.from(new Set(components.map((c) => c.category)))
    return cats.map((cat) => ({
      value: cat,
      label: cat,
      count: components.filter((c) => c.category === cat).length,
    }))
  }, [components])

  const statusOptions = useMemo(() => {
    const statuses = Array.from(new Set(components.map((c) => c.status)))
    return statuses.map((status) => ({
      value: status,
      label: status.charAt(0).toUpperCase() + status.slice(1),
      count: components.filter((c) => c.status === status).length,
    }))
  }, [components])

  // Filtreleme ve sıralama
  const filteredAndSortedComponents = useMemo(() => {
    let filtered = components.filter((component) => {
      // Arama sorgusu
      const matchesSearch =
        !searchQuery ||
        component.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        component.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        component.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

      // Kategori filtresi
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(component.category)

      // Durum filtresi
      const matchesStatus = selectedStatus.length === 0 || selectedStatus.includes(component.status)

      return matchesSearch && matchesCategory && matchesStatus
    })

    // Sıralama
    filtered.sort((a, b) => {
      let comparison = 0

      switch (sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name)
          break
        case 'popularity':
          comparison = a.popularity - b.popularity
          break
        case 'updated':
          comparison = new Date(a.lastUpdated).getTime() - new Date(b.lastUpdated).getTime()
          break
      }

      return sortOrder === 'asc' ? comparison : -comparison
    })

    return filtered
  }, [components, searchQuery, selectedCategories, selectedStatus, sortBy, sortOrder])

  // Filtrelenen sonuçları üst bileşene gönder
  React.useEffect(() => {
    onFilter(filteredAndSortedComponents)
  }, [filteredAndSortedComponents, onFilter])

  const handleCategoryToggle = useCallback((category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }, [])

  const handleStatusToggle = useCallback((status: string) => {
    setSelectedStatus((prev) => (prev.includes(status) ? prev.filter((s) => s !== status) : [...prev, status]))
  }, [])

  const handleViewModeChange = useCallback(
    (mode: 'grid' | 'list') => {
      setViewMode(mode)
      onViewModeChange(mode)
    },
    [onViewModeChange],
  )

  const clearFilters = useCallback(() => {
    setSearchQuery('')
    setSelectedCategories([])
    setSelectedStatus([])
    setSortBy('name')
    setSortOrder('asc')
  }, [])

  const hasActiveFilters = searchQuery || selectedCategories.length > 0 || selectedStatus.length > 0

  return (
    <div className={cn('space-y-4', className)}>
      {/* Ana Arama ve Görünüm Kontrolleri */}
      <Card className='bg-white/80 dark:bg-neutral-900/80 backdrop-blur-sm'>
        <CardContent className='p-4'>
          <div className='flex flex-col lg:flex-row gap-4 items-center'>
            {/* Arama Kutusu */}
            <div className='flex-1 w-full relative'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400' />
              <Input
                placeholder='Bileşen ara... (Button, Input, Card...)'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className='pl-10 pr-4 py-3 text-base'
              />
              {searchQuery && (
                <Button
                  variant='ghost'
                  size='sm'
                  onClick={() => setSearchQuery('')}
                  className='absolute right-2 top-1/2 transform -translate-y-1/2 p-1 h-6 w-6'
                >
                  <X className='h-4 w-4' />
                </Button>
              )}
            </div>

            {/* Kontrol Butonları */}
            <div className='flex items-center gap-2'>
              {/* Filtre Butonu */}
              <Button
                variant={showFilters ? 'default' : 'outline'}
                size='sm'
                onClick={() => setShowFilters(!showFilters)}
                className='flex items-center gap-2'
              >
                <Filter className='h-4 w-4' />
                <span className='hidden sm:inline'>Filtreler</span>
                {hasActiveFilters && (
                  <span className='bg-primary-500 text-white text-xs px-1.5 py-0.5 rounded-full'>
                    {selectedCategories.length + selectedStatus.length + (searchQuery ? 1 : 0)}
                  </span>
                )}
              </Button>

              {/* Sıralama */}
              <div className='flex items-center gap-1 p-1 bg-neutral-100 dark:bg-neutral-800 rounded-lg'>
                <Button
                  variant='ghost'
                  size='sm'
                  onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                  className='p-2'
                >
                  {sortOrder === 'asc' ? <SortAsc className='h-4 w-4' /> : <SortDesc className='h-4 w-4' />}
                </Button>
              </div>

              {/* Görünüm Modu */}
              <div className='flex items-center gap-1 p-1 bg-neutral-100 dark:bg-neutral-800 rounded-lg'>
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size='sm'
                  onClick={() => handleViewModeChange('grid')}
                  className='p-2'
                >
                  <Grid className='h-4 w-4' />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size='sm'
                  onClick={() => handleViewModeChange('list')}
                  className='p-2'
                >
                  <List className='h-4 w-4' />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Gelişmiş Filtreler */}
      {showFilters && (
        <Card className='bg-white dark:bg-neutral-900'>
          <CardContent className='p-4 space-y-4'>
            <div className='flex items-center justify-between'>
              <h3 className='font-medium text-neutral-900 dark:text-neutral-100'>Gelişmiş Filtreler</h3>
              {hasActiveFilters && (
                <Button variant='ghost' size='sm' onClick={clearFilters}>
                  <X className='h-4 w-4 mr-2' />
                  Temizle
                </Button>
              )}
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
              {/* Kategori Filtresi */}
              <div className='space-y-3'>
                <h4 className='text-sm font-medium text-neutral-700 dark:text-neutral-300 flex items-center gap-2'>
                  <Tag className='h-4 w-4' />
                  Kategoriler
                </h4>
                <div className='space-y-2'>
                  {categories.map((category) => (
                    <label key={category.value} className='flex items-center gap-2 cursor-pointer'>
                      <input
                        type='checkbox'
                        checked={selectedCategories.includes(category.value)}
                        onChange={() => handleCategoryToggle(category.value)}
                        className='rounded border-neutral-300 dark:border-neutral-600'
                      />
                      <span className='text-sm text-neutral-600 dark:text-neutral-400'>{category.label}</span>
                      <span className='text-xs text-neutral-400 bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded'>
                        {category.count}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Durum Filtresi */}
              <div className='space-y-3'>
                <h4 className='text-sm font-medium text-neutral-700 dark:text-neutral-300 flex items-center gap-2'>
                  <Star className='h-4 w-4' />
                  Durum
                </h4>
                <div className='space-y-2'>
                  {statusOptions.map((status) => (
                    <label key={status.value} className='flex items-center gap-2 cursor-pointer'>
                      <input
                        type='checkbox'
                        checked={selectedStatus.includes(status.value)}
                        onChange={() => handleStatusToggle(status.value)}
                        className='rounded border-neutral-300 dark:border-neutral-600'
                      />
                      <span className='text-sm text-neutral-600 dark:text-neutral-400'>{status.label}</span>
                      <span className='text-xs text-neutral-400 bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded'>
                        {status.count}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Sıralama Seçenekleri */}
              <div className='space-y-3'>
                <h4 className='text-sm font-medium text-neutral-700 dark:text-neutral-300 flex items-center gap-2'>
                  <Clock className='h-4 w-4' />
                  Sırala
                </h4>
                <div className='space-y-2'>
                  {[
                    { value: 'name', label: 'İsim' },
                    { value: 'popularity', label: 'Popülerlik' },
                    { value: 'updated', label: 'Son Güncelleme' },
                  ].map((option) => (
                    <label key={option.value} className='flex items-center gap-2 cursor-pointer'>
                      <input
                        type='radio'
                        name='sortBy'
                        value={option.value}
                        checked={sortBy === option.value}
                        onChange={(e) => setSortBy(e.target.value as any)}
                        className='rounded-full border-neutral-300 dark:border-neutral-600'
                      />
                      <span className='text-sm text-neutral-600 dark:text-neutral-400'>{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Sonuç İstatistikleri */}
      <div className='flex items-center justify-between text-sm text-neutral-500 dark:text-neutral-400'>
        <span>
          {filteredAndSortedComponents.length} bileşen bulundu
          {components.length !== filteredAndSortedComponents.length && (
            <span> (toplam {components.length} içinden)</span>
          )}
        </span>
        {hasActiveFilters && (
          <Button variant='ghost' size='sm' onClick={clearFilters}>
            Filtreleri temizle
          </Button>
        )}
      </div>
    </div>
  )
}
