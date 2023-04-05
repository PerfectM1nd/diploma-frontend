import React, { FC } from 'react';
import { createUseStyles } from 'react-jss';

import { Dialog } from '@/types/dialogs';

import { useDialogOpponent } from '../hooks/useDialogOpponent';

interface Props {
  dialog: Dialog;
}

const DialogsListItem: FC<Props> = ({ dialog }) => {
  const classes = useStyles();
  const opponent = useDialogOpponent(dialog);

  return (
    <li className={classes.container}>
      <div className={classes.opponentLogin}>{opponent.login}</div>
    </li>
  );
};

const useStyles = createUseStyles({
  opponentLogin: {},
  container: {},
});

export default DialogsListItem;
