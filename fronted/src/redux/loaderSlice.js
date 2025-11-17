import { createSlice } from "@reduxjs/toolkit";

const initialState =  {
   loader: false,
}

const loaderSlice = createSlice({
  name: "loader",
  initialState,

  reducers: {
    toggleLoader(state, action) {
      state.loader = action.payload;
    },
  
  }
});

export const { toggleLoader } = loaderSlice.actions;
export default loaderSlice.reducer;