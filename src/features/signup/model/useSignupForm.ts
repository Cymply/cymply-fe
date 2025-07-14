// src/features/signup/model/useSignupForm.ts
'use client'

import { useAtom } from 'jotai'
import {usePathname, useRouter, useSearchParams} from 'next/navigation'
import {genderAtom, ageGroupAtom, formValidAtom, nicknameAtom} from "@/store/signupStore"
import { useState } from 'react'
import {signupApi} from "@/entities/signup/api/signupApi";
import {useAuth} from "@/shared/hooks/useAuth";

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
  const { login } = useAuth(); // useAuth의 login 함수 사용
  
  
  // 현재 페이지가 닉네임 페이지인지 확인 (URL 경로로 판단)
  const isSignupNickname = pathname.endsWith('/step2')
  
  const handleNext = () => {
    if (canProceed) {
      // 다음 단계로 이동 (닉네임 입력 페이지 등)
      router.push('/signup/step2')
    }
  }
  
  const handleSubmit = async () => {
    try {
      setValidation(prev => ({ ...prev, isChecking: true }))
      
      // 회원가입 API 호출
      const signupData = {
        gender : gender,
        birth : '1996-03-24',
        name : nickname,
        nickname : nickname,
      }
      
      // API 호출 후 성공 시 처리
      const res = await signupApi.signup(signupData);
      
      if (res.status !== 200) {
        throw res.statusText;
      }
      
      // 새로운 토큰 재발급
      const resToken = await signupApi.getTokenAfterSignup()

      if (resToken.status !== 200) {
        throw resToken.statusText;
      }
      const { accessToken, refreshToken } = resToken.data.data;
      
      login({accessToken, refreshToken})
      
      setValidation({ isChecking: false, isValid: true })
      
      // 회원가입 완료 후 리다이렉트
      router.push('/main')
      
    } catch (error) {
      console.error('회원가입 실패:', error)
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