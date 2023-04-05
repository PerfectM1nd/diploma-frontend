import React, { FC } from 'react';
import { createUseStyles } from 'react-jss';

import { DISABLED_BUTTON_COLOR, PRIMARY_COLOR, PRIMARY_COLOR_LIGHTENED } from '@/theme';

import { TouchableOpacity } from './TouchableOpacity';

interface Props {
  buttonText: string;
  onClick?(): void;
  textClassName?: string;
  containerClassName?: string;
  loading?: boolean;
  width?: number;
  disabled?: boolean;
  submit?: boolean;
}

export const PrimaryButton: FC<Props> = ({
  buttonText,
  onClick,
  textClassName,
  containerClassName,
  loading,
  width,
  disabled,
  submit,
}) => {
  const classes = useStyles({ theme: { disabled: !!disabled } });

  return (
    <button
      tabIndex={0}
      type={submit ? 'submit' : 'button'}
      className={`${classes.container} ${containerClassName}`}
      onClick={loading || disabled || submit ? () => null : onClick}
      style={width ? { width: width } : {}}
    >
      <TouchableOpacity className={classes.ripple} disabled={disabled}>
        {loading ? (
          <div>Загрузка...</div>
        ) : (
          <span className={`${classes.buttonText} ${textClassName}`}>{buttonText}</span>
        )}
      </TouchableOpacity>
    </button>
  );
};

const useStyles = createUseStyles(({ disabled }: { disabled: boolean }) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: '250px',
    padding: '0 15px',
    height: 45,
    borderRadius: 5,
    fontSize: 15,
    backgroundColor: disabled ? DISABLED_BUTTON_COLOR : PRIMARY_COLOR,
    color: 'white',
    transition: 'background-color .2s, transform .1s, box-shadow .1s',
    '&:hover': {
      backgroundColor: disabled ? DISABLED_BUTTON_COLOR : PRIMARY_COLOR_LIGHTENED,
    },
    '&:active': {
      transform: disabled ? 'none' : 'translateY(2px)',
      boxShadow: disabled ? DISABLED_BUTTON_COLOR : PRIMARY_COLOR + ' 0px 10px 10px -14px;',
    },
    boxShadow: disabled ? DISABLED_BUTTON_COLOR : PRIMARY_COLOR + ' 0px 10px 10px -11px;',
    '-webkit-tap-highlight-color': 'transparent',
    touchAction: 'manipulation',
    userSelect: 'none',
    border: 'none',
  },
  ripple: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 500,
    textTransform: 'uppercase',
  },
}));
