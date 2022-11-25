import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { logout } from "./userSlice";

const initialState = {
	modals: [],
	isSidebarVisible: false,
	isLoading: false,
};

export const showModal = createAsyncThunk("modal/show", async (props, thunkAPI) => {
	const { fulfillWithValue, dispatch } = thunkAPI;
	const msg = props.msg || "Hold on I swear it won't take so long";
	const id = new Date().getTime();
	const modal = { msg, id };
	setTimeout(() => {
		dispatch(modalSlice.actions.hideModal(id));
	}, 10000);
	return fulfillWithValue(modal);
});

const modalSlice = createSlice({
	name: "modal",
	initialState,
	reducers: {
		hideModal: (state, action) => {
			state.modals = state.modals.filter(ele => ele.id !== action.payload);
		},
		toggleSidebar: (state, action) => {
			state.isSidebarVisible = action.payload;
		},
		setIsLoading: (state, action) => {
			state.isLoading = action.payload;
		},
	},
	extraReducers: {
		[showModal.fulfilled]: (state, action) => {
			state.modals.push(action.payload);
		},
		[logout.type]: (state, action) => {
			return initialState;
		},
	},
});

export const { hideModal, toggleSidebar, setIsLoading } = modalSlice.actions;

export default modalSlice.reducer;
