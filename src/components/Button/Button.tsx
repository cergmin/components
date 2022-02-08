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
  iconStart?: ReactNode;
  iconEnd?: ReactNode;
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
  iconStart,
  iconEnd,
  disabled,
  loading,
  onClick,
}: ButtonProps) => {
  // Setting defaults
  target = target || '_self';
  type = type || 'button';
  appearance = appearance || 'primary';
  size = size || 'medium';

  const buttonContent = (
    <>
      {iconStart && <div className={s.iconStart}>{iconStart}</div>}
      <div className={s.content}>{children}</div>
      {iconEnd && <div className={s.iconEnd}>{iconEnd}</div>}
    </>
  );

  const appearanceClassName =
    'appearance' +
    appearance[0].toUpperCase() +
    appearance.slice(1).toLowerCase();

  const sizeClassName =
    'size' + size[0].toUpperCase() + size.slice(1).toLowerCase();

  if (href) {
    return (
      <a
        id={id}
        className={clsx(
          s.button,
          s[appearanceClassName],
          s[sizeClassName],
          loading && s.loading,
          disabled && s.disabled,
          className,
        )}
        href={disabled ? undefined : href}
        target={target}
        rel="noopener noreferrer"
        tabIndex={disabled ? -1 : undefined}
        aria-disabled={disabled}
        onClick={onClick}>
        {buttonContent}
      </a>
    );
  }

  return (
    <button
      id={id}
      className={clsx(
        s.button,
        s[appearanceClassName],
        s[sizeClassName],
        loading && s.loading,
        className,
      )}
      type={type}
      disabled={disabled}
      onClick={onClick}>
      {buttonContent}
    </button>
  );
};
