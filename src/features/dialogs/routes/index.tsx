import { Route, Routes } from 'react-router-dom';

import { Dialog } from './Dialog';
import { Dialogs } from './Dialogs';

export const DialogRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dialogs />} />
      <Route path=":dialogId" element={<Dialog />} />
    </Routes>
  );
};
