import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchUsersServices } from "../services/userServices";
import { _getChats } from "./messageSlice";

const initialState = {
	users: [],
	usersOnline: [],
};

export const getUsers = createAsyncThunk("users/getUsers", async (props, thunkAPI) => {
	const { customFetch } = props;
	const { fulfillWithValue, rejectWithValue, dispatch } = thunkAPI;
	const data = await customFetch(fetchUsersServices);
	if (!data) return rejectWithValue();
	const { users } = data;
	dispatch(_getChats({ customFetch, users }));
	return fulfillWithValue(users);
});

const usersSlice = createSlice({
	name: "users",
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
