import React, { FC } from 'react';
import { createUseStyles } from 'react-jss';
import ScrollableFeed from 'react-scrollable-feed';

import { Message } from '@/types/dialogs';

import DialogMessageListItem from './DialogMessageListItem';

interface Props {
  messages: Message[];
}

const DialogMessagesList: FC<Props> = ({ messages }) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <ScrollableFeed>
        <div style={{ flexGrow: 1 }}></div>
        {messages.map((message) => (
          <DialogMessageListItem key={message.id} message={message} />
        ))}
      </ScrollableFeed>
    </div>
  );
};

const useStyles = createUseStyles({
  container: {
    '& > div': {
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1,
      overflowY: 'auto',
      maxHeight: 'calc(100vh - 120px)',
    },
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
  },
});

export default DialogMessagesList;
