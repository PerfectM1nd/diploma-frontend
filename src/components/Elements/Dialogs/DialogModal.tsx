import React, { FC } from 'react';
import { createUseStyles } from 'react-jss';

import { BACKDROP_COLOR } from '@/theme';

interface Props {
  open: boolean;
  closeCallback(): void;
  children: React.ReactNode;
}

export const DialogModal: FC<Props> = ({ open, closeCallback, children }) => {
  const classes = useStyles();

  const handleBackdropClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    closeCallback();
  };

  return (
    <div
      className={classes.container}
      style={{ opacity: open ? 1 : 0, pointerEvents: open ? 'all' : 'none' }}
    >
      <div className={classes.backdrop} onClick={handleBackdropClick} />
      <div className={classes.content}>{children}</div>
    </div>
  );
};

const useStyles = createUseStyles({
  content: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 999999,
    padding: 30,
    width: 'min-content',
    height: 'min-content',
    backgroundColor: 'white',
    borderRadius: 10,
  },
  backdrop: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 999998,
    backgroundColor: BACKDROP_COLOR,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    transition: 'opacity .3s',
  },
});
