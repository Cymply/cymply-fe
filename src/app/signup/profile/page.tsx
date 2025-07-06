//src/app/signup/profile/page.tsx
"use client"

import SignupView from "@/widgets/signup/ui/SignupView";
import SignupHeader from "@/features/signup/ui/SignupHeader";
import SignupFooter from "@/features/signup/ui/SignupFooter";
import SignupProfileForm from "@/features/signup/ui/SignupProfileForm";
import {useRouter, useSearchParams} from "next/navigation";

export default function SignupProfilePage() {
  const searchParams = useSearchParams();

  
  return (
    <SignupView
      header={
        <SignupHeader
          title={"윤슬에 오신 것을 환영해요"}
          desc={"정보 제공 쿠션멘트"}
        />
      }
      footer={
        <SignupFooter/>
      }
    >
      <SignupProfileForm />
    </SignupView>
  )
}