import React, { FC } from 'react';
import { createUseStyles } from 'react-jss';
import { useNavigate } from 'react-router-dom';

import { PRIMARY_COLOR, PRIMARY_COLOR_LIGHTENED } from '@/theme';
import { Dialog } from '@/types/dialogs';

import { useDialogOpponent } from '../hooks/useDialogOpponent';

interface Props {
  dialog: Dialog;
}

const DialogsListItem: FC<Props> = ({ dialog }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const opponent = useDialogOpponent(dialog);

  const handleClick = () => {
    navigate('/dialogs/' + dialog.id);
  };

  return (
    <li className={classes.container} onClick={handleClick}>
      <div className={classes.opponentLogin}>{opponent.login}</div>
    </li>
  );
};

const useStyles = createUseStyles({
  opponentLogin: {
    padding: 5,
  },
  container: {
    height: 60,
    borderBottom: '1px solid ' + PRIMARY_COLOR,
    transition: 'background-color .3s',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: PRIMARY_COLOR_LIGHTENED,
    },
  },
});

export default DialogsListItem;
