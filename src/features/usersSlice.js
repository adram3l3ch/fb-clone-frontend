import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchUsers } from '../API';

const initialState = {
	users: [],
	usersOnline: [],
};

export const getUsers = createAsyncThunk(
	'/users/getUsers',
	async (props, { getState, fulfillWithValue }) => {
		const { user } = getState();
		const data = await props.customFetch(fetchUsers, user.token);
		return fulfillWithValue(data.user);
	}
);

const usersSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {
		addOnline: (state, action) => {
			state.usersOnline = action.payload;
		},
	},
	extraReducers: {
		[getUsers.fulfilled]: (state, action) => {
			state.users = action.payload;
		},
	},
});

export const { addOnline } = usersSlice.actions;
export default usersSlice.reducer;
