import { createSlice } from "@reduxjs/toolkit";



export const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
    isFetching: false,
    error: false
  },
    reducers: {
      // GET ALL ORDERS
      getOrdersStart: (state) => {
        state.isFetching = true;
        state.error = false;
      },
      getOrdersSuccess: (state, action) => {
        state.isFetching = false;
        state.orders = action.payload
      },
      getOrdersFailure: (state) => {
        state.isFetching = false;
        state.error = true;
      },
      // GET ORDER
      getOrderStart: (state) => {
        state.isFetching = true;
        state.error = false;
      },
      getOrderSuccess: (state, action) => {
        state.isFetching = false;
        const order = action.payload;
        const index = state.orders.findIndex((o) => o._id === order._id);
        if (index !== -1) {
        state.orders[index] = order;
        }
        state.orders.push(order);
      },
      getOrderFailure: (state) => {
        state.isFetching = false;
        state.error = true;
      },
      // UPDATE ORDER
      updatedOrderStatusStart: (state) => {
        state.isFetching = true;
        state.error = false;
      },
      updatedOrderStatusSuccess: (state, action) => {
        state.isFetching = false;
        const index = state.orders.findIndex((order) => order._id === action.payload._id);
        state.orders[index] = action.payload
      },
      updatedOrderStatusFailure: (state) => {
        state.isFetching = false;
        state.error = true;
      }
    }
});

export const {
  getOrdersStart,
  getOrdersSuccess,
  getOrdersFailure,
  getOrderStart,
  getOrderSuccess,
  getOrderFailure,
  updatedOrderStatusStart,
  updatedOrderStatusSuccess,
  updatedOrderStatusFailure
} = orderSlice.actions;

export default orderSlice.reducer;
