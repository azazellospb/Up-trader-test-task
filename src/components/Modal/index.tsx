import classNames from 'classnames'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../store';
import { hideModal } from '../../store/modalReducer';
import styles from './Modal.module.css';


interface IModal {
  render: (id: string) => JSX.Element,
}

export const Modal = ({render } : IModal) => {
  const dispatch = useDispatch();
  const [isVisible, setVisibility] = useState(false)
  const { itemId, modal } = useSelector((state: IRootState) => state.modalReducer)
  
  useEffect(() => {
    setVisibility(modal)
  }, [modal])
  
  return (
    <div className={classNames([styles.modalBox, isVisible && styles.modalBox__active])} onClick={() => {
        dispatch(hideModal())
      }
      }>
      <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
        {render(itemId)}
      </div>
    </div>
  )
}
