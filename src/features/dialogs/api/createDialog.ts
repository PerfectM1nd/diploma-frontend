import { HttpStatusCode } from 'axios';

import { Dialog } from '@/types/dialogs';
import { api } from '@/utils/api';

export type CreateDialogDTO = {
  addresseeLogin: string;
};

export type LoginResponse = {
  status: HttpStatusCode;
  message: string;
  dialog?: Dialog;
};

export const createDialogRequest = async (data: CreateDialogDTO): Promise<LoginResponse> => {
  try {
    const response = await api.post('/dialogs/create', data);
    return response.data;
  } catch (e: any) {
    if (e.response.data.message === 'Users cannot create dialogs with themselves') {
      alert('Нельзя создавать диалоги с самим собой!');
    }
    if (e.response.data.message === 'Dialog with such users already exists') {
      alert('Диалог с этим пользователем уже существует!');
    }
    if (e.response.data.message === 'An error occurred while creating a dialog') {
      alert('Прозошла ошибка при создании диалога!');
    }
    throw e;
  }
};
