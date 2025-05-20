/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  sassOptions: {
    includePaths: ['./src/styles'],
    quietDeps: true,
    outputStyle: 'compressed',
  },
}

module.exports = nextConfig
