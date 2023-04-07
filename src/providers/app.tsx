import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { MainBroadcastProvider } from '@/features/broadcast';
import { AuthProvider } from '@/providers/AuthProvider';

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <React.Suspense fallback={<div>Загрузка...</div>}>
      <AuthProvider>
        <MainBroadcastProvider />
        <Router>{children}</Router>
      </AuthProvider>
    </React.Suspense>
  );
};
