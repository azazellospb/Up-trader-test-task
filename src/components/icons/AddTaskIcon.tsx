import React, { SVGProps } from 'react';

export const AddTaskIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
  <svg 
    {...props}
    version="1.1" id="Layer_1" x="0px" y="0px"
    width="64px" height="64px" viewBox="0 0 64 64" enableBackground="new 0 0 64 64">
    <rect x="1" y="7" fill="none" stroke="#000000" strokeWidth="2" strokeMiterlimit="10" width="62" height="50"/>
    <line fill="none" stroke="#000000" strokeWidth="2" strokeMiterlimit="10" x1="1" y1="15" x2="63" y2="15"/>
    <line fill="none" stroke="#000000" strokeWidth="2" strokeMiterlimit="10" x1="10" y1="11" x2="6" y2="11"/>
    <line fill="none" stroke="#000000" strokeWidth="2" strokeMiterlimit="10" x1="18" y1="11" x2="14" y2="11"/>
    <line fill="none" stroke="#000000" strokeWidth="2" strokeMiterlimit="10" x1="26" y1="11" x2="22" y2="11"/>
    <line fill="none" stroke="#000000" strokeWidth="2" strokeMiterlimit="10" x1="32" y1="28" x2="32" y2="46"/>
    <line fill="none" stroke="#000000" strokeWidth="2" strokeMiterlimit="10" x1="41" y1="37" x2="23" y2="37"/>
  </svg>
  );
};
