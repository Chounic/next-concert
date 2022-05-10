import * as React from "react";
import { SVGProps } from "react";

const SvgMenuBurger = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={30}
    height={30}
    viewBox="0 0 24 24"

    xmlSpace="preserve"
    {...props}
  >
    
      <path
        xmlns="http://www.w3.org/2000/svg"
        data-original="#000000"
        d="M0 10.5h24v3H0zM0 3.5h24v3H0zM0 17.5h24v3H0z"
      />
   
  </svg>
);

export default SvgMenuBurger;
