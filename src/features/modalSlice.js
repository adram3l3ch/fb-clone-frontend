import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   msg: "",
   visible: false,
   isSidebarVisible: false,
};

export const modalSlice = createSlice({
   name: "modal",
   initialState,
   reducers: {
      showModal: (state, action) => {
         state.msg = action.payload;
         state.visible = true;
      },
      hideModal: (state) => {
         state.visible = false;
      },
      toggleSidebar: (state, action) => {
         state.isSidebarVisible = action.payload;
      },
   },
});

export const { showModal, hideModal, toggleSidebar } = modalSlice.actions;

export default modalSlice.reducer;
