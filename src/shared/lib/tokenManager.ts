// shared/lib/tokenManager.ts (강제 UTC 계산 버전)
export interface TokenPair {
  accessToken: string;
  refreshToken?: string;
}

export class TokenManager {
  private static readonly ACCESS_TOKEN_KEY = 'accessToken';
  private static readonly REFRESH_TOKEN_KEY = 'refreshToken';
  
  // 일관된 토큰 만료 시간 설정 (10시간 = 36000초)
  private static readonly ACCESS_TOKEN_MAX_AGE = 36000;
  
  // 강제로 정확한 UTC 시간 계산하는 함수
  private static getCorrectUTCExpires(maxAgeSeconds: number): string {
    const now = new Date();
    const expiresTime = new Date(now.getTime() + (maxAgeSeconds * 1000));
    //
    // console.log('🕐 현재 시간 (로컬):', now.toLocaleString());
    // console.log('🕐 현재 시간 (UTC):', now.toUTCString());
    // console.log('🕐 만료 시간 (로컬):', expiresTime.toLocaleString());
    // console.log('🕐 만료 시간 (UTC):', expiresTime.toUTCString());
    
    return expiresTime.toUTCString();
  }
  
  // 쿠키 헬퍼 함수들 - expires와 max-age 둘 다 설정
  private static setCookie(name: string, value: string, maxAge: number = TokenManager.ACCESS_TOKEN_MAX_AGE): void {
    if (typeof window !== 'undefined') {
      const secure = process.env.NODE_ENV === 'production' ? '; secure' : '';
      const sameSite = '; samesite=lax';
      
      // 정확한 UTC 시간 계산
      const expiresUTC = this.getCorrectUTCExpires(maxAge);
      
      // expires와 max-age 둘 다 설정 (브라우저 호환성)
      const cookieString = `${name}=${value}; path=/; max-age=${maxAge}; expires=${expiresUTC}${sameSite}${secure}`;
      
      // console.log(`🍪 쿠키 설정 시도: ${name}`);
      // console.log(`🍪 MaxAge: ${maxAge}초 (${maxAge/3600}시간)`);
      // console.log(`🍪 Expires: ${expiresUTC}`);
      // console.log(`🍪 쿠키 문자열: ${cookieString}`);
      
      document.cookie = cookieString;
      
      // 설정 후 즉시 확인
      setTimeout(() => {
        // const savedValue = this.getCookie(name);
        // console.log(`🍪 쿠키 설정 결과: ${name} = ${savedValue ? '✅ 성공' : '❌ 실패'}`);
        
        // 브라우저에서 실제로 어떻게 저장되었는지 확인
        // console.log(`🍪 전체 쿠키: ${document.cookie}`);
        // console.log('🛠️ 개발자 도구 Application > Cookies에서 실제 만료시간을 확인하세요');
      }, 100);
    }
  }
  
