// shared/lib/tokenManager.ts
export interface TokenPair {
  accessToken: string;
  refreshToken?: string;
}

export class TokenManager {
  private static readonly ACCESS_TOKEN_KEY = 'accessToken';
  private static readonly REFRESH_TOKEN_KEY = 'refreshToken';
  
  // 쿠키 헬퍼 함수들
  private static setCookie(name: string, value: string, maxAge: number = 360): void {
    if (typeof window !== 'undefined') {
      const secure = process.env.NODE_ENV === 'production' ? '; secure' : '';
      const sameSite = '; samesite=lax';
      document.cookie = `${name}=${value}; path=/; max-age=${maxAge}${sameSite}${secure}`;
      
      // 쿠키 설정 후 즉시 확인 (디버깅)
      const savedValue = this.getCookie(name);
      console.log(`🍪 쿠키 설정: ${name} = ${savedValue ? '✅ 성공' : '❌ 실패'}`);
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
      document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT`;
      console.log(`🗑️ 쿠키 삭제: ${name}`);
    }
  }
  
  // 토큰 저장
  static setTokens(tokens: TokenPair): void {
    if (typeof window !== 'undefined') {
      console.log('🔍 토큰 저장 시작');
      
      // accessToken은 쿠키에 저장 (1시간)
      if (tokens.accessToken) {
        this.setCookie(this.ACCESS_TOKEN_KEY, tokens.accessToken, 360);
      }
      
      // refreshToken은 sessionStorage에 저장
      if (tokens.refreshToken) {
        sessionStorage.setItem(this.REFRESH_TOKEN_KEY, tokens.refreshToken);
        console.log('💾 RefreshToken sessionStorage 저장 완료');
      }
    }
  }
  
  // 액세스 토큰 가져오기 (쿠키에서)
  static getAccessToken(): string | null {
    const token = this.getCookie(this.ACCESS_TOKEN_KEY);
    if (token) {
      console.log('✅ AccessToken 쿠키에서 조회 성공');
    } else {
      console.log('❌ AccessToken 쿠키에서 조회 실패');
    }
    return token;
  }
  
  // 리프레시 토큰 가져오기 (sessionStorage에서)
  static getRefreshToken(): string | null {
    if (typeof window !== 'undefined') {
      const token = sessionStorage.getItem(this.REFRESH_TOKEN_KEY);
      if (token) {
        console.log('✅ RefreshToken sessionStorage에서 조회 성공');
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
      // 쿠키에서 accessToken 삭제
      this.deleteCookie(this.ACCESS_TOKEN_KEY);
      
      // sessionStorage에서 refreshToken 삭제
      sessionStorage.removeItem(this.REFRESH_TOKEN_KEY);
      console.log('🗑️ RefreshToken sessionStorage에서 삭제');
    }
  }
  
  // 토큰 존재 여부 확인
  static hasTokens(): boolean {
    return !!(this.getAccessToken() && this.getRefreshToken());
  }
  
  // accessToken만 확인 (middleware에서 사용)
  static hasAccessToken(): boolean {
    const hasToken = !!this.getAccessToken();
    console.log(`🔍 AccessToken 존재 여부: ${hasToken ? '✅ 있음' : '❌ 없음'}`);
    return hasToken;
  }
}