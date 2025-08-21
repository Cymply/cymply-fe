import { apiClient } from "@/shared/lib/apiClient";

export const musicApi = {
  // 노래 검색
  getMusic: async (data: { keyword: string; limit: number; page: number }) =>
    await apiClient.get(
      `/api/v1/music/search?keyword=${encodeURIComponent(data.keyword)}&limit=${
        data.limit
      }&page=${data.page}`
    ),

  // 음악 재생 url검색
  getMusicPlayUrl: async (data: { title: string; artist: string }) =>
    await apiClient.get(
      `/api/v1/music/search/url?title=${encodeURIComponent(
        data.title
      )}&artist=${encodeURIComponent(data.artist)}&maxResults=1`
    ),
};
