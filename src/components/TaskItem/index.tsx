import classNames from 'classnames';
import React from 'react'
import { useDispatch } from 'react-redux';
import { uploadFilesList } from '../../store/fileReducer';
import { showModal } from '../../store/modalReducer';
import { deleteTask, fetchSubTasks, fetchTasks, TTaskObject } from '../../store/taskReducer';
import { CustomButton } from '../CustomButton';
import { OpenIcon } from '../icons/OpenIcon';
import { RemoveIcon } from '../icons/RemoveIcon';
import styles from './TaskItem.module.css'

type TTaskItem = {
  task: TTaskObject;
  className: string;
}

export const TaskItem = ({task, className }: TTaskItem) => {
  const dispatch = useDispatch();
  const { status, title, id, description} = task;
  const isHighPrity = task.priority === 'high';
  const isMediumPrity = task.priority === 'medium';
  const itemId = id as string;
  return (
    <div className={className}>
      <div draggable data-status={status} className={classNames([styles.taskBox, isHighPrity && styles.highPriority, isMediumPrity && styles.mediumPriority ])} key={id}>
          <div className={styles.taskInfo}>
            <div className={styles.taskTitle}>{title}</div>
            <div>{description}</div>
          </div>
          <div className={styles.controls}>
            <CustomButton style={styles.CustomBtn} handleClick={() => {
              dispatch(showModal(itemId));
              dispatch(uploadFilesList(task.id!));
              dispatch(fetchSubTasks(itemId));
              }}>
              <OpenIcon />
              <p>Открыть</p>
            </CustomButton>
            <CustomButton 
              style={styles.CustomBtn}
              handleClick={() => {
                dispatch(deleteTask(id!))
                dispatch(fetchTasks(task.projectid!));
              }}>
              <RemoveIcon />
              <p>Удалить</p>
            </CustomButton>
          </div>
      </div>
    </div>
  )
}
