import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	socket: null,
	usersOnline: [],
	users: [],
};

const socketSlice = createSlice({
	name: 'socket',
	initialState,
	reducers: {
		setSocket: (state, action) => {
			state.socket = action.payload;
		},
		usersOnline: (state, action) => {
			state.usersOnline = action.payload;
		},
		setUsers: (state, action) => {
			state.users = action.payload;
		},
	},
});

export const { setSocket, usersOnline, setUsers } = socketSlice.actions;

export default socketSlice.reducer;
