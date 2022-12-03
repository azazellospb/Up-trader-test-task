import React from 'react';
import { CustomUpdateForm } from '../CustomUpdateForm';
import { Modal } from '../Modal';
import { Submodal } from '../Submodal';
import { SubtaskForm } from '../SubtaskForm';
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
      <Submodal render={(id)=> <SubtaskForm itemId={id} />} />
    </footer>
  )
}
