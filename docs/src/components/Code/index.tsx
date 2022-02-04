import React, { ReactNode } from 'react';
import clsx from 'clsx';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import highlightStyle from '@/resources/styles/highlight/light.js';
import s from './Code.module.css';

interface ICodeProps {
  className: string;
  children: ReactNode;
}

const Code = ({ className, children }: ICodeProps) => {
  return (
    <SyntaxHighlighter
      className={clsx(s.code, className)}
      language="jsx"
      style={highlightStyle}
      showLineNumbers>
      {children.toString().trim()}
    </SyntaxHighlighter>
  );
};

export default Code;
