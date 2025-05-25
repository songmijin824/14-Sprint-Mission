'use client';

import React from 'react';
import Link from 'next/link';
import styles from './Button.module.css';
import clsx from 'clsx';

interface ButtonProps {
  variant: string;
  size: string;
  width?: number;
  children?: React.ReactNode;
  className?: string;
  childrenClassName?: string;
  [key: string]: any; 
}
function Button({ variant, className, size, width, childrenClassName, link, children, ...restProps } : ButtonProps) {
  const combinedClassName = clsx( styles.btn,  styles[variant] , styles[size] , className);
  const inlineStyle = width ? { width: `${width}px`, minWidth: `${width}px` } : { width:'100%' };

  if (link) {
    return (
      <Link
        href={link}
        className={combinedClassName}
        style={inlineStyle}
        {...restProps}
        >
          <span className={clsx(styles.top,childrenClassName)}>{children}</span>
          <span className={clsx(styles.front,childrenClassName)}>{children}</span>
      </Link>
    );
  }
  return (            
    <button
      className={combinedClassName}
      style={inlineStyle}
      {...restProps}
      >
      <span className={clsx(styles.top,childrenClassName)}>{children}</span>
      <span className={clsx(styles.front,childrenClassName)}>{children}</span>
    </button>
  );
}

export default Button;
