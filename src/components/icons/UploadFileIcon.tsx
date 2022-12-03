import React, { SVGProps } from 'react';

export const UploadFileIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
  <svg 
    {...props}
    version="1.1" id="Layer_1" x="0px" y="0px"
    width="64px" height="64px" viewBox="0 0 64 64" enableBackground="new 0 0 64 64">
    <line fill="none" stroke="#000000" strokeWidth="2" strokeMiterlimit="10" x1="32" y1="27" x2="32" y2="45"/>
    <line fill="none" stroke="#000000" strokeWidth="2" strokeMiterlimit="10" x1="41" y1="36" x2="23" y2="36"/>
    <polygon fill="none" stroke="#000000" strokeWidth="2" strokeMiterlimit="10" points="63,18 63,54 1,54 1,10 22,10 30,18 "/>
  </svg>
  );
};
