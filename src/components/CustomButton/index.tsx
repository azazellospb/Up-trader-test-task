import React from 'react';
import styles from './CustomButton.module.css'
const classNames = require('classnames');

type TCustomButton = {
  handleClick: (arg?:any) => void;
  children: Array<React.ReactNode | string> | React.ReactNode | string;
  style?: string
}

export const CustomButton = ({handleClick, children, style}: TCustomButton) => {
  return (
    <button type="button" onClick={handleClick} className={styles.button}>
      <div className={classNames([styles.container, style])}>
        {children}
      </div>
    </button>
  )
}
