const { createSlice } = require('@reduxjs/toolkit');

const initialState = {
	posts: [],
	singlePost: {},
	userPosts: [],
};

const postSlice = createSlice({
	name: 'post',
	initialState,
	reducers: {
		setPosts: (state, action) => {
			state.posts = action.payload;
		},
		pushPost: (state, action) => {
			state.userPosts = [action.payload, ...state.userPosts];
			state.posts = [action.payload, ...state.posts];
		},
		popPost: (state, action) => {
			state.userPosts = [...state.userPosts.filter(post => post._id !== action.payload)];
			state.posts = [...state.posts.filter(post => post._id !== action.payload)];
		},
		setSinglePost: (state, action) => {
			state.singlePost = action.payload;
		},
		setUserPosts: (state, action) => {
			state.userPosts = action.payload;
		},
	},
});

export const { setPosts, pushPost, setSinglePost, popPost, setUserPosts } = postSlice.actions;

export default postSlice.reducer;
