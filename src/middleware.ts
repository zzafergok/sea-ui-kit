import { NextRequest, NextResponse } from 'next/server'

// Desteklenen diller
const supportedLocales = ['tr', 'en'] as const
const defaultLocale = 'tr' as const

type SupportedLocale = (typeof supportedLocales)[number]

/**
 * Kullanıcının tercih ettiği dili algılar
 */
function detectUserLocale(request: NextRequest): SupportedLocale {
  // 1. URL'den dil parametresini kontrol et
  const urlLocale = request.nextUrl.searchParams.get('lang')
  if (urlLocale && supportedLocales.includes(urlLocale as SupportedLocale)) {
    return urlLocale as SupportedLocale
  }

  // 2. Cookie'den dil tercihini kontrol et
  const cookieLocale = request.cookies.get('language')?.value
  if (cookieLocale && supportedLocales.includes(cookieLocale as SupportedLocale)) {
    return cookieLocale as SupportedLocale
  }

  // 3. Accept-Language header'ından dil tercihini algıla
  const acceptLanguage = request.headers.get('accept-language')
  if (acceptLanguage) {
    const languages = acceptLanguage
      .split(',')
      .map((lang) => {
        const [locale, quality = '1'] = lang.trim().split(';q=')
        return {
          locale: locale.split('-')[0],
          quality: parseFloat(quality),
        }
      })
      .sort((a, b) => b.quality - a.quality)

    for (const { locale } of languages) {
      if (supportedLocales.includes(locale as SupportedLocale)) {
        return locale as SupportedLocale
      }
    }
  }

  return defaultLocale
}

/**
 * Korumalı rotaları kontrol eder
 */
function isProtectedRoute(pathname: string): boolean {
  const protectedPaths = ['/dashboard', '/profile', '/settings', '/users']
  return protectedPaths.some((path) => pathname.startsWith(path))
}

/**
 * Authentication gerektirmeyen rotaları kontrol eder
 */
function isPublicRoute(pathname: string): boolean {
  const publicPaths = ['/', '/about', '/contact', '/pricing']
  return publicPaths.some((path) => pathname === path || pathname.startsWith(path))
}

/**
 * Auth sayfaları kontrolü
 */
function isAuthRoute(pathname: string): boolean {
  return pathname.startsWith('/auth/')
}

/**
 * Statik dosya yollarını kontrol eder
 */
function isStaticFile(pathname: string): boolean {
  return (
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/api/') ||
    pathname.startsWith('/static/') ||
    pathname.includes('.') ||
    pathname.startsWith('/favicon')
  )
}

/**
 * Authentication token'ını kontrol eder
 */
function hasValidAuthToken(request: NextRequest): boolean {
  const accessToken = request.cookies.get('accessToken')?.value
  const refreshToken = request.cookies.get('refreshToken')?.value

  // Token'ların varlığını kontrol et
  if (!accessToken || !refreshToken) {
    return false
  }

  // Token'ın geçerliliğini kontrol et (basit kontrol)
  try {
    // Token format kontrolü (mock token için)
    return accessToken.startsWith('mock-access-token-') && refreshToken.startsWith('mock-refresh-token-')
  } catch {
    return false
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Console'da debug bilgisi
  console.log(`Middleware: ${request.method} ${pathname}`)

  // Statik dosyalar için middleware'i atla
  if (isStaticFile(pathname)) {
    return NextResponse.next()
  }

  // Kullanıcının dil tercihini algıla
  const detectedLocale = detectUserLocale(request)
  const hasAuth = hasValidAuthToken(request)

  // Response objesi oluştur
  const response = NextResponse.next()

  // Dil cookie'sini ayarla
  const currentLanguageCookie = request.cookies.get('language')?.value
  if (currentLanguageCookie !== detectedLocale) {
    response.cookies.set('language', detectedLocale, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 365 * 24 * 60 * 60,
      path: '/',
    })
  }

  // Content-Language header'ını ayarla
  response.headers.set('Content-Language', detectedLocale)

  // Authentication kontrolü
  if (isAuthRoute(pathname)) {
    // Auth sayfalarında zaten giriş yapmış kullanıcıyı dashboard'a yönlendir
    if (hasAuth) {
      console.log('Already authenticated, redirecting to dashboard')
      const dashboardUrl = new URL('/dashboard', request.url)
      dashboardUrl.searchParams.set('lang', detectedLocale)
      return NextResponse.redirect(dashboardUrl)
    }
    // Auth sayfalarında değilse, normal devam et
    return response
  }

  if (isProtectedRoute(pathname)) {
    // Korumalı rotada authentication kontrolü
    if (!hasAuth) {
      console.log('Not authenticated, redirecting to login')
      const loginUrl = new URL('/auth/login', request.url)
      loginUrl.searchParams.set('lang', detectedLocale)

      // Redirect sonrası dönülecek sayfayı kaydet
      if (pathname !== '/auth/login') {
        loginUrl.searchParams.set('redirect', pathname)
      }

      return NextResponse.redirect(loginUrl)
    }
    // Authentication varsa normal devam et
    return response
  }

  // Public routes için normal devam et
  if (isPublicRoute(pathname)) {
    return response
  }

  // Dil parametresi varsa ve geçerliyse, temizle
  const langParam = request.nextUrl.searchParams.get('lang')
  if (langParam && supportedLocales.includes(langParam as SupportedLocale)) {
    const newUrl = new URL(request.url)
    newUrl.searchParams.delete('lang')

    const redirectResponse = NextResponse.redirect(newUrl)
    redirectResponse.cookies.set('language', langParam, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 365 * 24 * 60 * 60,
      path: '/',
    })

    return redirectResponse
  }

  // Development modunda debug bilgileri ekle
  if (process.env.NODE_ENV === 'development') {
    response.headers.set('X-Debug-Locale', detectedLocale)
    response.headers.set('X-Debug-Path', pathname)
    response.headers.set('X-Debug-Auth', hasAuth ? 'true' : 'false')
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Aşağıdaki yollar hariç tüm istekleri eşleştir:
     * - api rotaları (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico ve diğer static dosyalar
     */
    '/((?!api|_next/static|_next/image|favicon|.*\\.|manifest).*)',
  ],
}
