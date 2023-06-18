import React, { useContext, useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';

import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { addDialogMessage } from '@/features/dialogs';
import { WebRTCContext } from '@/providers/app';
import { PRIMARY_COLOR_LIGHTENED } from '@/theme';

import { useCurrentViewDialog } from '../hooks/useCurrentViewDialog';

export const DialogFooter = () => {
  const classes = useStyles();
  const dialog = useCurrentViewDialog();
  const dispatch = useAppDispatch();
  const { sendChannel, receiveChannel } = useContext(WebRTCContext);
  const companion = useAppSelector((state) => state.webrtc.companion);
  const authUser = useAppSelector((state) => state.auth.user);

  const [messageText, setMessageText] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessageText(event.target.value);
  };

  const handleMessageSend = () => {
    if (!sendChannel) return;
    sendChannel.send(messageText);
    dispatch(addDialogMessage({ text: messageText, ownerId: authUser.id }));
    setMessageText('');
  };

  useEffect(() => {
    if (!receiveChannel) return;
    receiveChannel.onmessage = (message) => {
      dispatch(addDialogMessage({ text: message.data, ownerId: companion.id }));
    };
  }, [receiveChannel]);

  return (
    <div className={classes.container}>
      <input
        type="text"
        value={messageText}
        onChange={handleInputChange}
        className={classes.messageInput}
      />
      <div className={classes.buttonContainer} onClick={handleMessageSend}>
        <div className={classes.sendButton}>Отправить</div>
      </div>
    </div>
  );
};

const useStyles = createUseStyles({
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexGrow: 1,
  },
  sendButton: {
    padding: 10,
    backgroundColor: 'white',
    color: 'black',
    borderRadius: 5,
    userSelect: 'none',
    cursor: 'pointer',
    transition: 'background-color .3s',
    '&:hover': {
      backgroundColor: '#BBBBBB',
    },
    '&:active': {
      transition: 'none',
      backgroundColor: '#808080',
    },
  },
  messageInput: {
    height: 50,
    width: '80%',
    backgroundColor: 'transparent',
    fontSize: 20,
    color: 'white',
  },
  container: {
    paddingLeft: 10,
    height: 60,
    backgroundColor: PRIMARY_COLOR_LIGHTENED,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
