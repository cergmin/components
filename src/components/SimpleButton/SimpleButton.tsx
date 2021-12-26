import React, { ReactNode, MouseEventHandler } from 'react';
import clsx from 'clsx';
import s from './SimpleButton.module.css';

export interface SimpleButtonProps {
  id?: string;
  children?: ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export const SimpleButton = ({
  id,
  children,
  className,
  disabled,
  onClick,
}: SimpleButtonProps) => {
  return (
    <button
      className={clsx(s.button, className)}
      type="button"
      {...{ id, disabled, onClick }}>
      {children}
    </button>
  );
};
