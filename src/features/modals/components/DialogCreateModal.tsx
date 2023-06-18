import React, { useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';

import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { DialogModal, PrimaryButton } from '@/components/Elements';
import { Form } from '@/components/Form';
import { TextInput } from '@/components/Form/TextInput';
import { setCreateDialogModalOpen } from '@/features/modals';
import { sendDialogOffer, setOutgoingOfferStatus } from '@/features/webrtc';

export const DialogCreateModal = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const open = useAppSelector((state) => state.modals.createDialogModalOpen);
  const outgoingOfferStatus = useAppSelector((state) => state.webrtc.outgoingOfferStatus);
  const connectionEstablished = useAppSelector((state) => state.webrtc.connectionEstablished);
  const companion = useAppSelector((state) => state.webrtc.companion);

  const [opponentLogin, setOpponentLogin] = useState('');
  const [dialogCreating, setDialogCreating] = useState(false);

  const handleModalClose = () => {
    dispatch(setCreateDialogModalOpen(false));
    dispatch(setOutgoingOfferStatus(null));
  };

  const handleDialogCreate = async (event: SubmitEvent) => {
    event.preventDefault();
    setDialogCreating(true);
    await dispatch(sendDialogOffer(opponentLogin)).unwrap();
    setDialogCreating(false);
  };

  useEffect(() => {
    if (connectionEstablished) handleModalClose();
  }, [connectionEstablished]);

  return (
    <DialogModal open={open} closeCallback={handleModalClose}>
      <div className={classes.container}>
        {outgoingOfferStatus === null && (
          <Form onSubmit={handleDialogCreate} className={classes.form}>
            <TextInput
              value={opponentLogin}
              setValue={setOpponentLogin}
              type="text"
              label="Логин адресата"
              labelClassName={classes.inputLabel}
            />
            <div>
              <PrimaryButton loading={dialogCreating} submit buttonText="СОЗДАТЬ" />
            </div>
          </Form>
        )}
        {outgoingOfferStatus === 'sent' && (
          <div className={classes.sentLabel}>
            Запрос на создание диалога отправлен пользователю
            <span className={classes.loginLabel}>{opponentLogin || companion?.login}.</span>
            <div>Дождитесь ответа!</div>
          </div>
        )}
        {outgoingOfferStatus === 'rejected' && (
          <div className={classes.rejectedLabel}>
            Пользователь
            <span className={classes.loginLabel}>{opponentLogin || companion?.login}</span>
            отклонил запрос!
          </div>
        )}
        {outgoingOfferStatus === 'accepted' && (
          <div className={classes.acceptedLabel}>
            Пользователь
            <span className={classes.loginLabel}>{opponentLogin || companion?.login}</span>
            <div>принял запрос!</div>
            <div className={classes.connectionLabel}>Установка прямого соединения...</div>
          </div>
        )}
      </div>
    </DialogModal>
  );
};

const useStyles = createUseStyles({
  connectionLabel: {
    marginTop: 20,
    color: 'rgb(57,91,118)',
  },
  container: {
    width: 400,
    height: 220,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    fontSize: 18,
    padding: 20,
  },
  acceptedLabel: {
    color: 'rgb(75,142,27)',
    fontWeight: 500,
    fontSize: 22,
  },
  rejectedLabel: {
    color: 'rgb(142,27,27)',
    fontWeight: 500,
    fontSize: 22,
  },
  loginLabel: {
    margin: '0 5px',
    fontWeight: 500,
  },
  sentLabel: {},
  inputLabel: {
    color: 'black',
  },
  form: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
});
