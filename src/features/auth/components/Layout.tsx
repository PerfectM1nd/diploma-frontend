import React, { FC } from 'react';
import { createUseStyles } from 'react-jss';

import { LAYOUT_BACKGROUND_COLOR } from '@/theme';

interface Props {
  children: React.ReactNode;
}

export const Layout: FC<Props> = ({ children }) => {
  const classes = useStyles();

  return <div className={classes.container}>{children}</div>;
};

const useStyles = createUseStyles({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    backgroundColor: LAYOUT_BACKGROUND_COLOR,
  },
});
