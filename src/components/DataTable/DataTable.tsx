'use client'

import React, { useMemo, useState, useCallback } from 'react'

import { useVirtualizer } from '@tanstack/react-virtual'

import { Input } from '../Input/Input'
import { Button } from '../Button/Button'
import { Skeleton } from '../Skeleton/Skeleton'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../Select/Select'

interface Column<T> {
  key: keyof T
  label: string
  sortable?: boolean
  filterable?: boolean
  render?: (value: any, row: T, index: number) => React.ReactNode
  width?: number
  minWidth?: number
  maxWidth?: number
}

interface DataTableProps<T> {
  data: T[]
  columns: Column<T>[]
  loading?: boolean
  pagination?: {
    page: number
    pageSize: number
    total: number
    onPageChange: (page: number) => void
    onPageSizeChange: (pageSize: number) => void
  }
  sorting?: {
    field: keyof T | null
    direction: 'asc' | 'desc'
    onSort: (field: keyof T, direction: 'asc' | 'desc') => void
  }
  filtering?: {
    onFilter: (filters: Record<string, string>) => void
  }
  selection?: {
    selectedIds: string[]
    onSelectionChange: (ids: string[]) => void
    getRowId: (row: T) => string
  }
  virtualization?: boolean
  height?: number
  emptyMessage?: string
  className?: string
}

