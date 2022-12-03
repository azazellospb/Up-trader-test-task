import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom'
import { Board } from '../../components/Board';
import { fetchAllTasks } from '../../store/taskReducer';
import styles from './TasksPage.module.css';

export const TasksPage = () => {
  const params =useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllTasks(params.project!))
  }, [dispatch, params.project]);
  return (
    <div>
      <div className={styles.header}>
        <h1 className={styles.projectTitle}>{params.project}</h1>
      </div>
      <Board />
    </div>  
  )
}