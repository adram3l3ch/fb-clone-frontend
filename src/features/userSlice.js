import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
   id: "",
   token: "",
};

export const userSlice = createSlice({
   name: "user",
   initialState,
   reducers: {
      login: (state, action) => {
         const { id, token } = action.payload;
         Cookies.set("user", JSON.stringify(action.payload));
         state.id = id;
         state.token = token;
      },
      logout: (state) => {
         Cookies.remove("user");
         state.id = "";
         state.token = "";
      },
   },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
