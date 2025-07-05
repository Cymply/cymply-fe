// src/features/signup/ui/SignupFooter.tsx
'use client'

import { Button } from '@/components/ui/button'
import { cn } from "@/lib/utils"
import useSignupForm from "@/features/signup/model/useSignupForm"
import Link from "next/link";
import * as process from "process";

export default function SignupFooter() {
  const {
    canProceed,
    validation,
    handleSubmit,
    handleNext,
    isSignupNickname
  } = useSignupForm()
  
  return (
    <div className="flex flex-col">
      {isSignupNickname ? (
        <Button
          onClick={
            handleSubmit
          }
          // disabled={!canProceed}
          className={cn(
            "w-full h-28 rounded-[10px] text-3xl font-semibold font-['Pretendard'] transition-all duration-200 bg-gray-200 text-gray-400 cursor-not-allowed hover:bg-gray-200"
          )}
        >
          {validation.isChecking ? '확인 중...' :"회원가입 하기"}
        </Button>
      ) : (
        <>
          <Button
            onClick={
              handleNext
            }
            // disabled={!canProceed}
            className={cn(
              "w-full h-28 rounded-[10px] text-3xl font-semibold font-['Pretendard'] transition-all duration-200",
              canProceed
                ? 'bg-black hover:bg-gray-800 text-white'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed hover:bg-gray-200'
            )}
          >
            다음
          </Button>
          <Link href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/signup/nickname`} className={"left-[236px] top-[1528px] text-center justify-center text-neutral-400 text-xl font-normal font-['Pretendard'] underline leading-9"}>
            제공하지 않고 넘어가기
          </Link>
        </>
      )}
    </div>
  )
}
