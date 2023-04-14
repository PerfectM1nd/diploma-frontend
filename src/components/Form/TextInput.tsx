import clsx from 'clsx';
import { FC } from 'react';
import { createUseStyles } from 'react-jss';

import { InputWrapper } from './InputWrapper';

interface Props {
  type?: 'text' | 'email' | 'password';
  className?: string;
  label: string;
  labelClassName?: string;
  value: string;
  setValue(value: string): void;
}

export const TextInput: FC<Props> = ({
  type,
  className,
  label,
  labelClassName,
  value,
  setValue,
}) => {
  const classes = useStyles();

  const handleInputChange = (event: any) => {
    setValue(event.target?.value as string);
  };

  return (
    <InputWrapper
      label={label}
      labelClassName={clsx(classes.label, labelClassName)}
      containerClassName={classes.inputWrapper}
    >
      <input
        value={value}
        onChange={handleInputChange}
        type={type}
        className={clsx(classes.input, className)}
      />
    </InputWrapper>
  );
};

const useStyles = createUseStyles({
  inputWrapper: {
    marginBottom: 20,
  },
  input: {
    fontSize: 18,
    padding: 10,
    border: '1px solid black',
    borderRadius: 5,
    marginTop: 5,
  },
  label: {
    fontSize: 15,
  },
});
