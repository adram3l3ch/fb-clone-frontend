import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchUsers } from '../API';

const initialState = {
	users: [],
	usersOnline: [],
};

export const getUsers = createAsyncThunk('users/getUsers', async (props, thunkAPI) => {
	const { customFetch } = props;
	const { getState, fulfillWithValue, rejectWithValue } = thunkAPI;
	const { user } = getState();
	const data = await customFetch(fetchUsers, user.token);
	if (!data) return rejectWithValue();
	return fulfillWithValue(data.user);
});

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
		[getUsers.rejected]: (state, action) => {
			return state;
		},
	},
});

export const { addOnline } = usersSlice.actions;
export default usersSlice.reducer;
