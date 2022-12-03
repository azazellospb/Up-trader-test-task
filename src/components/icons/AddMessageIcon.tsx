import React, { SVGProps } from 'react';

export const AddMessageIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
  <svg 
    {...props}
    version="1.1" id="Layer_1" x="0px" y="0px"
    width="64px" height="64px" viewBox="0 0 64 64" enableBackground="new 0 0 64 64">
    <line fill="none" stroke="#000000" strokeWidth="2" strokeMiterlimit="10" x1="32" y1="17" x2="32" y2="35"/>
    <line fill="none" stroke="#000000" strokeWidth="2" strokeMiterlimit="10" x1="41" y1="26" x2="23" y2="26"/>
    <polygon fill="none" stroke="#000000" strokeWidth="2" strokeMiterlimit="10" points="32,47 63,47 63,5 1,5 1,47 18,47 18,59 "/>
  </svg>

  );
};
