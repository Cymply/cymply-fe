// hooks/useAuth.ts
import { useState, useEffect } from 'react';
import { TokenManager } from '../lib/tokenManager';
import { AuthService } from '../lib/auth';

export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // 클라이언트 사이드에서만 실행
    const checkAuth = () => {
      const loggedIn = TokenManager.isLoggedIn();
      setIsLoggedIn(loggedIn);
      setIsLoading(false);
    };
    
    checkAuth();
  }, []);
  
  const login = async (code: string) => {
    try {
      setIsLoading(true);
      await AuthService.login(code);
      setIsLoggedIn(true);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  const logout = async () => {
    try {
      setIsLoading(true);
      await AuthService.logout();
      setIsLoggedIn(false);
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  return {
    isLoggedIn,
    isLoading,
    login,
    logout
  };
};