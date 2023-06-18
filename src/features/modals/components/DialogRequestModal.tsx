import React from 'react';
import { createUseStyles } from 'react-jss';

import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { DialogModal, PrimaryButton } from '@/components/Elements';
import { setNewDialogRequestModalOpen } from '@/features/modals';
import { sendOfferAccept, sendOfferReject } from '@/features/webrtc';

export const DialogRequestModal = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const incomingOfferStatus = useAppSelector((state) => state.webrtc.incomingOfferStatus);
  const companion = useAppSelector((state) => state.webrtc.companion);
  const connectionEstablished = useAppSelector((state) => state.webrtc.connectionEstablished);

  const handleModalClose = () => {
    dispatch(setNewDialogRequestModalOpen(false));
  };

  const handleAcceptButtonClick = () => {
    if (!companion) return;
    dispatch(sendOfferAccept(companion.login));
  };

  const handleRejectButtonClick = () => {
    if (!companion) return;
    dispatch(sendOfferReject(companion.login));
  };

  const getIsDialogOpen = () => {
    return (
      (incomingOfferStatus === 'received' || incomingOfferStatus === 'accepted') &&
      !connectionEstablished
    );
  };

  return (
    <DialogModal open={getIsDialogOpen()} closeCallback={handleModalClose}>
      <div className={classes.container}>
        {incomingOfferStatus === 'received' && (
          <>
            <div className={classes.textContainer}>
              <div>Входящий запрос на создание диалога</div>
              <div>
                от пользователя с ником <span className={classes.nickName}>{companion?.login}</span>
              </div>
            </div>
            <div className={classes.buttonContainer}>
              <PrimaryButton onClick={handleAcceptButtonClick} buttonText="ПРИНЯТЬ ЗАПРОС" />
            </div>
            <div className={classes.buttonContainer}>
              <PrimaryButton onClick={handleRejectButtonClick} buttonText="ОТКЛОНИТЬ ЗАПРОС" />
            </div>
          </>
        )}
        {incomingOfferStatus === 'accepted' && (
          <div className={classes.connectionLabel}>Установка прямого соединения...</div>
        )}
      </div>
    </DialogModal>
  );
};

const useStyles = createUseStyles({
  connectionLabel: {
    color: 'rgb(57,91,118)',
    padding: 20,
    fontSize: 22,
    textAlign: 'center',
    fontWeight: 500,
  },
  nickName: {
    fontWeight: 700,
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 10,
    textAlign: 'center',
    fontSize: 18,
  },
  buttonContainer: {
    marginTop: 20,
  },
  container: {
    width: 350,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
});
