import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { StorageKeys } from '@/utils/storageKeys';

export interface AuthState {
  user: any;
  authToken: string | null;
}

const initialState: AuthState = {
  user: null,
  authToken: localStorage.getItem(StorageKeys.JWT),
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthToken: (state, action: PayloadAction<string>) => {
      state.authToken = action.payload;
      localStorage.setItem(StorageKeys.JWT, action.payload);
    },
    setUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.authToken = null;
      localStorage.removeItem(StorageKeys.JWT);
      state.user = null;
    },
  },
});

export const { setUser, setAuthToken, logout } = authSlice.actions;

export default authSlice.reducer;
