// UI Components
export { Tabs, TabsList, TabsTrigger, TabsContent } from './components/core/Tabs/Tabs'
export {
  Form,
  FormItem,
  FormField,
  FormLabel,
  FormMessage,
  useFormField,
  FormDescription,
} from './components/form/Form'
export {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogFooter,
  DialogTrigger,
  DialogContent,
  DialogDescription,
} from './components/core/Dialog/Dialog'
export {
  Select,
  SelectItem,
  SelectGroup,
  SelectValue,
  SelectLabel,
  SelectTrigger,
  SelectContent,
  SelectSeparator,
} from './components/core/Select/Select'
export { Input } from './components/core/Input/Input'
export { Switch } from './components/core/Switch/Switch'
export { Textarea } from './components/core/Textarea/Textarea'
export { Checkbox } from './components/core/Checkbox/Checkbox'
export { Button, buttonVariants } from './components/core/Button/Button'

// Custom Components
export { LoginForm } from './components/forms/auth/LoginForm'
export { ThemeToggle } from './components/ui/ThemeToggle/ThemeToggle'
export { LanguageToggle } from './components/ui/LanguageToggle/LanguageToggle'

// Hooks
export { useForm } from './hooks/useForm'
export { useTheme } from './hooks/useTheme'

// Utilities
export { cn, get, storage, debounce, isDarkMode, formatDate, sanitizeHtml } from './lib/utils'

// Validation Schemas
export { loginSchema, registerSchema, resetPasswordSchema, forgotPasswordSchema } from './lib/validations/auth'
export type {
  LoginFormValues,
  RegisterFormValues,
  ResetPasswordFormValues,
  ForgotPasswordFormValues,
} from './lib/validations/auth'

// i18n Setup
export { default as i18n } from './locales'
