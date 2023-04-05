import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Dialog, Message } from '@/types/dialogs';

export interface DialogsState {
  dialogs: Dialog[];
  dialogMessages: Record<number, Message[]>;
  currentViewDialogId: number | null;
}

const initialState: DialogsState = {
  dialogs: [],
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
    setDialogMessages: (
      state,
      action: PayloadAction<{ dialogId: number; messages: Message[] }>
    ) => {
      state.dialogMessages[action.payload.dialogId] = action.payload.messages;
    },
    addDialog: (state, action: PayloadAction<Dialog>) => {
      state.dialogs.push(action.payload);
    },
    setDialogs: (state, action: PayloadAction<Dialog[]>) => {
      state.dialogs = action.payload;
    },
  },
});

export const { setCurrentViewDialogId, setDialogMessages, addDialog, setDialogs } =
  dialogsSlice.actions;

export default dialogsSlice.reducer;
