import React from 'react';
import { createUseStyles } from 'react-jss';

import { SECONDARY_COLOR } from '@/theme';

import { useCurrentViewDialog } from '../hooks/useCurrentViewDialog';
import { useCurrentViewDialogOpponent } from '../hooks/useCurrentViewDialogOpponent';

export const DialogFooter = () => {
  const classes = useStyles();
  const dialog = useCurrentViewDialog();

  return <div className={classes.container}></div>;
};

const useStyles = createUseStyles({
  container: {
    height: 60,
    backgroundColor: SECONDARY_COLOR,
  },
});
