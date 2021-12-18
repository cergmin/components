import React from 'react';
import clsx from 'clsx';
import s from './HelloWorld.module.css';

export type HelloWorldProps = React.HTMLProps<HTMLDivElement>;

export const HelloWorld = ({ className }: HelloWorldProps) => {
  return <h1 className={clsx(s.helloWorld, className)}>Hello, world!</h1>;
};
