import {
	commentPostService,
	createPostService,
	deletePostService,
	fetchPostsService,
	likePostService,
	updatePostService,
} from "../services/postServices";
import { showModal } from "./modalSlice";
import { logout } from "./userSlice";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = {
	allPosts: { posts: [], page: 0 },
	userPosts: { posts: [], page: 0 },
	editingPost: {},
	singlePost: {},
};

export const setPosts = createAsyncThunk("post/set", async (props, thunkAPI) => {
	const { customFetch } = props;
	const { rejectWithValue, dispatch } = thunkAPI;
	const data = await customFetch(fetchPostsService);
	if (!data) return rejectWithValue();
	dispatch(postSlice.actions.setAllPosts(data));
	return;
});

export const addPost = createAsyncThunk("post/add", async (props, thunkAPI) => {
	const { customFetch, formData } = props;
	const { fulfillWithValue, dispatch, rejectWithValue } = thunkAPI;
	dispatch(showModal({}));
	const data = await customFetch(createPostService, formData);
	if (!data) return rejectWithValue();
	dispatch(showModal({ msg: "Post created" }));
	return fulfillWithValue(data.post);
});

export const updatePost = createAsyncThunk("post/update", async (props, thunkAPI) => {
	const { customFetch, formData, id } = props;
	const { dispatch, rejectWithValue, getState } = thunkAPI;
	dispatch(showModal({}));
	const data = await customFetch(updatePostService, { id, form: formData });
	if (!data) return rejectWithValue();
	dispatch(showModal({ msg: "Post updated" }));
	if (getState().post.singlePost._id === id) dispatch(postSlice.actions.setSinglePost(data.post));
	dispatch(postSlice.actions.updatePosts(data.post));
});

export const likePost = createAsyncThunk("post/like", async (props, thunkAPI) => {
	const { customFetch, id, isLiked } = props;
	const { dispatch, rejectWithValue, getState } = thunkAPI;
	const data = await customFetch(likePostService, { id, add: !isLiked });
	if (!data) return rejectWithValue();
	if (getState().post.singlePost._id === id) dispatch(postSlice.actions.setSinglePost(data.post));
	dispatch(postSlice.actions.updatePosts(data.post));
});

export const commentPost = createAsyncThunk("post/comment", async (props, thunkAPI) => {
	const { customFetch, id, comment } = props;
	const { dispatch, rejectWithValue, getState } = thunkAPI;
	const data = await customFetch(commentPostService, { id, comment });
	if (!data) return rejectWithValue();
	if (getState().post.singlePost._id === id) dispatch(postSlice.actions.setSinglePost(data.post));
	dispatch(postSlice.actions.updatePosts(data.post));
});

export const deletePost = createAsyncThunk("post/delete", async (props, thunkAPI) => {
	const { customFetch, id } = props;
	const { dispatch, fulfillWithValue } = thunkAPI;
	dispatch(showModal({}));
	await customFetch(deletePostService, { id });
	dispatch(showModal({ msg: "Post Deleted" }));
	return fulfillWithValue(id);
});

const postSlice = createSlice({
	name: "post",
	initialState,
	reducers: {
		setAllPosts: (state, action) => {
			state.allPosts = action.payload;
		},
		setUserPosts: (state, action) => {
			state.userPosts = action.payload;
		},
		updatePosts: (state, action) => {
			state.allPosts.posts = state.allPosts.posts.map(post => {
				if (post._id === action.payload._id) return action.payload;
				return post;
			});
			state.userPosts.posts = state.userPosts.posts.map(post => {
				if (post._id === action.payload._id) return action.payload;
				return post;
			});
		},
		setSinglePost: (state, action) => {
			state.singlePost = action.payload;
		},
		setEditingPost: (state, action) => {
			state.editingPost = action.payload;
		},
	},
	extraReducers: {
		[addPost.fulfilled]: (state, action) => {
			state.allPosts.posts = [action.payload, ...state.allPosts.posts];
			state.userPosts.posts = [action.payload, ...state.userPosts.posts];
		},
		[deletePost.fulfilled]: (state, action) => {
			state.allPosts.posts = state.allPosts.posts.filter(post => post._id !== action.payload);
			state.userPosts.posts = state.userPosts.posts.filter(post => post._id !== action.payload);
		},
		[logout.type]: (state, action) => {
			return initialState;
		},
	},
});

export const { setUserPosts, setAllPosts, setEditingPost, setSinglePost } = postSlice.actions;

export default postSlice.reducer;