export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  loading = false,
  pagination,
  sorting,
  filtering,
  selection,
  virtualization = false,
  height = 500,
  emptyMessage = 'Veri bulunamadı',
  className = '',
}: DataTableProps<T>) {
  const [filters, setFilters] = useState<Record<string, string>>({})
  const parentRef = React.useRef<HTMLDivElement>(null)

  const filteredData = useMemo(() => {
    if (!filtering || Object.keys(filters).length === 0) return data

    return data.filter((row) => {
      return Object.entries(filters).every(([key, value]) => {
        if (!value) return true
        const cellValue = String(row[key]).toLowerCase()
        return cellValue.includes(value.toLowerCase())
      })
    })
  }, [data, filters, filtering])

  const virtualizer = useVirtualizer({
    count: filteredData.length,
    getScrollElement: () => parentRef.current,
    estimateSize: useCallback(() => 50, []),
    overscan: 5,
  })

  const handleFilterChange = useCallback(
    (column: keyof T, value: string) => {
      const newFilters = { ...filters, [column]: value }
      setFilters(newFilters)
      filtering?.onFilter(newFilters)
    },
    [filters, filtering],
  )

  const handleSort = useCallback(
    (column: keyof T) => {
      if (!sorting) return

      const direction = sorting.field === column && sorting.direction === 'asc' ? 'desc' : 'asc'
      sorting.onSort(column, direction)
    },
    [sorting],
  )

  const handleSelectAll = useCallback(() => {
    if (!selection) return

    const allIds = filteredData.map(selection.getRowId)
    const isAllSelected = allIds.length > 0 && allIds.every((id) => selection.selectedIds.includes(id))

    selection.onSelectionChange(isAllSelected ? [] : allIds)
  }, [selection, filteredData])

  const handleSelectRow = useCallback(
    (row: T) => {
      if (!selection) return

      const id = selection.getRowId(row)
      const isSelected = selection.selectedIds.includes(id)

      const newSelection = isSelected
        ? selection.selectedIds.filter((selectedId) => selectedId !== id)
        : [...selection.selectedIds, id]

      selection.onSelectionChange(newSelection)
    },
    [selection],
  )

  if (loading) {
    return (
      <div className={`border border-neutral-200 dark:border-neutral-700 rounded-lg ${className}`}>
        <div className='overflow-hidden'>
          {Array.from({ length: 5 }, (_, i) => (
            <div key={i} className='p-4 border-b border-neutral-200 dark:border-neutral-700 last:border-b-0'>
              <div className='flex space-x-4'>
                {columns.map((column, j) => (
                  <Skeleton key={j} className='h-4 flex-1' />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className={`border border-neutral-200 dark:border-neutral-700 rounded-lg overflow-hidden ${className}`}>
      {/* Filters */}
      {filtering && (
        <div className='p-4 bg-neutral-50 dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700'>
          <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4'>
            {columns
              .filter((col) => col.filterable)
              .map((column) => (
                <div key={String(column.key)}>
                  <Input
                    placeholder={`${column.label} filtrele...`}
                    value={filters[String(column.key)] || ''}
                    onChange={(e) => handleFilterChange(column.key, e.target.value)}
                    className='text-sm'
                  />
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Table Header */}
      <div className='bg-neutral-50 dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700'>
        <div className='flex'>
          {selection && (
            <div className='w-12 p-4 flex items-center justify-center'>
              <input
                type='checkbox'
                checked={
                  filteredData.length > 0 &&
                  filteredData.every((row) => selection.selectedIds.includes(selection.getRowId(row)))
                }
                onChange={handleSelectAll}
                className='rounded border-neutral-300 dark:border-neutral-600'
              />
            </div>
          )}
          {columns.map((column) => (
            <div
              key={String(column.key)}
              className={`flex-1 p-4 text-left font-medium text-neutral-900 dark:text-neutral-100 ${
                column.sortable ? 'cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-700' : ''
              }`}
              style={{
                width: column.width,
                minWidth: column.minWidth,
                maxWidth: column.maxWidth,
              }}
              onClick={() => column.sortable && handleSort(column.key)}
            >
              <div className='flex items-center space-x-2'>
                <span>{column.label}</span>
                {column.sortable && sorting && (
                  <span className='text-neutral-400'>
                    {sorting.field === column.key ? (sorting.direction === 'asc' ? '↑' : '↓') : '↕'}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Table Body */}
      {filteredData.length === 0 ? (
        <div className='p-8 text-center text-neutral-500 dark:text-neutral-400'>{emptyMessage}</div>
      ) : virtualization ? (
        <div ref={parentRef} style={{ height, overflow: 'auto' }}>
          <div style={{ height: virtualizer.getTotalSize() }}>
            {virtualizer.getVirtualItems().map((virtualRow: any) => {
              const row = filteredData[virtualRow.index]
              return (
                <div
                  key={virtualRow.index}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: virtualRow.size,
                    transform: `translateY(${virtualRow.start}px)`,
                  }}
                  className='border-b border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800'
                >
                  <div className='flex h-full'>
                    {selection && (
                      <div className='w-12 p-4 flex items-center justify-center'>
                        <input
                          type='checkbox'
                          checked={selection.selectedIds.includes(selection.getRowId(row))}
                          onChange={() => handleSelectRow(row)}
                          className='rounded border-neutral-300 dark:border-neutral-600'
                        />
                      </div>
                    )}
                    {columns.map((column) => (
                      <div
                        key={String(column.key)}
                        className='flex-1 p-4 text-neutral-900 dark:text-neutral-100'
                        style={{
                          width: column.width,
                          minWidth: column.minWidth,
                          maxWidth: column.maxWidth,
                        }}
                      >
                        {column.render
                          ? column.render(row[column.key], row, virtualRow.index)
                          : String(row[column.key] || '')}
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      ) : (
        <div style={{ maxHeight: height, overflow: 'auto' }}>
          {filteredData.map((row, index) => (
            <div
              key={index}
              className='border-b border-neutral-200 dark:border-neutral-700 last:border-b-0 hover:bg-neutral-50 dark:hover:bg-neutral-800'
            >
              <div className='flex'>
                {selection && (
                  <div className='w-12 p-4 flex items-center justify-center'>
                    <input
                      type='checkbox'
                      checked={selection.selectedIds.includes(selection.getRowId(row))}
                      onChange={() => handleSelectRow(row)}
                      className='rounded border-neutral-300 dark:border-neutral-600'
                    />
                  </div>
                )}
                {columns.map((column) => (
                  <div
                    key={String(column.key)}
                    className='flex-1 p-4 text-neutral-900 dark:text-neutral-100'
                    style={{
                      width: column.width,
                      minWidth: column.minWidth,
                      maxWidth: column.maxWidth,
                    }}
                  >
                    {column.render ? column.render(row[column.key], row, index) : String(row[column.key] || '')}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {pagination && (
        <div className='p-4 bg-neutral-50 dark:bg-neutral-800 border-t border-neutral-200 dark:border-neutral-700'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center space-x-2'>
              <span className='text-sm text-neutral-600 dark:text-neutral-400'>Sayfa başına:</span>
              <Select
                value={String(pagination.pageSize)}
                onValueChange={(value) => pagination.onPageSizeChange(Number(value))}
              >
                <SelectTrigger className='w-20 h-8'>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[10, 25, 50, 100].map((size) => (
                    <SelectItem key={size} value={String(size)}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className='flex items-center space-x-2'>
              <span className='text-sm text-neutral-600 dark:text-neutral-400'>
                {(pagination.page - 1) * pagination.pageSize + 1}-
                {Math.min(pagination.page * pagination.pageSize, pagination.total)} / {pagination.total}
              </span>

              <div className='flex space-x-1'>
                <Button
                  variant='outline'
                  size='sm'
                  onClick={() => pagination.onPageChange(pagination.page - 1)}
                  disabled={pagination.page <= 1}
                >
                  Önceki
                </Button>
                <Button
                  variant='outline'
                  size='sm'
                  onClick={() => pagination.onPageChange(pagination.page + 1)}
                  disabled={pagination.page >= Math.ceil(pagination.total / pagination.pageSize)}
                >
                  Sonraki
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
