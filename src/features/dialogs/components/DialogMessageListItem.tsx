import React, { FC } from 'react';
import { createUseStyles } from 'react-jss';

import { Message } from '@/types/dialogs';

interface Props {
  message: Message;
}

const DialogMessageListItem: FC<Props> = ({ message }) => {
  const classes = useStyles();

  return <li className={classes.container}>{message.text}</li>;
};

const useStyles = createUseStyles({
  container: {},
});

export default DialogMessageListItem;
