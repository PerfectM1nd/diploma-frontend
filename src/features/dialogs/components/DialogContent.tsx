import React from 'react';
import { createUseStyles } from 'react-jss';

import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { PrimaryButton } from '@/components/Elements';
import { setCreateDialogModalOpen } from '@/features/modals';
import { sendDialogOffer, setCompanion } from '@/features/webrtc';
import { LAYOUT_LIGHT_BACKGROUND_COLOR } from '@/theme';

import { useCurrentViewDialogMessages } from '../hooks/useCurrentViewDialogMessages';
import { useCurrentViewDialogOpponent } from '../hooks/useCurrentViewDialogOpponent';

import { DialogEmptyDialogContent } from './DialogEmptyDialogContent';
import DialogMessagesList from './DialogMessagesList';

export const DialogContent = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const messages = useCurrentViewDialogMessages();
  const dialogOpponent = useCurrentViewDialogOpponent();
  const connectionEstablished = useAppSelector((state) => state.webrtc.connectionEstablished);

  const handleReconnectButtonClick = async () => {
    if (!dialogOpponent) return;
    dispatch(setCompanion(dialogOpponent));
    await dispatch(sendDialogOffer(dialogOpponent.login)).unwrap();
    dispatch(setCreateDialogModalOpen(true));
  };

  const displayReconnectButton = () => {
    if (!messages) return false;
    return !connectionEstablished;
  };

  return (
    <div className={classes.container}>
      {messages ? <DialogMessagesList messages={messages} /> : <DialogEmptyDialogContent />}
      {displayReconnectButton() && (
        <div className={classes.reconnectButtonContainer}>
          <PrimaryButton
            buttonText="ОТПРАВИТЬ ЗАПРОС НА ПОДКЛЮЧЕНИЕ"
            onClick={handleReconnectButtonClick}
          />
        </div>
      )}
    </div>
  );
};

const useStyles = createUseStyles({
  reconnectButtonContainer: {
    padding: 30,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: LAYOUT_LIGHT_BACKGROUND_COLOR,
  },
});
