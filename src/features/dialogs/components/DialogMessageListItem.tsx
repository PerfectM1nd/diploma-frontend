import clsx from 'clsx';
import React, { FC } from 'react';
import { createUseStyles } from 'react-jss';

import { useAppSelector } from '@/app/hooks';
import { Message } from '@/types/dialogs';

interface Props {
  message: Message;
}

const DialogMessageListItem: FC<Props> = ({ message }) => {
  const classes = useStyles();
  const authUser = useAppSelector((state) => state.auth.user);

  const isMyMessage = () => {
    return +message.owner_id === authUser.id;
  };

  return (
    <div
      className={clsx(classes.container, isMyMessage() ? classes.myMessage : classes.otherMessage)}
      style={{ alignSelf: isMyMessage() ? 'flex-end' : 'flex-start' }}
    >
      {message.text}
    </div>
  );
};

const useStyles = createUseStyles({
  otherMessage: {
    borderBottomLeftRadius: '0 !important',
  },
  myMessage: {
    borderBottomRightRadius: '0 !important',
  },
  container: {
    width: 'max-content',
    maxWidth: '60%',
    padding: 10,
    borderRadius: 20,
    backgroundColor: 'white',
    color: 'black',
    marginBottom: 10,
    margin: '0 10px',
  },
});

export default DialogMessageListItem;
