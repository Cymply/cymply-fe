import { apiClient } from "@/shared/lib/apiClient";

export const userApi = {
  getUserInfo: async () => {
    const res = await apiClient.get("/api/v1/users/me");
    if (res.status !== 200) {
      throw new Error("Failed to fetch user info");
    }
    return res?.data?.data;
  },
};
