import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET() {
  try {
    const faviconPath = path.join(process.cwd(), 'public', 'favicon.ico')

    if (!fs.existsSync(faviconPath)) {
      // Eğer favicon.ico yoksa, basit bir favicon oluştur
      const svgFavicon = `
<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
  <rect width="16" height="16" fill="#0ea5e9" rx="2"/>
  <text x="8" y="11" font-family="Arial" font-size="8" font-weight="bold" 
        text-anchor="middle" fill="white">S</text>
</svg>
      `.trim()

      return new NextResponse(svgFavicon, {
        status: 200,
        headers: {
          'Content-Type': 'image/svg+xml',
          'Cache-Control': 'public, max-age=86400', // 24 saat cache
        },
      })
    }

    const faviconBuffer = fs.readFileSync(faviconPath)

    return new NextResponse(faviconBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'image/x-icon',
        'Cache-Control': 'public, max-age=86400',
      },
    })
  } catch (error) {
    console.error('Favicon error:', error)

    return new NextResponse('Favicon not found', {
      status: 404,
    })
  }
}
