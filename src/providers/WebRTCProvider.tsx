import { useContext, useEffect, useRef } from 'react';

import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { initialRTCPeerConnectionConfig } from '@/config';
import {
  broadcastIceCandidate,
  broadcastWebRtcAnswer,
  broadcastWebRtcOffer,
  setConnectionEstablished,
} from '@/features/webrtc';
import { WebRTCContext } from '@/providers/app';

const WebRTCProvider = () => {
  const { setSendChannel, setReceiveChannel } = useContext(WebRTCContext);
  const dispatch = useAppDispatch();
  const authUser = useAppSelector((state) => state.auth.user);
  const companion = useAppSelector((state) => state.webrtc.companion);
  const outgoingOfferStatus = useAppSelector((state) => state.webrtc.outgoingOfferStatus);

  const companionRef = useRef(companion);
  const peerConnections = useRef(new Map());
  const iceConnectionState = useRef<RTCIceConnectionState | null>(null);
  const iceCandidates = useRef(new Map());
  const firstLoad = useRef(true);

  const amISender = () => {
    return outgoingOfferStatus === 'accepted';
  };

  useEffect(() => {
    companionRef.current = companion;
  }, [companion]);

  useEffect(() => {
    (async () => {
      // if (firstLoad.current) {
      //   firstLoad.current = false;
      //   return;
      // }
      subscribe();
      amISender() && (await createOffer());
      return () => {
        unsubscribe();
      };
    })();
  }, []);

  const subscribe = () => {
    console.log('subscribe');

    // Пользователь получил webrtc offer
    window.Echo.private(`webRtc.${authUser.id}`).listen('WebRtcOfferEvent', async (event: any) => {
      const jsonOffer = event.offer;
      const offer = JSON.parse(jsonOffer);
      try {
        await createAnswer(offer);
      } catch (error) {
        console.error('createAnswer ERROR', error);
      }
    });

    // Пользователь получил webrtc answer
    window.Echo.private(`webRtc.${authUser.id}`).listen('WebRtcAnswerEvent', async (event: any) => {
      const jsonAnswer = event.answer;
      const answer = JSON.parse(jsonAnswer);
      try {
        await setAnswer(answer);
      } catch (error) {
        console.error('setAnswer ERROR', error);
      }
    });

    // Пользователь получил получил webrtc icecandidate
    window.Echo.private(`webRtc.${authUser.id}`).listen(
      'WebRtcCandidateEvent',
      async (event: any) => {
        try {
          if (!getPeerConnection()) return;
          const jsonCandidate = event.candidate;
          if (jsonCandidate) {
            const candidate = JSON.parse(jsonCandidate);
            const timeout = setTimeout(async () => {
              if (getPeerConnection() && getPeerConnection()['remoteDescription']) {
                clearTimeout(timeout);
                getIceCandidateArray()?.push(candidate);
                for (let i = 0; i < getIceCandidateArray()?.length; i++) {
                  await getPeerConnection().addIceCandidate(
                    new RTCIceCandidate(getIceCandidateArray()[i])
                  );
                }
              }
            }, 1000);
          }
        } catch (error) {
          console.error('WebRtcCandidateEvent ERROR', error);
        }
      }
    );

    (async () => {
      try {
        await createPeerConnection();
      } catch (error) {
        console.error('createPeerConnection ERROR', error);
      }
    })();
  };

  const unsubscribe = () => {
    window.Echo.private(`webRtc.${authUser.id}`).stopListening('WebRtcCandidateEvent');
    window.Echo.private(`webRtc.${authUser.id}`).stopListening('WebRtcOfferEvent');
    window.Echo.private(`webRtc.${authUser.id}`).stopListening('WebRtcAnswerEvent');

    (async () => {
      await closeStream();
    })();
  };

  // Создать webrtc peer connection
  const createPeerConnection = async () => {
    try {
      const peerConnection = new RTCPeerConnection(initialRTCPeerConnectionConfig);
      const sendChannel = peerConnection.createDataChannel('sendChannel');

      peerConnection.onsignalingstatechange = () => {
        console.log(getPeerConnection().signalingState);
      };

      peerConnection.onicecandidate = async (event) => {
        if (event.candidate && companionRef.current) {
          const jsonCandidate = JSON.stringify(event.candidate);
          await dispatch(
            broadcastIceCandidate({ toUserId: companionRef.current.id, candidate: jsonCandidate })
          ).unwrap();
        }
      };

      peerConnection.oniceconnectionstatechange = async () => {
        const state = getPeerConnection().iceConnectionState;
        iceConnectionState.current = state;
        if (state === 'connected') {
          dispatch(setConnectionEstablished(true));
        }
        console.log(state);
        // if (state === 'disconnected') await hangUp();
      };

      if (companionRef.current) {
        peerConnections.current.set(companionRef.current.id, peerConnection);
        iceCandidates.current.set(companionRef.current.id, []);
      }

      peerConnection.ondatachannel = (event) => {
        setReceiveChannel(event.channel);
      };

      sendChannel.onopen = () => {
        setSendChannel(sendChannel);
      };
    } catch (error) {
      console.error('CREATE PEER CONNECTION ERROR:', error);
    }
  };

  // Принять webrtc answer и установить его
  const setAnswer = async (answer: RTCSessionDescriptionInit) => {
    if (!getPeerConnection()) return;
    await getPeerConnection().setRemoteDescription(new RTCSessionDescription(answer));
  };

  const getPeerConnection = () => {
    return companionRef.current && peerConnections.current.get(companionRef.current.id);
  };

  const getIceCandidateArray = () => {
    return companionRef.current && iceCandidates.current.get(companionRef.current.id);
  };

  // Создать webrtc offer и отправить его собеседнику
  const createOffer = async () => {
    if (!getPeerConnection() || !companionRef.current) return;
    const offer = await getPeerConnection().createOffer();
    await getPeerConnection().setLocalDescription(offer);
    const jsonOffer = JSON.stringify(offer);
    await dispatch(
      broadcastWebRtcOffer({ toUserId: companionRef.current.id, offer: jsonOffer })
    ).unwrap();
  };

  // Создать webrtc answer и отправить его собеседнику
  const createAnswer = async (offer: RTCSessionDescriptionInit) => {
    if (!getPeerConnection() || !companionRef.current) return;
    await getPeerConnection().setRemoteDescription(new RTCSessionDescription(offer));
    const answer = await getPeerConnection().createAnswer();
    await getPeerConnection().setLocalDescription(answer);
    const jsonAnswer = JSON.stringify(answer);
    await dispatch(
      broadcastWebRtcAnswer({ toUserId: companionRef.current.id, answer: jsonAnswer })
    ).unwrap();
  };

  const hangUp = async () => {
    await closeStream();
  };

  const closeStream = () => {
    if (
      companionRef.current &&
      peerConnections.current.get(companionRef.current.id) &&
      getPeerConnection()?.removeStream
    ) {
      getPeerConnection().ontrack = null;
      getPeerConnection().onnicecandidate = null;
      getPeerConnection().oniceconnectionstatechange = null;
      getPeerConnection().onsignalingstatechange = null;
      getPeerConnection().onicegatheringstatechange = null;
      getPeerConnection().onnotificationneeded = null;
      getPeerConnection().close();
      peerConnections.current.delete(companionRef.current.id);
    }
    try {
      if (companionRef.current && iceCandidates.current.get(companionRef.current.id)) {
        iceCandidates.current.delete(companionRef.current.id);
      }
    } catch {
      console.log('closeStream icecandidates delete error');
    }
    console.log('SUCCESSFUL STREAM CLOSE');
  };

  return null;
};

export default WebRTCProvider;
