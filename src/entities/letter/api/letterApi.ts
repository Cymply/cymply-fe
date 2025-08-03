import { apiClient } from "@/shared/lib/apiClient";
import {
  ResponseLetterDetail,
  ResponseLetters,
  SendLetterRequest,
} from "@/entities/letter/model/types";

export const letterApi = {
  // 편지 단건 조회
  getLetter: async (id: number) =>
    await apiClient.get<ResponseLetterDetail>(`/api/v1/letters/${id}`),

  // 받은 편지 목록
  getLetters: async () => await apiClient.get<ResponseLetters>(`/api/v1/letters/received/grouped`),

  // 편지 전송
  sendLetter: async (letter: SendLetterRequest) => await apiClient.post(`/api/v1/letters`, letter),

  // 편지 작성 링크 생성
  createUserLetterLink: async () => await apiClient.post(`/api/v1/users/me/recipient-code`, {}),
  
  // 수신자 정보 조회
  getRecipientName: async (code) => await apiClient.get(`/api/v1/users/recipient-code/${code}`)
};
