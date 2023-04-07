import { HttpStatusCode } from 'axios';

import { Dialog } from '@/types/dialogs';
import { api } from '@/utils/api';

export type GetMyDialogsResponse = {
  status: HttpStatusCode;
  dialogs: Dialog[];
};

export const getMyDialogsRequest = async (): Promise<GetMyDialogsResponse> => {
  const response = await api.get('/dialogs/my');
  return response.data;
};
