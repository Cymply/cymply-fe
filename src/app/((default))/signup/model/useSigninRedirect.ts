// app/((default))/signup/model/useSigninRedirect.ts
// 카카오나 구글 회원가입 후 Cymply 전용 회원가입(성별, 생년월일) 창으로 넘어올 때 수행 할 부분
import { useCallback, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/shared/hooks/useAuth";

export default function useSigninRedirect() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth(); // useAuth의 login 함수 사용
  
  // 카카오나 구글 로그인 성공 후 URL 파라미터에서 토큰 추출하여 저장
  const afterSocialSignin = useCallback(() => {
    try {
      // URL 파라미터에서 토큰 추출
      const accessToken = searchParams.get('access_token');
      console.log("useSignupRedirect searchParams", searchParams)
      // 토큰이 없으면 에러 처리
      if (!accessToken) {
        console.error('토큰이 URL 파라미터에 없습니다.');
        router.push('/login'); // 로그인 페이지로 리다이렉트
        return;
      }
      
      // 토큰 저장 및 인증 상태 업데이트
      login({ accessToken });
      
      // 메인 화면으로 리다이렉트
      router.push('/main');
      
    } catch (error) {
      console.error("afterSocialLogin error", error);
      router.push('/login'); // 에러 시 로그인 페이지로 리다이렉트
    }
  }, [searchParams, login, router]);
  
  useEffect(() => {
    afterSocialSignin();
  }, []);
  
  return {
    isProcessing: true // 처리 중임을 나타내는 상태
  };
}
