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
  
  
  useEffect(() => {
    // 코드가 유효하지 않은 경우 메인으로 리다이렉트
    if (!code) {
      console.log('❌ 코드가 없어서 메인으로 리다이렉트');
      router.push('/main');
      return;
    }
    
    // 로딩 중이면 대기
    if (isLoading) {
      // console.log('⏳ 인증 상태 로딩 중...');
      return;
    }
    
    // 토큰 직접 체크 - useAuth보다 우선
    const accessToken = TokenManager.getAccessToken();
    
    console.log('🔍 LetterCodePage 상태:');
    console.log('- code:', code);
    console.log('- accessToken 존재:', !!accessToken);
    console.log('- isAuthenticated:', isAuthenticated);
    console.log('- accessToken 값:', accessToken ? `${accessToken.slice(0, 20)}...` : 'null');
    
    // accessToken이 있으면 무조건 로그인된 것으로 처리
    if (accessToken) {
      console.log('✅ accessToken 존재 - /search로 이동 (isAuthenticated 무시)');
      setRecipientCode(code);
      router.push('/search');
      return;
    }
    
    // accessToken이 정말 없는 경우에만 로그인 필요
    console.log('❌ accessToken 정말 없음 - /login으로 리다이렉트');
    router.push('/login');
    
  }, [code, isLoading, router, setRecipientCode]);
  
  // 현재 상태를 화면에도 표시
  const accessToken = TokenManager.getAccessToken();
  
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
            <div>Code: {code}</div>
            <div>Loading: {isLoading ? 'Yes' : 'No'}</div>
            <div>Authenticated: {isAuthenticated ? 'Yes' : 'No'}</div>
            <div>Has Token: {accessToken ? 'Yes' : 'No'}</div>
          </div>
        )}
      </div>
    </div>
  );
}