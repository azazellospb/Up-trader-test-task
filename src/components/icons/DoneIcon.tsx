import React, { SVGProps } from 'react';

export const DoneIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
  <svg 
    {...props}
    version="1.1" id="Layer_1" x="0px" y="0px"
    width="64px" height="64px" viewBox="0 0 64 64" enableBackground="new 0 0 64 64">
    <polyline fill="none" stroke="#000000" strokeWidth="2" strokeLinejoin="bevel" strokeMiterlimit="10" points="23,34 30,41 
      43,28 "/>
    <polyline fill="none" stroke="#000000" strokeWidth="2" strokeMiterlimit="10" points="23,8 10,8 10,63 54,63 54,8 41,8 "/>
    <polygon fill="none" stroke="#000000" strokeWidth="2" strokeMiterlimit="10" points="36,5 36,1 28,1 28,5 24,5 22,13 42,13 40,5 
      "/>
  </svg>
  );
};
