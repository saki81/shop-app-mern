import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    currentUser: null, 
    isFetching: false,
    error: false,
    message: null
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
      state.error = false;
      state.message = null
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
      state.error = false;
      state.message = null;
    },
    loginFailure: (state,action) => {
      state.isFetching = false;
      state.error = true;
      state.message = action.payload;
           
    },
    logout: (state) => {
      state.currentUser = null;
      state.error = false;
      state.message = null;
    },
   
  },
});

export const { 
    loginStart, 
    loginSuccess, 
    loginFailure,
    logout
} = authSlice.actions;
export default authSlice.reducer;













/*import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import apiCalls from "./apiCalls";


const initialState = {
  user: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// login
export const login = createAsyncThunk('auth/login',async(user,thunkAPI) => {
      
  try {
   
    return await apiCalls.login(user )
  } catch (error) {
  
    const message =
    (error.response && error.response.data && error.response.data.message) ||
    error.message ||
    error.toString()
     return thunkAPI.rejectWithValue(message)
     
  }
})

export const logout = createAsyncThunk('auth/logout', async () => {
  await apiCalls.logout()
})


export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ''
    },
  },
  extraReducers: (builder) => {
    builder
      
      .addCase(login.pending,(state) => {
        state.isLoading = true
      })
      .addCase(login.fulfilled, (state, action,) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
        
      
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
  
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null
        
      })
  }
})


export const { reset } = authSlice.actions
export default authSlice.reducer*/
