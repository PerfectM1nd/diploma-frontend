import React from 'react';
import { createUseStyles } from 'react-jss';

import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { PrimaryButton } from '@/components/Elements';
import { setCreateDialogModalOpen } from '@/features/modals';
import { LAYOUT_LIGHT_BACKGROUND_COLOR, PRIMARY_COLOR } from '@/theme';

import DialogsListItem from './DialogsListItem';

export const DialogsList = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const dialogs = useAppSelector((state) => state.dialogs.dialogs);

  const handleCreateDialogButtonClick = () => {
    dispatch(setCreateDialogModalOpen(true));
  };

  return dialogs?.length ? (
    <ul className={classes.container}>
      <li className={classes.listCreateDialogButtonContainer}>
        <PrimaryButton buttonText="Создать диалог" onClick={handleCreateDialogButtonClick} />
      </li>
      {dialogs.map((dialog: any) => (
        <DialogsListItem key={dialog.id} dialog={dialog} />
      ))}
    </ul>
  ) : (
    <div className={classes.emptyLabelContainer}>
      <div className={classes.emptyLabel}>Диалогов пока нет</div>
      <div className={classes.createDialogButtonContainer}>
        <PrimaryButton buttonText="Создать диалог" onClick={handleCreateDialogButtonClick} />
      </div>
    </div>
  );
};

const useStyles = createUseStyles({
  listCreateDialogButtonContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px 0',
    borderBottom: '1px solid ' + PRIMARY_COLOR,
  },
  createDialogButtonContainer: {
    marginTop: 20,
  },
  emptyLabel: {
    fontSize: 20,
  },
  emptyLabelContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    flexGrow: 1,
    paddingBottom: 60,
    backgroundColor: LAYOUT_LIGHT_BACKGROUND_COLOR,
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    backgroundColor: LAYOUT_LIGHT_BACKGROUND_COLOR,
  },
});
