import {
	commentPostService,
	createPostService,
	deletePostService,
	fetchPostsService,
	likePostService,
	updatePostService,
} from "../services/postServices";
import { showModal } from "./modalSlice";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = {
	posts: [],
	userPosts: [],
	editingPost: {},
	singlePost: {},
};

const slicePosts = (posts, post) => {
	const slicedPosts = posts.map(_post => {
		if (_post._id === post._id) return post;
		return _post;
	});
	return slicedPosts;
};

export const setPosts = createAsyncThunk("post/set", async (props, thunkAPI) => {
	const { customFetch } = props;
	const { rejectWithValue, dispatch } = thunkAPI;
	const data = await customFetch(fetchPostsService);
	if (!data) return rejectWithValue();
	dispatch(postSlice.actions.updatePost(data.posts));
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

export const _updatePost = createAsyncThunk("post/update", async (props, thunkAPI) => {
	const { customFetch, formData, id } = props;
	const { fulfillWithValue, dispatch, rejectWithValue } = thunkAPI;
	dispatch(showModal({}));
	const data = await customFetch(updatePostService, { id, form: formData });
	if (!data) return rejectWithValue();
	dispatch(showModal({ msg: "Post updated" }));
	return fulfillWithValue(data.post);
});

export const _likePost = createAsyncThunk("post/like", async (props, thunkAPI) => {
	const { customFetch, id, isLiked, singlepost } = props;
	const { getState, dispatch, rejectWithValue } = thunkAPI;
	const { post } = getState();
	const data = await customFetch(likePostService, { id, add: !isLiked });
	if (!data) return rejectWithValue();
	if (singlepost) dispatch(postSlice.actions.setSinglePost(data.post));
	let slicedPosts = slicePosts(post.posts, data.post);
	dispatch(postSlice.actions.updatePost(slicedPosts));
	const isInUserPosts = post.userPosts.some(_post => _post._id === id);
	if (isInUserPosts) {
		const slicedPosts = slicePosts(post.userPosts, data.post);
		dispatch(postSlice.actions.setUserPosts(slicedPosts));
	}
});

export const _commentPost = createAsyncThunk("post/comment", async (props, thunkAPI) => {
	const { customFetch, id, comment, singlepost } = props;
	const { getState, dispatch, rejectWithValue } = thunkAPI;
	const { post } = getState();
	const data = await customFetch(commentPostService, { id, comment });
	if (!data) return rejectWithValue();
	if (singlepost) dispatch(postSlice.actions.setSinglePost(data.post));
	let slicedPosts = slicePosts(post.posts, data.post);
	dispatch(postSlice.actions.updatePost(slicedPosts));
});

export const removePost = createAsyncThunk("post/delete", async (props, thunkAPI) => {
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
		updatePost: (state, action) => {
			state.posts = action.payload;
		},
		setUserPosts: (state, action) => {
			state.userPosts = action.payload;
		},
		setSinglePost: (state, action) => {
			state.singlePost = action.payload;
		},
		setEditingPost: (state, action) => {
			state.editingPost = action.payload;
		},
	},
	extraReducers: {
		[setPosts.rejected]: (state, action) => {
			return state;
		},
		[addPost.fulfilled]: (state, action) => {
			state.posts = [action.payload, ...state.posts];
			state.userPosts = [action.payload, ...state.userPosts];
		},
		[addPost.rejected]: (state, action) => {
			return state;
		},
		[removePost.fulfilled]: (state, action) => {
			state.posts = [...state.posts.filter(post => post._id !== action.payload)];
			state.userPosts = [...state.userPosts.filter(post => post._id !== action.payload)];
		},
		[removePost.rejected]: (state, action) => {
			return state;
		},
		[_updatePost.fulfilled]: (state, action) => {
			state.posts = state.posts.map(post => {
				if (post._id === action.payload._id) return action.payload;
				return post;
			});
			state.userPosts = state.userPosts.map(post => {
				if (post._id === action.payload._id) return action.payload;
				return post;
			});
			state.singlePost = action.payload;
		},
		[_updatePost.rejected]: (state, action) => {
			return state;
		},
	},
});

export const { setUserPosts, updatePost, setEditingPost, setSinglePost } = postSlice.actions;

export default postSlice.reducer;
