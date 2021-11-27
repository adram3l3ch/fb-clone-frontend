import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   user: {},
};

export const userSlice = createSlice({
   name: "user",
   initialState,
   reducers: {
      login: (state, action) => {
         state.user = action.payload;
      },
      logout: (state) => {
         state.user = {};
      },
      register: (state, action) => {},
   },
});

export const { login, logout, register } = userSlice.actions;

export default userSlice.reducer;
