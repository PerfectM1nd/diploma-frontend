import React from 'react';
import { createUseStyles } from 'react-jss';

export const Dialogs = () => {
  const classes = useStyles();

  return <div className={classes.container}>dialogs list</div>;
};

const useStyles = createUseStyles({
  container: {},
});
