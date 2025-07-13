import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import {apiClient} from "@/shared/lib/apiClient";
import * as process from "process";

export default function useLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const router = useRouter();
  
  const handleSubmit = async (e: React.FormEvent) => {
    // e.preventDefault();
    // setLoading(true);
    // setError('');
    //
    // try {
    //   await login(email, password);
    //   router.push('/dashboard');
    // } catch (err) {
    //   setError('로그인에 실패했습니다.');
    // } finally {
    //   setLoading(false);
    // }
  };
  
  const handleKakaoLogin = async () => {
    setLoading(true);
    setError('');
    // const res = await apiClient.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/oauth2/authorization/Kakao`)
    // console.log("res login", res)
    // 로딩 상태를 localStorage에 저장 (페이지 이동 후에도 유지)
    // window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}/login`;
    window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}/oauth2/authorization/kakao`;
    // window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=6384e2942c8c3b16be31510c15d29d67&redirect_uri=http://localhost:3000/login/redirect&response_type=code`;
  };

// 컴포넌트 마운트 시 로딩 상태 복원
  useEffect(() => {
    const isKakaoLoading = localStorage.getItem('kakaoLoginLoading');
    if (isKakaoLoading === 'true') {
      setLoading(true);
      localStorage.removeItem('kakaoLoginLoading');
    }
  }, []);
  
  return {
    email, setEmail,
    password, setPassword,
    error, setError,
    loading, setLoading,
    handleSubmit,
    handleKakaoLogin,
  }
}