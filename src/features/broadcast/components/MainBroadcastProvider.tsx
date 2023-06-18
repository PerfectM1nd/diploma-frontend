import Echo from 'laravel-echo';
import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { setCompanion, setIncomingOfferStatus, setOutgoingOfferStatus } from '@/features/webrtc';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const socketio = require('socket.io-client');

export const MainBroadcastProvider = () => {
  const dispatch = useAppDispatch();
  const authUser = useAppSelector((state) => state.auth.user);
  const authToken = useAppSelector((state) => state.auth.authToken);

  useEffect(() => {
    if (!authUser?.id) return;
    connectEcho();
    return () => disconnectEcho();
  }, [authUser]);

  const connectEcho = () => {
    window.Echo = new Echo({
      client: socketio,
      broadcaster: 'socket.io',
      transports: ['websocket', 'polling', 'flashsocket'],
      jsonp: false,
      auth: {
        headers: {
          Authorization: 'Bearer ' + authToken,
        },
      },
      host: 'http://127.0.0.1:6001/',
      path: '/socket.io',
    });

    window.Echo.connector.socket.on('connect', async () => {
      console.log('Broadcast connect');
    });

    window.Echo.connector.socket.on('disconnect', async () => {
      console.log('Broadcast disconnect');
    });

    window.Echo.connector.socket.on('reconnecting', async (attemptNumber: number) => {
      console.log('reconnecting', attemptNumber);
    });

    window.Echo.private(`private.${authUser.id}`).listen(
      'CreateDialogOfferEvent',
      async (event: any) => {
        console.log(event);
        dispatch(setCompanion(event.user));
        dispatch(setIncomingOfferStatus('received'));
      }
    );

    window.Echo.private(`private.${authUser.id}`).listen(
      'DialogOfferAcceptedEvent',
      async (event: any) => {
        console.log(event);
        dispatch(setCompanion(event.companion));
        dispatch(setOutgoingOfferStatus('accepted'));
      }
    );

    window.Echo.private(`private.${authUser.id}`).listen(
      'DialogOfferRejectedEvent',
      async (event: any) => {
        console.log(event);
        dispatch(setOutgoingOfferStatus('rejected'));
      }
    );
  };

  const disconnectEcho = () => {
    window.Echo.connector.socket.removeAllListeners('connect');
    window.Echo.connector.socket.removeAllListeners('disconnect');
    window.Echo.connector.socket.removeAllListeners('reconnecting');
    window.Echo.private(`private.${authUser.id}`).stopListening('CreateDialogOfferEvent');
    window.Echo.private(`private.${authUser.id}`).stopListening('DialogOfferAcceptedEvent');
    window.Echo.private(`private.${authUser.id}`).stopListening('DialogOfferRejectedEvent');
  };

  return null;
};
