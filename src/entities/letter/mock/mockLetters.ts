import { Music } from "@/entities/music";
import { LetterDetail, Letters } from "../model/types";

export const mockLetters: Letters[] = [
  {
    senderId: 1,
    senderNickname: "영희",
    letters: [
      {
        id: 1,
        senderNickname: "영희",
        content: "안녕! 잘 지내고 있지?",
        musicId: 101,
        recipientId: 1,
        senderId: 1,
        createdAt: new Date("2023-01-15T10:00:00Z"),
        readAt: null,
        deletedAt: null,
      },
      {
        id: 2,
        senderNickname: "영희",
        content: "새로운 음악 추천해줄게!",
        musicId: 102,
        recipientId: 2,
        senderId: 1,
        createdAt: new Date("2023-01-16T11:30:00Z"),
        readAt: new Date("2023-01-16T12:00:00Z"),
        deletedAt: null,
      },
    ],
  },
  {
    senderId: 2,
    senderNickname: "철수",
    letters: [
      {
        id: 3,
        senderNickname: "철수",
        content: "주말에 뭐 할 예정이야?",
        musicId: 201,
        recipientId: 1,
        senderId: 2,
        createdAt: new Date("2023-02-01T09:00:00Z"),
        readAt: null,
        deletedAt: null,
      },
      {
        id: 4,
        senderNickname: "철수",
        content: "이 노래 한번 들어봐!",
        musicId: 202,
        recipientId: 3,
        senderId: 2,
        createdAt: new Date("2023-02-02T14:00:00Z"),
        readAt: new Date("2023-02-02T15:00:00Z"),
        deletedAt: null,
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
    senderNickname: "영희",
    content: "안녕! 잘 지내고 있지? 요즘 날씨가 더워서 시원한 노래 추천할게!",
    sentAt: new Date("2023-01-15T10:00:00Z"),
    music: mockMusicData[101],
  },
  2: {
    id: 2,
    senderNickname: "영희",
    content: "새로운 음악 추천해줄게! ",
    sentAt: new Date("2023-01-16T11:30:00Z"),
    music: mockMusicData[102],
  },
  3: {
    id: 3,
    senderNickname: "철수",
    content: "주말에 뭐 할 예정이야? 나는 친구들이랑 같이 여행 갈 생각이야. 너도 즐거운 주말 보내!",
    sentAt: new Date("2023-02-01T09:00:00Z"),
    music: mockMusicData[201],
  },
  4: {
    id: 4,
    senderNickname: "철수",
    content: "이 노래 한번 들어봐! 요새 즐겨 듣는 노래야.",
    sentAt: new Date("2023-02-02T14:00:00Z"),
    music: mockMusicData[202],
  },
};
