import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Basit SVG favicon oluşturma
function generateSVGFavicon() {
  const svgContent = `
<svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
  <rect width="32" height="32" fill="#0ea5e9" rx="4"/>
  <text x="16" y="20" font-family="Arial, sans-serif" font-size="16" 
        font-weight="bold" text-anchor="middle" fill="white">S</text>
</svg>
  `.trim()

  const publicDir = path.join(__dirname, '..', 'public')

  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true })
  }

  fs.writeFileSync(path.join(publicDir, 'favicon.svg'), svgContent)
  console.log('✅ SVG favicon oluşturuldu')
}

// Apple touch icon için SVG
function generateAppleTouchIcon() {
  const svgContent = `
<svg width="180" height="180" viewBox="0 0 180 180" xmlns="http://www.w3.org/2000/svg">
  <rect width="180" height="180" fill="#0ea5e9" rx="20"/>
  <text x="90" y="110" font-family="Arial, sans-serif" font-size="80" 
        font-weight="bold" text-anchor="middle" fill="white">S</text>
</svg>
  `.trim()

  const publicDir = path.join(__dirname, '..', 'public')
  fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.svg'), svgContent)
  console.log('✅ Apple touch icon SVG oluşturuldu')
}

// Browserconfig.xml oluşturma
function generateBrowserConfig() {
  const browserConfig = `<?xml version="1.0" encoding="utf-8"?>
<browserconfig>
    <msapplication>
        <tile>
            <square150x150logo src="/favicon-32x32.png"/>
            <TileColor>#0ea5e9</TileColor>
        </tile>
    </msapplication>
</browserconfig>`

  const publicDir = path.join(__dirname, '..', 'public')
  fs.writeFileSync(path.join(publicDir, 'browserconfig.xml'), browserConfig)
  console.log('✅ Browserconfig.xml oluşturuldu')
}

// Robots.txt oluşturma
function generateRobotsTxt() {
  const robotsContent = `User-agent: *
Allow: /

Sitemap: ${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/sitemap.xml`

  const publicDir = path.join(__dirname, '..', 'public')
  fs.writeFileSync(path.join(publicDir, 'robots.txt'), robotsContent)
  console.log('✅ Robots.txt oluşturuldu')
}

// Tüm favicon dosyalarını oluştur
function generateAllFavicons() {
  console.log('🚀 Favicon dosyaları oluşturuluyor...')

  generateSVGFavicon()
  generateAppleTouchIcon()
  generateBrowserConfig()
  generateRobotsTxt()

  console.log('✅ Tüm favicon dosyaları başarıyla oluşturuldu!')
  console.log('\n📝 Not: PNG formatındaki favicon dosyalarını manuel olarak oluşturmanız gerekiyor:')
  console.log('- favicon.ico (16x16, 32x32, 48x48)')
  console.log('- favicon-16x16.png')
  console.log('- favicon-32x32.png')
  console.log('- apple-touch-icon.png (180x180)')
  console.log('- icon-192x192.png')
  console.log('- icon-512x512.png')
}

generateAllFavicons()
