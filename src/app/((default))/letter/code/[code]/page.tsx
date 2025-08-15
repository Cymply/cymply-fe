//app/((default))/letter/code/[code]/page.tsx
'use client'

import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAtom } from 'jotai';
import { recipientCodeAtom } from "@/entities/letter";

export default function LetterCodePage() {
  const router = useRouter();
  const params = useParams();
  const [, setRecipientCode] = useAtom(recipientCodeAtom);
  const code = params.code as string;
  
  // 쿠키 헬퍼 함수
  const getCookie = (name: string): string | null => {
    if (typeof window === 'undefined') return null;
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      const cookieValue = parts.pop()?.split(';').shift() || null;
      return cookieValue ? decodeURIComponent(cookieValue) : null;
    }
    return null;
  };
  
  useEffect(() => {
    // 코드가 유효하지 않은 경우 메인으로 리다이렉트
    if (!code) {
      console.log('❌ 코드가 없어서 메인으로 리다이렉트');
      router.push('/main');
      return;
    }
    
    // URL의 code를 atom에 저장
    setRecipientCode(code);
    console.log('✅ URL에서 recipientCode atom에 저장:', code);
    
    // 쿠키에서도 recipientCode 확인하여 atom에 저장 (middleware에서 설정된 경우)
    const cookieCode = getCookie('recipientCode');
    if (cookieCode) {
      setRecipientCode(cookieCode);
      console.log('✅ 쿠키에서 recipientCode atom에 저장:', cookieCode);
    }
    
    // 이 페이지는 middleware에서 이미 리다이렉트 처리되므로
    // 실제로는 이 코드가 실행되지 않을 수 있음
    console.log('🔍 LetterCodePage 렌더링 - middleware에서 처리되지 않은 경우');
    
  }, [code, router, setRecipientCode]);
  
  // 현재 상태를 화면에도 표시
  const cookieCode = getCookie('recipientCode');
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center p-8 max-w-md">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary mx-auto mb-6"></div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          편지 페이지로 이동 중...
        </h2>
        <p className="text-gray-600 mb-4">
          잠시만 기다려주세요.
        </p>
        
        {/* 디버깅 정보 표시 (개발 환경에서만) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="text-left text-xs text-gray-500 bg-gray-100 p-4 rounded mt-4">
            <div>URL Code: {code}</div>
            <div>Cookie Code: {cookieCode || 'None'}</div>
            <div>Middleware가 이미 처리했을 가능성이 높습니다.</div>
          </div>
        )}
      </div>
    </div>
  );
}