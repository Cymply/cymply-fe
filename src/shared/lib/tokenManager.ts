// shared/lib/tokenManager.ts (HTTP 배포 환경 문제 해결)
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
    return expiresTime.toUTCString();
  }
  
  // HTTPS 여부 확인 함수 (중요!)
  private static isHttps(): boolean {
    if (typeof window === 'undefined') return false;
    return window.location.protocol === 'https:';
  }
  
  // 쿠키 헬퍼 함수들 - HTTP/HTTPS 환경에 맞게 설정
  private static setCookie(name: string, value: string, maxAge: number = TokenManager.ACCESS_TOKEN_MAX_AGE): void {
    if (typeof window !== 'undefined') {
      // 🔧 핵심 수정: HTTPS일 때만 secure 플래그 추가
      const secure = this.isHttps() ? '; secure' : '';
      const sameSite = '; samesite=lax';
      
      // 정확한 UTC 시간 계산
      const expiresUTC = this.getCorrectUTCExpires(maxAge);
      
      // expires와 max-age 둘 다 설정 (브라우저 호환성)
      const cookieString = `${name}=${value}; path=/; max-age=${maxAge}; expires=${expiresUTC}${sameSite}${secure}`;
      
      console.log(`🍪 쿠키 설정 시도: ${name}`);
      console.log(`🔒 프로토콜: ${window.location.protocol}`);
      console.log(`🔐 Secure 플래그: ${secure ? '추가됨' : '제거됨'}`);
      console.log(`🍪 쿠키 문자열: ${cookieString}`);
      
      document.cookie = cookieString;
      
      // 설정 후 즉시 확인
      setTimeout(() => {
        const savedValue = this.getCookie(name);
        console.log(`🍪 쿠키 설정 결과: ${name} = ${savedValue ? '✅ 성공' : '❌ 실패'}`);
        
        if (!savedValue) {
          console.error('❌ 쿠키 설정 실패 상세 정보:');
          console.log(`   - 현재 프로토콜: ${window.location.protocol}`);
          console.log(`   - Secure 플래그: ${secure ? '있음' : '없음'}`);
          console.log(`   - 전체 쿠키: ${document.cookie}`);
          console.log('   - HTTP 환경에서 secure 플래그가 있으면 쿠키가 저장되지 않습니다!');
          
          // HTTP 환경에서 secure 플래그 때문에 실패한 경우 재시도
          if (!this.isHttps() && secure) {
            console.log('🔄 HTTP 환경에서 secure 플래그 제거 후 재시도');
            const simpleCookie = `${name}=${value}; path=/; max-age=${maxAge}; expires=${expiresUTC}; samesite=lax`;
            document.cookie = simpleCookie;
            
            setTimeout(() => {
              const retryValue = this.getCookie(name);
              console.log(`🔄 재시도 결과: ${retryValue ? '✅ 성공' : '❌ 실패'}`);
            }, 100);
          }
        }
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
      // HTTP/HTTPS 모두에서 작동하도록 secure 플래그 조건부 적용
      const pastDate = new Date(0).toUTCString();
      const secure = this.isHttps() ? '; secure' : '';
      
      // 여러 방법으로 삭제 시도
      const deletePatterns = [
        `${name}=; path=/; max-age=0; expires=${pastDate}; samesite=lax${secure}`,
        `${name}=; path=/; max-age=0; expires=${pastDate}; samesite=lax`,
        `${name}=; path=/; max-age=0; expires=${pastDate}`,
        `${name}=; path=/; max-age=0`
      ];
      
      deletePatterns.forEach(pattern => {
        document.cookie = pattern;
      });
      
      console.log(`🗑️ 쿠키 삭제: ${name}`);
    }
  }
  
  // 토큰 저장
  static setTokens(tokens: TokenPair): void {
    if (typeof window !== 'undefined') {
      console.log('🔍 === 토큰 저장 시작 ===');
      console.log('🌍 현재 URL:', window.location.href);
      console.log('🔒 현재 프로토콜:', window.location.protocol);
      console.log('🏭 환경:', process.env.NODE_ENV);
      console.log('🔐 HTTPS 여부:', this.isHttps());
      console.log('🕐 시스템 현재 시간:', new Date().toISOString());
      console.log('🕐 예상 만료 시간:', new Date(Date.now() + this.ACCESS_TOKEN_MAX_AGE * 1000).toISOString());
      
      // accessToken은 쿠키에 저장 (10시간)
      if (tokens.accessToken) {
        this.setCookie(this.ACCESS_TOKEN_KEY, tokens.accessToken, this.ACCESS_TOKEN_MAX_AGE);
        console.log('💾 AccessToken Cookie 저장 시도 완료');
      }
      
      // refreshToken은 sessionStorage에 저장
      if (tokens.refreshToken) {
        sessionStorage.setItem(this.REFRESH_TOKEN_KEY, tokens.refreshToken);
        console.log('💾 RefreshToken sessionStorage 저장 완료');
      }
      
      // 저장 결과 검증
      setTimeout(() => {
        const accessToken = this.getAccessToken();
        const refreshToken = this.getRefreshToken();
        
        console.log('📊 저장 결과 검증:');
        console.log(`   - AccessToken: ${accessToken ? '✅ 성공' : '❌ 실패'}`);
        console.log(`   - RefreshToken: ${refreshToken ? '✅ 성공' : '❌ 실패'}`);
        
        if (!accessToken) {
          console.error('❌ AccessToken 저장 실패 - 환경 정보:');
          console.log(`   - 프로토콜: ${window.location.protocol}`);
          console.log(`   - 도메인: ${window.location.hostname}`);
          console.log(`   - 전체 쿠키: ${document.cookie}`);
        }
      }, 200);
      
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
        console.log('🔍 현재 프로토콜:', window.location.protocol);
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
  
  // 모든 관련 쿠키 삭제 (토큰 + 리다이렉트 쿠키)
  static clearAllCookies(): void {
    if (typeof window !== 'undefined') {
      // 기존 토큰 쿠키들 삭제
      this.clearTokens();
      
      // 리다이렉트 관련 쿠키들 삭제
      this.deleteCookie('recipientCode');
      this.deleteCookie('recipientRedirectUrl');
      this.deleteCookie('generalRedirectUrl');
      
      console.log('🗑️ 모든 관련 쿠키 삭제 완료');
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
  
  // 디버깅 함수 (환경 정보 추가)
  static debugCookieStatus(): void {
    if (typeof window !== 'undefined') {
      console.log('🔍 === 쿠키 디버깅 시작 ===');
      console.log('🌍 현재 URL:', window.location.href);
      console.log('🔒 현재 프로토콜:', window.location.protocol);
      console.log('🏭 환경:', process.env.NODE_ENV);
      console.log('🔐 HTTPS 여부:', this.isHttps());
      console.log('🍪 쿠키 지원:', navigator.cookieEnabled);
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
  
  // 쿠키 설정 테스트 함수
  static testCookieInCurrentEnvironment(): void {
    if (typeof window !== 'undefined') {
      console.log('🧪 === 현재 환경에서 쿠키 테스트 ===');
      
      const testName = 'testCookie';
      const testValue = 'testValue123';
      
      // 현재 환경에 맞는 쿠키 설정
      const secure = this.isHttps() ? '; secure' : '';
      const testCookie = `${testName}=${testValue}; path=/; max-age=60; samesite=lax${secure}`;
      
      console.log('🔒 현재 프로토콜:', window.location.protocol);
      console.log('🔐 Secure 플래그:', secure ? '추가' : '제거');
      console.log('🍪 테스트 쿠키:', testCookie);
      
      document.cookie = testCookie;
      
      setTimeout(() => {
        const savedValue = this.getCookie(testName);
        if (savedValue === testValue) {
          console.log('✅ 쿠키 테스트 성공!');
        } else {
          console.error('❌ 쿠키 테스트 실패');
          console.log('   예상값:', testValue);
          console.log('   실제값:', savedValue);
          console.log('   전체 쿠키:', document.cookie);
        }
        
        // 테스트 쿠키 삭제
        document.cookie = `${testName}=; path=/; max-age=0`;
        console.log('🧪 === 쿠키 테스트 완료 ===');
      }, 100);
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