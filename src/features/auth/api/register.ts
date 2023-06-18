import { HttpStatusCode } from 'axios';

import { User } from '@/types';
import { api } from '@/utils/api';

export type RegisterDTO = {
  login: string;
  password: string;
};

export type RegisterResponse = {
  status: HttpStatusCode;
  token: string;
  user: User;
};

export const registerRequest = async (data: RegisterDTO): Promise<RegisterResponse> => {
  const response = await api.post('register', data);
  return response.data;
};
