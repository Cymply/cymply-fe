// store/signupStore.ts
import { atom } from 'jotai'
import {NicknameState} from "@/entities/signup/model/types";

// 닉네임 입력값 atom
export const nicknameAtom = atom<string>('')

// 닉네임 검증 상태 atom
export const nicknameValidationAtom = atom<NicknameState>({
  isValid: false,
  isDuplicate: false,
  isChecking: false,
  errorMessage: ''
})

// 읽기 전용 atom - 진행 가능 여부
export const canProceedAtom = atom((get) => {
  const nickname = get(nicknameAtom)
  const validation = get(nicknameValidationAtom)
  
  return validation.isValid &&
    !validation.isDuplicate &&
    !validation.isChecking &&
    nickname.trim().length > 0
})

export const birthdayAtom = atom<string>('')

export const genderAtom = atom<'M' | 'F' | null>(null)
