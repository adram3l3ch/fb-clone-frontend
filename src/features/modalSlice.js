import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   msg: "",
   visible: false,
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
   },
});

export const { showModal, hideModal } = modalSlice.actions;

export default modalSlice.reducer;
