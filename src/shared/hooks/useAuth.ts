// shared/hooks/useAuth.ts
import { useState, useEffect } from 'react';
import { TokenManager } from '../lib/tokenManager';
import { checkAuthStatus } from '../lib/apiClient';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  useEffect(() => {
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
    
    checkAuth();
  }, []);
  
  const login = (tokens: { accessToken: string; refreshToken: string }) => {
    TokenManager.setTokens(tokens);
    setIsAuthenticated(true);
  };
  
  const logout = () => {
    TokenManager.clearTokens();
    setIsAuthenticated(false);
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
  };
  
  return {
    isAuthenticated,
    isLoading,
    login,
    logout
  };
};