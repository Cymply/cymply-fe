import { apiClient } from "@/shared/lib/apiClient";
import { SendLetterRequest } from "@/entities/letter/model/types";

export const letterApi = {
  // 편지 단건 조회
  getLetter: async (id: string) => await apiClient.get(`/api/v1/letters/${id}`),

  // 받은 편지 목록
  getLetters: async () => await apiClient.get(`/api/v1/letters/received/grouped`),

  // 편지 전송
  sendLetter: async (letter: SendLetterRequest) => await apiClient.post(`/api/v1/letters`, letter),

  // 편지 작성 링크 생성
  createUserLetterLink: async () => await apiClient.post(`/api/v1/letters/code`, {}),
};
