import { ReactNode, MouseEventHandler } from 'react';
export interface SimpleButtonProps {
    id?: string;
    children?: ReactNode;
    className?: string;
    disabled?: boolean;
    onClick?: MouseEventHandler<HTMLButtonElement>;
}
export declare const SimpleButton: ({ id, children, className, disabled, onClick, }: SimpleButtonProps) => JSX.Element;
