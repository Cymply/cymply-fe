import { apiClient } from "@/shared/lib/apiClient";

export const musicApi = {
  // 노래 검색
  getMusic: async (data: { keyword: string; limit: number; page: number }) =>
    await apiClient.get(
      `/api/v1/music/search?keyword=${encodeURIComponent(data.keyword)}&limit=${
        data.limit
      }&page=${data.page}`
    ),
};
