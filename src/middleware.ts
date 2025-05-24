import { NextRequest, NextResponse } from 'next/server'

// Desteklenen diller
const supportedLocales = ['tr', 'en'] as const
const defaultLocale = 'tr' as const

type SupportedLocale = (typeof supportedLocales)[number]

/**
 * Kullanıcının tercih ettiği dili algılar
 * Öncelik sırası: URL parametresi > Cookie > Accept-Language header > Varsayılan
 */
function detectUserLocale(request: NextRequest): SupportedLocale {
  // 1. URL'den dil parametresini kontrol et (?lang=tr veya ?lang=en)
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
    // Accept-Language header'ını parse et ve desteklenen dillerle eşleştir
    const languages = acceptLanguage
      .split(',')
      .map((lang) => {
        const [locale, quality = '1'] = lang.trim().split(';q=')
        return {
          locale: locale.split('-')[0], // 'en-US' -> 'en'
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

  // 4. Varsayılan dili döndür
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
  const publicPaths = ['/', '/about', '/contact', '/pricing', '/auth/login', '/auth/register', '/auth/forgot-password']

  return publicPaths.some((path) => pathname === path || pathname.startsWith(path))
}

/**
 * Statik dosya yollarını kontrol eder
 */
function isStaticFile(pathname: string): boolean {
  return (
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/api/') ||
    pathname.startsWith('/static/') ||
    pathname.includes('.') // .ico, .png, .css, .js etc.
  )
}

/**
 * Authentication token'ını kontrol eder
 */
function hasValidAuthToken(request: NextRequest): boolean {
  const accessToken = request.cookies.get('accessToken')?.value
  const refreshToken = request.cookies.get('refreshToken')?.value

  // Basit token varlık kontrolü (gerçek projede JWT doğrulama yapılmalı)
  return !!(accessToken && refreshToken)
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Statik dosyalar için middleware'i atla
  if (isStaticFile(pathname)) {
    return NextResponse.next()
  }

  // Kullanıcının dil tercihini algıla
  const detectedLocale = detectUserLocale(request)

  // Response objesi oluştur
  const response = NextResponse.next()

  // Dil cookie'sini ayarla (eğer farklıysa)
  const currentLanguageCookie = request.cookies.get('language')?.value
  if (currentLanguageCookie !== detectedLocale) {
    response.cookies.set('language', detectedLocale, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 365 * 24 * 60 * 60, // 1 yıl
    })
  }

  // Content-Language header'ını ayarla
  response.headers.set('Content-Language', detectedLocale)

  // Korumalı rota kontrolü
  if (isProtectedRoute(pathname)) {
    const hasAuth = hasValidAuthToken(request)

    if (!hasAuth) {
      // Kullanıcıyı login sayfasına yönlendir
      const loginUrl = new URL('/auth/login', request.url)

      // Dil parametresini ekle
      loginUrl.searchParams.set('lang', detectedLocale)

      // Redirect sonrası dönülecek sayfayı kaydet
      if (pathname !== '/auth/login') {
        loginUrl.searchParams.set('redirect', pathname)
      }

      return NextResponse.redirect(loginUrl)
    }
  }

  // Authentication sayfalarında zaten giriş yapmış kullanıcıyı dashboard'a yönlendir
  if (pathname.startsWith('/auth/') && hasValidAuthToken(request)) {
    const dashboardUrl = new URL('/dashboard', request.url)
    dashboardUrl.searchParams.set('lang', detectedLocale)
    return NextResponse.redirect(dashboardUrl)
  }

  // Dil parametresi varsa ve geçerliyse, cookie'yi güncelle ve parametreyi kaldır
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
    })

    return redirectResponse
  }

  // CSP header'larını ekle (güvenlik için)
  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https:;",
  )

  // X-Frame-Options header'ını ekle
  response.headers.set('X-Frame-Options', 'DENY')

  // X-Content-Type-Options header'ını ekle
  response.headers.set('X-Content-Type-Options', 'nosniff')

  // Referrer-Policy header'ını ekle
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')

  // Development modunda debug bilgileri ekle
  if (process.env.NODE_ENV === 'development') {
    response.headers.set('X-Debug-Locale', detectedLocale)
    response.headers.set('X-Debug-Path', pathname)
    response.headers.set('X-Debug-Auth', hasValidAuthToken(request) ? 'true' : 'false')
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
     * - favicon.ico (favicon file)
     * - public klasöründeki dosyalar
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.).*)',
  ],
}
