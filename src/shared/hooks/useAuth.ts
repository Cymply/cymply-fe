// shared/hooks/useAuth.ts
import { useState, useEffect } from 'react';
import { TokenManager } from '../lib/tokenManager';
import { checkAuthStatus } from '../lib/apiClient';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  const checkAuth = async () => {
    try {
      const hasTokens = TokenManager.hasTokens();
      if (!hasTokens) {
        setIsAuthenticated(false);
        return;
      }
      
      const isValid = await checkAuthStatus();
      setIsAuthenticated(isValid);
    } catch (error) {
      console.error('Auth check error:', error);
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