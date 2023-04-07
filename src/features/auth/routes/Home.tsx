import React from 'react';
import { createUseStyles } from 'react-jss';
import { useNavigate } from 'react-router-dom';

import { PrimaryButton } from '@/components/Elements';
import { LAYOUT_BACKGROUND_COLOR, LAYOUT_LIGHT_BACKGROUND_COLOR } from '@/theme';

export const Home = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const handleLoginButtonClick = () => {
    navigate('/auth/login');
  };

  const handleRegisterButtonClick = () => {
    navigate('/auth/register');
  };

  return (
    <div className={classes.container}>
      <div className={classes.buttonsContainer}>
        <div className={classes.loginButtonContainer}>
          <PrimaryButton buttonText="Войти в систему" onClick={handleLoginButtonClick} />
        </div>
        <PrimaryButton buttonText="Зарегистрироваться" onClick={handleRegisterButtonClick} />
      </div>
    </div>
  );
};

const useStyles = createUseStyles({
  loginButtonContainer: {
    marginBottom: 20,
  },
  buttonsContainer: {
    width: 400,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    padding: 50,
    borderRadius: 10,
    backgroundColor: LAYOUT_LIGHT_BACKGROUND_COLOR,
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    backgroundColor: LAYOUT_BACKGROUND_COLOR,
  },
});
