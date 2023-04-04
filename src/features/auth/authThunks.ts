import { createAsyncThunk } from '@reduxjs/toolkit';

import { fetchMeRequest } from './api/fetchMe';
import { loginRequest } from './api/login';
import { registerRequest } from './api/register';
import { setAuthToken, setUser } from './authSlice';

export const fetchMe = createAsyncThunk('auth/fetchMe', async (_, { dispatch }) => {
  try {
    const response = await fetchMeRequest(dispatch);
    dispatch(setUser(response.user));
  } catch (e) {
    console.error('fetchMe ERROR: ', e);
    throw e;
  }
});

export const authorize = createAsyncThunk(
  'auth/authorize',
  async (loginData: { login: string; password: string }, { dispatch }) => {
    try {
      const response = await loginRequest(loginData);
      dispatch(setAuthToken(response.token));
      dispatch(setUser(response.user));
    } catch (e: any) {
      console.error('authorize ERROR: ', e);
      throw e;
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (loginData: { login: string; password: string }, { dispatch }) => {
    try {
      const response = await registerRequest(loginData);
      dispatch(setAuthToken(response.token));
      dispatch(setUser(response.user));
    } catch (e: any) {
      console.error('register ERROR: ', e);
      throw e;
    }
  }
);
