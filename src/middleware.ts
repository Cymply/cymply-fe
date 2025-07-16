import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const publicPaths = ['/login', '/main', '/signup', '/signin']
  const recipientCodePath = "/letters"
  // URL 디코딩 후 경로 정규화
  const rawPathname = decodeURIComponent(request.nextUrl.pathname)
  // 연속된 슬래시를 하나로 변경하고, 앞뒤 공백 제거
  const pathname = rawPathname.replace(/\/+/g, '/').trim()
  
  console.log('🔍 Middleware 실행:', pathname) // 디버깅용
  
  // public path면 통과
  if (publicPaths.some(path => pathname.startsWith(path))) {
    console.log('✅ Public path 통과:', pathname)
    return NextResponse.next()
  }
  
  const token = request.cookies.get('accessToken')?.value ||
    request.headers.get('authorization')?.replace('Bearer ', '')
  
  // middleware.ts의 쿠키 저장 부분 수정
  if (!token) {
    console.log('❌ 토큰 없음, 리다이렉트 필요:', pathname)
    
    const response = NextResponse.redirect(new URL('/login', request.url))
    
    if (pathname.startsWith(recipientCodePath)) {
      const recipientCode = request.nextUrl.searchParams.get('code')
      if (recipientCode) {
        // 정규화된 URL을 쿠키에 저장 (인코딩하지 않음)
        const redirectUrl = `/letters?code=${recipientCode}`
        
        response.cookies.set('recipientCode', recipientCode, {
          maxAge: 30 * 60,
          httpOnly: false,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax'
        })
        response.cookies.set('recipientRedirectUrl', redirectUrl, {
          maxAge: 30 * 60,
          httpOnly: false,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax'
        })
        
        console.log('📝 Saved recipient redirect URL:', redirectUrl)
      }
    } else {
      // 정규화된 경로를 쿠키에 저장
      response.cookies.set('generalRedirectUrl', pathname, {
        maxAge: 30 * 60,
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax'
      })
      
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