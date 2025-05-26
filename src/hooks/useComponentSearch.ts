/* eslint-disable prefer-const */
'use client'

import { useState, useMemo, useCallback } from 'react'

export interface ComponentItem {
  id: string
  name: string
  description: string
  category: string
  tags: string[]
  status: 'stable' | 'beta' | 'alpha' | 'deprecated'
  lastUpdated: string
  popularity: number
  component?: React.ComponentType<any>
}

interface UseComponentSearchProps {
  components: ComponentItem[]
  initialSearchQuery?: string
  initialCategories?: string[]
  initialStatus?: string[]
}

interface SearchFilters {
  searchQuery: string
  selectedCategories: string[]
  selectedStatus: string[]
  sortBy: 'name' | 'popularity' | 'updated'
  sortOrder: 'asc' | 'desc'
}

export function useComponentSearch({
  components,
  initialSearchQuery = '',
  initialCategories = [],
  initialStatus = [],
}: UseComponentSearchProps) {
  const [filters, setFilters] = useState<SearchFilters>({
    searchQuery: initialSearchQuery,
    selectedCategories: initialCategories,
    selectedStatus: initialStatus,
    sortBy: 'name',
    sortOrder: 'asc',
  })

  // Kategorileri otomatik çıkar
  const availableCategories = useMemo(() => {
    const cats = Array.from(new Set(components.map((c) => c.category)))
    return cats.map((cat) => ({
      value: cat,
      label: cat,
      count: components.filter((c) => c.category === cat).length,
    }))
  }, [components])

  // Durumları otomatik çıkar
  const availableStatuses = useMemo(() => {
    const statuses = Array.from(new Set(components.map((c) => c.status)))
    return statuses.map((status) => ({
      value: status,
      label: status.charAt(0).toUpperCase() + status.slice(1),
      count: components.filter((c) => c.status === status).length,
    }))
  }, [components])

  // Filtreleme ve sıralama mantığı
  const filteredComponents = useMemo(() => {
    let filtered = components.filter((component) => {
      // Arama sorgusu kontrolü
      const matchesSearch =
        !filters.searchQuery ||
        component.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        component.description.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        component.tags.some((tag) => tag.toLowerCase().includes(filters.searchQuery.toLowerCase()))

      // Kategori filtresi
      const matchesCategory =
        filters.selectedCategories.length === 0 || filters.selectedCategories.includes(component.category)

      // Durum filtresi
      const matchesStatus = filters.selectedStatus.length === 0 || filters.selectedStatus.includes(component.status)

      return matchesSearch && matchesCategory && matchesStatus
    })

    // Sıralama
    filtered.sort((a, b) => {
      let comparison = 0

      switch (filters.sortBy) {
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

      return filters.sortOrder === 'asc' ? comparison : -comparison
    })

    return filtered
  }, [components, filters])

  // Filter güncellemek için yardımcı fonksiyonlar
  const updateSearchQuery = useCallback((query: string) => {
    setFilters((prev) => ({ ...prev, searchQuery: query }))
  }, [])

  const toggleCategory = useCallback((category: string) => {
    setFilters((prev) => ({
      ...prev,
      selectedCategories: prev.selectedCategories.includes(category)
        ? prev.selectedCategories.filter((c) => c !== category)
        : [...prev.selectedCategories, category],
    }))
  }, [])

  const toggleStatus = useCallback((status: string) => {
    setFilters((prev) => ({
      ...prev,
      selectedStatus: prev.selectedStatus.includes(status)
        ? prev.selectedStatus.filter((s) => s !== status)
        : [...prev.selectedStatus, status],
    }))
  }, [])

  const updateSort = useCallback((sortBy: SearchFilters['sortBy'], sortOrder: SearchFilters['sortOrder']) => {
    setFilters((prev) => ({ ...prev, sortBy, sortOrder }))
  }, [])

  const clearFilters = useCallback(() => {
    setFilters({
      searchQuery: '',
      selectedCategories: [],
      selectedStatus: [],
      sortBy: 'name',
      sortOrder: 'asc',
    })
  }, [])

  const hasActiveFilters = useMemo(() => {
    return filters.searchQuery.length > 0 || filters.selectedCategories.length > 0 || filters.selectedStatus.length > 0
  }, [filters])

  return {
    // Filtered results
    filteredComponents,
    totalCount: components.length,
    filteredCount: filteredComponents.length,

    // Current filters
    filters,
    hasActiveFilters,

    // Available options
    availableCategories,
    availableStatuses,

    // Actions
    updateSearchQuery,
    toggleCategory,
    toggleStatus,
    updateSort,
    clearFilters,
    setFilters,
  }
}
