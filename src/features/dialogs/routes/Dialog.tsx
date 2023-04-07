import React, { useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import { useParams } from 'react-router-dom';

import { useAppDispatch } from '@/app/hooks';
import { setCurrentViewDialogId } from '@/features/dialogs';
import { LAYOUT_BACKGROUND_COLOR } from '@/theme';

import { DialogBlock } from '../components/DialogBlock';

export const Dialog = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const { dialogId } = useParams();

  useEffect(() => {
    dispatch(setCurrentViewDialogId(parseInt(dialogId || '0') || null));
  }, [dialogId, dispatch]);

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
