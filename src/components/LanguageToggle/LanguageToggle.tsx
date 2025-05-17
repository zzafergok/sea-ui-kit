import React from 'react'

import { Globe } from 'lucide-react'

import { Select, SelectItem, SelectValue, SelectContent, SelectTrigger } from '../Select/Select'

import { setLanguage, selectCurrentLanguage, selectAvailableLanguages } from '@/store/slices/langSlice'
import { useAppDispatch, useAppSelector } from '@/store'

import { cn } from '@/lib/utils'

interface LanguageToggleProps {
  className?: string
}

export function LanguageToggle({ className }: LanguageToggleProps) {
  const dispatch = useAppDispatch()

  const currentLanguage = useAppSelector(selectCurrentLanguage)
  const availableLanguages = useAppSelector(selectAvailableLanguages)

  const handleLanguageChange = (value: string) => {
    dispatch(setLanguage(value))
  }

  return (
    <div className={cn('flex items-center space-x-2', className)}>
      <Globe className='h-4 w-4 text-neutral-500' />
      <Select value={currentLanguage} onValueChange={handleLanguageChange}>
        <SelectTrigger className='w-[70px] h-8'>
          <SelectValue placeholder={currentLanguage.toUpperCase()} />
        </SelectTrigger>
        <SelectContent>
          {availableLanguages.map((lang) => (
            <SelectItem key={lang} value={lang}>
              {lang.toUpperCase()}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
