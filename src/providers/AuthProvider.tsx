import React, { FC, useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { fetchMe } from '@/features/auth';
import { setUpAxiosTokenInterceptor } from '@/utils/api';

interface Props {
  children: React.ReactNode;
}

export const AuthProvider: FC<Props> = ({ children }) => {
  const dispatch = useAppDispatch();
  const authToken = useAppSelector((state) => state.auth.authToken);

  const [fetchingUser, setFetchingUser] = useState(true);

  useEffect(() => {
    setUpAxiosTokenInterceptor(authToken);
    (async () => {
      authToken && (await dispatch(fetchMe()).unwrap());
      setFetchingUser(false);
    })();
  }, [authToken, dispatch]);

  return <>{!fetchingUser && children}</>;
};
