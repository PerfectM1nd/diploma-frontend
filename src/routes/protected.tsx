import { Suspense } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { lazyImport } from '@/utils/lazyImport';

const { DialogRoutes } = lazyImport(() => import('@/features/dialogs'), 'DialogRoutes');

const App = () => {
  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <Outlet />
    </Suspense>
  );
};

export const protectedRoutes = [
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/dialogs/*', element: <DialogRoutes /> },
      { path: '*', element: <Navigate to="/dialogs" /> },
      { path: '/', element: <Navigate to="/dialogs" /> },
    ],
  },
];
