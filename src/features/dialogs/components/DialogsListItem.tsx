import React, { FC } from 'react';
import { createUseStyles } from 'react-jss';
import { useLocation, useNavigate } from 'react-router-dom';

import { PRIMARY_COLOR, PRIMARY_COLOR_LIGHTENED } from '@/theme';
import { Dialog } from '@/types/dialogs';

import { useDialogMessages } from '../hooks/useDialogMessages';
import { useDialogOpponent } from '../hooks/useDialogOpponent';

interface Props {
  dialog: Dialog;
}

const DialogsListItem: FC<Props> = ({ dialog }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const opponent = useDialogOpponent(dialog);
  const messages = useDialogMessages(dialog.id);

  const isActiveLink = () => {
    return location.pathname === '/dialogs/' + dialog.id;
  };

  const handleClick = () => {
    navigate('/dialogs/' + dialog.id);
  };

  const getFirstMessageText = () => {
    return messages[messages.length - 1]?.text;
  };

  return (
    <li
      style={{
        backgroundColor: isActiveLink() ? PRIMARY_COLOR_LIGHTENED : 'white',
        color: isActiveLink() ? 'white' : 'black',
      }}
      className={classes.container}
      onClick={handleClick}
    >
      <div className={classes.opponentLogin}>{opponent.login}</div>
      <div className={classes.lastMessageText}>{getFirstMessageText()}</div>
    </li>
  );
};

const useStyles = createUseStyles({
  lastMessageText: {
    padding: 5,
  },
  opponentLogin: {
    fontSize: 18,
    fontWeight: 500,
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
