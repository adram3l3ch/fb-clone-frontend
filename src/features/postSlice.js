import { createPost, fetchPosts, deletePost, likePost, commentPost } from '../API';
import { showModal } from './modalSlice';

const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

const initialState = {
	posts: [],
	singlePost: {},
	userPosts: [],
};

const slicePosts = (posts, data) => {
	const index = posts.findIndex(post => post._id === data.posts._id);
	let slicedPosts = [...posts];
	slicedPosts.splice(index, 1, data.posts);
	return slicedPosts;
};

export const setPosts = createAsyncThunk('post/set', async (props, thunkAPI) => {
	const { customFetch } = props;
	const { getState, rejectWithValue, dispatch } = thunkAPI;
	const data = await customFetch(fetchPosts, getState().user.token);
	if (!data) return rejectWithValue();
	dispatch(postSlice.actions.updatePost(data.posts));
	return;
});

export const addPost = createAsyncThunk('post/add', async (props, thunkAPI) => {
	const { customFetch, formData } = props;
	const { fulfillWithValue, dispatch, getState, rejectWithValue } = thunkAPI;
	dispatch(showModal({}));
	const data = await customFetch(createPost, formData, getState().user.token);
	if (!data) return rejectWithValue();
	dispatch(showModal({ msg: 'Post created' }));
	return fulfillWithValue(data.post);
});

export const _likePost = createAsyncThunk('post/like', async (props, thunkAPI) => {
	const { customFetch, id, isLiked, singlepost } = props;
	const { getState, dispatch, rejectWithValue } = thunkAPI;
	const { user, post } = getState();
	const data = await customFetch(likePost, id, user.token, !isLiked);
	if (!data) return rejectWithValue();
	if (singlepost) dispatch(postSlice.actions.setSinglePost(data.posts));
	let slicedPosts = slicePosts(post.posts, data);
	dispatch(postSlice.actions.updatePost(slicedPosts));
	if (post.userPosts.some(_post => _post._id === id))
		dispatch(postSlice.actions.setUserPosts(slicePosts(post.userPosts, data)));
});

export const _commentPost = createAsyncThunk('post/comment', async (props, thunkAPI) => {
	const { customFetch, id, comment, singlepost } = props;
	const { getState, dispatch, rejectWithValue } = thunkAPI;
	const { user, post } = getState();
	const data = await customFetch(commentPost, id, comment, user.token);
	if (!data) return rejectWithValue();
	if (singlepost) dispatch(postSlice.actions.setSinglePost(data.posts));
	let slicedPosts = slicePosts(post.posts, data);
	dispatch(postSlice.actions.updatePost(slicedPosts));
});

export const removePost = createAsyncThunk('post/delete', async (props, thunkAPI) => {
	const { customFetch, id } = props;
	const { dispatch, fulfillWithValue, getState } = thunkAPI;
	dispatch(showModal({}));
	await customFetch(deletePost, id, getState().user.token);
	dispatch(showModal({ msg: 'Post Deleted' }));
	return fulfillWithValue(id);
});

const postSlice = createSlice({
	name: 'post',
	initialState,
	reducers: {
		updatePost: (state, action) => {
			state.posts = action.payload;
		},
		setSinglePost: (state, action) => {
			state.singlePost = action.payload;
		},
		setUserPosts: (state, action) => {
			state.userPosts = action.payload;
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
	},
});

export const { setSinglePost, setUserPosts, updatePost } = postSlice.actions;

export default postSlice.reducer;
