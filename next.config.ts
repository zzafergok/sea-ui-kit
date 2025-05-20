import type { NextConfig } from 'next'

/** @type {import('next').NextConfig} */
// The 'options' parameter in the webpack function typically has type WebpackConfigContext.
// If you need to use 'options', you might import its type, e.g., from 'next/dist/server/config-shared'.
// Since it's not used in this snippet, 'any' is used for simplicity.

interface MySassOptions {
  includePaths: string[]
  prependData: string
}

interface MyWebpackRule {
  test: RegExp
  use: string[]
}

interface MyWebpackModule {
  rules: MyWebpackRule[]
}

// Defines the expected structure of the webpack config object being manipulated.
interface MyWebpackConfig {
  module: MyWebpackModule
  // Allows for other properties that may exist on the webpack config object
  [key: string]: any
}

const nextConfig: NextConfig = {
  reactStrictMode: false,
  sassOptions: {
    includePaths: ['./src/styles'],
    prependData: `@import "styles/variables.scss";`,
  } as MySassOptions, // Assert to our more specific type for sassOptions
  // Modül çözümleme sorunlarını önlemek için
  webpack: (
    config: MyWebpackConfig, // Type for the webpack config object
  ): MyWebpackConfig => {
    // Explicit return type
    config.module.rules.push({
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
    })
    return config
  },
}

module.exports = nextConfig
