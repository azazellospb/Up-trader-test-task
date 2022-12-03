import React from 'react'
import { useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { showModal } from '../../store/modalReducer';
import { CustomButton } from '../CustomButton';
import { AddProjectIcon } from '../icons/AddProjectIcon';
import { AddTaskIcon } from '../icons/AddTaskIcon';
import styles from './Header.module.css';

export const Header = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const isProject = location.pathname === '/projects'
  const itemId = `new${isProject ? 'project' : 'task'}`
  return (
    <header className={styles.headerBox}>
      <Link to='/'>
        <h1 className={styles.logo}>TODO App</h1>
      </Link>
      <CustomButton style={styles.CustomBtn} handleClick={() => dispatch(showModal(itemId))}>
        {isProject ? <AddProjectIcon /> : <AddTaskIcon />}
        <div>{'Создать нов'}{isProject ? 'ый проект' : 'ую задачу' }</div>
      </CustomButton>
    </header>
  )
}