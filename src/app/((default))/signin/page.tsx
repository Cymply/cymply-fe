'use client'

import {Suspense} from "react";
import {useSignupRedirectWithErrorHandling} from "@/app/((default))/signup/model/useSignupRedirectWithErrorHandling";
import useSigninRedirect from "@/app/((default))/signup/model/useSigninRedirect";
import {LoadingSpinner} from "@/shared/ui";

function SigninContent() {
  const { isProcessing } = useSigninRedirect();

  
  // 처리 중인 경우 로딩 화면 표시
  return <LoadingSpinner />;
}

export default function Signin() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">페이지를 불러오는 중...</p>
        </div>
      </div>
    }>
      <SigninContent/>
    </Suspense>
  );
}