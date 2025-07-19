// shared/lib/tokenManager.ts
export interface TokenPair {
  accessToken: string;
  refreshToken?: string;
}

export class TokenManager {
  private static readonly ACCESS_TOKEN_KEY = 'accessToken';
  private static readonly REFRESH_TOKEN_KEY = 'refreshToken';
  
  // 쿠키 헬퍼 함수들
  private static setCookie(name: string, value: string, maxAge: number = 3600): void {
    if (typeof window !== 'undefined') {
      const secure = process.env.NODE_ENV === 'production' ? '; secure' : '';
      document.cookie = `${name}=${value}; path=/; max-age=${maxAge}; samesite=lax${secure}`;
    }
  }
  
  private static getCookie(name: string): string | null {
    if (typeof window === 'undefined') return null;
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop()?.split(';').shift() || null;
    }
    return null;
  }
  
  private static deleteCookie(name: string): void {
    if (typeof window !== 'undefined') {
      document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT`;
    }
  }
  
  // 토큰 저장
  static setTokens(tokens: TokenPair): void {
    if (typeof window !== 'undefined') {
      // accessToken은 쿠키에 저장 (1시간)
      if (tokens.accessToken) {
        this.setCookie(this.ACCESS_TOKEN_KEY, tokens.accessToken, 3600);
      }
      
      // refreshToken은 sessionStorage에 저장
      if (tokens.refreshToken) {
        sessionStorage.setItem(this.REFRESH_TOKEN_KEY, tokens.refreshToken);
      }
    }
  }
  
  // 액세스 토큰 가져오기 (쿠키에서)
  static getAccessToken(): string | null {
    return this.getCookie(this.ACCESS_TOKEN_KEY);
  }
  
  // 리프레시 토큰 가져오기 (sessionStorage에서)
  static getRefreshToken(): string | null {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem(this.REFRESH_TOKEN_KEY);
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
    }
  }
  
  // 토큰 존재 여부 확인
  static hasTokens(): boolean {
    return !!(this.getAccessToken() && this.getRefreshToken());
  }
  
  // accessToken만 확인 (middleware에서 사용)
  static hasAccessToken(): boolean {
    return !!this.getAccessToken();
  }
}