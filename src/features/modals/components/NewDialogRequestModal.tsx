import React from 'react';
import { createUseStyles } from 'react-jss';

import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { DialogModal, PrimaryButton } from '@/components/Elements';
import { setNewDialogRequestModalOpen } from '@/features/modals';

export const NewDialogRequestModal = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const open = useAppSelector((state) => state.modals.newDialogRequestModalOpen);

  const handleModalClose = () => {
    dispatch(setNewDialogRequestModalOpen(false));
  };

  return (
    <DialogModal open={open} closeCallback={handleModalClose}>
      <div className={classes.container}>
        <div className={classes.textContainer}>
          <div>Входящий запрос на создание диалога</div>
          <div>
            от пользователя с ником <span className={classes.nickName}>FoxyPro</span>
          </div>
        </div>
        <div className={classes.buttonContainer}>
          <PrimaryButton onClick={handleModalClose} buttonText="ПРИНЯТЬ ЗАПРОС" />
        </div>
      </div>
    </DialogModal>
  );
};

const useStyles = createUseStyles({
  nickName: {
    fontWeight: 700,
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 20,
  },
  buttonContainer: {},
  container: {
    width: 350,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
});
