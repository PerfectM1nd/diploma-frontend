import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ModalsState {
  createDialogModalOpen: boolean;
  newDialogRequestModalOpen: boolean;
}

const initialState: ModalsState = {
  createDialogModalOpen: false,
  newDialogRequestModalOpen: false,
};

export const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    setNewDialogRequestModalOpen: (state, action: PayloadAction<boolean>) => {
      state.newDialogRequestModalOpen = action.payload;
    },
    setCreateDialogModalOpen: (state, action: PayloadAction<boolean>) => {
      state.createDialogModalOpen = action.payload;
    },
  },
});

export const { setNewDialogRequestModalOpen, setCreateDialogModalOpen } = modalsSlice.actions;

export default modalsSlice.reducer;
