import React, { SVGProps } from 'react';

export const OpenIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
  <svg 
    {...props}
    version="1.1" id="Layer_1" x="0px" y="0px"
    width="64px" height="64px" viewBox="0 0 64 64" enableBackground="new 0 0 64 64">
    <polyline fill="none" stroke="#000000" strokeWidth="2" strokeMiterlimit="10" points="5,41 11,1 53,1 59,41 "/>
    <path fill="none" stroke="#000000" strokeWidth="2" strokeMiterlimit="10" d="M21,41c0,6.075,4.925,11,11,11s11-4.925,11-11h16v22
      H5V41H21z"/>
    <g>
      <circle fill="none" stroke="#000000" strokeWidth="2" strokeMiterlimit="10" cx="29" cy="21" r="6"/>
      <line fill="none" stroke="#000000" strokeWidth="2" strokeMiterlimit="10" x1="33" y1="25" x2="41" y2="33"/>
    </g>
  </svg>
  );
};
