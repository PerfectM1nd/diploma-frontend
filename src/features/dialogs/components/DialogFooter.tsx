import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';

import { useAppDispatch } from '@/app/hooks';
import { sendMessage } from '@/features/dialogs';
import { PRIMARY_COLOR_LIGHTENED } from '@/theme';
import { rc4 } from '@/utils/rc4';

import { useCurrentViewDialog } from '../hooks/useCurrentViewDialog';

export const DialogFooter = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const dialog = useCurrentViewDialog();

  const [messageText, setMessageText] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessageText(event.target.value);
  };

  const handleMessageSend = () => {
    if (!dialog?.id) return;
    dispatch(
      sendMessage({
        dialogId: dialog.id,
        text: rc4('ENCRYPTION_KEY', messageText),
      })
    );
    setMessageText('');
  };

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
