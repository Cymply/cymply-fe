// src/features/signup/ui/SignupFooter.tsx
'use client'

import { Button } from '@/components/ui/button'
import { cn } from "@/lib/utils"
import useSignupForm from "@/features/signup/model/useSignupForm"
import Link from "next/link"

export default function SignupFooter() {
  const {
    canProceed,
    validation,
    handleSubmit,
    handleNext,
    isSignupNickname
  } = useSignupForm()
  
  return (
    <div className="flex flex-col space-y-6">
      {isSignupNickname ? (
        <Button
          onClick={handleSubmit}
          // disabled={!canProceed}
          className={cn(
            "w-[678px] h-28 bg-amber-400 rounded-[10px] text-white text-3xl font-semibold font-['Pretendard'] leading-9 hover:bg-amber-500 transition-all duration-200"
          )}
        >
          {validation.isChecking ? '확인 중...' : "회원가입 하기"}
        </Button>
      ) : (
        <>
          <Button
            onClick={handleNext}
            // disabled={!canProceed}
            className={cn(
              "w-[678px] h-28 rounded-[10px] text-3xl font-semibold font-['Pretendard'] leading-9 transition-all duration-200",
              canProceed
                ? 'bg-amber-400 hover:bg-amber-500 text-white'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed hover:bg-gray-200'
            )}
          >
            다음
          </Button>
          {/* nickname 페이지가 아닐 때만 "제공하지 않고 넘어가기" 링크 표시 */}
          <Link
            href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/signup/nickname`}
            className="text-center text-neutral-400 text-3xl font-normal font-['Pretendard'] underline leading-9"
          >
            제공하지 않고 넘어가기
          </Link>
        </>
      )}
    </div>
  )
}