import React, { FC } from 'react';
import { createUseStyles } from 'react-jss';

interface Props {
  children: React.ReactNode;
}

export const MainLayout: FC<Props> = ({ children }) => {
  const classes = useStyles();

  return <div className={classes.container}>{children}</div>;
};

const useStyles = createUseStyles({
  container: {},
});
