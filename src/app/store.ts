import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import authReducer from '../features/auth/authSlice';
import dialogsReducer from '../features/dialogs/dialogsSlice';
import modalsReducer from '../features/modals/modalsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    dialogs: dialogsReducer,
    modals: modalsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
