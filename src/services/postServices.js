import extractParams from "../utils/extractParams";
import axiosConfig from "./axiosConfig";

const createPostService = async (formData = {}) => {
	const headers = { "Content-Type": "multipart/form-data" };
	const { data } = await axiosConfig.post("/posts", formData, { headers });
	return data;
};

const fetchPostsService = async (formData = {}) => {
	const params = extractParams(formData, "id", "query", "page", "userId");
	const { data } = await axiosConfig.get("/posts", { params });
	return data;
};

const likePostService = async (formData = {}) => {
	const params = extractParams(formData, "id", "add");
	const { data } = await axiosConfig.patch("/posts/like", params);
	return data;
};

const commentPostService = async (formData = {}) => {
	const params = extractParams(formData, "id", "comment");
	const { data } = await axiosConfig.post("/posts/comment", params);
	return data;
};

const deleteCommentService = async (formData = {}) => {
	const params = extractParams(formData, "postId", "commentId", "replyId");
	const { data } = await axiosConfig.delete(`/posts/comment`, { params });
	return data;
};

const editCommentService = async (formData = {}) => {
	const params = extractParams(formData, "postId", "commentId", "comment", "replyId");
	const { data } = await axiosConfig.patch(`/posts/comment`, params);
	return data;
};

const replyCommentService = async (formData = {}) => {
	const params = extractParams(formData, "id", "commentId", "comment", "replyTo");
	const { data } = await axiosConfig.post("/posts/comment", params);
	return data;
};

const deletePostService = async (formData = {}) => {
	const { id } = formData;
	const { data } = await axiosConfig.delete(`/posts/${id}`);
	return data;
};

const updatePostService = async (formData = {}) => {
	const { id, form } = formData;
	const { data } = await axiosConfig.patch(`/posts/${id}`, form);
	return data;
};

export {
	fetchPostsService,
	createPostService,
	likePostService,
	commentPostService,
	deletePostService,
	updatePostService,
	deleteCommentService,
	editCommentService,
	replyCommentService,
};
