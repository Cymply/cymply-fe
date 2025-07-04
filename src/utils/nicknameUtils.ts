// utils/nicknameUtils.ts

import {NicknameValidationResult} from "@/entities/signup/model/types";
import {apiClient} from "@/shared/lib/apiClient";
import process from "process";
import axios from "axios";

/**
 * 닉네임 기본 유효성 검사
 * @param nickname 검사할 닉네임
 * @returns 검증 결과 객체
 */
export const validateNickname = (nickname: string): NicknameValidationResult => {
  // 빈 값 체크
  if (!nickname.trim()) {
    return { isValid: false, errorMessage: '닉네임을 입력해주세요.' }
  }
  
  // 최소 길이 체크
  if (nickname.length < 2) {
    return { isValid: false, errorMessage: '닉네임은 2자 이상이어야 합니다.' }
  }
  
  // 최대 길이 체크
  if (nickname.length > 12) {
    return { isValid: false, errorMessage: '닉네임은 12자 이하여야 합니다.' }
  }
  
  // 허용 문자 체크: 영어 대소문자, 한글, _, #, ! 만 허용
  const allowedPattern = /^[a-zA-Z가-힣_#!]+$/
  if (!allowedPattern.test(nickname)) {
    return { isValid: false, errorMessage: '영어 대소문자, 한글, _, #, !만 사용 가능합니다.' }
  }
  
  return { isValid: true, errorMessage: '' }
}

/**
 * 실제 백엔드 API를 통한 닉네임 중복 체크
 * @param nickname 중복 체크할 닉네임
 * @returns Promise<boolean> 중복 여부
 */
export const checkNicknameDuplicate = async (nickname: string): Promise<boolean> => {
  try {
    const response = await apiClient.get(`/api/v1/users/check/nickname/${nickname}`)
    console.log("response nickname", response.data)
    // 응답 데이터 구조에 따라 조정 필요
    // 예: { isDuplicate: boolean } 또는 { available: boolean }
    return response.data.isDuplicate || false
    
  } catch (error) {
    console.error('닉네임 중복 체크 API 오류:', error)
    throw new Error('닉네임 확인 중 오류가 발생했습니다.')
  }
}

/**
 * 닉네임 중복 체크 시뮬레이션 (개발/테스트용)
 * @param nickname 중복 체크할 닉네임
 * @returns Promise<boolean> 중복 여부
 */
export const checkNicknameDuplicateMock = (nickname: string): Promise<boolean> => {
  return new Promise((resolve) => {
    // 시뮬레이션용 중복 닉네임 목록
    const duplicateNicknames = [
      'admin', '관리자', 'test', 'user', '사용자',
      'cymply', 'hello', '테스트', 'root', '운영자'
    ]
    
    // 백엔드 API 호출 시뮬레이션을 위한 딜레이
    setTimeout(() => {
      const isDuplicate = duplicateNicknames.includes(nickname.toLowerCase())
      resolve(isDuplicate)
    }, 800)
  })
}