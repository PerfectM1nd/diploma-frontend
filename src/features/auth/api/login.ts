import { HttpStatusCode } from 'axios';

import { User } from '@/types';
import { api } from '@/utils/api';

export type LoginDTO = {
  login: string;
  password: string;
};

export type LoginResponse = {
  status: HttpStatusCode;
  token: string;
  user: User;
};

export const loginRequest = async (data: LoginDTO): Promise<LoginResponse> => {
  try {
    const response = await api.post('login', data);
    return response.data;
  } catch (e: any) {
    if (e.response.data.status === HttpStatusCode.BadRequest) {
      alert('Неверный логин или пароль');
    }
    throw e;
  }
};
