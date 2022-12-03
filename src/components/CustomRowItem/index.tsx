import classNames from 'classnames';
import React from 'react';
import { CustomButton } from '../CustomButton';
import { DoneIcon } from '../icons/DoneIcon';
import { MakeChangesIcon } from '../icons/MakeChangesIcon';
import { RemoveIcon } from '../icons/RemoveIcon';
import { OpenIcon } from '../icons/OpenIcon';
import styles from './CustomRowItem.module.css';
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { deleteProject, updateProject } from '../../store/projectReducer';
import { showModal } from '../../store/modalReducer';
import { ProjectDoneIcon } from '../icons/ProjectDoneIcon';

type TCustomRowItem = {
  item: TDBItem;
}

type TDBItem = {
  id: string;
  title: string;
  description: string;
  status: string;
}

export const CustomRowItem = ({ item}: TCustomRowItem) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const itemId = item.id;
  const isDone = item.status === 'done'
  console.log(item.title, isDone);
  return (
    <div className={classNames([styles.container, isDone && styles.projectDoneStyle])}>
      <div className={styles.infoBox}>
        
        <div className={styles.header}>
          <p className={styles.title}>{item.title}</p>
          {!isDone ? (
            <CustomButton style={styles.CustomBtn} handleClick={()=> {
              const itemId = item.id
              const form = {status: 'done'}
              dispatch(updateProject({itemId, form}))
            }}>
              <DoneIcon />
              <p>Завершить</p>
            </CustomButton>
          ) : <ProjectDoneIcon />}
        </div>
        <p className={styles.description}>
          {item.description}
        </p>
      </div>
      <div className={styles.controlsBox}>
        <CustomButton style={styles.CustomBtn} handleClick={()=> navigate(location.pathname + '/' +itemId)}>
          <OpenIcon />
          <p>Открыть</p>
        </CustomButton>
        {!isDone && <CustomButton style={styles.CustomBtn} handleClick={() => dispatch(showModal(itemId))}>
          <MakeChangesIcon />
          <p>Изменить</p>
        </CustomButton>}
        <CustomButton style={styles.CustomBtn} handleClick={() => dispatch(deleteProject(item.id))}>
          <RemoveIcon />
          <p>Удалить</p>
        </CustomButton>
      </div>
    </div>
  )
}

