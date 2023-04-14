import React, { FC, useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { Link } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { PrimaryButton } from '@/components/Elements';
import { Form } from '@/components/Form';
import { TextInput } from '@/components/Form/TextInput';
import { LAYOUT_LIGHT_BACKGROUND_COLOR } from '@/theme';

import { register } from '../authThunks';

interface Props {
  onSuccess: () => void;
}

export const RegisterForm: FC<Props> = ({ onSuccess }) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);

  useEffect(() => {
    if (user) onSuccess();
  }, [onSuccess, user]);

  const handleRegister = async (event: SubmitEvent) => {
    event.preventDefault();
    if (!validateForm()) return;
    setLoggingIn(true);
    await dispatch(register({ login, password }));
    setLoggingIn(false);
  };

  const validateForm = () => {
    if (!login) {
      alert('Введите логин');
      return false;
    }
    if (!password) {
      alert('Введите пароль');
      return false;
    }
    if (password !== passwordRepeat) {
      alert('Пароли не совпадают');
      return false;
    }
    if (login.length > 64) {
      alert('Максимальная длина логина - 64 символа');
      return false;
    }
    return true;
  };

  return (
    <div className={classes.container}>
      <Form onSubmit={handleRegister} className={classes.form}>
        <TextInput value={login} setValue={setLogin} type="text" label="Логин" />
        <TextInput value={password} setValue={setPassword} type="password" label="Пароль" />
        <TextInput
          value={passwordRepeat}
          setValue={setPasswordRepeat}
          type="password"
          label="Повторите пароль"
        />
        <div>
          <PrimaryButton loading={loggingIn} submit buttonText="Зарегистрироваться" />
        </div>
      </Form>
      <div className={classes.linkContainer}>
        <Link to="/auth/login" className={classes.registerLink}>
          Войти
        </Link>
      </div>
    </div>
  );
};

const useStyles = createUseStyles({
  linkContainer: {
    marginTop: 20,
  },
  registerLink: {
    fontWeight: 500,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  form: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: LAYOUT_LIGHT_BACKGROUND_COLOR,
    padding: 50,
    borderRadius: 10,
  },
});
