import React from 'react';
import { createUseStyles } from 'react-jss';

export const DialogEmptyDialogContent = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.label}>Выберите диалог или создайте новый</div>
    </div>
  );
};

const useStyles = createUseStyles({
  label: {
    fontSize: 20,
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    flexGrow: 1,
  },
});
