import * as React from "react";
import { SVGProps } from "react";

const SvgAngleCarreGauche = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={40}
    height={40}
    fill={props.color} 
    {...props}
  >
    <path d="M24 19V5a5.006 5.006 0 0 0-5-5H5a5.006 5.006 0 0 0-5 5v14a5.006 5.006 0 0 0 5 5h14a5.006 5.006 0 0 0 5-5ZM8 12a2.993 2.993 0 0 1 .752-1.987c.291-.327.574-.637.777-.84L12.353 6.3a1 1 0 0 1 1.426 1.4l-2.829 2.88c-.187.188-.441.468-.7.759a1 1 0 0 0 0 1.323c.258.29.512.57.693.752l2.836 2.886a1 1 0 0 1-1.426 1.4l-2.829-2.878c-.2-.2-.48-.507-.769-.833A2.99 2.99 0 0 1 8 12Z" />
  </svg>
);

export default SvgAngleCarreGauche;
