import React from 'react';
import { createUseStyles } from 'react-jss';

import { LAYOUT_LIGHT_BACKGROUND_COLOR } from '@/theme';

import { useCurrentViewDialogMessages } from '../hooks/useCurrentViewDialogMessages';

import { DialogEmptyDialogContent } from './DialogEmptyDialogContent';
import DialogMessagesList from './DialogMessagesList';

export const DialogContent = () => {
  const classes = useStyles();
  const messages = useCurrentViewDialogMessages();

  return (
    <div className={classes.container}>
      {messages ? <DialogMessagesList messages={messages} /> : <DialogEmptyDialogContent />}
    </div>
  );
};

const useStyles = createUseStyles({
  container: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: LAYOUT_LIGHT_BACKGROUND_COLOR,
  },
});
