import {
	commentPostService,
	createPostService,
	deleteCommentService,
	deletePostService,
	editCommentService,
	fetchPostsService,
	likePostService,
	replyCommentService,
	updatePostService,
} from "../services/postServices";
import { showModal } from "./modalSlice";
import { logout, update } from "./userSlice";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = {
	allPosts: { posts: [], page: 0, isLoading: false },
	userPosts: { posts: [], page: 0 },
	editingPost: {},
	singlePost: {},
};

const handleGuest = (isGuest, dispatch) => {
	if (isGuest) {
		dispatch(showModal({ msg: "You must be logged in to do this action!!" }));
		return true;
	}
	return false;
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
	if (handleGuest(isGuest, dispatch)) return rejectWithValue();
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
	if (handleGuest(isGuest, dispatch)) return rejectWithValue();
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
		user: { isGuest, id: userId },
	} = getState();
	if (handleGuest(isGuest, dispatch)) return rejectWithValue();
	customFetch(likePostService, { id, add: !isLiked });
	return { id, userId, add: !isLiked };
});

export const commentPost = createAsyncThunk("post/comment", async (props, thunkAPI) => {
	const { customFetch, id, comment } = props;
	const { dispatch, rejectWithValue, getState } = thunkAPI;
	const {
		user: { isGuest },
		post: { singlePost },
	} = getState();
	if (handleGuest(isGuest, dispatch)) return rejectWithValue();
	const data = await customFetch(commentPostService, { id, comment });
	if (!data) return rejectWithValue();
	if (singlePost._id === id) dispatch(postSlice.actions.setSinglePost(data.post));
	dispatch(postSlice.actions.updatePosts(data.post));
});

export const deletePost = createAsyncThunk("post/delete", async (props, thunkAPI) => {
	const { customFetch, id } = props;
	const { dispatch, fulfillWithValue, getState, rejectWithValue } = thunkAPI;
	const {
		user: { isGuest },
	} = getState();
	if (handleGuest(isGuest, dispatch)) return rejectWithValue();
	await customFetch(deletePostService, { id });
	dispatch(showModal({ msg: "Post Deleted" }));
	return fulfillWithValue(id);
});

export const deleteComment = createAsyncThunk("post/comment/delete", async (props, thunkAPI) => {
	const { customFetch, postId, commentId, replyId } = props;
	const { dispatch, fulfillWithValue, getState, rejectWithValue } = thunkAPI;
	const {
		user: { isGuest },
	} = getState();
	if (handleGuest(isGuest, dispatch)) return rejectWithValue();
	const data = await customFetch(deleteCommentService, { postId, commentId, replyId });
	dispatch(showModal({ msg: "Comment Deleted" }));
	return fulfillWithValue(data);
});

export const editComment = createAsyncThunk("post/comment/edit", async (props, thunkAPI) => {
	const { customFetch, postId, commentId, comment, replyId } = props;
	const { dispatch, rejectWithValue, getState, fulfillWithValue } = thunkAPI;
	const {
		user: { isGuest },
	} = getState();
	if (handleGuest(isGuest, dispatch)) return rejectWithValue();
	const data = await customFetch(editCommentService, { postId, commentId, comment, replyId });
	dispatch(showModal({ msg: "Comment Edited" }));
	return fulfillWithValue(data);
});

export const replyComment = createAsyncThunk("post/comment/reply", async (props, thunkAPI) => {
	const { customFetch, id, commentId, comment, replyTo } = props;
	const { dispatch, rejectWithValue, getState, fulfillWithValue } = thunkAPI;
	const {
		user: { isGuest },
	} = getState();
	if (handleGuest(isGuest, dispatch)) return rejectWithValue();
	const data = await customFetch(replyCommentService, { id, commentId, comment, replyTo });
	return fulfillWithValue(data);
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
		[likePost.fulfilled]: (state, { payload }) => {
			const { singlePost, allPosts, userPosts } = state;
			const { id, userId, add } = payload;
			if (singlePost._id === id) {
				add
					? singlePost.likes.push(userId)
					: (singlePost.likes = singlePost.likes.filter(ele => ele !== userId));
			}
			let post = allPosts.posts.find(post => post._id === id);
			let _post = userPosts.posts.find(post => post._id === id);
			if (add) {
				post?.likes.push(userId);
				_post?.likes.push(userId);
			} else {
				post && (post.likes = post.likes.filter(ele => ele !== userId));
				_post && (_post.likes = _post.likes.filter(ele => ele !== userId));
			}
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
		[deleteComment.fulfilled]: (state, action) => {
			const { post } = action.payload;
			state.singlePost = post;
			state.allPosts.posts = state.allPosts.posts.map(_post => (_post._id === post._id ? post : _post));
		},
		[editComment.fulfilled]: (state, action) => {
			const { post } = action.payload;
			state.singlePost = post;
		},
		[replyComment.fulfilled]: (state, action) => {
			const { post } = action.payload;
			state.singlePost = post;
		},
		[logout.type]: (state, action) => {
			return initialState;
		},
		[setPosts.pending]: state => {
			state.allPosts.isLoading = true;
		},
	},
});

export const { setUserPosts, setAllPosts, setEditingPost, setSinglePost } = postSlice.actions;

export default postSlice.reducer;
