import {apiClient} from "@/shared/lib/apiClient";
import process from "process";

export const signupApi= {
  signup: async (userData: any) => {
    return await apiClient.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users/signup/oauth2`, userData);
  },
  
  getTempToken: async () => {
    return await apiClient.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/token/refresh/temp`)
  },
  
  getTokenAfterSignup : async() => await apiClient.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users/signup/oauth2`)
}