import * as React from 'react';
import { FC } from 'react';

interface Props {
  className?: string;
  onSubmit(values: any): Promise<void>;
  children: React.ReactNode;
}

export const Form: FC<Props> = ({ onSubmit, children, className }) => {
  return (
    <form className={className} onSubmit={onSubmit}>
      {children}
    </form>
  );
};
