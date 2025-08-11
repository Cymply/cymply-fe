// src/features/signup/ui/SignupFooter.tsx
"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import useSignupForm from "@/features/signup/model/useSignupForm";
import Link from "next/link";

export default function SignupFooter() {
  const { canProceed, validation, handleSubmit, handleNext, isSignupNickname } = useSignupForm();

  return (
    <div className="flex flex-col space-y-6">
      {isSignupNickname ? (
        <Button
          onClick={handleSubmit}
          // disabled={!canProceed}
          className={cn(
            "w-[42.375rem] h-[7.5rem] bg-primary rounded-[0.625rem] text-white text-[2rem] font-semibold leading-9 hover:bg-primary transition-all duration-200"
          )}
        >
          {validation.isChecking ? "확인 중..." : "회원가입 하기"}
        </Button>
      ) : (
        <div className="flex flex-col gap-12">
          <Button
            onClick={handleNext}
            // disabled={!canProceed}
            className={cn(
              "w-[42.375rem] h-[7.5rem] rounded-[0.625rem] text-[2rem] font-semibold leading-9 transition-all duration-200",
              canProceed
                ? "bg-primary hover:bg-primary text-white"
                : "bg-black-200 text-white cursor-not-allowed hover:bg-gray-200"
            )}
          >
            다음
          </Button>
          {/* nickname 페이지가 아닐 때만 "제공하지 않고 넘어가기" 링크 표시 */}
          <Link
            href={`/signup/nickname`}
            className="text-center text-black-200 text-[2rem] font-normal underline leading-9"
          >
            제공하지 않고 넘어가기
          </Link>
        </div>
      )}
    </div>
  );
}
