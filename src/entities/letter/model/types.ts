import { Music } from "@/entities/music";
import { ApiResponse } from "@/shared/model/apiResponse";

// 편지 전체 조회
export type ResponseLetters = ApiResponse<Letters[]>;

export interface Letters {
  senderId: number;
  senderName: string;
  letters: Letter[];
}

export interface Letter {
  letterId: number;
  musicTitle: string; // 노래 제목
  musicArtist: string; // 노래 가수
  musicThumbnailUrl: string; // 앨범 커버
  videoUrl: string; // 음악 재생 url
  title: string; // 편지 제목
  content: string; // 편지 내용
  sendAt: Date | null; // 보낸 시각
  isRead: boolean; // 읽은 여부
}

// 편지 단건 조회
export type ResponseLetterDetail = ApiResponse<LetterDetail>;

export interface LetterDetail {
  id: number;
  senderId: number;
  title: string; // 편지 제목
  content: string; // 편지 내용
  music: Music;
}

// 편지 보내기
export interface SendLetterRequest {
  recipientCode?: string | null;
  content?: string;
  title?: string;
  musicTitle?: string;
  musicArtist?: string;
}
