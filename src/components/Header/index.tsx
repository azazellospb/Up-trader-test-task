import React from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Link, useLocation, useParams } from 'react-router-dom';
import { IRootState } from '../../store';
import { showModal } from '../../store/modalReducer';
import { CustomButton } from '../CustomButton';
import { AddProjectIcon } from '../icons/AddProjectIcon';
import { AddTaskIcon } from '../icons/AddTaskIcon';
import styles from './Header.module.css';

export const Header = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const params = useParams();
  const isProject = location.pathname === '/projects';
  const projects = useSelector((state: IRootState) => state.projectReducer.projects);
  let current;
  current = !isProject ? projects.find((project: any) => project.id === params.project) : undefined;
  let isDone = false;
  isDone = !isProject ? current?.status === 'done' : isDone;
  const itemId = `new${isProject ? 'project' : 'task'}`
  return (
    <header className={styles.headerBox}>
      <Link to='/'>
        <h1 className={styles.logo}>TODO App</h1>
      </Link>
      {(!isDone || isProject) && <CustomButton style={styles.CustomBtn} handleClick={() => dispatch(showModal(itemId))}>
        {isProject ? <AddProjectIcon /> : <AddTaskIcon />}
        <div>{'Создать нов'}{isProject ? 'ый проект' : 'ую задачу' }</div>
      </CustomButton>}
    </header>
  )
}