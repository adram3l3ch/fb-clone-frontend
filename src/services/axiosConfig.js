import axios from "axios";
import SERVER_URI from "../serverUri";

const axiosConfig = axios.create({
	baseURL: `${SERVER_URI}/api/v1`,
});

export default axiosConfig;
