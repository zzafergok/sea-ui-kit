/* eslint-disable @typescript-eslint/no-require-imports */
import '@testing-library/jest-dom'
import { jest, beforeAll, afterEach, afterAll } from '@jest/globals'

// React 18 için gerekli global tanımlar
global.React = require('react')

// TypeScript modül çözümleme yardımcısı
if (typeof window !== 'undefined') {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  })
}

// MSW setup için
beforeAll(() => {
  // Mock servisleri burada ayarlanabilir
})

afterEach(() => {
  jest.clearAllMocks()
})

afterAll(() => {
  jest.restoreAllMocks()
})
