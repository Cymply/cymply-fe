// app/((default))/signup/model/useSigninRedirect.ts
import { useCallback, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/shared/hooks/useAuth";
import { TokenManager } from "@/shared/lib/tokenManager";

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
    // max-age=0을 사용하여 즉시 만료 (일관성 유지)
    document.cookie = 'recipientCode=; path=/; max-age=0';
    document.cookie = 'recipientRedirectUrl=; path=/; max-age=0';
    document.cookie = 'generalRedirectUrl=; path=/; max-age=0';
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
      const refreshToken = searchParams.get('refresh_token');
      console.log('🔍 access token 확인:', accessToken ? '있음' : '없음');
      console.log('🔍 refresh token 확인:', refreshToken ? '있음' : '없음');
      
      if (!accessToken) {
        console.error('❌ 토큰이 URL 파라미터에 없습니다.');
        router.push('/login');
        return;
      }
      
      // 토큰 저장 - TokenManager를 통해서만 저장
      console.log('🔍 토큰 저장 시작 (TokenManager 사용)');
      
      login({
        accessToken,
        refreshToken: refreshToken || undefined
      });
      
      // 토큰 저장 완료까지 대기
      const tokenSaved = await waitForTokenSave(accessToken);
      
      if (!tokenSaved) {
        console.log('🔧 TokenManager 저장 실패, 재시도');
        
        TokenManager.setTokens({
          accessToken,
          refreshToken: refreshToken || undefined
        });
        
        // 재시도 후 다시 확인
        const retryTokenSaved = await waitForTokenSave(accessToken, 2000);
        if (!retryTokenSaved) {
          console.error('❌ 토큰 저장 완전 실패');
          console.log('🔍 현재 쿠키 상태 디버깅');
          TokenManager.debugCookieStatus();
          
          // 최후의 수단: 페이지 새로고침 후 재시도
          console.log('🔄 페이지 새로고침 후 재시도');
          window.location.reload();
          return;
        }
      }
      
      // 토큰 저장 성공 후 상태 확인
      console.log('✅ 토큰 저장 성공, 현재 상태 확인');
      TokenManager.debugCookieStatus();
      
      // 리다이렉트 URL 확인 (recipientCode는 더 이상 여기서 처리하지 않음)
      const recipientRedirectUrl = getCookie('recipientRedirectUrl');
      const generalRedirectUrl = getCookie('generalRedirectUrl');
      
      console.log('🔍 Recipient URL:', recipientRedirectUrl);
      console.log('🔍 General URL:', generalRedirectUrl);
      console.log('ℹ️ recipientCode는 목적지 페이지에서 처리됨');
      
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
      
      // 리다이렉트 쿠키만 정리 (recipientCode는 유지)
      document.cookie = 'recipientRedirectUrl=; path=/; max-age=0';
      document.cookie = 'generalRedirectUrl=; path=/; max-age=0';
      // recipientCode는 목적지 페이지에서 사용하므로 유지
      
      // 페이지 이동 전 최종 토큰 상태 확인
      const finalToken = TokenManager.getAccessToken();
      if (!finalToken) {
        console.error('❌ 페이지 이동 직전 토큰 없음!');
        TokenManager.debugCookieStatus();
      }
      
      // 페이지 이동
      console.log('🚀 페이지 이동:', targetUrl);
      window.location.href = targetUrl;
      
    } catch (error) {
      console.error("❌ afterSocialSignin error", error);
      console.log('🔍 에러 발생 시 쿠키 상태');
      TokenManager.debugCookieStatus();
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