import {css} from "styled-components";


export const mobile = (props) => {
   return css`
     @media only screen and (max-width: 480px) {
      ${props}
     }
   `;
};
export const medium = (props) => {
  return css`
   @media only screen and (min-width: 600px) and (max-width: 1280px){
     ${props}
    }
  `;
};