const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
   posts: [],
};

const postSlice = createSlice({
   name: "post",
   initialState,
   reducers: {
      setPosts: (state, action) => {
         state.posts = action.payload;
      },
      pushPost: (state, action) => {
         state.posts = [action.payload, ...state.posts];
      },
   },
});

export const { setPosts, pushPost } = postSlice.actions;

export default postSlice.reducer;
