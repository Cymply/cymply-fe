// lib/tokenManager.ts
export class TokenManager {
  private static readonly ACCESS_TOKEN_KEY = 'access_token';
  private static readonly REFRESH_TOKEN_KEY = 'refresh_token';
  private static readonly TOKEN_EXPIRY_KEY = 'token_expiry';
  
  // 토큰 저장
  static setTokens(accessToken: string, refreshToken: string, expiresIn?: number) {
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.ACCESS_TOKEN_KEY, accessToken);
      localStorage.setItem(this.REFRESH_TOKEN_KEY, refreshToken);
      
      if (expiresIn) {
        const expiryTime = Date.now() + (expiresIn * 1000);
        localStorage.setItem(this.TOKEN_EXPIRY_KEY, expiryTime.toString());
      }
    }
  }
  
  // Access Token 조회
  static getAccessToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(this.ACCESS_TOKEN_KEY);
    }
    return null;
  }
  
  // Refresh Token 조회
  static getRefreshToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(this.REFRESH_TOKEN_KEY);
    }
    return null;
  }
  
  // 토큰 만료 체크
  static isTokenExpired(): boolean {
    if (typeof window !== 'undefined') {
      const expiryTime = localStorage.getItem(this.TOKEN_EXPIRY_KEY);
      if (!expiryTime) return false;
      
      return Date.now() > parseInt(expiryTime);
    }
    return true;
  }
  
  // 토큰 삭제 (로그아웃 시)
  static clearTokens() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(this.ACCESS_TOKEN_KEY);
      localStorage.removeItem(this.REFRESH_TOKEN_KEY);
      localStorage.removeItem(this.TOKEN_EXPIRY_KEY);
    }
  }
  
  // 로그인 상태 체크
  static isLoggedIn(): boolean {
    const token = this.getAccessToken();
    return token !== null && !this.isTokenExpired();
  }
}