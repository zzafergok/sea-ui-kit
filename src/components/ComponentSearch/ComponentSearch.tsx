'use client'

import React, { useState, useCallback } from 'react'
import { Input } from '@/components/Input/Input'
import { Button } from '@/components/Button/Button'
import { Card, CardContent } from '@/components/Card/Card'
import { Search, Filter, X, Grid, List, SortAsc, SortDesc, Tag, Star, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useComponentSearch, ComponentItem } from '@/hooks/useComponentSearch'
import { categoryColors, statusColors } from '@/data/mockComponents'

interface ComponentSearchProps {
  components: ComponentItem[]
  onFilteredComponentsChange: (filteredComponents: ComponentItem[]) => void
  onViewModeChange: (mode: 'grid' | 'list') => void
  viewMode: 'grid' | 'list'
  className?: string
}

export function ComponentSearch({
  components,
  onFilteredComponentsChange,
  onViewModeChange,
  viewMode,
  className,
}: ComponentSearchProps) {
  const [showFilters, setShowFilters] = useState(false)

  const {
    filteredComponents,
    totalCount,
    filteredCount,
    filters,
    hasActiveFilters,
    availableCategories,
    availableStatuses,
    updateSearchQuery,
    toggleCategory,
    toggleStatus,
    updateSort,
    clearFilters,
  } = useComponentSearch({
    components,
    initialSearchQuery: '',
    initialCategories: [],
    initialStatus: [],
  })

  // Filtrelenmiş bileşenleri parent'a ilet
  React.useEffect(() => {
    onFilteredComponentsChange(filteredComponents)
  }, [filteredComponents, onFilteredComponentsChange])

  const handleSortChange = useCallback(() => {
    const newOrder = filters.sortOrder === 'asc' ? 'desc' : 'asc'
    updateSort(filters.sortBy, newOrder)
  }, [filters.sortBy, filters.sortOrder, updateSort])

  const handleSortByChange = useCallback(
    (sortBy: 'name' | 'popularity' | 'updated') => {
      updateSort(sortBy, filters.sortOrder)
    },
    [filters.sortOrder, updateSort],
  )

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
                value={filters.searchQuery}
                onChange={(e) => updateSearchQuery(e.target.value)}
                className='pl-10 pr-4 py-3 text-base'
              />
              {filters.searchQuery && (
                <Button
                  variant='ghost'
                  size='sm'
                  onClick={() => updateSearchQuery('')}
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
                    {filters.selectedCategories.length + filters.selectedStatus.length + (filters.searchQuery ? 1 : 0)}
                  </span>
                )}
              </Button>

              {/* Sıralama Dropdown */}
              <div className='relative'>
                <select
                  value={filters.sortBy}
                  onChange={(e) => handleSortByChange(e.target.value as 'name' | 'popularity' | 'updated')}
                  className='appearance-none bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-md px-3 py-2 text-sm pr-8 focus:outline-none focus:ring-2 focus:ring-primary-500'
                >
                  <option value='name'>İsim</option>
                  <option value='popularity'>Popülerlik</option>
                  <option value='updated'>Güncellenme</option>
                </select>
                <ChevronDown className='absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400 pointer-events-none' />
              </div>

              {/* Sıralama Yönü */}
              <Button variant='outline' size='sm' onClick={handleSortChange} className='p-2'>
                {filters.sortOrder === 'asc' ? <SortAsc className='h-4 w-4' /> : <SortDesc className='h-4 w-4' />}
              </Button>

              {/* Görünüm Modu */}
              <div className='flex items-center gap-1 p-1 bg-neutral-100 dark:bg-neutral-800 rounded-lg'>
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size='sm'
                  onClick={() => onViewModeChange('grid')}
                  className='p-2'
                >
                  <Grid className='h-4 w-4' />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size='sm'
                  onClick={() => onViewModeChange('list')}
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

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              {/* Kategori Filtresi */}
              <div className='space-y-3'>
                <h4 className='text-sm font-medium text-neutral-700 dark:text-neutral-300 flex items-center gap-2'>
                  <Tag className='h-4 w-4' />
                  Kategoriler
                </h4>
                <div className='space-y-2 max-h-32 overflow-y-auto'>
                  {availableCategories.map((category) => (
                    <label
                      key={category.value}
                      className='flex items-center gap-2 cursor-pointer hover:bg-neutral-50 dark:hover:bg-neutral-800 p-1 rounded'
                    >
                      <input
                        type='checkbox'
                        checked={filters.selectedCategories.includes(category.value)}
                        onChange={() => toggleCategory(category.value)}
                        className='rounded border-neutral-300 dark:border-neutral-600 text-primary-600 focus:ring-primary-500'
                      />
                      <span className='text-sm text-neutral-600 dark:text-neutral-400 flex-1'>{category.label}</span>
                      <span
                        className={cn(
                          'text-xs px-2 py-0.5 rounded text-center',
                          categoryColors[category.value] ||
                            'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400',
                        )}
                      >
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
                  {availableStatuses.map((status) => (
                    <label
                      key={status.value}
                      className='flex items-center gap-2 cursor-pointer hover:bg-neutral-50 dark:hover:bg-neutral-800 p-1 rounded'
                    >
                      <input
                        type='checkbox'
                        checked={filters.selectedStatus.includes(status.value)}
                        onChange={() => toggleStatus(status.value)}
                        className='rounded border-neutral-300 dark:border-neutral-600 text-primary-600 focus:ring-primary-500'
                      />
                      <span className='text-sm text-neutral-600 dark:text-neutral-400 flex-1'>{status.label}</span>
                      <span
                        className={cn(
                          'text-xs px-2 py-0.5 rounded',
                          statusColors[status.value] ||
                            'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400',
                        )}
                      >
                        {status.count}
                      </span>
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
          {filteredCount} bileşen bulundu
          {totalCount !== filteredCount && <span> (toplam {totalCount} içinden)</span>}
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
