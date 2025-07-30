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
  const accessToken = TokenManager.getAccessToken();
  console.log("🔍 리프레시 토큰 확인:", refreshToken ? "✅ 있음" : "❌ 없음");
  
  if (!refreshToken) {
    throw new Error("No refresh token available");
  }
  
  try {
    console.log("🔄 토큰 재발급 API 호출 시작");
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/token/refresh`,
      {
        refreshToken : refreshToken
      },
    );
    
    // console.log("📡 토큰 재발급 응답:", response);
    const { accessToken, refreshToken: newRefreshToken } = response.data.data.content;
    
    if (!accessToken) {
      throw new Error("새로운 accessToken을 받지 못했습니다");
    }
    
    // TokenManager.setTokens()를 사용하여 일관된 만료시간(36000초) 적용
    // console.log("💾 새로운 토큰 저장 시작 (36000초 만료시간)");
    TokenManager.setTokens({
      accessToken,
      refreshToken: newRefreshToken,
    });
    
    // 토큰 저장 확인
    const savedToken = TokenManager.getAccessToken();
    // if (savedToken === accessToken) {
    //   console.log("✅ 토큰 재발급 및 저장 완료");
    // } else {
    //   console.log("⚠️ 토큰 저장 확인 실패");
    // }
    
    return accessToken;
  } catch (error) {
    console.error("❌ 토큰 재발급 실패:", error);
    // TokenManager.clearTokens();
    
    // 로그인 페이지로 리다이렉트
    if (typeof window !== "undefined") {
      // window.location.href = "/login";
    }
    throw error;
  }
};

// 요청 인터셉터 - Authorization 헤더에 토큰 추가
apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = TokenManager.getAccessToken();
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    // console.log("🔑 요청에 토큰 추가:", `Bearer ${token.substring(0, 20)}...`);
  } else {
    console.log("⚠️ 요청에 토큰 없음");
  }
  
  return config;
});

// 응답 인터셉터 - 토큰 만료 시 재발급 처리
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // 성공적인 응답 로깅
    console.log(`✅ API 성공: ${response.config.method?.toUpperCase()} ${response.config.url} - ${response.status}`);
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };
    
    // 401 에러이고 아직 재시도하지 않은 경우
    if (error.response?.status === 401 && !originalRequest._retry) {
      console.log("🔄 401 에러 발생, 토큰 재발급 프로세스 시작");
      
      if (isRefreshing) {
        // 이미 토큰을 재발급 중이면 대기열에 추가
        console.log("⏳ 토큰 재발급 중... 대기열에 추가");
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            console.log("🔄 대기열에서 요청 재시도");
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
        // console.log("🔄 새 토큰으로 원본 요청 재시도");
        return apiClient(originalRequest);
      } catch (refreshError) {
        console.error("❌ 토큰 재발급 완전 실패, 로그인 페이지로 이동");
        processQueue(refreshError, null);
        // TokenManager.clearTokens();
        
        // 로그인 페이지로 리다이렉트
        if (typeof window !== "undefined") {
          // window.location.href = "/login";
        }
        
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
    
    // 401이 아닌 에러 로깅
    console.error(`❌ API 에러: ${error.config?.method?.toUpperCase()} ${error.config?.url} - ${error.response?.status}`);
    return Promise.reject(error);
  }
);

// 인증 상태 확인 함수
export const checkAuthStatus = async (): Promise<boolean> => {
  try {
    if (typeof window === 'undefined') {
      console.log("❌ 서버사이드 환경에서는 인증 확인 불가");
      return false;
    }
    
    const accessToken = TokenManager.getAccessToken();
    const refreshToken = TokenManager.getRefreshToken();
    
    // console.log("🔍 토큰 상태 확인:", {
    //   accessToken: accessToken ? "✅ 있음" : "❌ 없음",
    //   refreshToken: refreshToken ? "✅ 있음" : "❌ 없음"
    // });
    
    // accessToken이 있으면 API 호출로 유효성 검증
    if (accessToken) {
      // console.log('✅ AccessToken 있음, API 호출로 검증');
      try {
        const response = await apiClient.get("/api/v1/users/me");
        // console.log('✅ 토큰 유효성 검증 성공');
        return response.status === 200;
      } catch (error: any) {
        // 401 에러면 토큰이 만료된 것이므로 refreshToken으로 재발급 시도
        if (error.response?.status === 401 && refreshToken) {
          // console.log('🔄 AccessToken 만료, RefreshToken으로 재발급 시도');
          try {
            const newAccessToken = await refreshTokens();
            // console.log('✅ 토큰 재발급 성공, 인증 상태: 유효');
            return true;
          } catch (refreshError) {
            console.error('❌ 토큰 재발급 실패:', refreshError);
            return false;
          }
        }
        console.error('❌ 토큰 검증 실패:', error.response?.status);
        return false;
      }
    }
    
    // accessToken이 없지만 refreshToken이 있으면 재발급 시도
    if (!accessToken && refreshToken) {
      // console.log('🔄 AccessToken 없음, RefreshToken으로 재발급 시도');
      try {
        const newAccessToken = await refreshTokens();
        // console.log('✅ 토큰 재발급 성공, 인증 상태: 유효');
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

// 로그아웃 함수
export const logout = async (): Promise<void> => {
  try {
    // console.log("🚪 로그아웃 API 호출");
    await apiClient.post("/api/v1/auth/logout");
  } catch (error) {
    console.error("❌ 로그아웃 API 에러:", error);
  } finally {
    console.log("🗑️ 토큰 삭제 및 로그인 페이지로 이동");
    TokenManager.clearTokens();
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
  }
};

// 디버깅을 위한 토큰 상태 확인 함수
export const debugTokenStatus = (): void => {
  if (typeof window !== 'undefined') {
    console.log("🔍 === 토큰 상태 디버깅 ===");
    console.log("AccessToken:", TokenManager.getAccessToken() ? "✅ 있음" : "❌ 없음");
    console.log("RefreshToken:", TokenManager.getRefreshToken() ? "✅ 있음" : "❌ 없음");
    console.log("전체 쿠키:", document.cookie);
    console.log("SessionStorage:", {
      refreshToken: sessionStorage.getItem('refreshToken') ? "✅ 있음" : "❌ 없음"
    });
    console.log("=== 디버깅 종료 ===");
  }
};