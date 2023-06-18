import Axios, { AxiosRequestConfig } from 'axios';

import { API_URL } from '@/config';

export const api = Axios.create({
  baseURL: API_URL + '/api/v1',
  headers: {
    Accept: 'application/json',
    'Content-type': 'application/json',
  },
});

export const setUpAxiosTokenInterceptor = (authToken: string | null) => {
  function authRequestInterceptor(config: any | AxiosRequestConfig) {
    if (!config.headers) return config;
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }
    return config;
  }

  api.interceptors.request.use(authRequestInterceptor);
};
