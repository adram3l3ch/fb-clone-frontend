import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
   id: "",
   name: "",
   profileImage: "",
   token: "",
};

const userSlice = createSlice({
   name: "user",
   initialState,
   reducers: {
      login: (state, action) => {
         const { id, name, profileImage, token } = action.payload;
         Cookies.set("user", JSON.stringify(action.payload), { expires: 30 });
         state.id = id;
         state.name = name;
         state.token = token;
         state.profileImage = profileImage;
      },
      logout: state => {
         Cookies.remove("user");
         state.id = "";
         state.name = "";
         state.profileImage = "";
      },
      update: (state, action) => {
         const { payload } = action;
         Object.keys(payload).map(key => (state[key] = payload[key]));
         Cookies.set("user", JSON.stringify(state));
      },
   },
});

export const { login, logout, update } = userSlice.actions;

export default userSlice.reducer;
