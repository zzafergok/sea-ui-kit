# 🌊 Sea UI Kit - Project Structure

## Introduction

Sea UI Kit is a comprehensive component library built on Radix UI primitives with a beautiful sea blue theme. It provides a complete system of components, hooks, utilities, and styling for building modern React and Next.js applications.

## Key Features

- 🎨 **Sea Blue Theme**: Custom color palette with shades of sea blue
- 🌙 **Dark Mode Support**: Built-in light/dark theming system
- 🌐 **Internationalization**: Supports English and Turkish languages
- 📝 **Form Integration**: React Hook Form + Zod validation
- 🔄 **State Management**: Redux Toolkit setup with common slices
- 🔌 **API Integration**: Axios with interceptors for authentication
- 📱 **Responsive Design**: Components work across all screen sizes
- 🧩 **TypeScript**: Full type safety and autocompletion

## Project Structure

```
sea-ui-kit/
├── src/
│   ├── components/          # UI Components
│   │   ├── Alert/
│   │   ├── Avatar/
│   │   ├── Badge/
│   │   ├── Button/
│   │   ├── Card/
│   │   ├── Checkbox/
│   │   ├── Dialog/
│   │   ├── Dropdown/
│   │   ├── Form/
│   │   ├── Input/
│   │   ├── LanguageToggle/
│   │   ├── Select/
│   │   ├── Switch/
│   │   ├── Tabs/
│   │   ├── Textarea/
│   │   ├── ThemeToggle/
│   │   ├── Toast/
│   │   └── auth/            # Authentication components
│   │
│   ├── hooks/               # Custom React hooks
│   │   ├── useForm.ts       # Form handling with Zod
│   │   └── useTheme.ts      # Theme management
│   │
│   ├── lib/                 # Utility functions
│   │   ├── utils.ts         # General utilities
│   │   └── validations/     # Zod validation schemas
│   │
│   ├── locales/             # i18n translations
│   │   ├── en/              # English translations
│   │   └── tr/              # Turkish translations
│   │
│   ├── store/               # Redux store setup
│   │   ├── index.ts         # Store configuration
│   │   ├── slices/          # Redux slices
│   │   │   ├── themeSlice.ts
│   │   │   ├── langSlice.ts
│   │   │   └── userSlice.ts
│   │   └── api/             # API integration
│   │       ├── apiSlice.ts
│   │       ├── axiosBaseQuery.ts
│   │       └── axiosInterceptors.ts
│   │
│   ├── styles/              # Theme and global styles
│   │   └── theme.ts         # Theme configuration
│   │
│   └── index.ts             # Main entry point
│
├── examples/                # Usage examples
│   └── nextjs-app/          # Next.js integration
│
├── package.json             # Package configuration
├── tsconfig.json            # TypeScript configuration
├── tsup.config.ts           # Build configuration
├── README.md                # Documentation
└── .npmrc                   # NPM configuration
```

## Component Categories

### Input Components

- Button
- Checkbox
- Input
- Textarea
- Select
- Switch

### Layout Components

- Card
- Dialog
- Tabs

### Feedback Components

- Alert
- Toast
- Badge

### Navigation Components

- Dropdown
- ThemeToggle
- LanguageToggle

### Data Display Components

- Avatar

### Form Components

- Form
- FormField
- FormItem
- FormLabel
- FormDescription
- FormMessage

## Key Implementation Details

### Theme System

The theme is built around CSS variables with a sea blue color palette as the primary color. It supports both light and dark modes and includes:

- Primary colors (sea blue)
- Accent colors (teal)
- Neutral colors
- Semantic colors (success, warning, error, info)
- Border radius, shadows, and transitions

### Form Handling

Forms are implemented using React Hook Form with Zod validation:

- Custom `useForm` hook that combines React Hook Form with Zod
- Form components for consistent layout and styling
- Validation schemas for common forms (login, register, etc.)
- Internationalized error messages

### State Management

Redux Toolkit is used for state management:

- Theme state (light, dark, system)
- Language state (en, tr)
- User authentication state
- API integration with Redux Toolkit Query

### Internationalization

i18next is used for internationalization:

- English and Turkish translations
- Translation keys for all UI text
- Language detection and switching
- Right-to-left support

### API Integration

Axios is used for API integration:

- Base query setup for Redux Toolkit Query
- Interceptors for authentication
- Token refresh handling
- Global error handling

## Usage Example

```tsx
import {
  ThemeProvider,
  Button,
  Input,
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useForm
} from 'sea-ui-kit';
import { z } from 'zod';

// Define a schema for form validation
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

function LoginPage() {
  // Use the form hook with schema validation
  const form = useForm(loginSchema, {
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    Login
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          Email
        )}
      />

      <FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          Password
        )}
      />

      Login
  );
}
```

## Publishing to NPM

The library is configured for publishing to NPM:

- Package information in `package.json`
- Build configuration with `tsup`
- GitHub Actions workflow for automatic publishing
- TypeScript configuration for type declarations

## Conclusion

Sea UI Kit provides a comprehensive solution for building React and Next.js applications with a beautiful sea blue theme. It includes everything you need to create a consistent, accessible, and visually appealing user interface.
