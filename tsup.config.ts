import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: false, // DTS build'i tamamen kapatıyoruz
  splitting: false,
  sourcemap: true,
  clean: true,
  treeshake: true,
  watch: false,
  minify: false,
  target: 'es2022',
  skipNodeModulesBundle: true,
  onSuccess: "echo 'Build completed successfully!'",
  external: [
    'react',
    'react-dom',
    '@radix-ui/*',
    'next',
    'tailwindcss',
    '@reduxjs/toolkit',
    'react-redux',
    'redux-persist',
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
    options.define = {
      ...options.define,
      'process.env.NODE_ENV': JSON.stringify('production'),
    }

    options.banner = {
      js: '/**\n * Sea UI Kit - Custom Radix UI Components\n * @license MIT\n */',
    }
  },
})
