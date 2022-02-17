import React, { ReactNode } from 'react';
import clsx from 'clsx';
import s from './Example.module.css';

export interface IExmapleProps {
  className: string;
  children: ReactNode;
}

const Exmaple = ({ className, children }: IExmapleProps) => {
  return <div className={clsx(s.example, className)}>{children}</div>;
};

export default Exmaple;
