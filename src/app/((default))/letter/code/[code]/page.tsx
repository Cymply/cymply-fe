//app/((default))/letter/code/[code]/page.tsx
'use client'

import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/shared/hooks/useAuth';
import { useAtom } from 'jotai';
import {recipientCodeAtom, recipientUrlAtom} from "@/entities/letter";
import { TokenManager } from '@/shared/lib/tokenManager';

export default function LetterCodePage() {
  const router = useRouter();
  const params = useParams();
  const { isAuthenticated, isLoading } = useAuth();
  const [, setRecipientCode] = useAtom(recipientCodeAtom);
  const code = params.code as string;
  const [, setRecipientUrl] = useAtom(recipientUrlAtom);
  
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
    
    // 쿠키에서도 recipientCode 확인하여 atom에 저장 (미들웨어에서 설정된 경우)
    const cookieCode = getCookie('recipientCode');
    if (cookieCode) {
      setRecipientCode(cookieCode);
      console.log('✅ 쿠키에서 recipientCode atom에 저장:', cookieCode);
      
      // atom에 저장했으므로 쿠키에서 제거
      document.cookie = 'recipientCode=; path=/; max-age=0';
      console.log('🗑️ recipientCode 쿠키 제거 완료');
    }
    
    // 로딩 중이면 대기
    if (isLoading) {
      return;
    }
    
    // 토큰 직접 체크 - useAuth보다 우선
    const accessToken = TokenManager.getAccessToken();
    
    console.log('🔍 LetterCodePage 상태:');
    console.log('- URL code:', code);
    console.log('- Cookie code:', cookieCode);
    console.log('- accessToken 존재:', !!accessToken);
    console.log('- isAuthenticated:', isAuthenticated);
    
    // accessToken이 있으면 무조건 로그인된 것으로 처리
    if (accessToken) {
      console.log('✅ accessToken 존재 - /search로 이동');
      router.push('/search');
      return;
    }
    
    // accessToken이 정말 없는 경우에만 로그인 필요
    // 이때 미들웨어가 자동으로 쿠키에 recipientCode 저장할 예정
    console.log('❌ accessToken 없음 - /login으로 리다이렉트 (미들웨어가 쿠키 저장할 예정)');
    router.push('/login');
    
  }, [code, isLoading, router, setRecipientCode]);
  
  // 현재 상태를 화면에도 표시
  const accessToken = TokenManager.getAccessToken();
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
            <div>Loading: {isLoading ? 'Yes' : 'No'}</div>
            <div>Authenticated: {isAuthenticated ? 'Yes' : 'No'}</div>
            <div>Has Token: {accessToken ? 'Yes' : 'No'}</div>
          </div>
        )}
      </div>
    </div>
  );
}