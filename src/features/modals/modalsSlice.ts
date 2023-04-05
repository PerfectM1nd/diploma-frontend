import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ModalsState {
  createDialogModalOpen: boolean;
}

const initialState: ModalsState = {
  createDialogModalOpen: false,
};

export const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    setCreateDialogModalOpen: (state, action: PayloadAction<boolean>) => {
      state.createDialogModalOpen = action.payload;
    },
  },
});

export const { setCreateDialogModalOpen } = modalsSlice.actions;

export default modalsSlice.reducer;
