// shared/lib/apiClient.ts
import axios, { AxiosResponse, InternalAxiosRequestConfig, AxiosError } from "axios";
import { TokenManager, TokenPair } from "./tokenManager";

// Axios 인스턴스 생성
export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080",
  timeout: 10000,
  headers: {
    "Content-Type": `application/json;charset=UTF-8`,
  },
});

// 토큰 재발급 중인지 확인하는 플래그
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: any) => void;
}> = [];

// 대기 중인 요청들을 처리하는 함수
const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve(token!);
    }
  });

  failedQueue = [];
};

// 토큰 재발급 함수
const refreshTokens = async (): Promise<string> => {
  const refreshToken = TokenManager.getRefreshToken();
  console.log("리프레시 토큰 있냐", refreshToken)

  if (!refreshToken) {
    throw new Error("No refresh token available");
  }

  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/token/refresh`, refreshToken, {
      }
    );
    console.log("response refresh", response)
    const { accessToken, refreshToken: newRefreshToken } = response.data;

    // 새 토큰들 저장 (accessToken은 쿠키, refreshToken은 sessionStorage)
    TokenManager.setTokens({
      accessToken,
      refreshToken: newRefreshToken,
    });
    
    console.log("🔄 토큰 재발급 완료");
    return accessToken;
  } catch (error) {
    console.error("❌ 토큰 재발급 실패:", error);
    TokenManager.clearTokens();

    // 로그인 페이지로 리다이렉트
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
    throw error;
  }
};

// 요청 인터셉터 - Authorization 헤더에 토큰 추가
apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = TokenManager.getAccessToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// 응답 인터셉터 - 토큰 만료 시 재발급 처리
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    // 401 에러이고 아직 재시도하지 않은 경우
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // 이미 토큰을 재발급 중이면 대기열에 추가
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return apiClient(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const newToken = await refreshTokens();
        processQueue(null, newToken);

        // 원래 요청에 새 토큰 설정하고 재시도
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        TokenManager.clearTokens();

        // 로그인 페이지로 리다이렉트
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

// 인증 상태 확인 함수
// shared/lib/apiClient.ts - checkAuthStatus 함수 수정
export const checkAuthStatus = async (): Promise<boolean> => {
  try {
    if (typeof window === 'undefined') return false;
    
    const accessToken = TokenManager.getAccessToken();
    const refreshToken = TokenManager.getRefreshToken();
    
    // accessToken이 있으면 API 호출로 유효성 검증
    if (accessToken) {
      console.log('✅ AccessToken 있음, API 호출로 검증');
      try {
        const response = await apiClient.get("/api/v1/users/me");
        return response.status === 200;
      } catch (error: any) {
        // 401 에러면 토큰이 만료된 것이므로 refreshToken으로 재발급 시도
        if (error.response?.status === 401 && refreshToken) {
          console.log('🔄 AccessToken 만료, RefreshToken으로 재발급 시도');
          try {
            const newAccessToken = await refreshTokens();
            console.log('✅ 토큰 재발급 성공');
            return true;
          } catch (refreshError) {
            console.error('❌ 토큰 재발급 실패:', refreshError);
            return false;
          }
        }
        return false;
      }
    }
    
    // accessToken이 없지만 refreshToken이 있으면 재발급 시도
    if (!accessToken && refreshToken) {
      console.log('🔄 AccessToken 없음, RefreshToken으로 재발급 시도');
      try {
        const newAccessToken = await refreshTokens();
        console.log('✅ 토큰 재발급 성공');
        return true;
      } catch (error) {
        console.error('❌ 토큰 재발급 실패:', error);
        return false;
      }
    }
    
    // 둘 다 없으면 인증되지 않은 상태
    console.log('❌ AccessToken과 RefreshToken 모두 없음');
    return false;
    
  } catch (error) {
    console.error("❌ 인증 상태 확인 실패:", error);
    return false;
  }
};
