export interface Letter{
  id ?: number;
  content ?: string;
  musicId ?: number;
  recipientId ?: number;
  senderId ?: number;
  createdAt ?: Date | null;
  readAt ?: Date | null;
  deletedAt ?: Date | null;
}

export interface SendLetterRequest{
  receipt : string;
  content : string;
}