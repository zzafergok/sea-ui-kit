export const seaBlueTheme = {
  colors: {
    // Primary sea blues
    primary50: 'hsl(200, 100%, 95%)',
    primary100: 'hsl(200, 100%, 90%)',
    primary200: 'hsl(200, 95%, 80%)',
    primary300: 'hsl(200, 90%, 70%)',
    primary400: 'hsl(200, 85%, 60%)',
    primary500: 'hsl(200, 80%, 50%)', // Main sea blue
    primary600: 'hsl(200, 85%, 40%)',
    primary700: 'hsl(200, 90%, 30%)',
    primary800: 'hsl(200, 95%, 20%)',
    primary900: 'hsl(200, 100%, 10%)',

    // Complementary colors
    accent50: 'hsl(180, 100%, 95%)',
    accent100: 'hsl(180, 100%, 90%)',
    accent200: 'hsl(180, 95%, 80%)',
    accent300: 'hsl(180, 90%, 70%)',
    accent400: 'hsl(180, 85%, 60%)',
    accent500: 'hsl(180, 80%, 50%)', // Teal accent
    accent600: 'hsl(180, 85%, 40%)',
    accent700: 'hsl(180, 90%, 30%)',
    accent800: 'hsl(180, 95%, 20%)',
    accent900: 'hsl(180, 100%, 10%)',

    // Neutrals
    neutral50: 'hsl(200, 10%, 98%)',
    neutral100: 'hsl(200, 10%, 95%)',
    neutral200: 'hsl(200, 10%, 90%)',
    neutral300: 'hsl(200, 10%, 80%)',
    neutral400: 'hsl(200, 10%, 70%)',
    neutral500: 'hsl(200, 10%, 50%)',
    neutral600: 'hsl(200, 10%, 40%)',
    neutral700: 'hsl(200, 10%, 30%)',
    neutral800: 'hsl(200, 10%, 20%)',
    neutral900: 'hsl(200, 10%, 10%)',

    // Semantic colors
    success: 'hsl(160, 80%, 45%)',
    warning: 'hsl(40, 90%, 50%)',
    error: 'hsl(350, 80%, 55%)',
    info: 'hsl(220, 80%, 55%)',
  },

  // Dark mode adjustments
  dark: {
    primary500: 'hsl(200, 70%, 45%)',
    accent500: 'hsl(180, 70%, 45%)',
    background: 'hsl(200, 20%, 10%)',
    foreground: 'hsl(200, 10%, 95%)',
  },

  // Light mode
  light: {
    background: 'hsl(200, 10%, 98%)',
    foreground: 'hsl(200, 20%, 10%)',
  },

  // Font sizes
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
  },

  // Font weights
  fontWeight: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  // Border radius
  radius: {
    sm: '0.125rem',
    md: '0.25rem',
    lg: '0.5rem',
    xl: '1rem',
    full: '9999px',
  },

  // Spacing
  spacing: {
    0: '0',
    1: '0.25rem',
    2: '0.5rem',
    3: '0.75rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    8: '2rem',
    10: '2.5rem',
    12: '3rem',
    16: '4rem',
    20: '5rem',
    24: '6rem',
    32: '8rem',
    40: '10rem',
    48: '12rem',
    56: '14rem',
    64: '16rem',
  },

  // Shadow
  shadow: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  },

  // Animation
  animation: {
    fast: '0.15s ease-in-out',
    default: '0.25s ease-in-out',
    slow: '0.4s ease-in-out',
  },
}

// tailwind.config.js
export const tailwindConfig = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: 'var(--primary-50)',
          100: 'var(--primary-100)',
          200: 'var(--primary-200)',
          300: 'var(--primary-300)',
          400: 'var(--primary-400)',
          500: 'var(--primary-500)',
          600: 'var(--primary-600)',
          700: 'var(--primary-700)',
          800: 'var(--primary-800)',
          900: 'var(--primary-900)',
        },
        accent: {
          50: 'var(--accent-50)',
          100: 'var(--accent-100)',
          200: 'var(--accent-200)',
          300: 'var(--accent-300)',
          400: 'var(--accent-400)',
          500: 'var(--accent-500)',
          600: 'var(--accent-600)',
          700: 'var(--accent-700)',
          800: 'var(--accent-800)',
          900: 'var(--accent-900)',
        },
        neutral: {
          50: 'var(--neutral-50)',
          100: 'var(--neutral-100)',
          200: 'var(--neutral-200)',
          300: 'var(--neutral-300)',
          400: 'var(--neutral-400)',
          500: 'var(--neutral-500)',
          600: 'var(--neutral-600)',
          700: 'var(--neutral-700)',
          800: 'var(--neutral-800)',
          900: 'var(--neutral-900)',
        },
        success: 'var(--success)',
        warning: 'var(--warning)',
        error: 'var(--error)',
        info: 'var(--info)',
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
        full: 'var(--radius-full)',
      },
      boxShadow: {
        sm: 'var(--shadow-sm)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
        xl: 'var(--shadow-xl)',
      },
      transitionProperty: {
        height: 'height',
        spacing: 'margin, padding',
      },
      transitionTimingFunction: {
        'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      transitionDuration: {
        fast: '150ms',
        default: '250ms',
        slow: '400ms',
      },
    },
  },
  plugins: [],
}
