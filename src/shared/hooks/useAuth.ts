// shared/hooks/useAuth.ts
import { useState, useEffect } from 'react';
import { TokenManager } from '../lib/tokenManager';
import { checkAuthStatus } from '../lib/apiClient';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  const checkAuth = async () => {
    try {
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
  
  const login = (tokens: { accessToken: string; refreshToken?: string }) => {
    console.log('🔍 useAuth login 시작');
    
    // accessToken은 쿠키에, refreshToken은 sessionStorage에 저장
    TokenManager.setTokens(tokens);
    setIsAuthenticated(true);
    
    console.log('✅ useAuth login 완료 (쿠키 + sessionStorage)');
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