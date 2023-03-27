import { createSlice } from "@reduxjs/toolkit";


const initialState: { accessToken: string; } = {
  accessToken: ""
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthToken: (state, action) => {
      state.accessToken = action.payload;
    }
  },
});

export const {
  setAuthToken
} = authSlice.actions;

export default authSlice.reducer;
