// 'use client';
//
// import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
// import { setAuthFunctions } from '@/shared/api';
// import {User} from "@/entities/user/model/user-dummy-data";
// import {authApi} from "@/features/auth/api";
//
// interface AuthContextType {
//   accessToken: string | null;
//   user: User | null;
//   isAuthenticated: boolean;
//   loading: boolean;
//   login?: (email: string, password: string) => Promise<User>;
//   logout: () => Promise<void>;
//   refreshToken: () => Promise<void>;
// }
//
// const AuthContext = createContext<AuthContextType | null>(null);
//
// interface AuthProviderProps {
//   children: ReactNode;
// }
//
// export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
//   const [accessToken, setAccessToken] = useState<string | null>(null);
//   const [user, setUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState(true);
//
//   const isAuthenticated = !!accessToken;
//
//   const refreshToken = async (): Promise<void> => {
//     try {
//       const response = await authApi.refresh();
//       const { accessToken: newToken } = response.data;
//
//       setAccessToken(newToken);
//
//       const userResponse = await authApi.getMe();
//       setUser(userResponse.data);
//     } catch (error) {
//       setAccessToken(null);
//       setUser(null);
//       throw error;
//     }
//   };
//
//   const logout = async (): Promise<void> => {
//     try {
//       await authApi.logout();
//     } finally {
//       setAccessToken(null);
//       setUser(null);
//     }
//   };
//
//   // 클라이언트에서만 실행
//   useEffect(() => {
//     // const initAuth = async () => {
//     //   try {
//     //     await refreshToken();
//     //   } catch {
//     //     // 갱신 실패는 정상적인 상황
//     //   } finally {
//     //     setLoading(false);
//     //   }
//     // };
//
//     // initAuth();
//   }, []);
//
//   // API 인터셉터 설정
//   useEffect(() => {
//     setAuthFunctions({
//       getAccessToken: () => accessToken,
//       refreshToken,
//     });
//   }, [accessToken]);
//
//   const value: AuthContextType = {
//     accessToken,
//     user,
//     isAuthenticated,
//     loading,
//     logout,
//     refreshToken,
//   };
//
//   return (
//     <AuthContext.Provider value={value}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
//
// export const useAuth = (): AuthContextType => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };