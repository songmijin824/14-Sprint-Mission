
import React from 'react';
import styles from './InputBox.module.css';
import clsx from 'clsx';


interface TextAreaBoxProps {
  placeholder?: string;
  height?: string | number;
  [key: string]: any;
}
export function InputBox({ inputBoxType='text', placeholder,error, ...rest }: TextAreaBoxProps) {
  return (
    <div className="relative">
      <input 
        className={clsx(styles.input,'w-full h-20 text-sm',error && 'outline outline-1 outline-red-500')} 
        type={inputBoxType} 
        placeholder={placeholder}  
        {...rest}
      />
      {error && <span className="absolute top-3 right-3 text-error_red-50 text-base font-normal">{error}</span>}
    </div>
  );
}

export function InputField({ label, inputBoxType, placeholder,error, ...rest }: TextAreaBoxProps) {
  return (
    <div className="relative">
      <label className={styles.label}>
        <span>{label}</span>
        <input 
          className={clsx(styles.input,error && 'outline outline-1 outline-red-500')} 
          type={inputBoxType} 
          placeholder={placeholder}  
          {...rest}
        />
      </label>
      {error && <span className="absolute top-3 right-3 text-error_red-50 text-base font-normal">{error}</span>}
    </div>
  );
}


export function TextAreaBox({ placeholder, height,error, ...rest }: TextAreaBoxProps) {
  return (
    <div className="relative">
      <textarea 
        className={clsx(styles.input,'w-full  text-sm desktop:h-20 mobile:h-36',error && 'outline outline-1 outline-red-500')} 
        placeholder={placeholder}  
        {...rest}
      />
      {error && <span className="absolute top-3 right-3 text-error_red-50 text-base font-normal">{error}</span>}
    </div>
  );
}

export function TextAreaField({ label, placeholder, height,error, ...rest }: TextAreaBoxProps) {
  return (
    <div className="relative">
      <label className={styles.label}>
        <span>{label}</span>
        <textarea 
          className={clsx(styles.textarea,error && 'outline outline-1 outline-red-500')}  
          placeholder={placeholder} 
          style={{ height: 'auto', minHeight: `${height}`}} 
          {...rest}
        />
      </label>
      {error && <span className="absolute top-3 right-3 text-error_red-50 text-base font-normal">{error}</span>}
    </div>
  );
}
