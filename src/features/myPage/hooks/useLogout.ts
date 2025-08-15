// 1. features/myPage/hooks/useLogout.ts
import { useCallback } from 'react';
import { logout } from '@/shared/lib/apiClient';
import { useAuth } from '@/shared/hooks/useAuth';

export const useLogout = () => {
  const { logout: authLogout } = useAuth();
  
  const handleLogout = useCallback(async () => {
    try {
      console.log('🚪 로그아웃 프로세스 시작');
      
      // useAuth의 logout 함수 사용 (이미 apiClient.logout과 토큰 정리 포함)
      await authLogout();
      
      console.log('✅ 로그아웃 완료');
    } catch (error) {
      console.error('❌ 로그아웃 에러:', error);
      
      // 에러가 발생해도 강제로 토큰 정리하고 로그인 페이지로 이동
      await logout();
    }
  }, [authLogout]);
  
  return {
    handleLogout
  };
};