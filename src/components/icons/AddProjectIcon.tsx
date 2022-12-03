import React, { SVGProps } from 'react';

export const AddProjectIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
  <svg
    {...props}
    version="1.1"
    id="Layer_1"
    x="0px"
    y="0px"
    width="64px"
    height="64px"
    viewBox="0 0 64 64"
    enableBackground="new 0 0 64 64"
  >
    <polyline fill="none" stroke="#000000" strokeWidth="2" strokeMiterlimit="10" points="5,41 11,1 53,1 59,41 "/>
    <path 
      fill="none"
      stroke="#000000"
      strokeWidth="2"
      strokeMiterlimit="10"
      d="M21,41c0,6.075,4.925,11,11,11s11-4.925,11-11h16v22H5V41H21z"/>
    <line
      fill="none"
      stroke="#000000"
      strokeWidth="2"
      strokeMiterlimit="10"
      x1="32"
      y1="15"
      x2="32"
      y2="33"/>
    <line 
      fill="none"
      stroke="#000000"
      strokeWidth="2"
      strokeMiterlimit="10" x1="41" y1="24" x2="23" y2="24"/>
  </svg>
  );
};
