
import styled, { keyframes } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { removeToast } from "../redux/toasterSlice";




const Toaster = () => {

  const toasts = useSelector((state) =>  state.toaster.toasts);
  const dispatch = useDispatch();

  const handleRemove = (id) => {
      
    const toastElement = document.getElementById(`toast-${id}`);

    if(toastElement) {
      toastElement.classList.add("exit")
      setTimeout(() => {
        dispatch(removeToast({id}))
      },600);
    }
  }

  return (
   
      <ToastContainer>
      
        {toasts && toasts.map((toast) => (
      
           <Toast 
              key={toast.id} 
              type={toast.type} 
              id={`toast-${toast.id}`} 
              onClick={() => handleRemove(toast.id)}>
                {toast.message}
           </Toast>
      
        ))}
   
      </ToastContainer>
     
   );
}

export default Toaster;

 const ToastContainer = styled.div `
   position: fixed;
   z-index: 1000;
   top: 65px;
   right: 25px;
`;

const ToastFadeIn = keyframes`
  from {
     opacity: 0;
     transform: translateX(25px)
  }
  to {
     opacity: 1;
     transform: translateX(0);
    
  }
`;
const ToastFadeOut = keyframes`
  from {
     opacity: 1;
     transform: translateX(0);
  }
  to {
     opacity: 0;
     transform: translateX(25px);
  }
`;

 const Toast = styled.div`
   background-color: ${(props) => {
       switch(props.type) {
         case 'success':
           return '#3aa645da';
         case 'error':
           return '#ee6565';
         default:
           return '#4c849c';
       }
   }};
   
    color: #ffff;
    padding-top: 8px;
    padding-bottom: 12px;
    padding-left: 12px;
    padding-right: 12px;
    text-align: center;
    letter-spacing: 1px;
    border-radius: 2px;
    margin-bottom: 10px;
    opacity: 0;
    box-shadow: 0px 0px 6px 0px rgba(0,0,0,0.80);
    -webkit-box-shadow: 0px 0px 6px 0px rgba(0,0,0,0.60);
    -moz-box-shadow: 0px 0px 6px 0px rgba(0,0,0,0.80);
    transform: translateX(25px);
    animation: ${ToastFadeIn} 0.4s forwards;
   &.exit {
    
    animation: ${ToastFadeOut} 0.4s forwards ease-in-out;
    
   }
   
`;


 


 
