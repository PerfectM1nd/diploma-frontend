import { createAsyncThunk } from '@reduxjs/toolkit';

import { api } from '@/utils/api';

import { setIncomingOfferStatus, setOutgoingOfferStatus } from './webrtcSlice';

export interface IceCandidateQuery {
  toUserId: number;
  candidate: string;
}

export interface WebRtcAnswerQuery {
  toUserId: number;
  answer: string;
}

export interface WebRtcOfferQuery {
  toUserId: number;
  offer: string;
}

export const sendOfferReject = createAsyncThunk(
  'webrtc/sendOfferReject',
  async (login: string, { dispatch }) => {
    try {
      await api.post('reject-dialog-offer', { login });
      dispatch(setIncomingOfferStatus('rejected'));
    } catch (e) {
      console.error('sendOfferReject ERROR: ', e);
      throw e;
    }
  }
);

export const sendOfferAccept = createAsyncThunk(
  'webrtc/sendOfferAccept',
  async (login: string, { dispatch }) => {
    try {
      await api.post('accept-dialog-offer', { login });
      dispatch(setIncomingOfferStatus('accepted'));
    } catch (e) {
      console.error('sendOfferAccept ERROR: ', e);
      throw e;
    }
  }
);

export const sendDialogOffer = createAsyncThunk(
  'webrtc/sendDialogOffer',
  async (login: string, { dispatch }) => {
    try {
      await api.post('send-dialog-offer', { login });
      dispatch(setOutgoingOfferStatus('sent'));
    } catch (e) {
      console.error('sendDialogOffer ERROR: ', e);
      throw e;
    }
  }
);

export const broadcastIceCandidate = createAsyncThunk(
  'webrtc/broadcastIceCandidate',
  async ({ toUserId, candidate }: IceCandidateQuery) => {
    try {
      console.log('broadcastIceCandidate');
      await api.post('webrtc-candidate', { toUserId, candidate });
    } catch (error) {
      console.error('broadcastIceCandidate ERROR:', error);
      throw error;
    }
  }
);

export const broadcastWebRtcAnswer = createAsyncThunk(
  'webrtc/broadcastWebRtcAnswer',
  async ({ toUserId, answer }: WebRtcAnswerQuery) => {
    try {
      console.log('broadcastWebRtcAnswer');
      await api.post('webrtc-answer', { toUserId, answer });
    } catch (error) {
      console.error('broadcastWebRtcAnswer ERROR:', error);
      throw error;
    }
  }
);

export const broadcastWebRtcOffer = createAsyncThunk(
  'webrtc/broadcastWebRtcOffer',
  async ({ toUserId, offer }: WebRtcOfferQuery) => {
    try {
      console.log('broadcastWebRtcOffer');
      await api.post('webrtc-offer', { toUserId, offer });
    } catch (error) {
      console.error('broadcastWebRtcOffer ERROR:', error);
      throw error;
    }
  }
);
