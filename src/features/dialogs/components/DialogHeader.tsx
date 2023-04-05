import React from 'react';
import { createUseStyles } from 'react-jss';

import { useCurrentViewDialog } from '../hooks/useCurrentViewDialog';
import { useCurrentViewDialogOpponent } from '../hooks/useCurrentViewDialogOpponent';

export const DialogHeader = () => {
  const classes = useStyles();
  const dialog = useCurrentViewDialog();
  const opponent = useCurrentViewDialogOpponent();

  return <div className={classes.container}></div>;
};

const useStyles = createUseStyles({
  container: {},
});
