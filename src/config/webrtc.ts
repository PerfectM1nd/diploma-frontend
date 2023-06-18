export const initialRTCPeerConnectionConfig: RTCConfiguration = {
  iceServers: [
    {
      urls: 'stun:stun.call.explawyer.com',
    },
    {
      urls: 'turn:turn.call.explawyer.com',
      credential: 'somepassword',
      username: 'guest',
    },
    { urls: 'stun:stun.l.google.com:19302' },
    { urls: 'stun:stun.services.mozilla.com' },
    { urls: 'stun:stun.stunprotocol.org:3478' },
  ],
  iceTransportPolicy: 'all',
  bundlePolicy: 'max-bundle',
  rtcpMuxPolicy: 'require',
};
