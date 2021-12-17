import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   socket: null,
   usersOnline: [],
};

const socketSlice = createSlice({
   name: "socket",
   initialState,
   reducers: {
      setSocket: (state, action) => {
         state.socket = action.payload;
      },
      usersOnline: (state, action) => {
         state.usersOnline = action.payload;
      },
   },
});

export const { setSocket, usersOnline } = socketSlice.actions;

export default socketSlice.reducer;
