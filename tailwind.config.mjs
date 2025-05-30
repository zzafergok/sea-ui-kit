/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/hooks/**/*.{js,ts,jsx,tsx}',
    './src/lib/**/*.{js,ts,jsx,tsx}',
    './src/providers/**/*.{js,ts,jsx,tsx}',
    './src/utils/**/*.{js,ts,jsx,tsx}',
    './src/store/**/*.{js,ts,jsx,tsx}',
    './src/services/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',

        // Yeni Primary Color System
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
          DEFAULT: 'var(--primary-500)',
        },

        // Accent/Secondary Colors
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
          DEFAULT: 'var(--accent-500)',
        },

        // Blue variations from palette
        blue: {
          50: 'var(--blue-50)',
          100: 'var(--blue-100)',
          200: 'var(--blue-200)',
          300: 'var(--blue-300)',
          400: 'var(--blue-400)',
          500: 'var(--blue-500)',
          600: 'var(--blue-600)',
          DEFAULT: 'var(--blue-500)',
        },

        // Teal variations from palette
        teal: {
          50: 'var(--teal-50)',
          100: 'var(--teal-100)',
          200: 'var(--teal-200)',
          300: 'var(--teal-300)',
          400: 'var(--teal-400)',
          500: 'var(--teal-500)',
          600: 'var(--teal-600)',
          DEFAULT: 'var(--teal-500)',
        },

        // Enhanced Neutral System
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
          DEFAULT: 'var(--neutral-500)',
        },

        // Semantic Colors
        success: 'var(--success)',
        warning: 'var(--warning)',
        error: 'var(--error)',
        info: 'var(--info)',

        // UI Element Colors
        muted: 'var(--muted)',
        'muted-foreground': 'var(--muted-foreground)',
        card: 'var(--card)',
        'card-foreground': 'var(--card-foreground)',
        popover: 'var(--popover)',
        'popover-foreground': 'var(--popover-foreground)',
        border: 'var(--border)',
        input: 'var(--input)',
        ring: 'var(--ring)',
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
        'primary-glow': '0 0 20px hsla(204, 85%, 58%, 0.3)',
        'accent-glow': '0 0 20px hsla(212, 65%, 52%, 0.3)',
      },

      transitionDuration: {
        fast: 'var(--transition-fast)',
        default: 'var(--transition-default)',
        slow: 'var(--transition-slow)',
      },

      screens: {
        xs: '475px',
      },

      spacing: {
        18: '4.5rem',
        88: '22rem',
        128: '32rem',
      },

      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-in': 'slideInRight 0.3s ease-out',
        'spin-slow': 'spin 3s linear infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'scale-in': 'scaleIn 0.2s ease-out',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
      },

      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(100%)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px hsla(204, 85%, 58%, 0.2)' },
          '50%': { boxShadow: '0 0 30px hsla(204, 85%, 58%, 0.4)' },
        },
      },

      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, var(--primary-500), var(--primary-600))',
        'gradient-accent': 'linear-gradient(135deg, var(--accent-500), var(--accent-600))',
        'gradient-blue': 'linear-gradient(135deg, var(--blue-500), var(--blue-600))',
        'gradient-teal': 'linear-gradient(135deg, var(--teal-500), var(--teal-600))',
        'gradient-dark': 'linear-gradient(135deg, hsl(215, 25%, 8%), hsl(215, 25%, 12%))',
      },
    },
  },
  plugins: [
    function ({ addUtilities, addComponents }) {
      const newUtilities = {
        '.scrollbar-hide': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
        '.scrollbar-modern': {
          'scrollbar-width': 'thin',
          'scrollbar-color': 'var(--neutral-300) var(--neutral-100)',
          '&::-webkit-scrollbar': {
            width: '6px',
            height: '6px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'var(--neutral-100)',
            borderRadius: '3px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: 'var(--neutral-300)',
            borderRadius: '3px',
            '&:hover': {
              background: 'var(--neutral-400)',
            },
          },
        },
        '.text-gradient': {
          background: 'linear-gradient(to right, var(--primary-600), var(--accent-600))',
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
          'background-clip': 'text',
        },
        '.glass-effect': {
          background: 'rgba(255, 255, 255, 0.1)',
          'backdrop-filter': 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
        },
      }

      const newComponents = {
        '.btn-primary': {
          background: 'var(--gradient-primary)',
          color: 'white',
          padding: '0.5rem 1rem',
          borderRadius: 'var(--radius-md)',
          fontWeight: '500',
          transition: 'all var(--transition-fast)',
          border: '1px solid var(--primary-600)',
          '&:hover': {
            background: 'linear-gradient(135deg, var(--primary-400), var(--primary-500))',
            transform: 'translateY(-1px)',
            boxShadow: 'var(--shadow-md)',
          },
          '&:active': {
            transform: 'translateY(0)',
          },
        },
        '.btn-accent': {
          background: 'var(--gradient-accent)',
          color: 'white',
          padding: '0.5rem 1rem',
          borderRadius: 'var(--radius-md)',
          fontWeight: '500',
          transition: 'all var(--transition-fast)',
          border: '1px solid var(--accent-600)',
          '&:hover': {
            background: 'linear-gradient(135deg, var(--accent-400), var(--accent-500))',
            transform: 'translateY(-1px)',
            boxShadow: 'var(--shadow-md)',
          },
        },
        '.card-modern': {
          background: 'var(--card)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg)',
          padding: '1.5rem',
          boxShadow: 'var(--shadow-sm)',
          transition: 'all var(--transition-default)',
          '&:hover': {
            boxShadow: 'var(--shadow-lg)',
            transform: 'translateY(-2px)',
          },
        },
      }

      addUtilities(newUtilities)
      addComponents(newComponents)
    },
  ],
}

export default config
