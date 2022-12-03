import classNames from 'classnames'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../store';
import { hideSubModal } from '../../store/modalReducer';
import styles from "./../Modal/Modal.module.css"


interface IModal {
  render: (id: string) => JSX.Element,
}

export const Submodal = ({render} : IModal) => {
  const dispatch = useDispatch();
  const [isVisible, setVisibility] = useState(false)
  const { subitemId, subModal } = useSelector((state: IRootState) => state.modalReducer)
  
  useEffect(() => {
    setVisibility(subModal)
  }, [subModal])
  
  return (
    <div className={classNames([styles.modalBox, isVisible && styles.modalBox__active])} onClick={() => {
        dispatch(hideSubModal())
      }
      }>
      <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
        {render(subitemId)}
      </div>
    </div>
  )
}
