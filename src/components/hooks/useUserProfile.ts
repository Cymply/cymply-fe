// app/hooks/useUserProfile.ts
import { useState, useEffect } from 'react';
import { supabase } from '../../../../cymply-test/app/store/authStore';
import { useAuthStore } from '../../../../cymply-test/app/store/authStore';

// 사용자 프로필 타입 정의
export type UserProfile = {
  id: string;
  user_id: string;
  user_nm?: string;
  profile_img?: string;
  updated_at?: string;
};

export const useUserProfile = () => {
  const user = useAuthStore(state => state.user);
  const [loading, setLoading] = useState<boolean>(true);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [error, setError] = useState<Error | null>(null);
  
  // 사용자 프로필 불러오기
  const fetchProfile = async () => {
    try {
      setLoading(true);
      
      if (!user) {
        setProfile(null);
        return;
      }
      
      
      // 사용자 테이블에서 프로필 데이터 가져오기
      const { data, error } = await supabase
        .from('userinfo')
        .select('*')
        .eq('id', user.id)
        .single();
      
      if (error) {
        throw error;
      }
      
      if (data) {
        setProfile(data as UserProfile);
      } else {
        // 프로필이 없으면 새로 생성
        await createProfile();
      }
    } catch (err) {
      console.error('프로필 불러오기 오류:', err);
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setLoading(false);
    }
  };
  
  // 프로필 생성
  const createProfile = async () => {
    try {
      if (!user) return;
      
      const newProfile = {
        user_id: user.id,
        user_nm: user.email?.split('@')[0] || '',
        full_name: '',
        profile_img: '',
        updated_at: new Date().toISOString(),
      };
      
      const { data, error } = await supabase
        .from('userinfo')
        .insert([newProfile])
        .select()
        .single();
      
      if (error) {
        throw error;
      }
      
      setProfile(data as UserProfile);
    } catch (err) {
      console.error('프로필 생성 오류:', err);
      setError(err instanceof Error ? err : new Error(String(err)));
    }
  };
  
  // 프로필 업데이트
  const updateProfile = async (updates: Partial<UserProfile>) => {
    try {
      setLoading(true);
      
      if (!user || !profile) return;
      
      // 업데이트할 데이터 설정
      const updatedData = {
        ...updates,
        updated_at: new Date().toISOString(),
      };
      
      const { data, error } = await supabase
        .from('userinfo')
        .update(updatedData)
        .eq('id', user.id)
        .select()
        .single();
      
      if (error) {
        throw error;
      }
      
      setProfile(data as UserProfile);
    } catch (err) {
      console.error('프로필 업데이트 오류:', err);
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setLoading(false);
    }
  };
  
  // 사용자가 변경될 때 프로필 다시 불러오기
  useEffect(() => {
    fetchProfile();
  }, [user?.id]);
  
  return {
    profile,
    loading,
    error,
    fetchProfile,
    updateProfile,
  };
};