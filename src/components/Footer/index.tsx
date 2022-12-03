import React from 'react';
import { CustomUpdateForm } from '../CustomUpdateForm';
import { Modal } from '../Modal';
import styles from './Footer.module.css';

export const Footer = () => {
  return (
    <footer
      className={styles.footer}
    >
      <span>UpTrader ToDo app</span>
      <span>
        Made by
        {' '}
        <a href="https://github.com/azazellospb" target="blank">Anton Ivanov</a>
        , 2022
      </span>
      <Modal render={(id)=> <CustomUpdateForm itemId={id} />} />
    </footer>
  )
}
