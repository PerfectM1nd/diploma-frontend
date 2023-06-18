import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'reduxjs-toolkit-persist';
import autoMergeLevel2 from 'reduxjs-toolkit-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'reduxjs-toolkit-persist/lib/storage';

import authReducer from '../features/auth/authSlice';
import dialogsReducer from '../features/dialogs/dialogsSlice';
import modalsReducer from '../features/modals/modalsSlice';
import webrtcReducer from '../features/webrtc/webrtcSlice';

import { loadState, saveState } from './localStorage';

const persistConfig = {
  key: 'root',
  storage: storage,
  stateReconciler: autoMergeLevel2,
  whitelist: ['dialogs'],
  // blacklist: ['auth', 'dialogs', 'modals', 'webrtc'],
};

const combineReducer = combineReducers({
  auth: authReducer,
  dialogs: dialogsReducer,
  modals: modalsReducer,
  webrtc: webrtcReducer,
});

// @ts-ignore
const persistedReducer = persistReducer(persistConfig, combineReducer);

// export reducers under slices
const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  preloadedState: loadState(), //call loadstate method to initiate store from localstorage
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true,
      serializableCheck: false,
    }),
});

// export const store = configureStore({
//   reducer: {
//     auth: authReducer,
//     dialogs: dialogsReducer,
//     modals: modalsReducer,
//     webrtc: webrtcReducer,
//   },
// });

store.subscribe(() => saveState(store.getState()));

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default store;
