'use client'

import { z } from 'zod'
import { useTranslation } from 'react-i18next'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm as useReactHookForm, UseFormProps, FieldErrors, FieldPath } from 'react-hook-form'
import { useCallback, useMemo } from 'react'

/**
 * İyileştirilmiş form validation hook
 * - Daha iyi hata mesajı çevirisi
 * - Custom validation rules
 * - Async validation desteği
 * - Field-level validation
 * - Real-time validation
 */
export function useFormValidation<T extends z.ZodObject<any, any, any>>(
  schema: T,
  options?: Omit<UseFormProps<z.infer<T>>, 'resolver'> & {
    translateErrors?: boolean
    validateOnChange?: boolean
    validateOnBlur?: boolean
    customErrorMessages?: Record<string, string>
  },
) {
  const { t } = useTranslation()
  const {
    translateErrors = true,
    validateOnChange = false,
    validateOnBlur = true,
    customErrorMessages = {},
    ...formOptions
  } = options || {}

  // Create enhanced resolver with better error translation
  const resolver = useMemo(() => {
    return zodResolver(schema, {
      errorMap: (issue, ctx) => {
        const fieldPath = issue.path.join('.')

        // Check for custom error messages first
        if (customErrorMessages[fieldPath]) {
          return { message: customErrorMessages[fieldPath] }
        }

        if (!translateErrors) {
          return { message: ctx.defaultError }
        }

        let translationKey = ''
        let translationParams: Record<string, any> = {}

        // Map Zod error codes to translation keys with better context
        switch (issue.code) {
          case z.ZodIssueCode.invalid_type:
            if (issue.received === 'undefined' || issue.received === 'null') {
              translationKey = 'validation.required'
            } else {
              translationKey = 'validation.invalidType'
              translationParams = {
                expected: issue.expected,
                received: issue.received,
              }
            }
            break

          case z.ZodIssueCode.too_small:
            if (issue.type === 'string') {
              translationKey = 'validation.minLength'
              translationParams = { min: issue.minimum }
            } else if (issue.type === 'number') {
              translationKey = 'validation.minValue'
              translationParams = { min: issue.minimum }
            } else if (issue.type === 'array') {
              translationKey = 'validation.minItems'
              translationParams = { min: issue.minimum }
            } else if (issue.type === 'date') {
              translationKey = 'validation.minDate'
              translationParams = { min: new Date(issue.minimum as number).toLocaleDateString() }
            }
            break

          case z.ZodIssueCode.too_big:
            if (issue.type === 'string') {
              translationKey = 'validation.maxLength'
              translationParams = { max: issue.maximum }
            } else if (issue.type === 'number') {
              translationKey = 'validation.maxValue'
              translationParams = { max: issue.maximum }
            } else if (issue.type === 'array') {
              translationKey = 'validation.maxItems'
              translationParams = { max: issue.maximum }
            } else if (issue.type === 'date') {
              translationKey = 'validation.maxDate'
              translationParams = { max: new Date(issue.maximum as number).toLocaleDateString() }
            }
            break

          case z.ZodIssueCode.invalid_string:
            switch (issue.validation) {
              case 'email':
                translationKey = 'validation.email'
                break
              case 'url':
                translationKey = 'validation.url'
                break
              case 'uuid':
                translationKey = 'validation.uuid'
                break
              case 'regex':
                translationKey = 'validation.pattern'
                break
              default:
                translationKey = 'validation.invalidFormat'
            }
            break

          case z.ZodIssueCode.invalid_literal:
            translationKey = 'validation.mustBe'
            translationParams = { value: issue.expected }
            break

          case z.ZodIssueCode.unrecognized_keys:
            translationKey = 'validation.unknownKeys'
            translationParams = { keys: issue.keys.join(', ') }
            break

          case z.ZodIssueCode.invalid_union:
            translationKey = 'validation.invalidOption'
            break

          case z.ZodIssueCode.invalid_date:
            translationKey = 'validation.invalidDate'
            break

          case z.ZodIssueCode.custom:
            // Handle custom validation messages
            if (issue.params?.['translationKey']) {
              translationKey = issue.params['translationKey']
              translationParams = issue.params['translationParams'] || {}
            } else {
              translationKey = 'validation.custom'
            }
            break

          default:
            translationKey = 'validation.invalid'
        }

        // Attempt to translate, fall back to default error
        try {
          const translationResult = t(translationKey, translationParams)
          const messageText =
            typeof translationResult === 'string' && translationResult !== translationKey
              ? translationResult
              : ctx.defaultError
          return { message: messageText }
        } catch {
          return { message: ctx.defaultError }
        }
      },
    })
  }, [schema, translateErrors, customErrorMessages, t])

  // Form instance with enhanced configuration
  const form = useReactHookForm<z.infer<T>>({
    resolver,
    mode: validateOnChange ? 'onChange' : validateOnBlur ? 'onBlur' : 'onSubmit',
    reValidateMode: 'onChange',
    shouldFocusError: true,
    shouldUnregister: false,
    ...formOptions,
  })

  // Enhanced field validation
  const validateField = useCallback(
    async (fieldName: FieldPath<z.infer<T>>, value: any) => {
      try {
        // Create a partial schema for the specific field
        const fieldSchema = schema.pick({ [fieldName]: true } as any)
        await fieldSchema.parseAsync({ [fieldName]: value })
        return null
      } catch (error) {
        if (error instanceof z.ZodError) {
          const fieldError = error.errors.find((err) => err.path.includes(fieldName))
          return fieldError?.message || 'Geçersiz değer'
        }
        return 'Doğrulama hatası'
      }
    },
    [schema],
  )

  // Async validation with debounce
  const validateFieldAsync = useCallback(
    (fieldName: FieldPath<z.infer<T>>, validator: (value: any) => Promise<boolean | string>) => {
      return async (value: any) => {
        try {
          const result = await validator(value)
          if (result === true) return true
          if (typeof result === 'string') return result
          return 'Geçersiz değer'
        } catch {
          return 'Doğrulama hatası oluştu'
        }
      }
    },
    [],
  )

  // Get field error with translation
  const getFieldError = useCallback(
    (fieldName: FieldPath<z.infer<T>>) => {
      const error = form.formState.errors[fieldName]
      if (!error) return null

      return {
        message: error.message || t('validation.invalid'),
        type: error.type,
      }
    },
    [form.formState.errors, t],
  )

  // Check if field has error
  const hasFieldError = useCallback(
    (fieldName: FieldPath<z.infer<T>>) => {
      return !!form.formState.errors[fieldName]
    },
    [form.formState.errors],
  )

  // Get all field errors formatted
  const getAllErrors = useCallback(() => {
    const errors: Record<string, string> = {}
    Object.entries(form.formState.errors).forEach(([key, error]) => {
      if (error?.message && typeof error.message === 'string') {
        errors[key] = error.message
      }
    })
    return errors
  }, [form.formState.errors])

  // Submit with better error handling
  const handleSubmit = useCallback(
    (onValid: (data: z.infer<T>) => void | Promise<void>, onInvalid?: (errors: FieldErrors<z.infer<T>>) => void) => {
      return form.handleSubmit(
        async (data) => {
          try {
            await onValid(data)
          } catch (error) {
            console.error('Form submission error:', error)
          }
        },
        (errors) => {
          console.warn('Form validation errors:', errors)
          onInvalid?.(errors)
        },
      )
    },
    [form],
  )

  // Reset form with optional data
  const resetForm = useCallback(
    (data?: Partial<z.infer<T>>) => {
      form.reset(data)
    },
    [form],
  )

  // Set field value with validation
  const setFieldValue = useCallback(
    (fieldName: FieldPath<z.infer<T>>, value: any, options?: { shouldValidate?: boolean; shouldTouch?: boolean }) => {
      form.setValue(fieldName, value, {
        shouldValidate: options?.shouldValidate ?? validateOnChange,
        shouldTouch: options?.shouldTouch ?? true,
        shouldDirty: true,
      })
    },
    [form, validateOnChange],
  )

  // Watch field with type safety
  const watchField = useCallback(
    <K extends FieldPath<z.infer<T>>>(fieldName: K) => {
      return form.watch(fieldName)
    },
    [form],
  )

  // Form state helpers
  const formState = useMemo(
    () => ({
      isDirty: form.formState.isDirty,
      isValid: form.formState.isValid,
      isSubmitting: form.formState.isSubmitting,
      isSubmitSuccessful: form.formState.isSubmitSuccessful,
      isValidating: form.formState.isValidating,
      submitCount: form.formState.submitCount,
      touchedFields: form.formState.touchedFields,
      dirtyFields: form.formState.dirtyFields,
      errorCount: Object.keys(form.formState.errors).length,
      hasErrors: Object.keys(form.formState.errors).length > 0,
    }),
    [form.formState],
  )

  return {
    // Form instance
    form,

    // Enhanced methods
    handleSubmit,
    resetForm,
    setFieldValue,
    watchField,
    validateField,
    validateFieldAsync,

    // Error helpers
    getFieldError,
    hasFieldError,
    getAllErrors,

    // State
    formState,

    // Direct access to form methods
    register: form.register,
    control: form.control,
    setValue: form.setValue,
    getValues: form.getValues,
    trigger: form.trigger,
    clearErrors: form.clearErrors,
    setError: form.setError,
  }
}

