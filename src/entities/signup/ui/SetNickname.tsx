// src/entities/signup/ui/SetNickname.tsx (수정된 버전)
'use client'

import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

import { validateNickname, checkNicknameDuplicate } from '@/utils/nicknameUtils'
import { NicknameInputStatus } from "@/entities/signup/model/types"
import useNickname from "@/entities/signup/hooks/useNickname";

export default function SetNickname() {
  const {
    nickname,
    validation,
    inputStatus,
    handleNicknameChange,
  } = useNickname();
  return (
    <div className="space-y-6">
      {/* 닉네임 입력 필드 */}
      <div className="relative">
        <div className="w-full h-28 rounded-[10px] border border-zinc-400 relative">
          <Input
            type="text"
            placeholder="편지를 작성하고 받을 별명을 정해주세요"
            value={nickname}
            onChange={(e) => handleNicknameChange(e.target.value)}
            className={cn(
              "w-full h-full !text-3xl font-normal font-['Pretendard'] leading-9 border-0 rounded-[10px] bg-transparent px-6",
              "placeholder:text-zinc-400 placeholder:text-3xl focus-visible:ring-0 focus-visible:ring-offset-0",
              inputStatus === 'valid' && 'text-black',
              inputStatus === 'duplicate' && 'text-black',
              inputStatus === 'error' && 'text-black'
            )}
            maxLength={12}
          />
          
          {/* 상태 아이콘 */}
          <div className="absolute right-6 top-1/2 transform -translate-y-1/2">
            {validation.isChecking && (
              <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
            )}
            {inputStatus === 'valid' && (
              <CheckCircle2 className="h-8 w-8 text-green-500" />
            )}
            {(inputStatus === 'duplicate' || inputStatus === 'error') && (
              <XCircle className="h-8 w-8 text-red-500" />
            )}
          </div>
        </div>
      </div>
      
      {/* 안내 텍스트 */}
      <div className="space-y-3">
        {/* 주의사항 */}
        <div className="text-black text-3xl font-normal font-['Pretendard'] leading-9">
          별명은 한번 정하면 바꿀 수 없어요!
        </div>
        
        {/* 에러 메시지 (중복된 별명) */}
        {validation.isDuplicate && (
          <div className="text-zinc-400 text-3xl font-normal font-['Pretendard'] leading-9">
            * 중복된 별명입니다.
          </div>
        )}
        
        {/* 기타 에러 메시지 */}
        {validation.errorMessage && !validation.isDuplicate && (
          <div className="text-zinc-400 text-3xl font-normal font-['Pretendard'] leading-9">
            * {validation.errorMessage}
          </div>
        )}
        
        {/* 성공 메시지 */}
        {inputStatus === 'valid' && (
          <div className="text-green-500 text-3xl font-normal font-['Pretendard'] leading-9">
            * 사용 가능한 별명입니다.
          </div>
        )}
        
        {/*/!* 사용 가능한 문자 안내 *!/*/}
        {/*<div className="text-zinc-400 text-3xl font-normal font-['Pretendard'] leading-9">*/}
        {/*  * 영어 대소문자, 한글, _, #, !만 사용 가능합니다.*/}
        {/*</div>*/}
      </div>
    </div>
  )
}