// src/features/signup/model/useSignupForm.ts
'use client'

import { useAtom } from 'jotai'
import { useRouter, useSearchParams } from 'next/navigation'
import { genderAtom, ageGroupAtom, formValidAtom } from "@/store/signupStore"
import { useState } from 'react'

export default function useSignupForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [gender] = useAtom(genderAtom)
  const [ageGroup] = useAtom(ageGroupAtom)
  const [canProceed] = useAtom(formValidAtom)
  const [validation, setValidation] = useState({
    isChecking: false,
    isValid: false
  })
  
  // 현재 페이지가 닉네임 페이지인지 확인
  const isSignupNickname = searchParams.get('step') === 'nickname'
  
  const handleNext = () => {
    if (canProceed) {
      // 다음 단계로 이동 (닉네임 입력 페이지 등)
      router.push('/signup/nickname')
    }
  }
  
  const handleSubmit = async () => {
    try {
      setValidation(prev => ({ ...prev, isChecking: true }))
      
      // 회원가입 API 호출
      const signupData = {
        gender,
        ageGroup,
        // 기타 필요한 데이터들
      }
      
      console.log('회원가입 데이터:', signupData)
      
      // API 호출 후 성공 시 처리
      // await signupAPI(signupData)
      
      setValidation({ isChecking: false, isValid: true })
      
      // 회원가입 완료 후 리다이렉트
      router.push('/signup/complete')
      
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