// app/((default))/signup/model/useSigninRedirect.ts
import { useCallback, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/shared/hooks/useAuth";
import {TokenManager} from "@/shared/lib/tokenManager";

export default function useSigninRedirect() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();
  
  // 쿠키 헬퍼 함수들
  const getCookie = (name: string): string | null => {
    if (typeof window === 'undefined') return null;
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      const cookieValue = parts.pop()?.split(';').shift() || null;
      return cookieValue ? decodeURIComponent(cookieValue) : null;
    }
    return null;
  };
  
  const clearRedirectCookies = () => {
    document.cookie = 'recipientCode=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
    document.cookie = 'recipientRedirectUrl=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
    document.cookie = 'generalRedirectUrl=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
  };
  
  const normalizePath = (path: string): string => {
    try {
      const normalized = path.replace(/\/+/g, '/').trim();
      return normalized.length > 1 && normalized.endsWith('/')
        ? normalized.slice(0, -1)
        : normalized;
    } catch (error) {
      console.error('Path normalization error:', error);
      return path;
    }
  };
  
  // 토큰 저장 완료까지 최대 3초 대기 (쿠키에서 accessToken 확인)
  const waitForTokenSave = async (token: string, maxWaitTime = 3000) => {
    console.log('⏳ 토큰 저장 확인 시작...');
    const startTime = Date.now();
    
    while (Date.now() - startTime < maxWaitTime) {
      const cookieToken = TokenManager.getAccessToken(); // 쿠키에서 확인
      
      if (cookieToken === token) {
        console.log('✅ 토큰 저장 확인됨 (쿠키)');
        return true;
      }
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    console.log('❌ 토큰 저장 타임아웃');
    return false;
  };
  
  const afterSocialSignin = useCallback(async () => {
    try {
      const accessToken = searchParams.get('access_token');
      console.log('🔍 토큰 확인:', accessToken ? '있음' : '없음');
      
      if (!accessToken) {
        console.error('❌ 토큰이 URL 파라미터에 없습니다.');
        router.push('/login');
        return;
      }
      
      // 토큰 저장
      console.log('🔍 토큰 저장 시작');
      login({ accessToken });
      
      // 토큰 저장 완료까지 대기
      const tokenSaved = await waitForTokenSave(accessToken);
      
      if (!tokenSaved) {
        console.log('🔧 토큰 저장 실패, 직접 저장 시도');
        // 토큰 직접 저장 시도
        document.cookie = `accessToken=${accessToken}; path=/; max-age=3600`;
        
        // 직접 저장 후 다시 확인
        const retryTokenSaved = await waitForTokenSave(accessToken, 1000);
        if (!retryTokenSaved) {
          console.error('❌ 토큰 저장 완전 실패');
          router.push('/login');
          return;
        }
      }
      
      // 리다이렉트 URL 확인
      const recipientRedirectUrl = getCookie('recipientRedirectUrl');
      const generalRedirectUrl = getCookie('generalRedirectUrl');
      
      console.log('🔍 Recipient URL:', recipientRedirectUrl);
      console.log('🔍 General URL:', generalRedirectUrl);
      
      let targetUrl = '/main'; // 기본값
      
      if (recipientRedirectUrl) {
        targetUrl = normalizePath(recipientRedirectUrl);
        console.log('✅ Recipient URL로 이동:', targetUrl);
      } else if (generalRedirectUrl) {
        targetUrl = normalizePath(generalRedirectUrl);
        console.log('✅ General URL로 이동:', targetUrl);
      } else {
        console.log('ℹ️ 저장된 URL 없음, 메인으로 이동');
      }
      
      // 쿠키 정리
      clearRedirectCookies();
      
      // 페이지 이동
      console.log('🚀 페이지 이동:', targetUrl);
      window.location.href = targetUrl;
      
    } catch (error) {
      console.error("❌ afterSocialLogin error", error);
      router.push('/login');
    }
  }, [searchParams, login, router]);
  
  useEffect(() => {
    afterSocialSignin();
  }, []);
  
  return {
    isProcessing: true
  };
}