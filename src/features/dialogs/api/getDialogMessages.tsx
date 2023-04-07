import { HttpStatusCode } from 'axios';

import { Message } from '@/types/dialogs';
import { api } from '@/utils/api';

export type GetDialogMessagesDTO = {
  dialogId: number;
};

export type GetDialogMessagesResponse = {
  status: HttpStatusCode;
  messages: Message[];
};

export const getDialogMessagesRequest = async (
  data: GetDialogMessagesDTO
): Promise<GetDialogMessagesResponse> => {
  const response = await api.post('/messages/getDialogMessages', data);
  return response.data;
};
