import {
	commentPostService,
	createPostService,
	deletePostService,
	fetchPostsService,
	likePostService,
	updatePostService,
} from "../services/postServices";
import { showModal } from "./modalSlice";
import { logout, update } from "./userSlice";

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
	const { fulfillWithValue, dispatch, rejectWithValue, getState } = thunkAPI;
	const {
		user: { isGuest },
	} = getState();
	if (isGuest) return dispatch(showModal({ msg: "You must be logged in to do this action!!" }));
	dispatch(showModal({}));
	const data = await customFetch(createPostService, formData);
	if (!data) return rejectWithValue();
	dispatch(showModal({ msg: "Post created" }));
	return fulfillWithValue(data.post);
});

export const updatePost = createAsyncThunk("post/update", async (props, thunkAPI) => {
	const { customFetch, formData, id } = props;
	const { dispatch, rejectWithValue, getState } = thunkAPI;
	const {
		user: { isGuest },
		post: { singlePost },
	} = getState();
	if (isGuest) return dispatch(showModal({ msg: "You must be logged in to do this action!!" }));
	dispatch(showModal({}));
	const data = await customFetch(updatePostService, { id, form: formData });
	if (!data) return rejectWithValue();
	dispatch(showModal({ msg: "Post updated" }));
	if (singlePost._id === id) dispatch(postSlice.actions.setSinglePost(data.post));
	dispatch(postSlice.actions.updatePosts(data.post));
});

export const likePost = createAsyncThunk("post/like", async (props, thunkAPI) => {
	const { customFetch, id, isLiked } = props;
	const { dispatch, rejectWithValue, getState } = thunkAPI;
	const {
		user: { isGuest },
		post: { singlePost },
	} = getState();
	if (isGuest) return dispatch(showModal({ msg: "You must be logged in to do this action!!" }));
	const data = await customFetch(likePostService, { id, add: !isLiked });
	if (!data) return rejectWithValue();
	if (singlePost._id === id) dispatch(postSlice.actions.setSinglePost(data.post));
	dispatch(postSlice.actions.updatePosts(data.post));
});

export const commentPost = createAsyncThunk("post/comment", async (props, thunkAPI) => {
	const { customFetch, id, comment } = props;
	const { dispatch, rejectWithValue, getState } = thunkAPI;
	const {
		user: { isGuest },
		post: { singlePost },
	} = getState();
	if (isGuest) return dispatch(showModal({ msg: "You must be logged in to do this action!!" }));
	const data = await customFetch(commentPostService, { id, comment });
	if (!data) return rejectWithValue();
	if (singlePost._id === id) dispatch(postSlice.actions.setSinglePost(data.post));
	dispatch(postSlice.actions.updatePosts(data.post));
});

export const deletePost = createAsyncThunk("post/delete", async (props, thunkAPI) => {
	const { customFetch, id } = props;
	const { dispatch, fulfillWithValue, getState } = thunkAPI;
	const {
		user: { isGuest },
	} = getState();
	if (isGuest) return dispatch(showModal({ msg: "You must be logged in to do this action!!" }));
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
			state.allPosts.posts.pop();
			state.userPosts.posts.pop();
			state.allPosts.posts.unshift(action.payload);
			state.userPosts.posts.unshift(action.payload);
		},
		[deletePost.fulfilled]: (state, action) => {
			state.allPosts.posts = state.allPosts.posts.filter(post => post._id !== action.payload);
			state.userPosts.posts = state.userPosts.posts.filter(post => post._id !== action.payload);
		},
		[update.type]: (state, action) => {
			const { name, profileImage, id } = action.payload;
			state.allPosts.posts = state.allPosts.posts.map(post => {
				if (post.createdBy === id) {
					const updatedName = name || post.userDetails.name;
					const updatedImage = profileImage || post.userDetails.image;
					return {
						...post,
						userDetails: { name: updatedName, image: updatedImage },
					};
				}
				return post;
			});
			state.userPosts.posts = state.userPosts.posts.map(post => {
				if (post.createdBy === id) {
					const updatedName = name || post.userDetails.name;
					const updatedImage = profileImage || post.userDetails.image;
					return {
						...post,
						userDetails: { name: updatedName, image: updatedImage },
					};
				}
				return post;
			});
		},
		[logout.type]: (state, action) => {
			return initialState;
		},
	},
});

export const { setUserPosts, setAllPosts, setEditingPost, setSinglePost } = postSlice.actions;

export default postSlice.reducer;
