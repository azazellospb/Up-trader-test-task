import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { walkUpBindingElementsAndPatterns } from 'typescript'
import { THandleFileInStore } from '../../saga/fileSaga'
import { downloadFile, removeFile, setFileList, uploadFilesList } from '../../store/fileReducer'
import { deleteTask, fetchAllTasks, updateTask } from '../../store/taskReducer'
import { CustomButton } from '../CustomButton'
import styles from './CustomList.module.css';

type TCustomList = {
  list: File[] | Array<any>;
  taskId: string;
  callback: (value: React.SetStateAction<boolean>) => void;
}

export const CustomList = ({list, taskId, callback }: TCustomList) => {
  const dispatch = useDispatch();
  const hasFiles = !!list.length;
  const handleDownload = ({item, taskId}: THandleFileInStore) => {
    dispatch(downloadFile({item, taskId}))
    callback((prev: boolean) => !prev);
  }

  const handleDone = (itemId: string) => {
    const form = {
      id: itemId,
      status: 'done',
    }
    dispatch(updateTask({ itemId, form }))
    callback((prev: boolean) => !prev);
  }
    
  const handleDelete = ({item, taskId}: THandleFileInStore) => {
    const isTask = item.includes('task');
    !isTask && dispatch(removeFile({item, taskId}))
    isTask && dispatch(deleteTask(item))
    callback((prev: boolean) => !prev);
  }
    
  return (
    <div className={styles.listContainer}>
      <div className={styles.listBox}>
        {hasFiles ? list.map((element: any) => (
          <div className={styles.fileListItem} key={element.name || element.id}>
            <div className={styles.subtaskInfo}>
              <p>{element.name || element.description}</p>
              {element.status ? <p>&#10003;</p> : null}
            </div>
            <div className={styles.subtaskControls}>
              {element.name && <CustomButton style={styles.CustomBtn} handleClick={() => {
                const item = element.name ?? element.id
                handleDownload({item, taskId})
              }}>Загрузить</CustomButton>}
              {(!element.name && !element.status) && <CustomButton style={styles.CustomBtn} handleClick={() => {
                const itemId =  element.id
                handleDone(itemId)
              }}>Выполнено</CustomButton>}
              <CustomButton style={styles.CustomBtn} handleClick={() => {
                const item = element.name ?? element.id
                handleDelete({item, taskId})
              }}>Удалить</CustomButton>
            </div>
            
          </div>)) : <p>Нет данных для отображения.</p>}
      </div>
    </div>
  )
}