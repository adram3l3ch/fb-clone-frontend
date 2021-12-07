import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   conversationID: "",
   to: "",
   messages: [],
};

const messageSlice = createSlice({
   name: "message",
   initialState,
   reducers: {
      addMessages: (state, action) => {
         state.messages = [...state.messages, action.payload];
      },
      clearMessage: (state, action) => {
         state.messages = [];
      },
      setChatID: (state, action) => {
         state.conversationID = action.payload;
      },
      setReceiverID: (state, action) => {
         state.to = action.payload;
      },
   },
});

export const { addMessages, clearMessage, setChatID, setReceiverID } =
   messageSlice.actions;

export default messageSlice.reducer;
