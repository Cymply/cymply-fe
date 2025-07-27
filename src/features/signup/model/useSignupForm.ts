// src/features/signup/model/useSignupForm.ts
'use client'

import { useAtom } from 'jotai'
import {usePathname, useRouter, useSearchParams} from 'next/navigation'
import {genderAtom, ageGroupAtom, formValidAtom, nicknameAtom} from "@/store/signupStore"
import { useState } from 'react'
import {signupApi} from "@/entities/signup/api/signupApi";
import {useAuth} from "@/shared/hooks/useAuth";
import {TokenManager} from "@/shared/lib/tokenManager";

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
  
  const setCookie = (name: string, value: string, maxAge: number = 36000): void => {
    if (typeof window !== 'undefined') {
      const secure = process.env.NODE_ENV === 'production' ? '; secure' : '';
      document.cookie = `${name}=${value}; path=/; max-age=${maxAge}; samesite=lax${secure}`;
    }
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
  
  // 리다이렉트 URL 결정 함수
  const getRedirectUrl = () => {
    const recipientRedirectUrl = getCookie('recipientRedirectUrl');
    const generalRedirectUrl = getCookie('generalRedirectUrl');
    
    if (recipientRedirectUrl) {
      console.log('🔍 Found recipient redirect URL:', recipientRedirectUrl);
      return normalizePath(recipientRedirectUrl);
    } else if (generalRedirectUrl) {
      console.log('🔍 Found general redirect URL:', generalRedirectUrl);
      return normalizePath(generalRedirectUrl);
    } else {
      console.log('🔍 No redirect URL found, using default');
      return '/main'; // 기본값
    }
  };
  
  const isSignupNickname = pathname.endsWith('/step2')
  
  const handleNext = () => {
    if (canProceed) {
      router.push('/signup/step2')
    }
  }
  
  const handleSubmit = async () => {
    try {
      setValidation(prev => ({ ...prev, isChecking: true }))
      
      const signupData = {
        gender : gender,
        nickname : nickname,
        ageRange : ageGroup,
      }
      
      console.log('🚀 회원가입 API 호출 시작');
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
      
      // 리다이렉트 URL 결정
      const redirectUrl = getRedirectUrl();
      console.log('✅ 회원가입 완료, 리다이렉트 URL:', redirectUrl);
      
      // 쿠키 정리
      clearRedirectCookies();
      
      console.log('🚀 페이지 이동:', redirectUrl);
      router.push(redirectUrl);
      
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