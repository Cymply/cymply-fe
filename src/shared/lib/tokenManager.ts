// shared/lib/tokenManager.ts
export interface TokenPair {
  accessToken: string;
  refreshToken?: string;
}

export class TokenManager {
  private static readonly ACCESS_TOKEN_KEY = 'accessToken';
  private static readonly REFRESH_TOKEN_KEY = 'refreshToken';
  
  // 토큰 저장
  static setTokens(tokens: TokenPair): void {
    if (typeof window !== 'undefined') {
      if (tokens.accessToken){
        sessionStorage.setItem(this.ACCESS_TOKEN_KEY, tokens.accessToken);
      }
      if (tokens.refreshToken) {
        sessionStorage.setItem(this.REFRESH_TOKEN_KEY, tokens.refreshToken);
      }
    }
  }
  
  // 액세스 토큰 가져오기
  static getAccessToken(): string | null {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem(this.ACCESS_TOKEN_KEY);
    }
    return null;
  }
  
  // 리프레시 토큰 가져오기
  static getRefreshToken(): string | null {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem(this.REFRESH_TOKEN_KEY);
    }
    return null;
  }
  
  // 토큰 삭제
  static clearTokens(): void {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem(this.ACCESS_TOKEN_KEY);
      sessionStorage.removeItem(this.REFRESH_TOKEN_KEY);
    }
  }
  
  // 토큰 존재 여부 확인
  static hasTokens(): boolean {
    return !!(this.getAccessToken() && this.getRefreshToken());
  }
}