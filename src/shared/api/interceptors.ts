// import { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
// import { api } from './base';
//
// export type AuthFunctions = {
//   getAccessToken: () => string | null;
//   refreshToken: () => Promise<void>;
// };
//
// let authFunctions: AuthFunctions | null = null;
//
// export const setAuthFunctions = (functions: AuthFunctions) => {
//   authFunctions = functions;
// };
//
// // 요청 인터셉터
// api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
//   if (authFunctions) {
//     const token = authFunctions.getAccessToken();
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//   }
//   return config;
// });
//
// // 응답 인터셉터
// api.interceptors.response.use(
//   (response: AxiosResponse) => response,
//   async (error) => {
//     if (error.response?.status === 401 && authFunctions) {
//       try {
//         await authFunctions.refreshToken();
//         const token = authFunctions.getAccessToken();
//         if (token) {
//           error.config.headers.Authorization = `Bearer ${token}`;
//           return api.request(error.config);
//         }
//       } catch (refreshError) {
//         window.location.href = '/login';
//       }
//     }
//     return Promise.reject(error);
//   }
// );