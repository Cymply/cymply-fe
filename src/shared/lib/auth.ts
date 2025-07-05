// lib/authUtils.ts
import { apiClient } from './apiClient';

// 사용자 정보 타입
interface User {
  id: string;
  email: string;
  name: string;
  // 필요한 다른 필드들 추가
}

// 현재 사용자 정보 가져오기
export const getCurrentUser = async (): Promise<User | null> => {
  try {
    const response = await apiClient.get('/api/v1/auth/me');
    return response.data.content || response.data;
  } catch (error) {
    console.error('Failed to get current user:', error);
    return null;
  }
};

// 인증 상태 확인
export const isAuthenticated = async (): Promise<boolean> => {
  try {
    const response = await apiClient.get('/api/v1/auth/me');
    return response.status === 200;
  } catch (error) {
    return false;
  }
};

// React Hook으로 인증 상태 관리
import { useState, useEffect } from 'react';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const checkAuth = async () => {
    setIsLoading(true);
    try {
      const userData = await getCurrentUser();
      if (userData) {
        setUser(userData);
        setIsLoggedIn(true);
      } else {
        setUser(null);
        setIsLoggedIn(false);
      }
    } catch (error) {
      setUser(null);
      setIsLoggedIn(false);
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    checkAuth();
  }, []);
  
  return {
    user,
    isLoggedIn,
    isLoading,
    checkAuth, // 수동으로 다시 확인할 때 사용
  };
};