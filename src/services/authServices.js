import extractParams from "../utils/extractParams";
import axiosConfig from "./axiosConfig";

const loginService = async (formData = {}) => {
	const params = extractParams(formData, "email", "password");
	const { data } = await axiosConfig.post("/auth/login", params);
	return data;
};

const registerService = async (formData = {}) => {
	const params = extractParams(formData, "name", "email", "password", "dob");
	const { data } = await axiosConfig.post("/auth/register", params);
	return data;
};

export { loginService, registerService };
