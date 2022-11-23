import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { logout } from "./userSlice";

class Modal {
	constructor(msg = "Hold on I swear it won't take so long", id) {
		this.msg = msg;
		this.id = id;
	}
}

const initialState = {
	modals: [],
	isSidebarVisible: false,
	isLoading: false,
};

export const showModal = createAsyncThunk("modal/show", async (props, thunkAPI) => {
	const { fulfillWithValue, dispatch, getState } = thunkAPI;
	const { msg } = props;
	const id = getState().modal.modals.length;
	const modal = new Modal(msg, id);
	setTimeout(() => {
		dispatch(modalSlice.actions.hideModal());
	}, 10000);
	return fulfillWithValue(modal);
});

const modalSlice = createSlice({
	name: "modal",
	initialState,
	reducers: {
		hideModal: state => {
			state.modals.pop();
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
