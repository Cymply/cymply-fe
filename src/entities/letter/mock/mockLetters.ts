import { Music } from "@/entities/music";
import { LetterDetail, Letters } from "../model/types";

export const mockLetters: Letters[] = [
  {
    senderId: 1,
    senderName: "영희",
    letters: [
      {
        letterId: 1000,
        musicTitle: "좋은날",
        musicArtist: "아이유",
        musicThumbnailUrl: "http://example.com",
        videoUrl: "http://example.com",
        title: "편지 제목입니다.1",
        content: "안녕! 잘 지내고 있지?1",
        sendAt: null,
        isRead: false,
      },
      {
        letterId: 1001,
        musicTitle: "좋은날",
        musicArtist: "아이유",
        musicThumbnailUrl: "http://example.com",
        videoUrl: "http://example.com",
        title: "편지 제목입니다.2",
        content: "안녕! 잘 지내고 있지?2",
        sendAt: null,
        isRead: false,
      },
    ],
  },
  {
    senderId: 2,
    senderName: "철수",
    letters: [
      {
        letterId: 1003,
        musicTitle: "좋은날",
        musicArtist: "아이유",
        musicThumbnailUrl: "http://example.com",
        videoUrl: "http://example.com",
        title: "편지 제목입니다.3",
        content: "안녕! 잘 지내고 있지?3",
        sendAt: null,
        isRead: false,
      },
      {
        letterId: 1004,
        musicTitle: "좋은날",
        musicArtist: "아이유",
        musicThumbnailUrl: "http://example.com",
        videoUrl: "http://example.com",
        title: "편지 제목입니다.4",
        content: "안녕! 잘 지내고 있지?4",
        sendAt: null,
        isRead: false,
      },
    ],
  },
];

const mockMusicData: Record<number, Music> = {
  101: {
    title: "뛰어(JUMP)",
    artist: "BLACKPINK",
    thumbnail: "https://i.scdn.co/image/ab67616d0000b27374c923a5320cb6be10f6abd8",
  },
  102: {
    title: "FANTASTIC BABY",
    artist: "BIGBANG",
    thumbnail: "https://i.scdn.co/image/ab67616d0000b273dd2c0e8a5d4b0c1e227e4c7b",
  },
  201: {
    title: "What is Love?",
    artist: "TWICE",
    thumbnail: "https://i.scdn.co/image/ab67616d0000b2734ddb095ce368de91b088f1ce",
  },
  202: {
    title: "그날이 오면",
    artist: "투모로우바이투게더",
    thumbnail: "https://i.scdn.co/image/ab67616d0000b27309de738debb38028a260a97b",
  },
};

export const mockLetterDetailsById: Record<number, LetterDetail> = {
  1: {
    id: 1,
    senderId: 1,
    title: "편지 제목1",
    content: "안녕! 잘 지내고 있지? 요즘 날씨가 더워서 시원한 노래 추천할게!",
    music: mockMusicData[101],
  },
  2: {
    id: 2,
    senderId: 2,
    title: "편지 제목2",
    content: "새로운 음악 추천해줄게! ",
    music: mockMusicData[102],
  },
  3: {
    id: 3,
    senderId: 3,
    title: "편지 제목3",
    content: "주말에 뭐 할 예정이야? 나는 친구들이랑 같이 여행 갈 생각이야. 너도 즐거운 주말 보내!",
    music: mockMusicData[201],
  },
  4: {
    id: 4,
    senderId: 4,
    title: "편지 제목4",
    content: "이 노래 한번 들어봐! 요새 즐겨 듣는 노래야.",
    music: mockMusicData[202],
  },
};
