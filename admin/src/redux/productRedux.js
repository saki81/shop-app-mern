import { createSlice } from "@reduxjs/toolkit";



export const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    isFetching: false,
    error: false,
    currentPage: 1,
    totalPage: 1,
   
  },
    reducers: {
       // GET ALL PRODUCTS
       getProductsStart: (state) => {
         state.isFetching = true;
         state.error = false;
       },
       getProductsSuccess: (state, action) => {
         state.isFetching = false;
         state.products = action.payload 
         state.currentPage = action.payload.currentPage;
         state.totalPage = action.payload.totalPage
       },
       getProductsFailure: (state) => {
         state.isFetching = false;
         state.error = true;
       },
       // DELETE PRODUCT
       deleteProductsStart: (state) => {
         state.isFetching = true;
         state.error = false;
       },
       deleteProductsSuccess: (state, action) => {
         state.isFetching = false;
         state.products.products = state.products.products.filter((item) => item._id !== action.payload);
       },
       deleteProductsFailure: (state, action) => {
         state.isFetching = false;
         state.error = true;
      },
      // UPDATE PRODUCT
       updateProductStart: (state) => {
         state.isFetching = true;
         state.error = false;
      },
       updateProductSuccess: (state, action) => {
        state.isFetching = false;
        state.products[state.products.findIndex((item) => item._id === action.payload.id)] = action.payload.product 
      },
       updateProductFailure: (state, action) => {
        state.isFetching = false;
        state.error = true;
      },
      // ADD PRODUCT
       addProductStart: (state) => {
        state.isFetching = true;
        state.error = false;
      },
      addProductSuccess: (state, action) => {
        state.isFetching = false;
        state.products.products.push(action.payload); 
      },
      addProductFailure: (state) => {
        state.isFetching = false;
        state.error = true;
      }, 
    } 
});

export const {
    getProductsStart,
    getProductsSuccess,
    getProductsFailure,
    deleteProductsStart,
    deleteProductsSuccess,
    deleteProductsFailure,
    updateProductStart,
    updateProductSuccess,
    updateProductFailure,
    addProductStart,
    addProductSuccess,
    addProductFailure,
} = productSlice.actions;

export default productSlice.reducer