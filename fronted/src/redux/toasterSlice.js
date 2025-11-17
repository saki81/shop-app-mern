import { createSlice } from "@reduxjs/toolkit";

const initialState = {
     
    toasts: []

};

 export const toasterSlice = createSlice({
    
    name: "toaster",
    initialState,

    reducers: {
        
      addToast: (state, action) => {
         state.toasts.push(action.payload);
      },
      removeToast: (state, action) => {
         state.toasts = state.toasts.filter((toast) => toast.id !== action.payload.id);
      },
    },
});

export const { addToast, removeToast } = toasterSlice.actions;

export default toasterSlice.reducer