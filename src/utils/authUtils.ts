// src/utils/authUtils.ts

// 쿠키 헬퍼 함수들
export const getCookie = (name: string): string | null => {
  if (typeof window === 'undefined') return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    const cookieValue = parts.pop()?.split(';').shift() || null;
    return cookieValue ? decodeURIComponent(cookieValue) : null;
  }
  return null;
};

export const normalizePath = (path: string): string => {
  try {
    const normalized = path.replace(/\/+/g, '/').trim();
    return normalized.length > 1 && normalized.endsWith('/')
      ? normalized.slice(0, -1)
      : normalized;
  } catch (error) {
    console.error('Path normalization error:', error);
    return path;
  }
};

// 리다이렉트 URL 결정 함수
export const getRedirectUrl = () => {
  const recipientRedirectUrl = getCookie('recipientRedirectUrl');
  const generalRedirectUrl = getCookie('generalRedirectUrl');
  const recipientCode = getCookie('recipientCode')
  let redirectUrl = null;
  
  if (recipientRedirectUrl) {
    console.log('🔍 Found recipient redirect URL:', recipientRedirectUrl);
    redirectUrl= normalizePath(recipientRedirectUrl);
  } else if (generalRedirectUrl) {
    console.log('🔍 Found general redirect URL:', generalRedirectUrl);
    redirectUrl= normalizePath(generalRedirectUrl);
  } else {
    console.log('🔍 No redirect URL found, using default');
    redirectUrl= '/main'; // 기본값
  }
  
  return {
    redirectUrl: redirectUrl,
    recipientCode: recipientCode
  }
};

export const clearRedirectCookies = () => {
  document.cookie = 'recipientCode=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
  document.cookie = 'recipientRedirectUrl=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
  document.cookie = 'generalRedirectUrl=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
};