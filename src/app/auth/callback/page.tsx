'use client'

// app/auth/callback/page.tsx
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../store/authStore';

export default function AuthCallbackPage() {
  const router = useRouter();
  
  useEffect(() => {
    // OAuth 콜백 처리 함수
    const handleAuthCallback = async () => {
      // URL의 해시 파라미터 가져오기
      const hashParams = window.location.hash;
      
      try {
        // Supabase가 자동으로 URL의 해시 파라미터를 처리
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          throw error;
        }
        
        // 로그인 성공 시 대시보드로 리다이렉트
        router.push('/dashboard');
      } catch (error) {
        console.error('Auth callback error:', error);
        router.push('/login?error=AuthCallbackError');
      }
    };
    
    handleAuthCallback();
  }, [router]);
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-md text-center">
        <h2 className="text-2xl font-bold">로그인 처리 중...</h2>
        <p>잠시만 기다려주세요.</p>
        <div className="mt-4">
          <div className="w-12 h-12 rounded-full border-4 border-blue-500 border-t-transparent mx-auto animate-spin"></div>
        </div>
      </div>
    </div>
  );
}