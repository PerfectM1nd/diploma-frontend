import { createSlice, current, PayloadAction } from '@reduxjs/toolkit';

import { Dialog, Message } from '@/types/dialogs';

export interface DialogsState {
  dialogs: Dialog[] | null;
  dialogMessages: Record<number, Message[]>;
  currentViewDialogId: number | null;
}

const initialState: DialogsState = {
  dialogs: null,
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
    addDialogMessage: (state, action: PayloadAction<Message>) => {
      if (!state.dialogMessages[+action.payload.dialog_id])
        state.dialogMessages[+action.payload.dialog_id] = [];
      state.dialogMessages[+action.payload.dialog_id].push(action.payload);
    },
    setDialogMessages: (
      state,
      action: PayloadAction<{ dialogId: number; messages: Message[] }>
    ) => {
      state.dialogMessages[action.payload.dialogId] = action.payload.messages;
    },
    addDialog: (state, action: PayloadAction<Dialog>) => {
      if (!state.dialogs) state.dialogs = [];
      state.dialogs.push(action.payload);
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
