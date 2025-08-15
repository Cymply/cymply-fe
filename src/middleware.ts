// src/middleware.ts (회원가입 경로 예외 처리 버전)
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
  
  // **먼저 /letter/code/[code] 패턴 처리 (토큰 유무와 관계없이)**
  if (pathname.startsWith(letterCodePath)) {
    const codeMatch = pathname.match(/\/letter\/code\/(.+)/)
    if (codeMatch) {
      const code = codeMatch[1]
      const redirectUrl = `/search`
      
      // 환경에 따른 쿠키 옵션 설정
      const isProduction = process.env.NODE_ENV === 'production'
      const isHttps = request.headers.get('x-forwarded-proto') === 'https' ||
        request.nextUrl.protocol === 'https:'
      
      const cookieOptions = {
        maxAge: 60 * 60, // 1시간
        httpOnly: false,
        secure: isProduction && isHttps,
        sameSite: 'lax' as const,
        path: '/'
      }
      
      // 토큰 확인
      const token = request.cookies.get('accessToken')?.value ||
        request.headers.get('authorization')?.replace('Bearer ', '')
      
      if (token) {
        // **로그인된 상태: 쿠키에 저장하고 /search로 리다이렉트**
        const response = NextResponse.redirect(new URL('/search', request.url))
        response.cookies.set('recipientCode', code, cookieOptions)
        response.cookies.set('recipientRedirectUrl', redirectUrl, cookieOptions)
        
        if (isDev) {
          console.log('✅ 로그인된 상태 - 쿠키 저장 후 /search로 리다이렉트')
          console.log('📝 Saved letter code:', code, 'redirect to:', redirectUrl)
        }
        
        return response
      } else {
        // **로그인되지 않은 상태: 쿠키에 저장하고 /login으로 리다이렉트**
        const response = NextResponse.redirect(new URL('/login', request.url))
        response.cookies.set('recipientCode', code, cookieOptions)
        response.cookies.set('recipientRedirectUrl', redirectUrl, cookieOptions)
        
        // **추가: 회원가입 플로우 방지를 위한 플래그 쿠키**
        response.cookies.set('isFromLetterCode', 'true', cookieOptions)
        
        if (isDev) {
          console.log('❌ 로그인 필요 - 쿠키 저장 후 /login으로 리다이렉트')
          console.log('📝 Saved letter code:', code, 'redirect to:', redirectUrl)
        }
        
        return response
      }
    }
  }
  
  // public path면 통과
  if (publicPaths.some(path => pathname.startsWith(path))) {
    if (isDev) {
      console.log('✅ Public path 통과:', pathname)
    }
    return NextResponse.next()
  }
  
  // 일반 보호된 경로 처리
  const token = request.cookies.get('accessToken')?.value ||
    request.headers.get('authorization')?.replace('Bearer ', '')
  
  if (!token) {
    if (isDev) {
      console.log('❌ 토큰 없음, /login으로 리다이렉트:', pathname)
    }
    
    return NextResponse.redirect(new URL('/login', request.url))
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