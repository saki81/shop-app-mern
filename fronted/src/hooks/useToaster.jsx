import { useDispatch } from "react-redux";
import { addToast, removeToast } from "../redux/toasterSlice";
import { v4 as uuidv4 } from 'uuid';


  export default function useToaster() {
  
  const dispatch = useDispatch();
  
  const showToast = (message, type = 'info', duration = 3000) => {
     const id = uuidv4();
    
     dispatch(addToast({ 
        id, 
        message, 
        type, 
      })
    );
    
      setTimeout(() => {
      dispatch(removeToast({ id }));
      
     }, duration);
    
};

  const showInfo = (message, duration) => showToast(message, 'info', duration);
  const showSuccess = (message, duration) => showToast(message, 'success', duration);
  const showError = (message, duration) => showToast(message, 'error', duration);


 return {
     showToast,
     showInfo,
     showSuccess,
     showError,
  };
};

