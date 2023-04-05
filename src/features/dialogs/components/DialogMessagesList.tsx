import React, { FC } from 'react';
import { createUseStyles } from 'react-jss';

import { Message } from '@/types/dialogs';

import DialogMessageListItem from './DialogMessageListItem';

interface Props {
  messages: Message[];
}

const DialogMessagesList: FC<Props> = ({ messages }) => {
  const classes = useStyles();

  return (
    <ul className={classes.container}>
      {messages.map((message) => (
        <DialogMessageListItem key={message.id} message={message} />
      ))}
    </ul>
  );
};

const useStyles = createUseStyles({
  container: {},
});

export default DialogMessagesList;
