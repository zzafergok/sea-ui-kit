import CryptoJS from 'crypto-js'

interface SecurityConfig {
  encryption: {
    algorithm: string
    keySize: number
    ivSize: number
  }
  session: {
    maxAge: number
    secure: boolean
    sameSite: 'strict' | 'lax' | 'none'
  }
  csrf: {
    tokenName: string
    cookieName: string
  }
}

const securityConfig: SecurityConfig = {
  encryption: {
    algorithm: 'AES',
    keySize: 256,
    ivSize: 128,
  },
  session: {
    maxAge: 30 * 60 * 1000, // 30 dakika
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  },
  csrf: {
    tokenName: 'x-csrf-token',
    cookieName: 'csrf-token',
  },
}

export class SecurityUtils {
  private static readonly SECRET_KEY = process.env.NEXT_PUBLIC_ENCRYPTION_KEY || 'default-secret-key'

  static encryptData(data: string): string {
    try {
      const encrypted = CryptoJS.AES.encrypt(data, this.SECRET_KEY).toString()
      return encrypted
    } catch (error) {
      console.error('Encryption error:', error)
      throw new Error('Veri şifrelenirken hata oluştu')
    }
  }

  static decryptData(encryptedData: string): string {
    try {
      const decrypted = CryptoJS.AES.decrypt(encryptedData, this.SECRET_KEY)
      return decrypted.toString(CryptoJS.enc.Utf8)
    } catch (error) {
      console.error('Decryption error:', error)
      throw new Error('Veri çözülürken hata oluştu')
    }
  }

  static sanitizeInput(input: string): string {
    return input
      .replace(/[<>]/g, '') // HTML tag'lerini kaldır
      .replace(/javascript:/gi, '') // JavaScript URL'lerini kaldır
      .replace(/on\w+=/gi, '') // Event handler'ları kaldır
      .trim()
  }

  static validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  static validatePassword(password: string): {
    isValid: boolean
    errors: string[]
  } {
    const errors: string[] = []

    if (password.length < 8) {
      errors.push('Şifre en az 8 karakter olmalıdır')
    }

    if (!/[A-Z]/.test(password)) {
      errors.push('Şifre en az bir büyük harf içermelidir')
    }

    if (!/[a-z]/.test(password)) {
      errors.push('Şifre en az bir küçük harf içermelidir')
    }

    if (!/[0-9]/.test(password)) {
      errors.push('Şifre en az bir rakam içermelidir')
    }

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push('Şifre en az bir özel karakter içermelidir')
    }

    return {
      isValid: errors.length === 0,
      errors,
    }
  }

  static generateCSRFToken(): string {
    return CryptoJS.lib.WordArray.random(32).toString()
  }

  static validateCSRFToken(token: string, expectedToken: string): boolean {
    return token === expectedToken
  }

  static sanitizeHTML(html: string): string {
    const div = document.createElement('div')
    div.textContent = html
    return div.innerHTML
  }

  static generateSecureId(): string {
    return CryptoJS.lib.WordArray.random(16).toString()
  }

  static hashPassword(password: string, salt?: string): string {
    const saltToUse = salt || CryptoJS.lib.WordArray.random(128 / 8).toString()
    const hashedPassword = CryptoJS.PBKDF2(password, saltToUse, {
      keySize: 256 / 32,
      iterations: 10000,
    }).toString()

    return `${saltToUse}:${hashedPassword}`
  }

  static verifyPassword(password: string, hashedPassword: string): boolean {
    const [salt] = hashedPassword.split(':')
    const hashToVerify = this.hashPassword(password, salt)
    return hashToVerify === hashedPassword
  }

  static isSecureConnection(): boolean {
    return window.location.protocol === 'https:'
  }

  static detectXSS(input: string): boolean {
    const xssPatterns = [
      /<script[^>]*>.*?<\/script>/gi,
      /<iframe[^>]*>.*?<\/iframe>/gi,
      /javascript:/gi,
      /on\w+\s*=/gi,
      /<object[^>]*>.*?<\/object>/gi,
      /<embed[^>]*>/gi,
    ]

    return xssPatterns.some((pattern) => pattern.test(input))
  }

  static rateLimit = (() => {
    const attempts = new Map<string, { count: number; resetTime: number }>()

    return (key: string, maxAttempts: number = 5, windowMs: number = 15 * 60 * 1000) => {
      const now = Date.now()
      const attempt = attempts.get(key)

      if (!attempt || now > attempt.resetTime) {
        attempts.set(key, { count: 1, resetTime: now + windowMs })
        return { allowed: true, remainingAttempts: maxAttempts - 1 }
      }

      if (attempt.count >= maxAttempts) {
        return {
          allowed: false,
          remainingAttempts: 0,
          resetTime: attempt.resetTime,
        }
      }

      attempt.count++
      return {
        allowed: true,
        remainingAttempts: maxAttempts - attempt.count,
      }
    }
  })()
}

export { securityConfig }
