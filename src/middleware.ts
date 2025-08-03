// src/middleware.ts (수정된 버전)
import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const publicPaths = ['/login', '/main', '/signup', '/signin', '/fonts']
  const letterCodePath = "/letter/code"  // /letter/code/[code] 패턴용
  
  // URL 디코딩 후 경로 정규화
  const rawPathname = decodeURIComponent(request.nextUrl.pathname)
  const pathname = rawPathname.replace(/\/+/g, '/').trim()
  
  console.log('🔍 Middleware 실행:', pathname)
  
  // public path면 통과
  if (publicPaths.some(path => pathname.startsWith(path))) {
    console.log('✅ Public path 통과:', pathname)
    return NextResponse.next()
  }
  
  const token = request.cookies.get('accessToken')?.value ||
    request.headers.get('authorization')?.replace('Bearer ', '')
  
  
  if (!token) {
    console.log('❌ 토큰 없음, 리다이렉트 필요:', pathname)
    
    const response = NextResponse.redirect(new URL('/login', request.url))
    
    // /letter/code/[code] 패턴 처리
    if (pathname.startsWith(letterCodePath)) {
      const codeMatch = pathname.match(/\/letter\/code\/(.+)/)
      if (codeMatch) {
        const code = codeMatch[1]
        const redirectUrl = `/search`  // URL에서 code 제거
        
        response.cookies.set('recipientCode', code, {
          // maxAge: 30 * 60,
          httpOnly: false,
          // secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax'
        })
        response.cookies.set('recipientRedirectUrl', redirectUrl, {
          // maxAge: 30 * 60,
          httpOnly: false,
          // secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax'
        })
        
        console.log('📝 Saved letter code redirect URL:', redirectUrl, 'with code:', code)
      }
    } else {
      // 일반 경로 저장
      // response.cookies.set('generalRedirectUrl', pathname, {
      //   maxAge: 30 * 60,
      //   httpOnly: false,
      //   secure: process.env.NODE_ENV === 'production',
      //   sameSite: 'lax'
      // })

      console.log('📝 Saved general redirect URL:', pathname)
    }

    return response
  }
  
  console.log('✅ 토큰 있음, 통과:', pathname)
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