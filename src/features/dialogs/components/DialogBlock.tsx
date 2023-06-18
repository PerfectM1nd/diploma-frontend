import React, { useEffect } from 'react';
import { createUseStyles } from 'react-jss';

import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { addDialog } from '@/features/dialogs';
import { DialogCreateModal, DialogRequestModal } from '@/features/modals';
import { LAYOUT_LIGHT_BACKGROUND_COLOR, PRIMARY_COLOR } from '@/theme';
import { User } from '@/types';
import { Dialog } from '@/types/dialogs';

import { DialogContent } from './DialogContent';
import { DialogFooter } from './DialogFooter';
import { DialogHeader } from './DialogHeader';
import { DialogsList } from './DialogsList';

export const DialogBlock = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const authUser = useAppSelector((state) => state.auth.user);
  const outgoingOfferStatus = useAppSelector((state) => state.webrtc.outgoingOfferStatus);
  const incomingOfferStatus = useAppSelector((state) => state.webrtc.incomingOfferStatus);
  const companion = useAppSelector((state) => state.webrtc.companion);
  const dialogs = useAppSelector((state) => state.dialogs.dialogs);

  const isDialogExist = (users: User[]) => {
    return (
      dialogs &&
      !!dialogs.find((dialog: Dialog) => JSON.stringify(dialog.users) === JSON.stringify(users))
    );
  };

  useEffect(() => {
    if ((outgoingOfferStatus !== 'accepted' && incomingOfferStatus !== 'accepted') || !companion)
      return;
    if (isDialogExist([companion, authUser])) return;
    dispatch(addDialog([companion, authUser]));
  }, [outgoingOfferStatus, incomingOfferStatus, companion]);

  return (
    <div className={classes.container}>
      <section className={classes.leftBlock}>
        <div className={classes.leftBlockHeaderContainer}>
          <DialogHeader />
        </div>
        <DialogContent />
        <DialogFooter />
      </section>
      <section className={classes.rightBlock}>
        <div className={classes.rightBlockHeaderContainer}>Список диалогов</div>
        <DialogsList />
      </section>
      <DialogCreateModal />
      <DialogRequestModal />
    </div>
  );
};

const useStyles = createUseStyles({
  rightBlock: {
    width: 400,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'space-between',
    backgroundColor: 'white',
    overflowY: 'auto',
    borderRight: '1px solid ' + PRIMARY_COLOR,
  },
  leftBlock: {
    width: 800,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'space-between',
    backgroundColor: 'white',
    borderRight: '1px solid ' + PRIMARY_COLOR,
    borderLeft: '1px solid ' + PRIMARY_COLOR,
  },
  rightBlockHeaderContainer: {
    minHeight: 60,
    maxHeight: 60,
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    fontSize: 18,
    borderBottom: '1px solid ' + PRIMARY_COLOR,
    padding: '0 20px',
    backgroundColor: LAYOUT_LIGHT_BACKGROUND_COLOR,
  },
  leftBlockHeaderContainer: {
    minHeight: 60,
    maxHeight: 60,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: 18,
    padding: '0 20px',
    borderBottom: '1px solid ' + PRIMARY_COLOR,
    backgroundColor: LAYOUT_LIGHT_BACKGROUND_COLOR,
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    flexGrow: 1,
  },
});
