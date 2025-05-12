'use client'

// app/auth/AuthInitializer/ProtectedRoute.tsx
import { useRouter } from 'next/navigation'; // Change this import
import { useEffect } from 'react';
import {useAuthStore} from "@/store/authStore";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const user = useAuthStore(state => state.user);
  const loading = useAuthStore(state => state.loading);
  const initialized = useAuthStore(state => state.initialized);
  const router = useRouter();
  
  useEffect(() => {
    if (initialized && !loading && !user) {
      router.push('/login');
    }
  }, [user, loading, initialized, router]);
  
  if (loading || !initialized) {
    return <div>로딩 중...</div>;
  }
  
  return user ? <>{children}</> : null;
}