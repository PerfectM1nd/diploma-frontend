import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { User } from '@/types';

export type OutgoingOfferStatusType = null | 'sent' | 'accepted' | 'rejected';
export type IncomingOfferStatusType = null | 'received' | 'accepted' | 'rejected';

export interface WebrtcState {
  companion: User | null;
  outgoingOfferStatus: OutgoingOfferStatusType;
  incomingOfferStatus: IncomingOfferStatusType;
  connectionEstablished: boolean;
}

const initialState: WebrtcState = {
  companion: null,
  outgoingOfferStatus: null,
  incomingOfferStatus: null,
  connectionEstablished: false,
};

export const webrtcSlice = createSlice({
  name: 'webrtc',
  initialState,
  reducers: {
    setConnectionEstablished: (state, action: PayloadAction<boolean>) => {
      state.connectionEstablished = action.payload;
    },
    setIncomingOfferStatus: (state, action: PayloadAction<IncomingOfferStatusType>) => {
      state.incomingOfferStatus = action.payload;
    },
    setOutgoingOfferStatus: (state, action: PayloadAction<OutgoingOfferStatusType>) => {
      state.outgoingOfferStatus = action.payload;
    },
    setCompanion: (state, action: PayloadAction<User | null>) => {
      state.companion = action.payload;
    },
  },
});

export const {
  setConnectionEstablished,
  setIncomingOfferStatus,
  setOutgoingOfferStatus,
  setCompanion,
} = webrtcSlice.actions;

export default webrtcSlice.reducer;
