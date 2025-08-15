// shared/hooks/useAuth.ts
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { TokenManager } from '../lib/tokenManager';
import { apiClient, checkAuthStatus } from '../lib/apiClient';

export const useAuth = () => {
  const pathname = usePathname();
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
      
      // /signup 경로에서는 간단한 토큰 존재 여부만 확인
      if (pathname?.startsWith('/signup')) {
        console.log('🔍 Signup 경로에서 토큰 존재 여부만 확인');
        const accessToken = TokenManager.getAccessToken();
        const hasToken = !!accessToken;
        console.log(`🔍 Signup 경로 토큰 확인 결과: ${hasToken ? '✅ 있음' : '❌ 없음'}`);
        setIsAuthenticated(hasToken);
        setIsLoading(false);
        return;
      }
      
      console.log('🔍 일반 경로에서 인증 상태 확인 시작');
      
      // 일반 경로에서는 토큰 검증 및 재발급까지 모두 처리
      const isValid = await checkAuthStatus();
      console.log('🔍 최종 인증 결과:', isValid);
      
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
  
  const logout = async () => {
    try {
      // /signup 경로가 아닐 때만 로그아웃 API 호출
      if (!pathname?.startsWith('/signup')) {
        await apiClient.post("/api/v1/logout");
      }
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      TokenManager.clearTokens();
      TokenManager.clearAllCookies();
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }
  };
  
  // 컴포넌트 마운트 시 인증 상태 확인
  useEffect(() => {
    checkAuth();
  }, [pathname]); // pathname 변경 시에도 재확인
  
  return {
    isAuthenticated,
    isLoading,
    login,
    logout,
    checkAuth
  };
};