  private static getCookie(name: string): string | null {
    if (typeof window === 'undefined') return null;
    
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      const cookieValue = parts.pop()?.split(';').shift() || null;
      return cookieValue;
    }
    return null;
  }
  
  private static deleteCookie(name: string): void {
    if (typeof window !== 'undefined') {
      // max-age=0과 과거 expires 둘 다 설정
      const pastDate = new Date(0).toUTCString();
      document.cookie = `${name}=; path=/; max-age=0; expires=${pastDate}`;
      console.log(`🗑️ 쿠키 삭제: ${name}`);
    }
  }
  
  // 토큰 저장
  static setTokens(tokens: TokenPair): void {
    if (typeof window !== 'undefined') {
      // console.log('🔍 === 토큰 저장 시작 ===');
      // console.log('🕐 시스템 현재 시간:', new Date().toISOString());
      // console.log('🕐 예상 만료 시간:', new Date(Date.now() + this.ACCESS_TOKEN_MAX_AGE * 1000).toISOString());
      
      // accessToken은 쿠키에 저장 (10시간)
      if (tokens.accessToken) {
        this.setCookie(this.ACCESS_TOKEN_KEY, tokens.accessToken, this.ACCESS_TOKEN_MAX_AGE);
      }
      
      // refreshToken은 sessionStorage에 저장
      if (tokens.refreshToken) {
        sessionStorage.setItem(this.REFRESH_TOKEN_KEY, tokens.refreshToken);
        // console.log('💾 RefreshToken sessionStorage 저장 완료');
      }
      
      console.log('🔍 === 토큰 저장 완료 ===');
    }
  }
  
  // 액세스 토큰 가져오기
  static getAccessToken(): string | null {
    const token = this.getCookie(this.ACCESS_TOKEN_KEY);
    if (token) {
      // console.log('✅ AccessToken 쿠키에서 조회 성공');
    } else {
      console.log('❌ AccessToken 쿠키에서 조회 실패');
      if (typeof window !== 'undefined') {
        console.log('🔍 현재 쿠키 목록:', document.cookie);
      }
    }
    return token;
  }
  
  // 리프레시 토큰 가져오기
  static getRefreshToken(): string | null {
    if (typeof window !== 'undefined') {
      const token = sessionStorage.getItem(this.REFRESH_TOKEN_KEY);
      if (token) {
        // console.log('✅ RefreshToken sessionStorage에서 조회 성공');
      } else {
        console.log('❌ RefreshToken sessionStorage에서 조회 실패');
      }
      return token;
    }
    return null;
  }
  
  // 토큰 삭제
  static clearTokens(): void {
    if (typeof window !== 'undefined') {
      this.deleteCookie(this.ACCESS_TOKEN_KEY);
      sessionStorage.removeItem(this.REFRESH_TOKEN_KEY);
      console.log('🗑️ RefreshToken sessionStorage에서 삭제');
    }
  }
  
  // 토큰 존재 여부 확인
  static hasTokens(): boolean {
    return !!(this.getAccessToken() && this.getRefreshToken());
  }
  
  // accessToken만 확인
  static hasAccessToken(): boolean {
    const hasToken = !!this.getAccessToken();
    console.log(`🔍 AccessToken 존재 여부: ${hasToken ? '✅ 있음' : '❌ 없음'}`);
    return hasToken;
  }
  
  // 디버깅 함수
  static debugCookieStatus(): void {
    if (typeof window !== 'undefined') {
      console.log('🔍 === 쿠키 디버깅 시작 ===');
      console.log('🕐 현재 시간 (로컬):', new Date().toLocaleString());
      console.log('🕐 현재 시간 (UTC):', new Date().toUTCString());
      console.log('🕐 현재 시간 (ISO):', new Date().toISOString());
      console.log('🍪 전체 쿠키:', document.cookie);
      console.log('🔑 AccessToken:', this.getCookie(this.ACCESS_TOKEN_KEY) ? '✅ 있음' : '❌ 없음');
      console.log('💾 RefreshToken:', sessionStorage.getItem(this.REFRESH_TOKEN_KEY) ? '✅ 있음' : '❌ 없음');
      console.log('🛠️ 개발자 도구 Application > Cookies에서 실제 만료시간을 확인하세요');
      console.log('🔍 === 쿠키 디버깅 종료 ===');
    }
  }
  
  // 시간 테스트 함수
  static testTimeCalculation(): void {
    if (typeof window !== 'undefined') {
      console.log('🧪 === 시간 계산 테스트 ===');
      
      const now = new Date();
      const futureTime = new Date(now.getTime() + 36000 * 1000); // 10시간 후
      
      console.log('현재 시간:');
      console.log('  - 로컬:', now.toLocaleString());
      console.log('  - UTC:', now.toUTCString());
      console.log('  - ISO:', now.toISOString());
      console.log('  - Timestamp:', now.getTime());
      
      console.log('10시간 후:');
      console.log('  - 로컬:', futureTime.toLocaleString());
      console.log('  - UTC:', futureTime.toUTCString());
      console.log('  - ISO:', futureTime.toISOString());
      console.log('  - Timestamp:', futureTime.getTime());
      
      console.log('🧪 === 시간 계산 테스트 종료 ===');
    }
  }
}