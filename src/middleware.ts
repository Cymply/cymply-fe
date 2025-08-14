// src/middleware.ts (배포용 버전)
import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const publicPaths = ['/login', '/main', '/signup', '/signin', '/fonts']
  const letterCodePath = "/letter/code"  // /letter/code/[code] 패턴용
  
  // URL 디코딩 후 경로 정규화
  const rawPathname = decodeURIComponent(request.nextUrl.pathname)
  const pathname = rawPathname.replace(/\/+/g, '/').trim()
  
  // 배포 환경에서는 로그 레벨 조정
  const isDev = process.env.NODE_ENV === 'development'
  
  if (isDev) {
    console.log('🔍 Middleware 실행:', pathname)
  }
  
  // public path면 통과
  if (publicPaths.some(path => pathname.startsWith(path))) {
    if (isDev) {
      console.log('✅ Public path 통과:', pathname)
    }
    return NextResponse.next()
  }
  
  const token = request.cookies.get('accessToken')?.value ||
    request.headers.get('authorization')?.replace('Bearer ', '')
  
  if (!token) {
    if (isDev) {
      console.log('❌ 토큰 없음, 리다이렉트 필요:', pathname)
    }
    
    const response = NextResponse.redirect(new URL('/login', request.url))
    
    // /letter/code/[code] 패턴 처리
    if (pathname.startsWith(letterCodePath)) {
      const codeMatch = pathname.match(/\/letter\/code\/(.+)/)
      if (codeMatch) {
        const code = codeMatch[1]
        const redirectUrl = `/search`  // URL에서 code 제거
        
        // 환경에 따른 쿠키 옵션 설정
        const isProduction = process.env.NODE_ENV === 'production'
        const isHttps = request.headers.get('x-forwarded-proto') === 'https' ||
          request.nextUrl.protocol === 'https:'
        
        const cookieOptions = {
          maxAge: 60 * 60, // 1시간
          httpOnly: false,
          secure: isProduction && isHttps, // 프로덕션에서는 HTTPS 필요
          sameSite: 'lax' as const,
          path: '/'
        }
        
        response.cookies.set('recipientCode', code, cookieOptions)
        response.cookies.set('recipientRedirectUrl', redirectUrl, cookieOptions)
        
        if (isDev) {
          console.log('📝 Saved letter code redirect URL:', redirectUrl, 'with code:', code)
          console.log('🍪 Cookie options:', {
            ...cookieOptions,
            environment: isProduction ? 'production' : 'development',
            protocol: isHttps ? 'https' : 'http'
          })
        }
      }
    } else {
      // 일반 경로는 저장하지 않음
      if (isDev) {
        console.log('📝 General path - no redirect URL saved:', pathname)
      }
    }
    
    return response
  }
  
  if (isDev) {
    console.log('✅ 토큰 있음, 통과:', pathname)
  }
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * 다음을 제외한 모든 경로에 매치:
     * - /api (API routes)
     * - /_next/static (static files)
     * - /_next/image (image optimization files)
     * - /favicon.ico
     * - /icons (아이콘 파일들)
     * - /images (이미지 파일들)
     * - 파일 확장자가 있는 정적 파일들
     */
    '/((?!api|_next/static|_next/image|favicon.ico|icons|images|.*\\.[a-zA-Z]+$).*)',
  ],
}