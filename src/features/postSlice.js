const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
   posts: [],
   singlePost: {},
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
      popPost: (state, action) => {
         state.posts = [...state.posts.filter((post) => post._id !== action.payload)];
      },
      setSinglePost: (state, action) => {
         state.singlePost = action.payload;
      },
   },
});

export const { setPosts, pushPost, setSinglePost, popPost } = postSlice.actions;

export default postSlice.reducer;
