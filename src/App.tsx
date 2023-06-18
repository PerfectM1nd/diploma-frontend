import { Provider } from 'react-redux';
import { persistStore } from 'reduxjs-toolkit-persist';
import { PersistGate } from 'reduxjs-toolkit-persist/integration/react';

import store from '@/app/store';
import { AppProvider } from '@/providers/app';
import { AppRoutes } from '@/routes';

const persistor = persistStore(store);

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<div>Loading .....</div>} persistor={persistor}>
        <AppProvider>
          <AppRoutes />
        </AppProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
