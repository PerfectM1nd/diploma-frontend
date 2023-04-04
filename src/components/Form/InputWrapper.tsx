import * as React from 'react';
import { FC } from 'react';

interface Props {
  label?: string;
  labelClassName?: string;
  containerClassName?: string;
  children: React.ReactNode;
}

export const InputWrapper: FC<Props> = (props) => {
  const { label, labelClassName, containerClassName, children } = props;

  return (
    <div className={containerClassName}>
      <label className={labelClassName}>
        {label}
        <div>{children}</div>
      </label>
    </div>
  );
};
