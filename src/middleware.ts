import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Favicon isteklerini handle et
  if (pathname === '/favicon.ico') {
    // Eğer favicon.ico yoksa, API route'a yönlendir
    return NextResponse.rewrite(new URL('/api/favicon', request.url))
  }

  // Diğer static dosyalar için normal işlem
  return NextResponse.next()
}

export const config = {
  matcher: ['/favicon.ico', '/apple-touch-icon.png', '/favicon-16x16.png', '/favicon-32x32.png'],
}
