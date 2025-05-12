// app/store/authStore.ts

import { create } from 'zustand';
import { createClient } from '@supabase/supabase-js';

// 환경 변수에서 Supabase URL과 API 키를 가져옵니다.
// .env.local 파일에 이 값들을 설정해야 합니다.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Supabase 클라이언트 생성
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// User 타입 정의
type User = {
  id: string;
  email: string;
  created_at?: string;
};

// Auth Store 상태 타입 정의
type AuthState = {
  user: User | null;
  initialized: boolean;
  loading: boolean;
  initialize: () => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithKaKao: () => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

// Zustand 스토어 생성
export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  initialized: false,
  loading: true,
  
  // 인증 상태 초기화
  initialize: async () => {
    try {
      set({ loading: true });
      
      // 현재 세션 가져오기
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        throw error;
      }
      
      if (session?.user) {
        // 사용자 정보 설정
        set({
          user: {
            id: session.user.id,
            email: session.user.email || '',
          },
          initialized: true,
          loading: false,
        });
      } else {
        set({ user: null, initialized: true, loading: false });
      }
      
      // 인증 상태 변경 리스너 설정
      const { data: { subscription } } = await supabase.auth.onAuthStateChange(
        async (event, session) => {
          if (session?.user) {
            set({
              user: {
                id: session.user.id,
                email: session.user.email || '',
              },
              loading: false,
            });
          } else {
            set({ user: null, loading: false });
          }
        }
      );
      
      // 클린업 함수 설정 (React 컴포넌트에서 사용할 경우 useEffect 클린업에서 호출)
      return () => {
        subscription.unsubscribe();
      };
    } catch (error) {
      console.error('인증 초기화 오류:', error);
      set({ user: null, initialized: true, loading: false });
    }
  },
  
  // 로그인 함수
  signIn: async (email: string, password: string) => {
    try {
      set({ loading: true });
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        throw error;
      }
      
      set({
        user: data.user ? {
          id: data.user.id,
          email: data.user.email || '',
        } : null,
        loading: false,
      });
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },
  
  // 카카오 로그인 함수
  signInWithKaKao: async () => {
    try {
      set({ loading: true });
      
      // Supabase Kakao OAuth 로그인 실행
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "kakao",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        },
      });
      
      if (error) {
        throw error;
      }
      
      // 여기서는 실제 로그인 완료 처리를 하지 않습니다.
      // 리다이렉트가 발생하기 때문에 콜백에서 처리됩니다.
      return;
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },
  
  // 회원가입 함수
  signUp: async (email: string, password: string) => {
    try {
      set({ loading: true });
      
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          data: {
            user_nanme: "",
            profile_img: "",
          }
        }
      })
      
      if (error) {
        throw error;
      }
      
      // 이메일 확인이 필요한 경우 사용자는 null이 될 수 있습니다.
      set({
        user: data.user ? {
          id: data.user.id,
          email: data.user.email || '',
        } : null,
        loading: false,
      });
    } catch (error) {
      console.log("error", error)
      set({ loading: false });
      throw error;
    }
  },
  
  // 로그아웃 함수
  signOut: async () => {
    try {
      set({ loading: true });
      
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        throw error;
      }
      
      set({ user: null, loading: false });
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },
}));