import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';

import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { DialogModal, PrimaryButton } from '@/components/Elements';
import { Form } from '@/components/Form';
import { TextInput } from '@/components/Form/TextInput';
import { setCreateDialogModalOpen } from '@/features/modals';

export const DialogCreateModal = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const open = useAppSelector((state) => state.modals.createDialogModalOpen);

  const [opponentLogin, setOpponentLogin] = useState('');
  const [dialogCreating, setDialogCreating] = useState(false);

  const handleModalClose = () => {
    dispatch(setCreateDialogModalOpen(false));
  };

  const handleDialogCreate = async (values: any) => {};

  return (
    <DialogModal open={open} closeCallback={handleModalClose}>
      <div className={classes.container}>
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
      </div>
    </DialogModal>
  );
};

const useStyles = createUseStyles({
  inputLabel: {
    color: 'black',
  },
  form: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  container: {},
});
