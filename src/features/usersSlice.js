import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchUsersService } from "../services/userServices";
import { getAllChats } from "./messageSlice";
import { logout } from "./userSlice";

const initialState = {
	users: [],
	usersOnline: [],
};

export const getUsers = createAsyncThunk("users/getUsers", async (props, thunkAPI) => {
	const { customFetch } = props;
	const { fulfillWithValue, rejectWithValue, dispatch, getState } = thunkAPI;
	const data = await customFetch(fetchUsersService);
	if (!data) return rejectWithValue();
	const { users } = data;
	if (!getState().user.isGuest) dispatch(getAllChats({ customFetch, users }));
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
		[logout.type]: (state, action) => {
			return initialState;
		},
	},
});

export const { addOnline } = usersSlice.actions;
export default usersSlice.reducer;
