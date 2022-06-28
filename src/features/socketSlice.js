import { createSlice } from "@reduxjs/toolkit";
import { logout } from "./userSlice";

const initialState = {
	socket: null,
};

const socketSlice = createSlice({
	name: "socket",
	initialState,
	reducers: {
		setSocket: (state, action) => {
			state.socket = action.payload;
		},
	},
	extraReducers: {
		[logout.type]: (state, action) => {
			return initialState;
		},
	},
});

export const { setSocket } = socketSlice.actions;

export default socketSlice.reducer;
