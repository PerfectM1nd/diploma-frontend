import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { HttpStatusCode } from 'axios';

import { User } from '@/types';
import { api } from '@/utils/api';

import { logout } from '../authSlice';

export type FetchMeResponse = {
  status: HttpStatusCode;
  user: User;
};

export const fetchMeRequest = async (
  dispatch: ThunkDispatch<unknown, unknown, AnyAction>
): Promise<FetchMeResponse> => {
  try {
    const response = await api.get('me');
    return response.data;
  } catch (e: any) {
    if (e.response.data.status === HttpStatusCode.Unauthorized) {
      alert('Ваша сессия истекла. Войдите снова');
    } else {
      alert('Ошибка авторизации');
    }
    dispatch(logout());
    throw e;
  }
};
