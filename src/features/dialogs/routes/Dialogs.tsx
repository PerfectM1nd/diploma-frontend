import React from 'react';
import { createUseStyles } from 'react-jss';

import { LAYOUT_BACKGROUND_COLOR } from '@/theme';

import { DialogBlock } from '../components/DialogBlock';

export const Dialogs = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <DialogBlock />
    </div>
  );
};

const useStyles = createUseStyles({
  container: {
    backgroundColor: LAYOUT_BACKGROUND_COLOR,
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
  },
});
