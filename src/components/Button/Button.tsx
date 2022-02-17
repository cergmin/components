import React, { ReactNode, MouseEventHandler } from 'react';
import clsx from 'clsx';
import s from './Button.module.css';

export interface ButtonProps {
  id?: string;
  children?: ReactNode;
  className?: string;
  href?: string;
  target?: '_blank' | '_self' | '_parent' | '_top';
  type?: 'button' | 'submit' | 'reset';
  appearance?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'warning'
    | 'link';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
}

export const Button = ({
  id,
  children,
  className,
  href,
  target,
  type,
  appearance,
  size,
  disabled,
  loading,
  onClick,
}: ButtonProps) => {
  // Setting defaults
  target = target || '_self';
  type = type || 'button';
  appearance = appearance || 'primary';
  size = size || 'medium';

  const buttonContent = <div className={s.content}>{children}</div>;

  const appearanceClassName =
    'appearance' +
    appearance[0].toUpperCase() +
    appearance.slice(1).toLowerCase();

  const sizeClassName =
    'size' + size[0].toUpperCase() + size.slice(1).toLowerCase();

  const componentProps = {
    id: id,
    className: clsx(
      s.button,
      s[appearanceClassName],
      s[sizeClassName],
      loading && s.loading,
      disabled && s.disabled,
      className,
    ),
    tabIndex: disabled ? -1 : undefined,
    'aria-disabled': disabled,
    onClick: disabled || loading ? undefined : onClick,
  };

  if (href) {
    return (
      <a
        {...componentProps}
        href={disabled ? undefined : href}
        target={target}
        rel="noopener noreferrer">
        {buttonContent}
      </a>
    );
  }

  return (
    <button {...componentProps} type={type} disabled={disabled}>
      {buttonContent}
    </button>
  );
};
