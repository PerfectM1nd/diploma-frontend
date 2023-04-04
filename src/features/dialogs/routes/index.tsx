import { Route, Routes } from 'react-router-dom';

import { Dialogs } from './Dialogs';

export const DialogRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dialogs />} />
    </Routes>
  );
};
