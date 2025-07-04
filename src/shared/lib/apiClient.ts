// lib/apiClient.ts
import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';

// Axios 인스턴스 생성
export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8080',
  timeout: 10000,
  withCredentials: true, // 쿠키를 자동으로 포함
  headers: {
    "Content-Type": `application/json;charset=UTF-8`,
  }
});

// 인증 상태 확인 함수
export const checkAuthStatus = async (): Promise<boolean> => {
  try {
    const response = await apiClient.get('/api/v1/auth/me');
    return response.status === 200;
  } catch (error) {
    return false;
  }
};

// 요청 인터셉터 (Authorization 헤더 제거 - 쿠키 사용하므로 불필요)
apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  // httpOnly 쿠키를 사용하므로 Authorization 헤더 설정 불필요
  // withCredentials: true로 인해 브라우저가 자동으로 쿠키 포함
  return config;
});

// 응답 인터셉터
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error) => {
  }
);