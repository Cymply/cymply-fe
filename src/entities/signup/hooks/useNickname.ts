// hooks/useNickname.ts
import { useAtom } from 'jotai'
import { nicknameAtom, nicknameValidationAtom, canProceedAtom } from '@/store/signupStore'
import {NicknameInputStatus, NicknameState} from "@/entities/signup/model/types";
import {useEffect, useState} from "react";
import {checkNicknameDuplicate, validateNickname} from "@/utils/nicknameUtils";
import * as process from "process";

/**
 * 닉네임 상태 관리 훅
 */
export default function useNickname() {
  const [nickname,setNickname] = useAtom(nicknameAtom)
  const [validation, setValidation] = useAtom(nicknameValidationAtom)
  const [canProceed] = useAtom(canProceedAtom)
  const [debounceTimer, setDebounceTimer] = useState<number | null>(null)
  
  const updateNickname = (value: string) => {
    setNickname(value)
  }
  
  const updateValidation = (validation: Partial<NicknameState>) => {
    setValidation(prev => ({ ...prev, ...validation }))
  }
  
  const resetNickname = () => {
    setNickname('')
    setValidation({
      isValid: false,
      isDuplicate: false,
      isChecking: false,
      errorMessage: ''
    })
  }
  
  /**
   * 닉네임 입력 핸들러
   */
  const handleNicknameChange = (value: string) => {
    updateNickname(value)
    
    // 기본 유효성 검사
    const basicValidation = validateNickname(value)
    
    if (!basicValidation.isValid) {
      updateValidation({
        isValid: false,
        isDuplicate: false,
        isChecking: false,
        errorMessage: basicValidation.errorMessage
      })
      return
    }
    
    // 디바운스로 중복 체크
    if (debounceTimer) {
      clearTimeout(debounceTimer)
    }
    
    updateValidation({
      isChecking: true,
      errorMessage: ''
    })
    
    const timer = setTimeout(() => {
      checkNicknameDuplicate(value)
        .then((isDuplicate) => {
          updateValidation({
            isValid: !isDuplicate,
            isDuplicate,
            isChecking: false,
            errorMessage: isDuplicate ? '중복된 별명입니다.' : ''
          })
        })
        .catch(() => {
          updateValidation({
            isValid: false,
            isDuplicate: false,
            isChecking: false,
            errorMessage: '닉네임 확인 중 오류가 발생했습니다.'
          })
        })
    }, 500)
    
    setDebounceTimer(timer)
  }
  
  
  /**
   * 입력 상태 계산
   */
  const getInputStatus = (): NicknameInputStatus => {
    if (validation.isChecking) return 'checking'
    if (validation.isDuplicate) return 'duplicate'
    if (validation.isValid && nickname.trim()) return 'valid'
    if (validation.errorMessage) return 'error'
    return 'default'
  }
  
  // 컴포넌트 언마운트 시 타이머 정리
  useEffect(() => {
    return () => {
      if (debounceTimer) {
        clearTimeout(debounceTimer)
      }
    }
  }, [debounceTimer])
  
  // 입력값 상태
  const inputStatus = getInputStatus()
  
  return {
    nickname,
    validation,
    canProceed,
    inputStatus,
    handleNicknameChange,
    isValid: validation.isValid,
    isDuplicate: validation.isDuplicate,
    isChecking: validation.isChecking,
    errorMessage: validation.errorMessage,
    isEmpty: nickname.trim().length === 0,
  }
}