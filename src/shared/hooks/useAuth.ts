// shared/hooks/useAuth.ts
import { useState, useEffect } from 'react';
import { TokenManager } from '../lib/tokenManager';
import { checkAuthStatus } from '../lib/apiClient';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  const checkAuth = async () => {
    try {
      // 브라우저 환경에서만 실행
      if (typeof window === 'undefined') {
        setIsAuthenticated(false);
        setIsLoading(false);
        return;
      }
      
      // accessToken만 있어도 인증된 것으로 간주 (middleware와 일치)
      const hasAccessToken = TokenManager.hasAccessToken();
      if (!hasAccessToken) {
        console.log('❌ AccessToken 없음');
        setIsAuthenticated(false);
        return;
      }
      
      console.log('✅ AccessToken 있음, API 호출로 검증 시작');
      
      // 실제 API 호출로 토큰 유효성 검증
      const isValid = await checkAuthStatus();
      console.log('🔍 API 검증 결과:', isValid);
      setIsAuthenticated(isValid);
    } catch (error) {
      console.error('❌ Auth check error:', error);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };
  
  const login = async (tokens: { accessToken: string; refreshToken?: string }) => {
    console.log('🔍 useAuth login 시작');
    
    // accessToken은 쿠키에, refreshToken은 sessionStorage에 저장
    TokenManager.setTokens(tokens);
    
    // 토큰 저장 완료 대기 (최대 2초)
    await waitForTokenSave(tokens.accessToken, 2000);
    
    setIsAuthenticated(true);
    
    console.log('✅ useAuth login 완료 (쿠키 + sessionStorage)');
  };
  
  // 토큰 저장 완료까지 대기하는 함수
  const waitForTokenSave = async (token: string, maxWaitTime = 2000): Promise<boolean> => {
    console.log('⏳ 토큰 저장 확인 시작...');
    const startTime = Date.now();
    
    while (Date.now() - startTime < maxWaitTime) {
      const cookieToken = TokenManager.getAccessToken();
      
      if (cookieToken === token) {
        console.log('✅ 토큰 저장 확인됨 (쿠키)');
        return true;
      }
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    console.log('❌ 토큰 저장 타임아웃');
    return false;
  };
  
  const logout = () => {
    TokenManager.clearTokens();
    setIsAuthenticated(false);
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
  };
  
  // 컴포넌트 마운트 시 인증 상태 확인
  useEffect(() => {
    checkAuth();
  }, []);
  
  return {
    isAuthenticated,
    isLoading,
    login,
    logout,
    checkAuth
  };
};