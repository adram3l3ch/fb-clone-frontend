import axios from "axios";
import extractParams from "../utils/extractParams";
import SERVER_URI from "../serverUri";
const API_ENDPOINT = `${SERVER_URI}/api/v1`;

const loginService = async formData => {
	const end_point = `${API_ENDPOINT}/auth/login`;
	const params = extractParams(formData, "email", "password");
	const { data } = await axios.post(end_point, params);
	return data;
};

const registerService = async formData => {
	const end_point = `${API_ENDPOINT}/auth/register`;
	const params = extractParams(formData, "name", "email", "password", "dob");
	const { data } = await axios.post(end_point, params);
	return data;
};

export { loginService, registerService };
