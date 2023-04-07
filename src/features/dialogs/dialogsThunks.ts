import { createAsyncThunk } from '@reduxjs/toolkit';

import { createDialogRequest } from './api/createDialog';
import { getDialogMessagesRequest } from './api/getDialogMessages';
import { getMyDialogsRequest } from './api/getMyDialogs';
import { sendMessageRequest } from './api/sendMessage';
import { addDialog, addDialogMessage, setDialogMessages, setDialogs } from './dialogsSlice';

export const sendMessage = createAsyncThunk(
  'dialogs/sendMessage',
  async (
    messageData: {
      text: string;
      dialogId: number;
    },
    { dispatch }
  ) => {
    try {
      const createdMessage = (await sendMessageRequest(messageData))['data'];
      dispatch(addDialogMessage(createdMessage));
    } catch (e) {
      console.error('sendMessage ERROR: ', e);
      throw e;
    }
  }
);

export const getDialogMessages = createAsyncThunk(
  'dialogs/getDialogMessages',
  async (dialogId: number, { dispatch }) => {
    try {
      const messages = (await getDialogMessagesRequest({ dialogId }))['messages'];
      dispatch(setDialogMessages({ dialogId, messages }));
    } catch (e) {
      console.error('getDialogMessages ERROR: ', e);
      throw e;
    }
  }
);

export const getMyDialogs = createAsyncThunk('dialogs/getMyDialogs', async (_, { dispatch }) => {
  try {
    const dialogs = (await getMyDialogsRequest())['dialogs'];
    dispatch(setDialogs(dialogs));
  } catch (e) {
    console.error('getMyDialogs ERROR: ', e);
    throw e;
  }
});

export const createDialog = createAsyncThunk(
  'dialogs/createDialog',
  async (addresseeLogin: string, { dispatch }) => {
    try {
      const dialog = (await createDialogRequest({ addresseeLogin }))['dialog'];
      dialog && dispatch(addDialog(dialog));
    } catch (e) {
      console.error('createDialog ERROR: ', e);
      throw e;
    }
  }
);
