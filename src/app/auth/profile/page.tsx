// app/profile/page.tsx

'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {useAuthStore} from "@/store/authStore";
import {useUserProfile} from "@/components/hooks/useUserProfile";
import ProtectedRoute from "@/app/auth/AuthInitializer/ProtectedRoute";

;

export default function ProfilePage() {
  const user = useAuthStore(state => state.user);
  const { profile, loading, error, updateProfile } = useUserProfile();
  const [username, setUsername] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const router = useRouter();
  
  // 프로필 정보로 폼 초기화
  useEffect(() => {
    if (profile) {
      setUsername(profile["user_nm"] || '');
    }
  }, [profile]);
  
  // 프로필 업데이트 처리
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    
    try {
      await updateProfile({
        "user_nm" : username,
      });
      
      alert('프로필이 업데이트되었습니다.');
    } catch (error) {
      console.error('프로필 업데이트 오류:', error);
      alert('프로필 업데이트 실패: ' + (error as Error).message);
    } finally {
      setIsUpdating(false);
    }
  };
  
  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-md">
          <h1 className="text-2xl font-bold text-center">내 프로필</h1>
          
          {loading ? (
            <div className="text-center">로딩 중...</div>
          ) : error ? (
            <div className="text-red-500 text-center">오류: {error.message}</div>
          ) : (
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  이메일
                </label>
                <input
                  id="email"
                  type="email"
                  disabled
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 text-gray-600"
                  value={user?.email || ''}
                />
              </div>
              
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  사용자명
                </label>
                <input
                  id="username"
                  type="text"
                  className="text-gray-200 mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => router.push('/dashboard')}
                  className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  돌아가기
                </button>
                
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {isUpdating ? '업데이트 중...' : '저장하기'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}