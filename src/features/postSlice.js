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

export const setPosts = createAsyncThunk(
	'/post/set',
	async ({ customFetch }, { getState, rejectWithValue, dispatch }) => {
		try {
			const data = await customFetch(fetchPosts, getState().user.token);
			if (!data) throw new Error();
			dispatch(postSlice.actions.updatePost(data.posts));
			return;
		} catch (err) {
			return rejectWithValue(err);
		}
	}
);

export const addPost = createAsyncThunk(
	'/post/add',
	async (
		{ customFetch, formData },
		{ fulfillWithValue, dispatch, getState, rejectWithValue }
	) => {
		dispatch(showModal({}));
		try {
			const data = await customFetch(createPost, formData, getState().user.token);
			if (!data) throw new Error();
			dispatch(showModal({ msg: 'Post created' }));
			return fulfillWithValue(data.post);
		} catch (err) {
			return rejectWithValue(err);
		}
	}
);

export const _likePost = createAsyncThunk(
	'post/like',
	async ({ customFetch, id, isLiked, singlepost }, { getState, dispatch, rejectWithValue }) => {
		const { user, post } = getState();
		try {
			const data = await customFetch(likePost, id, user.token, !isLiked);
			if (!data) throw new Error();
			if (singlepost) dispatch(postSlice.actions.setSinglePost(data.posts));
			let slicedPosts = slicePosts(post.posts, data);
			dispatch(postSlice.actions.updatePost(slicedPosts));
			if (post.userPosts.some(_post => _post._id === id))
				dispatch(postSlice.actions.setUserPosts(slicePosts(post.userPosts, data)));
			return;
		} catch (error) {
			rejectWithValue(error);
		}
	}
);

export const _commentPost = createAsyncThunk(
	'post/like',
	async ({ customFetch, id, comment, singlepost }, { getState, dispatch, rejectWithValue }) => {
		const { user, post } = getState();
		try {
			const data = await customFetch(commentPost, id, comment, user.token);
			if (!data) throw new Error();
			if (singlepost) dispatch(postSlice.actions.setSinglePost(data.posts));
			let slicedPosts = slicePosts(post.posts, data);
			dispatch(postSlice.actions.updatePost(slicedPosts));
			return;
		} catch (error) {
			rejectWithValue(error);
		}
	}
);

export const removePost = createAsyncThunk(
	'post/delete',
	async ({ customFetch, id }, { dispatch, fulfillWithValue, rejectWithValue, getState }) => {
		dispatch(showModal({}));
		try {
			await customFetch(deletePost, id, getState().user.token);
			dispatch(showModal({ msg: 'Post Deleted' }));
			return fulfillWithValue(id);
		} catch (err) {
			return rejectWithValue(err);
		}
	}
);

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

export const { setSinglePost, setUserPosts } = postSlice.actions;

export default postSlice.reducer;
