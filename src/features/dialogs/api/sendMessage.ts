import { HttpStatusCode } from 'axios';

import { Message } from '@/types/dialogs';
import { api } from '@/utils/api';

export type SendMessageDTO = {
  text: string;
  dialogId: number;
};

export type SendMessageResponse = {
  status: HttpStatusCode;
  message: string;
  data: Message;
};

export const sendMessageRequest = async (data: SendMessageDTO): Promise<SendMessageResponse> => {
  const response = await api.post('/messages/create', data);
  return response.data;
};
