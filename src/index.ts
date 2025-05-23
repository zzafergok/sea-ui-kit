// Core Theme
export { seaBlueTheme } from './styles/theme'

// UI Components
export { Tabs, TabsList, TabsTrigger, TabsContent } from './components/Tabs/Tabs'
export {
  Form,
  FormItem,
  FormField,
  FormLabel,
  FormMessage,
  useFormField,
  FormDescription,
} from './components/Form/Form'
export {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogFooter,
  DialogTrigger,
  DialogContent,
  DialogDescription,
} from './components/Dialog/Dialog'
export {
  Select,
  SelectItem,
  SelectGroup,
  SelectValue,
  SelectLabel,
  SelectTrigger,
  SelectContent,
  SelectSeparator,
} from './components/Select/Select'
export { Input } from './components/Input/Input'
export { Switch } from './components/Switch/Switch'
export { Textarea } from './components/Textarea/Textarea'
export { Checkbox } from './components/Checkbox/Checkbox'
export { Button, buttonVariants } from './components/Button/Button'

// Custom Components
export { LoginForm } from './components/auth/LoginForm'
export { ThemeToggle } from './components/ThemeToggle/ThemeToggle'
export { LanguageToggle } from './components/LanguageToggle/LanguageToggle'

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
