import { z } from 'zod'

// Password güvenlik seviyesi enum'u
export enum PasswordStrength {
  WEAK = 'weak',
  MEDIUM = 'medium',
  STRONG = 'strong',
}

// Güçlü şifre regex pattern'ı
const STRONG_PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/

// Email domain whitelist (opsiyonel)
const ALLOWED_EMAIL_DOMAINS = ['gmail.com', 'outlook.com', 'example.com'] as const

// Login şeması - geliştirilmiş validasyon
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'E-posta adresi gereklidir' })
    .email({ message: 'Geçerli bir e-posta adresi girin' })
    .max(254, { message: 'E-posta adresi çok uzun' })
    .transform((email) => email.toLowerCase().trim())
    .refine(
      (email) => {
        // Development ortamında domain kontrolü yapmıyoruz
        if (process.env.NODE_ENV === 'development') return true

        const domain = email.split('@')[1]
        return ALLOWED_EMAIL_DOMAINS.includes(domain as (typeof ALLOWED_EMAIL_DOMAINS)[number])
      },
      { message: 'Bu e-posta domaini desteklenmiyor' },
    ),

  password: z
    .string()
    .min(1, { message: 'Şifre gereklidir' })
    .min(8, { message: 'Şifre en az 8 karakter olmalıdır' })
    .max(128, { message: 'Şifre çok uzun' })
    .refine(
      (password) => {
        // Development ortamında basit şifrelere izin veriyoruz
        if (process.env.NODE_ENV === 'development') return true
        return STRONG_PASSWORD_REGEX.test(password)
      },
      {
        message: 'Şifre en az bir büyük harf, bir küçük harf, bir rakam ve bir özel karakter içermelidir',
      },
    ),

  rememberMe: z.boolean().optional().default(false),
})

// Register şeması - geliştirilmiş
export const registerSchema = z
  .object({
    name: z
      .string()
      .min(1, { message: 'Ad soyad gereklidir' })
      .min(2, { message: 'Ad soyad en az 2 karakter olmalıdır' })
      .max(100, { message: 'Ad soyad çok uzun' })
      .regex(/^[a-zA-ZçğıöşüÇĞIİÖŞÜ\s]+$/, { message: 'Ad soyad sadece harf içerebilir' })
      .transform((name) => name.trim().replace(/\s+/g, ' ')),

    email: z
      .string()
      .min(1, { message: 'E-posta adresi gereklidir' })
      .email({ message: 'Geçerli bir e-posta adresi girin' })
      .max(254, { message: 'E-posta adresi çok uzun' })
      .transform((email) => email.toLowerCase().trim()),

    password: z
      .string()
      .min(1, { message: 'Şifre gereklidir' })
      .min(8, { message: 'Şifre en az 8 karakter olmalıdır' })
      .max(128, { message: 'Şifre çok uzun' })
      .regex(/[A-Z]/, { message: 'Şifre en az bir büyük harf içermelidir' })
      .regex(/[a-z]/, { message: 'Şifre en az bir küçük harf içermelidir' })
      .regex(/[0-9]/, { message: 'Şifre en az bir rakam içermelidir' })
      .regex(/[@$!%*?&]/, { message: 'Şifre en az bir özel karakter içermelidir' }),

    confirmPassword: z.string().min(1, { message: 'Şifre tekrarı gereklidir' }),

    terms: z.literal(true, {
      errorMap: () => ({ message: 'Kullanım şartlarını kabul etmelisiniz' }),
    }),

    newsletter: z.boolean().optional().default(false),
  })
  .superRefine((data, ctx) => {
    // Şifre eşleşme kontrolü
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Şifreler eşleşmiyor',
        path: ['confirmPassword'],
      })
    }
  })

// Forgot password şeması
export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'E-posta adresi gereklidir' })
    .email({ message: 'Geçerli bir e-posta adresi girin' })
    .transform((email) => email.toLowerCase().trim()),
})

// Reset password şeması
export const resetPasswordSchema = z
  .object({
    token: z.string().min(1, { message: 'Reset token gereklidir' }),

    password: z
      .string()
      .min(1, { message: 'Şifre gereklidir' })
      .min(8, { message: 'Şifre en az 8 karakter olmalıdır' })
      .max(128, { message: 'Şifre çok uzun' })
      .regex(/[A-Z]/, { message: 'Şifre en az bir büyük harf içermelidir' })
      .regex(/[a-z]/, { message: 'Şifre en az bir küçük harf içermelidir' })
      .regex(/[0-9]/, { message: 'Şifre en az bir rakam içermelidir' })
      .regex(/[@$!%*?&]/, { message: 'Şifre en az bir özel karakter içermelidir' }),

    confirmPassword: z.string().min(1, { message: 'Şifre tekrarı gereklidir' }),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Şifreler eşleşmiyor',
        path: ['confirmPassword'],
      })
    }
  })

// Type exports
export type LoginFormValues = z.infer<typeof loginSchema>
export type RegisterFormValues = z.infer<typeof registerSchema>
export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>
export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>

// Password strength checker utility
export const checkPasswordStrength = (password: string): PasswordStrength => {
  let score = 0

  if (password.length >= 8) score += 1
  if (/[a-z]/.test(password)) score += 1
  if (/[A-Z]/.test(password)) score += 1
  if (/[0-9]/.test(password)) score += 1
  if (/[@$!%*?&]/.test(password)) score += 1
  if (password.length >= 12) score += 1

  if (score < 3) return PasswordStrength.WEAK
  if (score < 5) return PasswordStrength.MEDIUM
  return PasswordStrength.STRONG
}
