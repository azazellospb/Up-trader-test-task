import React from 'react'

type TSubtaskForm = {
  itemId: string;
}

export const SubtaskForm = ({itemId}: TSubtaskForm) => {
  return (
    <div>SubtaskForm {itemId}</div>
  )
}
