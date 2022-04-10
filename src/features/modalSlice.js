import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
	msg: '',
	visible: false,
	isSidebarVisible: false,
	isLoading: false,
};

let timeout;

export const showModal = createAsyncThunk('modal/show', async (props, thunkAPI) => {
	let { msg } = props;
	msg = msg || "Hold on I swear it won't take so long";
	const { fulfillWithValue, dispatch } = thunkAPI;
	clearTimeout(timeout);
	timeout = setTimeout(() => {
		dispatch(modalSlice.actions.hideModal());
	}, 4000);
	return fulfillWithValue({ msg, visible: true });
});

const modalSlice = createSlice({
	name: 'modal',
	initialState,
	reducers: {
		hideModal: state => {
			state.visible = false;
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
			state.msg = action.payload.msg;
			state.visible = action.payload.visible;
		},
	},
});

export const { hideModal, toggleSidebar, setIsLoading } = modalSlice.actions;

export default modalSlice.reducer;
