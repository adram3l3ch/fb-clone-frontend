import extractParams from "../utils/extractParams";
import axiosConfig from "./axiosConfig";

const fetchUsersService = async (formData = {}) => {
	const params = extractParams(formData, "id", "query");
	const { data } = await axiosConfig.get("/users", { params });
	return data;
};

const updateUserService = async (formData = {}) => {
	const params = extractParams(formData, "name", "about", "location");
	const { data } = await axiosConfig.patch("/users", params);
	return data;
};

const updateDPService = async (formData = {}) => {
	const headers = { "Content-Type": "multipart/form-data" };
	const { data } = await axiosConfig.patch("/users/dp", formData, { headers });
	return data;
};

export { fetchUsersService, updateUserService, updateDPService };
