// app/((default))/signup/step0/page.tsx
"use client";

import { Suspense } from "react";
import { useSignupRedirectWithErrorHandling } from "@/app/((default))/signup/model/useSignupRedirectWithErrorHandling";
import { LoadingSpinner } from "@/shared/ui";

function SignupStep0Content() {
  const { isProcessing, error } = useSignupRedirectWithErrorHandling();

  // 에러가 있는 경우 에러 화면 표시
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center max-w-md p-8 bg-white rounded-lg shadow-lg">
          <div className="text-red-500 text-6xl mb-6">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">로그인 처리 실패</h2>
          <p className="text-gray-600 mb-6 leading-relaxed">{error}</p>
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
            <span>잠시 후 로그인 페이지로 이동합니다...</span>
          </div>
        </div>
      </div>
    );
  }

  // 처리 중인 경우 로딩 화면 표시
  return <LoadingSpinner />;
}

export default function SignupStep0() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <SignupStep0Content />
    </Suspense>
  );
}
