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

export interface Letters {
  letters: Letter[];
}

export interface SendLetterRequest {
  receipt: string;
  content: string;
}
