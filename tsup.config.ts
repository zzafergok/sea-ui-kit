import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  treeshake: true,
  watch: true,
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
    // Node.js API'lerini browserda kullanabilmek için polyfill ekleyelim
    options.define = {
      ...options.define,
      'process.env.NODE_ENV': JSON.stringify('development'),
    }

    options.banner = {
      js: '/**\n * Sea UI Kit - Custom Radix UI Components\n * @license MIT\n */',
    }
  },
})
