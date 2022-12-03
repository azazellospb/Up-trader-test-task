import classNames from 'classnames';
import React, { CSSProperties, ElementType } from 'react'
import { BasicPolyInput } from '../BasicPolyInput';

type TDebouncedInput = {
  label: string;
  styles?: CSSProperties;
  initialValue?: string;
  tagName?: ElementType;
  handleChange?: any;
  isDisabled?: boolean,
  type?: string,
  accept?: string,
  id?: string,
  placeholder?: string,
}

export const InputBlock = ({ label, styles, initialValue = '', tagName, handleChange, isDisabled = false, type, accept, id, placeholder }: TDebouncedInput) => {
  const isUploader = type === 'file'
  return ( 
    <label>
      {label}
      <BasicPolyInput placeholder={placeholder} type={type} accept={accept} id={id} disabled={isDisabled} as={tagName} className={classNames({styles})} name="description" onChange={(e: any) => handleChange(e.target.value)} value={initialValue}/>
    </label>
  )
}
