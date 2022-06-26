import extractParams from "../utils/extractParams";
import axiosConfig from "./axiosConfig";

const createPostServices = async (formData = {}) => {
	const headers = { "Content-Type": "multipart/form-data" };
	const { data } = await axiosConfig.post("/posts", formData, { headers });
	return data;
};

const fetchPostsServices = async (formData = {}) => {
	const params = extractParams(formData, "id", "query", "page", "userId");
	const { data } = await axiosConfig.get("/posts", { params });
	return data;
};

const likePostServices = async (formData = {}) => {
	const params = extractParams(formData, "id", "add");
	const { data } = await axiosConfig.patch("/posts/like", params);
	return data;
};

const commentPostServices = async (formData = {}) => {
	const params = extractParams(formData, "id", "comment");
	const { data } = await axiosConfig.patch("/posts/comment", params);
	return data;
};

const deletePostServices = async (formData = {}) => {
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
	fetchPostsServices,
	createPostServices,
	likePostServices,
	commentPostServices,
	deletePostServices,
	updatePostService,
};
