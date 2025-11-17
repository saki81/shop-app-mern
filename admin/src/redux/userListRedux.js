import { createSlice } from "@reduxjs/toolkit";
const shortid = require('shortid');



 const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    isFetching: false,
    error: false,
  },
    reducers: {
      // GET ALL USERS
      getUsersStart: (state) => {
        state.isFetching = true;
        state.error = false;
      },
      getUsersSuccess: (state, action) => {
        state.isFetching = false;
        state.users = action.payload
      },
      getUsersFailure: (state) => {
        state.isFetching = false;
        state.error = true;
      },
      // DELETE USER
      deleteUserStart: (state) => {
        state.isFetching = true;
        state.error = false;
      },
      deleteUserSuccess: (state, action) => {
        state.isFetching = false;
        state.users.splice(
        state.users.findIndex((item) => item._id === action.payload),1
        )
      },
      deleteUserFailure: (state) => {
        state.isFetching = false;
        state.error = true;
      },
      // UPDATE USER
      updateUserStart: (state) => {
        state.isFetching = true;
        state.error = false;
      },
      updateUserSuccess: (state, action) => {
        state.isFetching = false;
        state.users[state.users.findIndex((item) => item._id === action.payload.id)] = action.payload.user
      },
      updateUserFailure: (state) => {
        state.isFetching = false;
        state.error = true;
      },
      // ADD USER
      addUserStart: (state) => {
        state.isFetching = true;
        state.error = false;
      },
      addUserSuccess: (state, action) => {
        state.isFetching = false;
        const newUser = { ...action.payload, _id: shortid.generate() };
        state.users.push(newUser);
      },
      addUserFailure: (state) => {
        state.isFetching = false;
        state.error = true;
      } 
    },
});

export const  {
  getUsersStart,
  getUsersSuccess,
  getUsersFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  addUserStart,
  addUserSuccess,
  addUserFailure,
} = userSlice.actions;

export default userSlice.reducer 