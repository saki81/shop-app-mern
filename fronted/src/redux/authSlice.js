import { createSlice } from "@reduxjs/toolkit";


const authSlice = createSlice ({
  name: "auth",
  initialState: {
    currentUser: null,
    cart: [],
    isFetching: false,
    error: null,
  },

  reducers: {
    registerStart: (state) => {
      state.isFetching = true;
    },
    registerSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload
    },
    registerFailure: (state,action) => {
      state.isFetching = false;
      state.error = action.payload;
    },
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
       console.log("LOGIN PAYLOAD:", action.payload); 
      state.isFetching = false;
      state.currentUser = action.payload;
     
  
    },
    loginFailure: (state,action) => {
      state.isFetching = false;
      state.error = action.payload;
    },

    updateUserStart: (state) => {
      state.isFetching = true;
      state.error = null;
    },
    updateUserSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
    },
    updateUserFailure: (state) => {
      state.isFetching = true;
      state.error = true;
    },
   
    reset: (state) => {
       state.currentUser = null;
       state.isFetching = false;
       state.error = null
    },

    logoutAction: (state) => {
      state.currentUser = null;
    
    },

  },
});

export const  {
    registerStart,
    registerSuccess,
    registerFailure,
    loginStart,
    loginSuccess,
    loginFailure,
    updateUserStart,
    updateUserSuccess,
    updateUserFailure,
    reset,
    logoutAction,
    prepareCartDeletion
} = authSlice.actions;

export default  authSlice.reducer;




















