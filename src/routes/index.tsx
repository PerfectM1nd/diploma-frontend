import { useRoutes } from 'react-router-dom';

import { useAppSelector } from '@/app/hooks';
import { protectedRoutes } from '@/routes/protected';
import { publicRoutes } from '@/routes/public';

export const AppRoutes = () => {
  const user = useAppSelector((state) => state.auth.user);

  const routes = user ? protectedRoutes : publicRoutes;

  const element = useRoutes(routes);

  return <>{element}</>;
};
