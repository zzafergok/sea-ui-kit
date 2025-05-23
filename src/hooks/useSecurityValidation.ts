'use client'

import { useCallback, useRef, useState } from 'react'
import { SecurityUtils } from '@/utils/security'

interface SecurityValidationOptions {
  enableRateLimit?: boolean
  maxAttempts?: number
  windowMs?: number
  enableXSSProtection?: boolean
  enableCSRFProtection?: boolean
}

export function useSecurityValidation({
  enableRateLimit = true,
  maxAttempts = 5,
  windowMs = 15 * 60 * 1000,
  enableXSSProtection = true,
  enableCSRFProtection = true,
}: SecurityValidationOptions = {}) {
  const [csrfToken, setCSRFToken] = useState<string>('')
  const sessionIdRef = useRef<string>(SecurityUtils.generateSecureId())

  const validateInput = useCallback(
    (
      input: string,
      fieldName?: string,
    ): {
      isValid: boolean
      sanitizedValue: string
      errors: string[]
    } => {
      const errors: string[] = []
      let sanitizedValue = input

      // XSS Protection
      if (enableXSSProtection && SecurityUtils.detectXSS(input)) {
        errors.push(`${fieldName || 'Alan'} güvenlik açığı içeriyor`)
      }

      // Input sanitization
      sanitizedValue = SecurityUtils.sanitizeInput(input)

      return {
        isValid: errors.length === 0,
        sanitizedValue,
        errors,
      }
    },
    [enableXSSProtection],
  )

  const validateEmail = useCallback(
    (
      email: string,
    ): {
      isValid: boolean
      error?: string
    } => {
      const { isValid, sanitizedValue } = validateInput(email, 'E-posta')

      if (!isValid) {
        return { isValid: false, error: 'E-posta güvenlik açığı içeriyor' }
      }

      if (!SecurityUtils.validateEmail(sanitizedValue)) {
        return { isValid: false, error: 'Geçersiz e-posta formatı' }
      }

      return { isValid: true }
    },
    [validateInput],
  )

  const validatePassword = useCallback(
    (
      password: string,
    ): {
      isValid: boolean
      errors: string[]
    } => {
      const inputValidation = validateInput(password, 'Şifre')

      if (!inputValidation.isValid) {
        return { isValid: false, errors: inputValidation.errors }
      }

      const passwordValidation = SecurityUtils.validatePassword(inputValidation.sanitizedValue)
      return passwordValidation
    },
    [validateInput],
  )

  const checkRateLimit = useCallback(
    (
      action: string,
    ): {
      allowed: boolean
      remainingAttempts: number
      resetTime?: number
    } => {
      if (!enableRateLimit) {
        return { allowed: true, remainingAttempts: maxAttempts }
      }

      const key = `${sessionIdRef.current}-${action}`
      return SecurityUtils.rateLimit(key, maxAttempts, windowMs)
    },
    [enableRateLimit, maxAttempts, windowMs],
  )

  const generateCSRFToken = useCallback((): string => {
    if (!enableCSRFProtection) return ''

    const token = SecurityUtils.generateCSRFToken()
    setCSRFToken(token)

    // Cookie'ye de kaydet
    document.cookie = `csrf-token=${token}; secure; samesite=strict`

    return token
  }, [enableCSRFProtection])

  const validateCSRFToken = useCallback(
    (token: string): boolean => {
      if (!enableCSRFProtection) return true
      return SecurityUtils.validateCSRFToken(token, csrfToken)
    },
    [enableCSRFProtection, csrfToken],
  )

  const secureLocalStorage = {
    setItem: useCallback((key: string, value: string): void => {
      try {
        const encryptedValue = SecurityUtils.encryptData(value)
        localStorage.setItem(key, encryptedValue)
      } catch (error) {
        console.error('Secure storage error:', error)
      }
    }, []),

    getItem: useCallback((key: string): string | null => {
      try {
        const encryptedValue = localStorage.getItem(key)
        if (!encryptedValue) return null
        return SecurityUtils.decryptData(encryptedValue)
      } catch (error) {
        console.error('Secure retrieval error:', error)
        return null
      }
    }, []),

    removeItem: useCallback((key: string): void => {
      localStorage.removeItem(key)
    }, []),
  }

  return {
    validateInput,
    validateEmail,
    validatePassword,
    checkRateLimit,
    generateCSRFToken,
    validateCSRFToken,
    secureLocalStorage,
    sessionId: sessionIdRef.current,
  }
}
