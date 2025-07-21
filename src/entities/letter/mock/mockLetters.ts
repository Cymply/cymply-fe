import { Letter } from "../model/types";

export const mockLetters: Letter[] = [
  {
    id: 1,
    senderNickname: "영희",
    content: "안녕! 잘 지내고 있지?",
    musicId: 101,
    recipientId: 1,
    senderId: 1,
    createdAt: new Date(),
    readAt: null,
    deletedAt: null,
  },
  {
    id: 2,
    senderNickname: "철수",
    content: "곧 만나자~",
    musicId: 102,
    recipientId: 2,
    senderId: 3,
    createdAt: new Date(),
    readAt: null,
    deletedAt: null,
  },
  {
    id: 3,
    senderNickname: "영희",
    content: "영희 편지2",
    musicId: 103,
    recipientId: 1,
    senderId: 1,
    createdAt: new Date(),
    readAt: null,
    deletedAt: null,
  },
];
