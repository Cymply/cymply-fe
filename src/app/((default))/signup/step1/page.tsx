//src/app/signup/profile/page.tsx
"use client"

import SignupView from "@/widgets/signup/ui/SignupView";
import SignupHeader from "@/features/signup/ui/SignupHeader";
import SignupFooter from "@/features/signup/ui/SignupFooter";
import SignupProfileForm from "@/features/signup/ui/SignupProfileForm";
import {useRouter, useSearchParams} from "next/navigation";
import {useEffect} from "react";
import useSignupForm from "@/features/signup/model/useSignupForm";
import useSignupRedirect from "@/app/((default))/signup/model/useSignupRedirect";

export default function SignupProfilePage() {
  const searchParams = useSearchParams();
  
  useSignupRedirect();
  
  
  return (
    <SignupView
      header={
        <SignupHeader
          highlightTitle={"더 섬세한 공감"}
          title={"을 위해"}
          desc={"당신을 살짝 알려주세요"}
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