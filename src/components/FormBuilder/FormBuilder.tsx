'use client'

import React, { useMemo, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { Input } from '../Input/Input'
import { Textarea } from '../Textarea/Textarea'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../Select/Select'
import { Checkbox } from '../Checkbox/Checkbox'
import { Switch } from '../Switch/Switch'
import { Button } from '../Button/Button'
import { Form, FormItem, FormField, FormLabel, FormMessage, FormDescription } from '../Form/Form'

export type FieldType =
  | 'text'
  | 'email'
  | 'password'
  | 'number'
  | 'textarea'
  | 'select'
  | 'checkbox'
  | 'switch'
  | 'radio'
  | 'date'
  | 'file'

export interface FormFieldConfig {
  name: string
  type: FieldType
  label: string
  placeholder?: string
  description?: string
  required?: boolean
  disabled?: boolean
  options?: Array<{ value: string; label: string }>
  validation?: z.ZodType<any>
  dependencies?: string[]
  conditionalLogic?: (values: any) => boolean
  grid?: {
    col?: number
    row?: number
    span?: number
  }
}

export interface FormBuilderProps {
  fields: FormFieldConfig[]
  onSubmit: (data: any) => void | Promise<void>
  loading?: boolean
  submitLabel?: string
  resetLabel?: string
  showReset?: boolean
  className?: string
  gridCols?: number
  defaultValues?: Record<string, any>
}

export function FormBuilder({
  fields,
  onSubmit,
  loading = false,
  submitLabel = 'Gönder',
  resetLabel = 'Sıfırla',
  showReset = true,
  className = '',
  gridCols = 1,
  defaultValues = {},
}: FormBuilderProps) {
  // Dinamik schema oluşturma
  const schema = useMemo(() => {
    const schemaObject: Record<string, z.ZodType<any>> = {}

    fields.forEach((field) => {
      let fieldSchema = field.validation || z.string()

      if (field.required) {
        fieldSchema = fieldSchema.refine((value) => value !== undefined && value !== null && value !== '', {
          message: `${field.label} zorunludur`,
        })
      } else {
        fieldSchema = fieldSchema.optional()
      }

      schemaObject[field.name] = fieldSchema
    })

    return z.object(schemaObject)
  }, [fields])

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues,
    mode: 'onChange',
  })

  const watchedValues = form.watch()

  // Field render logic
  const renderField = useCallback(
    (fieldConfig: FormFieldConfig) => {
      const { name, type, label, placeholder, description, disabled, options, conditionalLogic } = fieldConfig

      // Conditional logic kontrolü
      if (conditionalLogic && !conditionalLogic(watchedValues)) {
        return null
      }

      const commonProps = {
        disabled: disabled || loading,
        placeholder,
      }

      return (
        <FormField
          key={name}
          control={form.control}
          name={name}
          render={({ field }) => (
            <FormItem className={fieldConfig.grid ? `col-span-${fieldConfig.grid.span || 1}` : 'col-span-1'}>
              <FormLabel required={fieldConfig.required}>{label}</FormLabel>

              {(() => {
                switch (type) {
                  case 'text':
                  case 'email':
                  case 'password':
                  case 'number':
                    return <Input type={type} {...commonProps} {...field} value={field.value || ''} />

                  case 'textarea':
                    return <Textarea {...commonProps} {...field} value={field.value || ''} />

                  case 'select':
                    return (
                      <Select value={field.value || ''} onValueChange={field.onChange} disabled={commonProps.disabled}>
                        <SelectTrigger>
                          <SelectValue placeholder={placeholder} />
                        </SelectTrigger>
                        <SelectContent>
                          {options?.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )

                  case 'checkbox':
                    return (
                      <div className='flex items-center space-x-2'>
                        <Checkbox
                          checked={field.value || false}
                          onCheckedChange={field.onChange}
                          disabled={commonProps.disabled}
                        />
                        <span className='text-sm'>{placeholder}</span>
                      </div>
                    )

                  case 'switch':
                    return (
                      <div className='flex items-center space-x-2'>
                        <Switch
                          checked={field.value || false}
                          onCheckedChange={field.onChange}
                          disabled={commonProps.disabled}
                        />
                        <span className='text-sm'>{placeholder}</span>
                      </div>
                    )

                  case 'radio':
                    return (
                      <div className='space-y-2'>
                        {options?.map((option) => (
                          <div key={option.value} className='flex items-center space-x-2'>
                            <input
                              type='radio'
                              id={`${name}-${option.value}`}
                              value={option.value}
                              checked={field.value === option.value}
                              onChange={(e) => field.onChange(e.target.value)}
                              disabled={commonProps.disabled}
                              className='form-radio'
                            />
                            <label htmlFor={`${name}-${option.value}`} className='text-sm'>
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    )

                  case 'date':
                    return <Input type='date' {...commonProps} {...field} value={field.value || ''} />

                  case 'file':
                    return (
                      <Input
                        type='file'
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          field.onChange(file)
                        }}
                        disabled={commonProps.disabled}
                      />
                    )

                  default:
                    return null
                }
              })()}

              {description && <FormDescription>{description}</FormDescription>}
              <FormMessage />
            </FormItem>
          )}
        />
      )
    },
    [form.control, loading, watchedValues],
  )

  // Dependency management
  const visibleFields = useMemo(() => {
    return fields.filter((field) => {
      if (!field.dependencies) return true

      return field.dependencies.every((dep) => {
        const depValue = watchedValues[dep]
        return depValue !== undefined && depValue !== null && depValue !== ''
      })
    })
  }, [fields, watchedValues])

  const handleReset = useCallback(() => {
    form.reset(defaultValues)
  }, [form, defaultValues])

  return (
    <div className={`max-w-4xl mx-auto ${className}`}>
      <Form form={form} onSubmit={onSubmit}>
        <div className={`grid gap-6 ${gridCols > 1 ? `grid-cols-1 md:grid-cols-${gridCols}` : 'grid-cols-1'}`}>
          {visibleFields.map(renderField)}
        </div>

        <div className='flex gap-4 mt-8 justify-end'>
          {showReset && (
            <Button type='button' variant='outline' onClick={handleReset} disabled={loading}>
              {resetLabel}
            </Button>
          )}
          <Button type='submit' disabled={loading || !form.formState.isValid}>
            {loading ? 'İşleniyor...' : submitLabel}
          </Button>
        </div>
      </Form>
    </div>
  )
}

// Usage example component
export function ExampleFormBuilder() {
  const formFields: FormFieldConfig[] = [
    {
      name: 'firstName',
      type: 'text',
      label: 'Ad',
      placeholder: 'Adınızı girin',
      required: true,
      validation: z.string().min(2, 'Ad en az 2 karakter olmalıdır'),
      grid: { span: 1 },
    },
    {
      name: 'lastName',
      type: 'text',
      label: 'Soyad',
      placeholder: 'Soyadınızı girin',
      required: true,
      validation: z.string().min(2, 'Soyad en az 2 karakter olmalıdır'),
      grid: { span: 1 },
    },
    {
      name: 'email',
      type: 'email',
      label: 'E-posta',
      placeholder: 'E-posta adresinizi girin',
      required: true,
      validation: z.string().email('Geçerli bir e-posta adresi girin'),
      grid: { span: 2 },
    },
    {
      name: 'company',
      type: 'text',
      label: 'Şirket',
      placeholder: 'Şirket adını girin',
      dependencies: ['email'],
      conditionalLogic: (values) => values.email?.includes('@'),
    },
    {
      name: 'department',
      type: 'select',
      label: 'Departman',
      placeholder: 'Departman seçin',
      options: [
        { value: 'it', label: 'Bilgi İşlem' },
        { value: 'hr', label: 'İnsan Kaynakları' },
        { value: 'sales', label: 'Satış' },
        { value: 'marketing', label: 'Pazarlama' },
      ],
      dependencies: ['company'],
    },
    {
      name: 'message',
      type: 'textarea',
      label: 'Mesaj',
      placeholder: 'Mesajınızı yazın',
      description: 'İsteğinizi detaylı olarak açıklayın',
      grid: { span: 2 },
    },
    {
      name: 'newsletter',
      type: 'checkbox',
      label: 'Bülten Aboneliği',
      placeholder: 'E-posta bülteni almak istiyorum',
    },
    {
      name: 'notifications',
      type: 'switch',
      label: 'Bildirimler',
      placeholder: 'Sistem bildirimlerini etkinleştir',
    },
  ]

  const handleSubmit = async (data: any) => {
    console.log('Form submitted:', data)
    await new Promise((resolve) => setTimeout(resolve, 1000))
  }

  return (
    <FormBuilder
      fields={formFields}
      onSubmit={handleSubmit}
      gridCols={2}
      submitLabel='Gönder'
      showReset={true}
      className='p-6'
    />
  )
}
