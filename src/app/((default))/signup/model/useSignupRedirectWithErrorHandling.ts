// app/((default))/signup/model/useSignupRedirectWithErrorHandling.ts
import { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/shared/hooks/useAuth";

interface SignupRedirectState {
  isProcessing: boolean;
  error: string | null;
}

export function useSignupRedirectWithErrorHandling() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();
  const [state, setState] = useState<SignupRedirectState>({
    isProcessing: true,
    error: null
  });
  
  const afterSocialLogin = useCallback(async () => {
    try {
      setState({ isProcessing: true, error: null });
      
      // URL 파라미터에서 토큰 추출
      const accessToken = searchParams.get('access_token');
      const refreshToken = searchParams.get('refresh_token');
      
      // 토큰 유효성 검사
      if (!accessToken || !refreshToken) {
        throw new Error('로그인 토큰이 없습니다. 다시 로그인해주세요.');
      }
      
      // 토큰 형식 검사 (선택사항)
      if (accessToken.length < 10 || refreshToken.length < 10) {
        throw new Error('유효하지 않은 토큰입니다.');
      }
      
      // 토큰 저장 및 인증 상태 업데이트
      login({ accessToken, refreshToken });
      
      // 약간의 딜레이 후 리다이렉트 (사용자 경험 개선)
      // setTimeout(() => {
      //   router.push('/signup/step1');
      // }, 1000);
      
    } catch (error) {
      console.error("afterSocialLogin error", error);
      const errorMessage = error instanceof Error ? error.message : '로그인 처리 중 오류가 발생했습니다.';
      
      setState({
        isProcessing: false,
        error: errorMessage
      });
      
      // 3초 후 로그인 페이지로 리다이렉트
      setTimeout(() => {
        router.push('/login');
      }, 3000);
    }
  }, [searchParams, login, router]);
  
  useEffect(() => {
    afterSocialLogin();
  }, []);
  
  return state;
}