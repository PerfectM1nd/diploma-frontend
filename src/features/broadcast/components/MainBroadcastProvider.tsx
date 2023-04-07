import { useEffect, useRef } from 'react';

import { useAppSelector } from '@/app/hooks';
import { WEBSOCKET_URL } from '@/config';

export const MainBroadcastProvider = () => {
  const authUser = useAppSelector((state) => state.auth.user);
  const connection = useRef<WebSocket | null>(null);

  useEffect(() => {
    connection.current = new WebSocket(WEBSOCKET_URL);

    const echo = connection.current;

    if (!echo) return;

    echo.onopen = (e) => {
      // echo.send(
      //   JSON.stringify({
      //     type: 'socket',
      //     user_id: authUser?.id || Math.random(),
      //   })
      // );
      console.log('Echo connected');
    };

    echo.onclose = (e) => {
      console.log('Echo closed');
    };

    echo.onmessage = (e) => {
      alert(e.data);
    };
  }, [authUser]);

  return null;
};
