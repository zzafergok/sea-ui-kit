import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  treeshake: true,
  watch: true, // or specify paths: ['src/**/*.ts']
  onSuccess: "echo 'Build completed successfully!'",
  external: [
    'react',
    'react-dom',
    '@radix-ui/*',
    'next',
    'tailwindcss',
    '@reduxjs/toolkit',
    'react-redux',
    'axios',
    'i18next',
    'react-i18next',
    'react-hook-form',
    'zod',
    'class-variance-authority',
    'clsx',
    'tailwind-merge',
    'lucide-react',
  ],
  esbuildOptions(options) {
    options.banner = {
      js: '/**\n * Sea UI Kit - Custom Radix UI Components\n * @license MIT\n */',
    }
  },
})
