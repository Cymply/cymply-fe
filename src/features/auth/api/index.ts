import {User} from "@/entities/user/model/user-dummy-data";
import * as process from "process";
import {apiClient} from "@/shared/lib/apiClient";

export const authApi = {
  login: (provider: any) =>
    apiClient.get<any>(`/oauth2/authorization/${provider}`),
  signup : (userData : any) => {
    return apiClient.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users/signup/oauth2`, userData);
  },
  getAccessToken: () =>
    apiClient.post<any>(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/token/refresh`),
  getAccessTokenAfterSignup: () =>
    apiClient.post<any>(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/user/signup/oauth2/success`),
  
  logout: () =>
    apiClient.post('/auth/logout'),
  
  getMe: () =>
    apiClient.get<User>('/auth/me'),
}
