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
import { deleteProject } from '../../store/projectReducer';
import { showModal } from '../../store/modalReducer';

type TCustomRowItem = {
  style?: string;
  item: TDBItem;
}

type TDBItem = {
  id: string;
  title: string;
  description: string;
  isActive: boolean;
}

export const CustomRowItem = ({style, item}: TCustomRowItem) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const itemId = item.id;
  return (
    <div className={classNames([styles.container, !!style && style, item.isActive && styles.borderActiveStyle])}>
      <div className={styles.infoBox}>
        <div className={styles.header}>
          <p className={styles.title}>{item.title}</p>
          <CustomButton style={styles.CustomBtn} handleClick={()=> console.log('отработало')}>
            <DoneIcon />
            <p>Завершить</p>
          </CustomButton>
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
        <CustomButton style={styles.CustomBtn} handleClick={() => dispatch(showModal(itemId))}>
          <MakeChangesIcon />
          <p>Изменить</p>
        </CustomButton>
        <CustomButton style={styles.CustomBtn} handleClick={() => dispatch(deleteProject(item.id))}>
          <RemoveIcon />
          <p>Удалить</p>
        </CustomButton>
      </div>
    </div>
  )
}