/**
 * Common validation schemas with translations
 */
export const commonSchemas = {
  email: z.string().email(),
  password: z
    .string()
    .min(8)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
      message: 'validation.passwordComplexity',
    }),
  phone: z.string().regex(/^[+]?[\d\s\-()]+$/, {
    message: 'validation.phoneFormat',
  }),
  url: z.string().url(),
  required: z.string().min(1),
  optionalString: z.string().optional().or(z.literal('')),
  positiveNumber: z.number().positive(),
  nonNegativeNumber: z.number().min(0),
  dateString: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'validation.dateFormat',
  }),
}

/**
 * Custom validation helpers
 */
export const customValidations = {
  // Password confirmation
  // This validation must be applied to an object schema using .superRefine().
  // The main password field and the confirmation password field should be basic string types.
  // Example usage:
  // z.object({
  //   password: z.string(),
  //   confirmPassword: z.string(),
  // }).superRefine(customValidations.confirmPassword('password', 'confirmPassword'))
  confirmPassword:
    (passwordFieldName: string, confirmPasswordFieldName: string) =>
    (data: Record<string, any>, ctx: z.RefinementCtx) => {
      if (data[passwordFieldName] !== data[confirmPasswordFieldName]) {
        ctx.addIssue({
          path: [confirmPasswordFieldName], // Attach error to the confirmation field
          code: z.ZodIssueCode.custom,
          params: { translationKey: 'validation.passwordMatch' },
        })
      }
    },

  // Age validation
  minAge: (minAge: number) =>
    z.date().refine(
      (date) => {
        const today = new Date()
        const age = today.getFullYear() - date.getFullYear()
        return age >= minAge
      },
      { message: 'validation.minAge', params: { minAge } },
    ),

  // File size validation
  maxFileSize: (maxSizeInMB: number) =>
    z.instanceof(File).refine((file) => file.size <= maxSizeInMB * 1024 * 1024, {
      message: 'validation.maxFileSize',
      params: { maxSizeInMB },
    }),

  // File type validation
  allowedFileTypes: (allowedTypes: string[]) =>
    z.instanceof(File).refine((file) => allowedTypes.includes(file.type), {
      message: 'validation.allowedFileTypes',
      params: { allowedTypes: allowedTypes.join(', ') },
    }),
}

export default useFormValidation
