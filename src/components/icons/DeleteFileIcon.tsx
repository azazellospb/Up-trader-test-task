import React, { SVGProps } from 'react';

export const DeleteFileIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
  <svg 
    {...props}
    version="1.1" id="Layer_1" x="0px" y="0px"
    width="64px" height="64px" viewBox="0 0 64 64" enableBackground="new 0 0 64 64">
    <polygon fill="none" stroke="#000000" strokeWidth="2" strokeMiterlimit="10" points="63,18 63,54 1,54 1,10 22,10 30,18 "/>
    <line fill="none" stroke="#000000" strokeWidth="2" strokeMiterlimit="10" x1="39" y1="44" x2="25" y2="30"/>
    <line fill="none" stroke="#000000" strokeWidth="2" strokeMiterlimit="10" x1="25" y1="44" x2="39" y2="30"/>
  </svg>
  );
};
