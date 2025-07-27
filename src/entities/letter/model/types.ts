import { Music } from "@/entities/music";
import { ApiResponse } from "@/shared/model/apiResponse";

// 편지 전체 조회
export type ResponseLetters = ApiResponse<Letters[]>;

export interface Letters {
  senderId: number;
  senderNickname: string;
  letters: Letter[];
}

export interface Letter {
  id?: number;
  senderNickname?: string;
  content?: string;
  musicId?: number;
  recipientId?: number;
  senderId?: number;
  createdAt?: Date | null;
  readAt?: Date | null;
  deletedAt?: Date | null;
}

// 편지 단건 조회
export type ResponseLetterDetail = ApiResponse<LetterDetail>;

export interface LetterDetail {
  id: number;
  senderNickname: string;
  content: string;
  sentAt: Date | null;
  music: Music;
}

// 편지 보내기
export interface SendLetterRequest {
  recipientCode?: string | null;
  content?: string;
  title?: string;
  artist?: string
}
