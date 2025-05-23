import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * TypeScript yardımcı fonksiyonları
 */

// CSS sınıflarını birleştiren fonksiyon
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Tür güvenli Object.keys
export function objectKeys<T extends Record<string, unknown>>(obj: T): (keyof T)[] {
  return Object.keys(obj) as (keyof T)[]
}

// Tür güvenli Object.entries
export function objectEntries<T extends Record<string, unknown>>(obj: T): [keyof T, T[keyof T]][] {
  return Object.entries(obj) as [keyof T, T[keyof T]][]
}

// Null/undefined kontrolü
export function isDefined<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined
}

// Array'in boş olup olmadığını kontrol eden fonksiyon
export function isNonEmptyArray<T>(value: T[]): value is [T, ...T[]] {
  return value.length > 0
}

// Tür güvenli JSON parse
export function safeJsonParse<T>(str: string, fallback: T): T {
  try {
    return JSON.parse(str) as T
  } catch {
    return fallback
  }
}

// Promise'lerin hata güvenli çalıştırılması
export async function safeAsync<T>(promise: Promise<T>, fallback: T): Promise<T> {
  try {
    return await promise
  } catch (error) {
    console.error('Async operation failed:', error)
    return fallback
  }
}

// Component displayName ayarlayıcısı
export function withDisplayName<T extends React.ComponentType<any>>(component: T, displayName: string): T {
  component.displayName = displayName
  return component
}
