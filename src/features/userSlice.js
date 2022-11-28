import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import axiosConfig from "../services/axiosConfig";

const initialState = {
	id: "",
	name: "",
	profileImage: "",
	token: "",
	isGuest: "",
};

let interceptor;

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		login: (state, action) => {
			const { id, name, profileImage, token, isGuest } = action.payload;
			Cookies.set("user", JSON.stringify(action.payload), { expires: 30 });
			interceptor = axiosConfig.interceptors.request.use(
				config => {
					config.headers["Authorization"] = `Bearer ${token}`;
					return config;
				},
				error => Promise.reject(error)
			);
			return { id, name, profileImage, token, isGuest: !!isGuest };
		},
		logout: state => {
			Cookies.remove("user");
			axiosConfig.interceptors.request.eject(interceptor);
			return initialState;
		},
		update: (state, action) => {
			const { payload } = action;
			Object.keys(payload).map(key => (state[key] = payload[key]));
			Cookies.set("user", JSON.stringify(state));
		},
	},
});

export const { login, logout, update } = userSlice.actions;

export default userSlice.reducer;
