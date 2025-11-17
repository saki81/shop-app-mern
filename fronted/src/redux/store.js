
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import cartReducer from "./cartRedux";
import loaderReducer from "./loaderSlice"; 
import toasterReducer from "./toasterSlice"; 

// ---------------- STORE ----------------
export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    loader: loaderReducer,
    toaster: toasterReducer,
  },
});

