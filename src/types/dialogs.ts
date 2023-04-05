import { User } from '@/types/user';

export interface Dialog {
  id: number;
  users: User[];
  created_at: string;
  messages: Message[];
}

export interface Message {
  id: number;
  dialogId: number;
  text: string;
  ownerId: number;
  created_at: string;
}
