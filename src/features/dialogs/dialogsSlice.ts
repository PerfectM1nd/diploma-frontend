import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { User } from '@/types';
import { AddMessageAction, Dialog, Message } from '@/types/dialogs';

export interface DialogsState {
  dialogs: Dialog[] | null;
  lastDialogId: number;
  lastMessageId: number;
  dialogMessages: Record<number, Message[]>;
  currentViewDialogId: number | null;
}

const initialState: DialogsState = {
  dialogs: null,
  lastDialogId: 1,
  lastMessageId: 1,
  dialogMessages: {},
  currentViewDialogId: null,
};

export const dialogsSlice = createSlice({
  name: 'dialogs',
  initialState,
  reducers: {
    setCurrentViewDialogId: (state, action: PayloadAction<number | null>) => {
      state.currentViewDialogId = action.payload;
    },
    addDialogMessage: (state, action: PayloadAction<AddMessageAction>) => {
      const dialogId = state.currentViewDialogId as number;
      if (!state.dialogMessages[dialogId]) state.dialogMessages[dialogId] = [];
      state.dialogMessages[dialogId].push({
        id: state.lastMessageId,
        dialogId,
        ownerId: action.payload.ownerId,
        text: action.payload.text,
        createdAt: Date.now(),
      });
      state.lastMessageId++;
    },
    setDialogMessages: (
      state,
      action: PayloadAction<{ dialogId: number; messages: Message[] }>
    ) => {
      state.dialogMessages[action.payload.dialogId] = action.payload.messages;
    },
    addDialog: (state, action: PayloadAction<User[]>) => {
      if (!state.dialogs) state.dialogs = [];
      const newDialog: Dialog = {
        id: state.lastDialogId,
        users: action.payload,
        createdAt: Date.now(),
      };
      state.dialogs.push(newDialog);
      state.lastDialogId++;
      state.currentViewDialogId = state.lastDialogId;
    },
    setDialogs: (state, action: PayloadAction<Dialog[]>) => {
      state.dialogs = action.payload;
    },
  },
});

export const {
  addDialogMessage,
  setCurrentViewDialogId,
  setDialogMessages,
  addDialog,
  setDialogs,
} = dialogsSlice.actions;

export default dialogsSlice.reducer;
