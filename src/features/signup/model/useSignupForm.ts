// src/features/signup/model/useSignupForm.ts
'use client'

import { useAtom } from 'jotai'
import {usePathname, useRouter, useSearchParams} from 'next/navigation'
import {genderAtom, ageGroupAtom, formValidAtom, nicknameAtom} from "@/store/signupStore"
import { useState } from 'react'
import {signupApi} from "@/entities/signup/api/signupApi";
import {useAuth} from "@/shared/hooks/useAuth";
import {TokenManager} from "@/shared/lib/tokenManager";
import {getCookie} from "@/utils/authUtils";

export default function useSignupForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const [gender] = useAtom(genderAtom)
  const [ageGroup] = useAtom(ageGroupAtom)
  const [canProceed] = useAtom(formValidAtom)
  const [nickname,setNickname] = useAtom(nicknameAtom)
  const [validation, setValidation] = useState({
    isChecking: false,
    isValid: false
  });
  const { login } = useAuth();
  
  // 토큰 저장 완료까지 최대 3초 대기 (쿠키에서 accessToken 확인)
  const waitForTokenSave = async (token: string, maxWaitTime = 3000) => {
    console.log('⏳ 토큰 저장 확인 시작...');
    const startTime = Date.now();
    
    while (Date.now() - startTime < maxWaitTime) {
      // TokenManager와 직접 쿠키 확인 둘 다 체크
      const tokenManagerToken = TokenManager.getAccessToken();
      const directCookieToken = getCookie('accessToken');
      
      console.log('🔍 TokenManager 토큰:', tokenManagerToken ? '있음' : '없음');
      console.log('🔍 직접 쿠키 확인:', directCookieToken ? '있음' : '없음');
      
      if (tokenManagerToken === token || directCookieToken === token) {
        console.log('✅ 토큰 저장 확인됨');
        return true;
      }
      
      await new Promise(resolve => setTimeout(resolve, 100)); // 100ms마다 확인
    }
    
    console.log('❌ 토큰 저장 타임아웃');
    return false;
  };

  const isSignupNickname = pathname.endsWith("/nickname");

  const handleNext = () => {
    if (canProceed) {
      router.push('/signup/step2')
    }
  }
  
  const handleSubmit = async () => {
    try {
      setValidation(prev => ({ ...prev, isChecking: true }))
      
      const signupData = {
      
      console.log('🚀 회원가입 API 호출 시작');
        gender: gender || "",
        nickname: nickname,
        ageRange: ageGroup || "",
      };
      const res = await signupApi.signup(signupData);
      
      if (res.status !== 200) {
        throw res.statusText;
      }
      
      console.log('🚀 토큰 재발급 API 호출 시작');
      const resToken = await signupApi.getTokenAfterSignup()
      
      if (resToken.status !== 200) {
        throw resToken.statusText;
      }
      
      const { accessToken, refreshToken } = resToken.data.data.content;
      console.log('🔍 받은 토큰:', {
        accessToken: accessToken ? accessToken : '없음',
        refreshToken: refreshToken ? refreshToken : '없음'
      });
      
      if (!accessToken || !refreshToken) {
        throw new Error('토큰이 응답에 없습니다');
      }
      
      console.log('🔍 토큰 저장 시작');
      login({accessToken, refreshToken});
      
      // 토큰 저장 완료까지 대기
      const tokenSaved = await waitForTokenSave(accessToken);
      
      if (!tokenSaved) {
        console.error('❌ 토큰 저장 완전 실패');
        // 토큰 저장에 실패해도 진행 (토큰이 있으니까)
        console.log('⚠️ 토큰 저장 실패했지만 진행');
      }
      
      // 회원가입 후 저장된 토큰 재확인
      const finalAccessToken = TokenManager.getAccessToken();
      const finalRefreshToken = TokenManager.getRefreshToken();
      console.log('=== 최종 토큰 상태 ===');
      console.log('최종 AccessToken:', finalAccessToken ? '저장됨' : '없음');
      console.log('최종 RefreshToken:', finalRefreshToken ? '저장됨' : '없음');
      console.log('쿠키 확인:', document.cookie);
      
      setValidation({ isChecking: false, isValid: true })
      
      // // 리다이렉트 URL 결정
      // const redirectUrl = getRedirectUrl();
      // console.log('✅ 회원가입 완료, 리다이렉트 URL:', redirectUrl);
      //
      // // 쿠키 정리
      // clearRedirectCookies();
      //
      // console.log('🚀 페이지 이동:', redirectUrl);
      // router.push(redirectUrl);
      router.push("/tutorial")
      
    } catch (error) {
      console.error('❌ 회원가입 실패:', error)
      setValidation({ isChecking: false, isValid: false })
    }
  }
  
  return {
    canProceed,
    validation,
    handleSubmit,
    handleNext,
    isSignupNickname,
  }
}