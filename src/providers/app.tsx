import React, { createContext, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { useAppSelector } from '@/app/hooks';
import { MainBroadcastProvider } from '@/features/broadcast';
import { AuthProvider } from '@/providers/AuthProvider';
import WebRTCProvider from '@/providers/WebRTCProvider';

type AppProviderProps = {
  children: React.ReactNode;
};

interface WebRTCContextProps {
  sendChannel: RTCDataChannel | null;
  setSendChannel(_value: RTCDataChannel | null): void;
  receiveChannel: RTCDataChannel | null;
  setReceiveChannel(_value: RTCDataChannel | null): void;
}

export const WebRTCContext = createContext<WebRTCContextProps>({
  sendChannel: null,
  setSendChannel: () => null,
  receiveChannel: null,
  setReceiveChannel: () => null,
});

export const AppProvider = ({ children }: AppProviderProps) => {
  const incomingOfferStatus = useAppSelector((state) => state.webrtc.incomingOfferStatus);
  const outgoingOfferStatus = useAppSelector((state) => state.webrtc.outgoingOfferStatus);

  const webrtcProviderMounted = () => {
    return incomingOfferStatus === 'accepted' || outgoingOfferStatus === 'accepted';
  };

  const [sendChannel, setSendChannel] = useState<RTCDataChannel | null>(null);
  const [receiveChannel, setReceiveChannel] = useState<RTCDataChannel | null>(null);

  const webRTCContextValue = {
    sendChannel,
    setSendChannel,
    receiveChannel,
    setReceiveChannel,
  };

  return (
    <React.Suspense fallback={<div>Загрузка...</div>}>
      <AuthProvider>
        <MainBroadcastProvider />
        <WebRTCContext.Provider value={webRTCContextValue}>
          {webrtcProviderMounted() && <WebRTCProvider />}
          <Router>{children}</Router>
        </WebRTCContext.Provider>
      </AuthProvider>
    </React.Suspense>
  );
};
